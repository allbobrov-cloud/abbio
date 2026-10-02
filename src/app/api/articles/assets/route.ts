import { randomUUID, createHash } from "node:crypto";
import sharp, { type OutputInfo } from "sharp";
import { articleApi, authorizeArticles, mutateArticles } from "@/lib/articles/api";
import { ArticleError } from "@/lib/articles/schema";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function POST(request: Request) {
  return articleApi(async () => {
    authorizeArticles(request);
    const limit = 5 * 1024 * 1024;
    if (Number(request.headers.get("content-length")) > limit) throw new ArticleError("image_too_large", 413);
    const reader = request.body?.getReader(); if (!reader) throw new ArticleError("image_required", 422);
    const chunks: Uint8Array[] = []; let size = 0;
    while (true) { const { value, done } = await reader.read(); if (done) break; size += value.length;
      if (size > limit) { await reader.cancel(); throw new ArticleError("image_too_large", 413); } chunks.push(value); }
    const raw = Buffer.concat(chunks);
    let output: { data: Buffer; info: OutputInfo };
    try {
      const image = sharp(raw, { limitInputPixels: 16000000, animated: false });
      const metadata = await image.metadata();
      if (!["jpeg", "png", "webp", "avif", "heif"].includes(metadata.format ?? "") || (metadata.pages ?? 1) > 1) throw new Error("unsupported");
      output = await image.rotate().resize({ width: 1920, height: 1920, fit: "inside", withoutEnlargement: true }).webp({ quality: 82 }).toBuffer({ resolveWithObject: true });
    } catch { throw new ArticleError("invalid_image", 422); }
    const hash = createHash("sha256").update(raw).digest("hex");
    return mutateArticles(request, { imageHash: hash }, async client => {
      const id = randomUUID(); const { data, info } = output;
      await client.query("INSERT INTO abbio_editorial.article_assets(id,data,width,height) VALUES($1,$2,$3,$4)", [id, data, info.width, info.height]);
      return { id, url: `/media/articles/${id}.webp`, width: info.width, height: info.height, contentType: "image/webp", bytes: data.length };
    }, 201);
  });
}

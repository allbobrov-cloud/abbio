import { randomUUID, createHash } from "node:crypto";
import sharp from "sharp";
import { articleApi, authorizeArticles, mutateArticles } from "@/lib/articles/api";
import { ArticleError, createSchema, parseInput } from "@/lib/articles/schema";
import { createArticle, publishArticle } from "@/lib/articles/repository";
import { formText, importArticleHtml, importCategory, importSlug, makeCover, readMakeForm } from "@/lib/articles/make-import";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** One successful response means both the image and published article are committed. */
export async function POST(request: Request) {
  return articleApi(async () => {
    authorizeArticles(request);
    const form = await readMakeForm(request);
    const html = formText(form, "DETAIL_TEXT", 200000);
    const title = formText(form, "NAME", 200);
    const sourceId = formText(form, "SOURCE_ID", 17);
    if (!/^rec[A-Za-z0-9]{14}$/.test(sourceId)) throw new ArticleError("invalid_source_id", 422);
    const topic = formText(form, "TOPIC", 2000, false);
    const coverAlt = formText(form, "IMAGE_ALT", 300, false) || formText(form, "IMAGEALT", 300, false) || title;
    const text = await importArticleHtml(html);
    const rawImage = await makeCover(form);
    let cover;
    try {
      const image = sharp(rawImage, { limitInputPixels: 16000000, animated: false });
      const metadata = await image.metadata();
      if (!["jpeg", "png", "webp", "avif", "heif"].includes(metadata.format ?? "") || (metadata.pages ?? 1) > 1) throw new Error("unsupported");
      cover = await image.rotate().resize({ width: 1920, height: 1920, fit: "inside", withoutEnlargement: true }).webp({ quality: 82 }).toBuffer({ resolveWithObject: true });
    } catch { throw new ArticleError("invalid_image", 422); }
    const slug = importSlug(title, sourceId);
    const fingerprint = { sourceId, title, html, topic, coverAlt, imageHash: createHash("sha256").update(rawImage).digest("hex") };
    return mutateArticles(request, fingerprint, async client => {
      const assetId = randomUUID();
      const { data, info } = cover;
      await client.query("INSERT INTO abbio_editorial.article_assets(id,data,width,height) VALUES($1,$2,$3,$4)", [assetId, data, info.width, info.height]);
      const { slug: _slug, status: _status, ...input } = parseInput(createSchema, {
        slug, title, ...text, category: importCategory(topic), author: "ABBiO",
        coverImage: `/media/articles/${assetId}.webp`, coverAlt,
      });
      void _slug; void _status;
      const draft = await createArticle(client, slug, input);
      const published = await publishArticle(client, draft.id, draft.revision);
      return { ...published, url: `/articles/${published.slug}` };
    }, 201);
  });
}

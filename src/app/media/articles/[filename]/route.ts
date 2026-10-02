import { articlePool } from "@/lib/articles/db";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET(request: Request, context: { params: Promise<{ filename: string }> }) {
  const { filename } = await context.params;
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.webp$/.test(filename)) return new Response(null, { status: 404 });
  const id = filename.replace(".webp", "");
  try {
    const result = await articlePool().query("SELECT data FROM abbio_editorial.article_assets WHERE id=$1", [id]);
    if (!result.rowCount) return new Response(null, { status: 404 });
    const headers = { "Content-Type": "image/webp", "Cache-Control": "public, max-age=31536000, immutable", "X-Content-Type-Options": "nosniff", ETag: `"${id}"` };
    if (request.headers.get("if-none-match") === headers.ETag) return new Response(null, { status: 304, headers });
    return new Response(new Uint8Array(result.rows[0].data), { headers });
  } catch { return new Response(null, { status: 503, headers: { "Cache-Control": "no-store" } }); }
}

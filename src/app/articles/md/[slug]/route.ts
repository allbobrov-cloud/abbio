import { getPublished } from "@/lib/articles/repository";
import { articleMarkdown, plainHeaders } from "@/lib/articles/plain";
import { absoluteUrl } from "@/lib/seo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* /articles/<slug>.md (rewrite в next.config) — Markdown-версия статьи. */
export async function GET(_request: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  const article = await getPublished(slug);
  if (!article) return new Response("Not found\n", { status: 404, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  return new Response(articleMarkdown(article), {
    headers: {
      ...plainHeaders("text/markdown"),
      // Копия статьи не должна конкурировать с HTML-страницей в обычном поиске.
      "X-Robots-Tag": "noindex",
      Link: `<${absoluteUrl(`/articles/${article.slug}`)}>; rel="canonical"`,
    },
  });
}

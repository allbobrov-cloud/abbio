import { allPublished } from "@/lib/articles/repository";
import { articleSeo } from "@/lib/articles/seo";
import { articleAuthor } from "@/lib/articles/author";
import { plainHeaders } from "@/lib/articles/plain";
import { absoluteUrl } from "@/lib/seo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const xml = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/* RSS 2.0 лента статей: агрегаторы, Дзен, ридеры и ИИ-сервисы узнают о новых материалах. */
export async function GET() {
  const articles = await allPublished(false, 50);
  const items = articles.map((article) => {
    const url = absoluteUrl(`/articles/${article.slug}`);
    const author = articleAuthor(article.author);
    const image = article.ogImage ?? article.coverImage;
    return [
      "<item>",
      `<title>${xml(article.title)}</title>`,
      `<link>${url}</link>`,
      `<guid isPermaLink="true">${url}</guid>`,
      `<description>${xml(articleSeo(article).description)}</description>`,
      `<dc:creator>${xml(author.name)}</dc:creator>`,
      `<category>${xml(articleSeo(article).section)}</category>`,
      article.publishedAt ? `<pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>` : "",
      image ? `<enclosure url="${absoluteUrl(image)}" type="image/webp" length="0" />` : "",
      "</item>",
    ].join("");
  });
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>Статьи ABBiO</title>
<link>${absoluteUrl("/articles")}</link>
<atom:link href="${absoluteUrl("/articles/rss.xml")}" rel="self" type="application/rss+xml" />
<description>Практические разборы о сайтах, SEO, рекламе, обращениях и CRM.</description>
<language>ru</language>
${items.join("\n")}
</channel>
</rss>
`;
  return new Response(body, { headers: plainHeaders("application/rss+xml") });
}

import "server-only";
import { absoluteUrl } from "@/lib/seo";
import { articleAuthor } from "./author";
import { articleSeo } from "./seo";
import type { Article } from "./types";

/*
 * Чистая Markdown-версия статьи для ИИ-ассистентов и агрегаторов:
 * заголовок, краткое описание, автор, даты, ссылка на оригинал и текст без оформления сайта.
 */
export function articleMarkdown(article: Article) {
  const url = absoluteUrl(`/articles/${article.slug}`);
  const author = articleAuthor(article.author);
  const seo = articleSeo(article);
  const date = (value: string | null) => (value ? value.slice(0, 10) : "");
  const body = article.content
    // Внутренние ссылки и изображения — абсолютными адресами.
    .replace(/\]\((\/[^)\s]*)/g, (_, path: string) => `](${absoluteUrl(path)}`);
  return [
    `# ${article.title}`,
    "",
    `> ${seo.description}`,
    "",
    `- Источник: ${url}`,
    `- Автор: ${author.name}, ${author.role}, ABBiO (${absoluteUrl(author.path)})`,
    `- Опубликовано: ${date(article.publishedAt)}`,
    `- Обновлено: ${date(article.updatedAt)}`,
    `- Раздел: ${seo.section}`,
    ...(article.tags.length ? [`- Темы: ${article.tags.join(", ")}`] : []),
    "",
    body.trim(),
    "",
    `---`,
    `Оригинал статьи: ${url}`,
    "",
  ].join("\n");
}

export const plainHeaders = (type: string) => ({
  "Content-Type": `${type}; charset=utf-8`,
  "Cache-Control": "public, max-age=300, s-maxage=300",
});

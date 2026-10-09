import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkDirective from "remark-directive";
import { visit } from "unist-util-visit";
import type { Root, RootContent } from "mdast";
import { ArticleError } from "./schema";
import type { TocItem } from "./types";

type Node = RootContent & { children?: Node[]; value?: string; name?: string; attributes?: Record<string, string>; data?: Record<string, unknown>; depth?: number; url?: string; alt?: string | null };
const parser = unified().use(remarkParse).use(remarkGfm).use(remarkDirective);
export function plainText(node: { value?: string; children?: unknown[] }): string {
  if (typeof node.value === "string") return node.value;
  return (node.children ?? []).map(n => plainText(n as typeof node)).join(" ");
}
export function safeLink(url: string): boolean {
  if (/^[\s\S]*[\x00-\x20\\]/.test(url)) return false;
  if (url.startsWith("/") && !url.startsWith("//")) return true;
  if (url.startsWith("#")) return true;
  try { const parsed = new URL(url); return parsed.protocol === "https:" && !parsed.username && !parsed.password; } catch { return false; }
}
export function analyseMarkdown(content: string) {
  const tree = parser.parse(content) as Root;
  const toc: TocItem[] = [];
  const images = new Set<string>();
  let heading = 0;
  visit(tree, (raw) => {
    const node = raw as unknown as Node;
    if (node.type === "html") throw new ArticleError("raw_html_not_allowed", 422);
    if (node.type === "heading") {
      if (node.depth !== 2 && node.depth !== 3) throw new ArticleError("use_h2_or_h3", 422);
      const title = plainText(node);
      if (!title.trim()) throw new ArticleError("empty_heading", 422);
      const id = `section-${++heading}`;
      if (node.depth === 2) toc.push({ id, title });
    }
    if ((node.type === "link" || node.type === "definition") && (!node.url || !safeLink(node.url))) throw new ArticleError("unsafe_link", 422);
    if (node.type === "image") {
      if (!node.url || !/^\/media\/articles\/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.webp$/.test(node.url) || !node.alt?.trim()) throw new ArticleError("invalid_article_image", 422);
      images.add(node.url);
    }
    if (node.type === "imageReference") throw new ArticleError("use_inline_images", 422);
    if (["containerDirective", "leafDirective", "textDirective"].includes(node.type)) {
      if (node.name === "callout" && node.type === "containerDirective") {
        const attrs = node.attributes ?? {};
        if (Object.keys(attrs).some(k => !["title", "tone"].includes(k)) || (attrs.tone && !["note", "tip", "warning"].includes(attrs.tone)) || (attrs.title?.length ?? 0) > 120) throw new ArticleError("invalid_callout", 422);
      } else if (node.name === "cta" && node.type === "leafDirective" && !Object.keys(node.attributes ?? {}).length && !node.children?.length) {
        // Fixed, trusted component. No supplied HTML, scripts or props.
      } else throw new ArticleError("unsupported_directive", 422);
    }
  });
  const words = plainText(tree).match(/[\p{L}\p{N}]+/gu)?.length ?? 0;
  return { toc, images: [...images], readingTime: Math.max(1, Math.ceil(words / 200)) };
}

/** Applies the same heading order used by analyseMarkdown to the rendered tree. */
export function articleMarkdownPlugin() {
  return (tree: Root) => {
    let heading = 0;
    visit(tree, (raw) => {
      const node = raw as unknown as Node;
      if (node.type === "heading") node.data = { ...node.data, hProperties: { id: `section-${++heading}` } };
      if (node.type === "containerDirective" && node.name === "callout") {
        node.data = { hName: "aside", hProperties: { "data-callout": node.attributes?.tone ?? "note", "data-title": node.attributes?.title ?? "" } };
      }
      if (node.type === "leafDirective" && node.name === "cta") node.data = { hName: "div", hProperties: { "data-article-cta": "true" } };
    });
  };
}

/*
 * Вопросы и ответы из текста статьи: подзаголовок H2, который заканчивается «?»,
 * и первый абзац под ним. Используется для разметки FAQPage — текст статьи не меняется.
 */
export function articleQuestions(content: string, limit = 6) {
  const tree = parser.parse(content) as Root;
  const items: { question: string; answer: string }[] = [];
  const nodes = tree.children as Node[];
  nodes.forEach((node, index) => {
    if (node.type !== "heading" || node.depth !== 2) return;
    const question = plainText(node).replace(/\s+/g, " ").trim();
    if (!question.endsWith("?")) return;
    const answer = nodes.slice(index + 1).find((next) => next.type === "paragraph" || next.type === "heading");
    if (!answer || answer.type !== "paragraph") return;
    const text = plainText(answer).replace(/\s+/g, " ").trim();
    if (text.length >= 40) items.push({ question, answer: text.length > 600 ? `${text.slice(0, 597).replace(/\s+\S*$/, "")}…` : text });
  });
  return items.slice(0, limit);
}

/** Количество слов статьи — для разметки wordCount. */
export function articleWordCount(content: string) {
  return plainText(parser.parse(content) as Root).match(/[\p{L}\p{N}]+/gu)?.length ?? 0;
}

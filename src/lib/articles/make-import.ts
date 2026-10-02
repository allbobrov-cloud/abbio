import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeRemark from "rehype-remark";
import remarkGfm from "remark-gfm";
import remarkStringify from "remark-stringify";
import { visit } from "unist-util-visit";
import type { Root, Element } from "hast";
import { ArticleError } from "./schema";
import { analyseMarkdown, plainText, safeLink } from "./markdown";
import type { ArticleCategory } from "./types";

const allowed = new Set(["article", "section", "p", "h2", "h3", "h4", "ul", "ol", "li", "table", "thead", "tbody", "tfoot", "tr", "th", "td", "caption", "blockquote", "strong", "em", "b", "i", "br", "hr", "pre", "code", "a"]);
const converter = unified().use(rehypeParse, { fragment: true }).use(() => (tree: Root) => {
  visit(tree, "element", (node: Element) => {
    if (!allowed.has(node.tagName) || Object.keys(node.properties).some(p => /^on/i.test(p) || ["style", "src", "srcDoc"].includes(p))) throw new ArticleError("unsupported_article_html", 422);
    const href = node.tagName === "a" ? String(node.properties.href ?? "") : "";
    if (node.tagName === "a" && !safeLink(href)) throw new ArticleError("unsafe_link", 422);
    node.properties = href ? { href } : {};
    if (node.tagName === "h4") node.tagName = "h3";
  });
}).use(rehypeRemark).use(remarkGfm).use(remarkStringify, { bullet: "-", fences: true });

export async function importArticleHtml(html: string) {
  const content = String(await converter.process(html)).trim();
  if (!content || content.length > 120000) throw new ArticleError("invalid_article_content", 422);
  analyseMarkdown(content);
  const tree = unified().use(rehypeParse, { fragment: true }).parse(html) as Root;
  let introduction = "";
  visit(tree, "element", (node: Element) => {
    if (!introduction && node.tagName === "p") introduction = plainText(node).replace(/\s+/g, " ").trim();
  });
  introduction ||= plainText(tree).replace(/\s+/g, " ").trim();
  if (!introduction) throw new ArticleError("article_content_required", 400);
  return { content, description: introduction.slice(0, 500), excerpt: introduction.slice(0, 350) };
}

export function importSlug(title: string, sourceId: string) {
  const alphabet: Record<string, string> = { а:"a", б:"b", в:"v", г:"g", д:"d", е:"e", ё:"yo", ж:"zh", з:"z", и:"i", й:"y", к:"k", л:"l", м:"m", н:"n", о:"o", п:"p", р:"r", с:"s", т:"t", у:"u", ф:"f", х:"h", ц:"ts", ч:"ch", ш:"sh", щ:"sch", ъ:"", ы:"y", ь:"", э:"e", ю:"yu", я:"ya" };
  const name = [...title.toLowerCase()].map(c => alphabet[c] ?? c).join("").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80).replace(/-$/g, "") || "article";
  return `${name}-${sourceId.toLowerCase()}`;
}

export function importCategory(topic: string): ArticleCategory {
  // Airtable topic labels supply a category without changing the article generators.
  const label = topic.split(/\s[—–]\s/).at(-1)?.toLowerCase() ?? "";
  if (/seo/.test(label)) return "seo";
  if (/аналитик/.test(label)) return "analytics";
  if (/маркетинг|реклам|директ/.test(label)) return "marketing";
  if (/сайт|дизайн|ux/.test(label)) return "websites";
  return "practice";
}

export async function readMakeForm(request: Request) {
  if (!request.headers.get("content-type")?.startsWith("multipart/form-data")) throw new ArticleError("invalid_content_type", 415);
  const limit = 8 * 1024 * 1024;
  if (Number(request.headers.get("content-length")) > limit) throw new ArticleError("request_too_large", 413);
  const reader = request.body?.getReader();
  if (!reader) throw new ArticleError("article_content_required", 400);
  const chunks: Uint8Array[] = []; let length = 0;
  while (true) {
    const { value, done } = await reader.read(); if (done) break;
    length += value.length;
    if (length > limit) { await reader.cancel(); throw new ArticleError("request_too_large", 413); }
    chunks.push(value);
  }
  try {
    return await new Response(Buffer.concat(chunks), { headers: { "Content-Type": request.headers.get("content-type")! } }).formData();
  } catch { throw new ArticleError("invalid_multipart", 400); }
}

export function formText(form: FormData, name: string, max: number, required = true) {
  const raw = form.get(name);
  if (raw == null && !required) return "";
  if (typeof raw !== "string" || (required && !raw.trim()) || raw.length > max) throw new ArticleError(name === "DETAIL_TEXT" ? "article_content_required" : "invalid_fields", 400);
  return raw.trim();
}

export async function makeCover(form: FormData) {
  const preview = form.get("PREVIEW_PICTURE");
  const detail = form.get("DETAIL_PICTURE");
  const value = preview instanceof Blob || (typeof preview === "string" && preview.trim()) ? preview : detail;
  let bytes: Buffer;
  if (value instanceof Blob) {
    if (value.size > 5 * 1024 * 1024) throw new ArticleError("image_too_large", 413);
    bytes = Buffer.from(await value.arrayBuffer());
  } else {
    // Never fetch provider URLs: the existing scenario already supplies base64.
    const match = typeof value === "string" ? /^data:(image\/(?:png|jpeg|webp|avif))?;base64,([A-Za-z0-9+/=\r\n]+)$/.exec(value.trim()) : null;
    if (!match) throw new ArticleError("cover_base64_required", 422);
    const base64 = match[2].replace(/[\r\n]/g, "");
    if (base64.length > Math.ceil(5 * 1024 * 1024 / 3) * 4) throw new ArticleError("image_too_large", 413);
    bytes = Buffer.from(base64, "base64");
    if (bytes.toString("base64") !== base64) throw new ArticleError("invalid_image", 422);
  }
  if (!bytes.length || bytes.length > 5 * 1024 * 1024) throw new ArticleError("invalid_image", 422);
  return bytes;
}

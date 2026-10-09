import { ARTICLE_CATEGORIES, type ArticleInput } from "./types";

export function cleanSeoText(value: string) {
  return value.replace(/<[^>]*>/g, " ").replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim();
}

// Editorial budgets, not search-engine limits. Keep whole words and sentences.
export function seoSummary(value: string, budget = 160) {
  const text = cleanSeoText(value);
  if (text.length <= budget) return text;
  const prefix = text.slice(0, budget - 1);
  const end = [...prefix.matchAll(/[.!?](?=\s|$)/g)].at(-1)?.index;
  if (end !== undefined && end >= budget * .55) return prefix.slice(0, end + 1);
  const space = prefix.lastIndexOf(" ");
  return (space >= budget * .5 ? prefix.slice(0, space) : prefix).replace(/[,:;\s—–-]+$/g, "") + "…";
}

export function articleSeo(article: Pick<ArticleInput, "title" | "description" | "seoTitle" | "seoDescription" | "ogTitle" | "ogDescription" | "category">) {
  const headline = cleanSeoText(article.title);
  // Preserve the headline: trimming it may erase meaning or make titles identical.
  const title = cleanSeoText(article.seoTitle ?? headline).replace(/\s*[|—–-]\s*(?:Агентство\s+)?ABBiO\s*$/i, "");
  const description = seoSummary(article.seoDescription ?? article.description);
  return { title: `${title} | ABBiO`, description,
    ogTitle: cleanSeoText(article.ogTitle ?? headline),
    ogDescription: article.ogDescription ? seoSummary(article.ogDescription, 200) : description,
    section: ARTICLE_CATEGORIES[article.category] };
}

/* Услуги по теме статьи: по ключевым словам заголовка и тегов, затем по категории. */
const serviceTopics: [string, RegExp][] = [
  ["yandex-direct", /директ|контекстн|реклам/i],
  ["seo", /seo|сео|поисков|выдач|позици|продвижени/i],
  ["websites", /сайт|посадоч|лендинг|страниц|форм[аыу]|ux/i],
  ["marketing", /crm|заявк|аналитик|метрик|воронк|продаж/i],
  ["design", /дизайн|айдентик|брендинг/i],
];

export function articleServiceLinks(category: ArticleInput["category"], explicit: string[], topic = "") {
  if (explicit.length) return explicit;
  const byTopic = serviceTopics.filter(([, pattern]) => pattern.test(topic)).map(([slug]) => slug).slice(0, 2);
  if (byTopic.length) return byTopic;
  return ({ websites: ["websites"], seo: ["seo"], marketing: ["marketing"], analytics: [], practice: [] })[category];
}

export function articleCoverAlt(article: Pick<ArticleInput, "coverAlt" | "title">) {
  const alt = cleanSeoText(article.coverAlt);
  return !alt || (!/\s/.test(alt) && (alt.match(/-/g)?.length ?? 0) >= 3) ? cleanSeoText(article.title) : alt;
}

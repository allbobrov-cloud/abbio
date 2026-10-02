export const ARTICLE_CATEGORIES = {
  websites: "Сайты", marketing: "Маркетинг", seo: "SEO", analytics: "Аналитика", practice: "Практика",
} as const;
export type ArticleCategory = keyof typeof ARTICLE_CATEGORIES;
export type ArticleInput = {
  title: string; description: string; excerpt: string; category: ArticleCategory; tags: string[];
  author: string; coverImage: string | null; coverAlt: string; content: string; featured: boolean;
  seoTitle: string | null; seoDescription: string | null; ogTitle: string | null;
  ogDescription: string | null; ogImage: string | null;
  relatedServices: string[]; relatedCases: string[]; relatedArticles: string[];
};
export type Article = ArticleInput & {
  id: string; slug: string; status: "draft" | "published"; revision: number;
  publishedAt: string | null; publishedRevision: number | null; updatedAt: string; readingTime: number;
};
export type ArticleSummary = Omit<Article, "content">;
export type TocItem = { id: string; title: string };

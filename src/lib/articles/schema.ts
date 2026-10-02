import { z } from "zod";
import { caseIndex, services, team } from "@/lib/content";
import { ARTICLE_CATEGORIES } from "./types";

export class ArticleError extends Error {
  constructor(public code: string, public status = 400) { super(code); }
}
export const slugSchema = z.string().min(3).max(120).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const text = (max: number) => z.string().trim().min(1).max(max);
const assetPath = z.string().regex(/^\/media\/articles\/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.webp$/).nullable();
const optionalText = (max: number) => text(max).nullable().default(null);
const references = (values?: readonly string[]) => z.array(text(120).refine(v => !values || values.includes(v))).max(10).refine(v => new Set(v).size === v.length).default([]);
export const articleInputSchema = z.object({
  title: text(200), description: text(500), excerpt: text(350),
  category: z.enum(Object.keys(ARTICLE_CATEGORIES) as [keyof typeof ARTICLE_CATEGORIES, ...(keyof typeof ARTICLE_CATEGORIES)[]]),
  tags: z.array(text(40)).max(12).refine(v => new Set(v).size === v.length).default([]),
  author: text(120).refine(v => v === "ABBiO" || team.some(p => p.name === v)).default("ABBiO"),
  coverImage: assetPath.default(null), coverAlt: z.string().trim().max(300).default(""),
  content: text(120000), featured: z.boolean().default(false),
  seoTitle: optionalText(200), seoDescription: optionalText(500), ogTitle: optionalText(200), ogDescription: optionalText(500),
  ogImage: assetPath.default(null),
  relatedServices: references(services.map(s => s.slug)), relatedCases: references(caseIndex.map(c => c.slug)),
  relatedArticles: references(),
}).strict();
export const createSchema = articleInputSchema.extend({ slug: slugSchema, status: z.literal("draft").default("draft") });
export const updateSchema = articleInputSchema.partial().extend({ expectedRevision: z.number().int().positive() }).strict();
export const publishSchema = z.object({
  expectedRevision: z.number().int().positive(), publishedAt: z.string().datetime({ offset: true }).optional(),
}).strict();
export const unpublishSchema = z.object({ expectedRevision: z.number().int().positive() }).strict();
export function parseInput<T>(schema: z.ZodType<T>, input: unknown): T {
  const result = schema.safeParse(input);
  if (!result.success) throw new ArticleError("invalid_fields", 422);
  return result.data;
}

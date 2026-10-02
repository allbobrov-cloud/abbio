import "server-only";
import { randomUUID } from "node:crypto";
import type { PoolClient } from "pg";
import { articlePool } from "./db";
import { ArticleError, articleInputSchema, parseInput } from "./schema";
import { analyseMarkdown } from "./markdown";
import type { Article, ArticleInput, ArticleSummary, ArticleCategory } from "./types";

type Row = { id: string; slug: string; status: "draft" | "published"; revision: number; published_revision: number | null; published_at: Date | null; updated_at: Date; reading_time: number; data: ArticleInput };
const publicSelect = `SELECT a.id, a.slug, a.status, r.revision, a.published_revision, a.published_at,
  a.public_updated_at AS updated_at, r.reading_time, r.data
  FROM abbio_editorial.articles a JOIN abbio_editorial.article_revisions r
  ON r.article_id=a.id AND r.revision=a.published_revision WHERE a.status='published'`;
function article(row: Row): Article {
  return { ...row.data, id: row.id, slug: row.slug, status: row.status, revision: row.revision, publishedRevision: row.published_revision, publishedAt: row.published_at?.toISOString() ?? null, updatedAt: row.updated_at.toISOString(), readingTime: row.reading_time };
}
function summary(row: Row): ArticleSummary { const value = article(row); const { content: _content, ...rest } = value; void _content; return rest; }
export function articlesConfigured() { return Boolean(process.env.DATABASE_URL); }
export async function articleImageSizes(paths: string[]) {
  if (!paths.length) return {} as Record<string, { width: number; height: number }>;
  const ids = [...new Set(paths)].map(p => p.split("/").at(-1)!.replace(".webp", ""));
  const result = await articlePool().query("SELECT id,width,height FROM abbio_editorial.article_assets WHERE id=ANY($1::uuid[])", [ids]);
  return Object.fromEntries(result.rows.map(r => [`/media/articles/${r.id}.webp`, { width: r.width as number, height: r.height as number }]));
}
export async function listPublished(category?: ArticleCategory, page = 1) {
  if (!articlesConfigured()) return { items: [] as ArticleSummary[], total: 0 };
  const where = category ? " AND r.data->>'category'=$1" : "";
  const args: unknown[] = category ? [category] : [];
  const total = await articlePool().query(`SELECT count(*) FROM (${publicSelect}${where}) listed`, args);
  const items = await articlePool().query(`${publicSelect.replace("r.data\n", "r.data - 'content' AS data\n")}${where}
    ORDER BY (r.data->>'featured')::boolean DESC, a.published_at DESC, a.id LIMIT 12 OFFSET $${args.length + 1}`, [...args, (page - 1) * 12]);
  return { items: items.rows.map(summary), total: Number(total.rows[0].count) };
}
export async function getPublished(slug: string): Promise<Article | null> {
  if (!articlesConfigured()) return null;
  const result = await articlePool().query(`${publicSelect} AND a.slug=$1`, [slug]);
  return result.rows[0] ? article(result.rows[0]) : null;
}
export async function publishedSitemap() {
  if (!articlesConfigured()) return [] as { slug: string; updatedAt: Date }[];
  const rows = await articlePool().query("SELECT slug, public_updated_at FROM abbio_editorial.articles WHERE status='published' ORDER BY slug");
  return rows.rows.map(row => ({ slug: row.slug as string, updatedAt: row.public_updated_at as Date }));
}
export async function relatedPublished(current: Article) {
  const rows = await articlePool().query(`${publicSelect.replace("r.data\n", "r.data - 'content' AS data\n")} AND a.id<>$1
    ORDER BY (a.slug=ANY($2::text[])) DESC, (r.data->>'category'=$3) DESC,
    (SELECT count(*) FROM jsonb_array_elements_text(r.data->'tags') t WHERE t=ANY($4::text[])) DESC,
    a.published_at DESC LIMIT 3`, [current.id, current.relatedArticles, current.category, current.tags]);
  return rows.rows.map(summary);
}
export async function getWorking(id: string, client?: PoolClient): Promise<Article | null> {
  const db = client ?? articlePool();
  const rows = await db.query(`SELECT a.id, a.slug, a.status, r.revision, a.published_revision, a.published_at, r.created_at AS updated_at, r.reading_time, r.data
    FROM abbio_editorial.articles a JOIN abbio_editorial.article_revisions r ON r.article_id=a.id AND r.revision=a.latest_revision WHERE a.id=$1`, [id]);
  return rows.rows[0] ? article(rows.rows[0]) : null;
}
async function validateReferences(client: PoolClient, data: ArticleInput, ownSlug?: string) {
  const analysis = analyseMarkdown(data.content);
  const paths = [...new Set([...analysis.images, data.coverImage, data.ogImage].filter((v): v is string => Boolean(v)))];
  const ids = paths.map(p => p.split("/").at(-1)!.replace(".webp", ""));
  if (ids.length) {
    const result = await client.query("SELECT id FROM abbio_editorial.article_assets WHERE id=ANY($1::uuid[])", [ids]);
    if (result.rows.length !== ids.length) throw new ArticleError("asset_not_found", 422);
  }
  if (ownSlug && data.relatedArticles.includes(ownSlug)) throw new ArticleError("self_reference", 422);
  if (data.relatedArticles.length) {
    const result = await client.query("SELECT slug FROM abbio_editorial.articles WHERE slug=ANY($1::text[])", [data.relatedArticles]);
    if (result.rows.length !== data.relatedArticles.length) throw new ArticleError("related_article_not_found", 422);
  }
  return analysis;
}
export async function createArticle(client: PoolClient, slug: string, input: ArticleInput) {
  const data = parseInput(articleInputSchema, input);
  const analysis = await validateReferences(client, data, slug);
  const existing = await client.query("SELECT id FROM abbio_editorial.articles WHERE slug=$1", [slug]);
  if (existing.rowCount) throw new ArticleError("slug_conflict", 409);
  const id = randomUUID();
  await client.query("INSERT INTO abbio_editorial.articles(id,slug) VALUES($1,$2)", [id, slug]);
  await client.query("INSERT INTO abbio_editorial.article_revisions(article_id,revision,data,reading_time) VALUES($1,1,$2,$3)", [id, JSON.stringify(data), analysis.readingTime]);
  return (await getWorking(id, client))!;
}
async function lockArticle(client: PoolClient, id: string, expected: number) {
  const result = await client.query("SELECT * FROM abbio_editorial.articles WHERE id=$1 FOR UPDATE", [id]);
  if (!result.rowCount) throw new ArticleError("article_not_found", 404);
  if (result.rows[0].latest_revision !== expected) throw new ArticleError("revision_conflict", 409);
  return result.rows[0];
}
export async function updateArticle(client: PoolClient, id: string, expected: number, patch: Partial<ArticleInput>) {
  await lockArticle(client, id, expected);
  const current = (await getWorking(id, client))!;
  const { id: _id, slug, status: _status, revision: _revision, publishedRevision: _publicRevision, publishedAt: _published, updatedAt: _updated, readingTime: _reading, ...oldData } = current;
  void _id; void _status; void _revision; void _publicRevision; void _published; void _updated; void _reading;
  const data = parseInput(articleInputSchema, { ...oldData, ...patch });
  const analysis = await validateReferences(client, data, slug);
  const revision = expected + 1;
  await client.query("INSERT INTO abbio_editorial.article_revisions(article_id,revision,data,reading_time) VALUES($1,$2,$3,$4)", [id, revision, JSON.stringify(data), analysis.readingTime]);
  await client.query("UPDATE abbio_editorial.articles SET latest_revision=$2 WHERE id=$1", [id, revision]);
  return (await getWorking(id, client))!;
}
export async function publishArticle(client: PoolClient, id: string, expected: number, publishedAt?: string) {
  const locked = await lockArticle(client, id, expected);
  if (locked.status === "published" && locked.published_revision === expected) return (await getWorking(id, client))!;
  const current = (await getWorking(id, client))!;
  if (!current.coverImage || !current.coverAlt.trim()) throw new ArticleError("cover_required_for_publication", 422);
  await validateReferences(client, current, current.slug);
  if (publishedAt && new Date(publishedAt).getTime() > Date.now()) throw new ArticleError("future_publication_not_allowed", 422);
  if (publishedAt && locked.published_at && new Date(publishedAt).getTime() !== locked.published_at.getTime()) throw new ArticleError("published_date_is_immutable", 422);
  const duplicateTitle = await client.query(`${publicSelect} AND a.id<>$1 AND COALESCE(r.data->>'seoTitle',r.data->>'title')=$2`, [id, current.seoTitle ?? current.title]);
  if (duplicateTitle.rowCount) throw new ArticleError("seo_title_conflict", 409);
  await client.query("UPDATE abbio_editorial.articles SET status='published',published_revision=$2,published_at=COALESCE(published_at,$3::timestamptz,now()),public_updated_at=now(),public_title=$4 WHERE id=$1", [id, expected, publishedAt ?? null, current.seoTitle ?? current.title]);
  return (await getWorking(id, client))!;
}
export async function unpublishArticle(client: PoolClient, id: string, expected: number) {
  await lockArticle(client, id, expected);
  await client.query("UPDATE abbio_editorial.articles SET status='draft' WHERE id=$1", [id]);
  return (await getWorking(id, client))!;
}

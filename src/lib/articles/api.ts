import "server-only";
import { revalidateArticles } from "./revalidate";
import { createHash, timingSafeEqual } from "node:crypto";
import { after, NextResponse } from "next/server";
import type { PoolClient } from "pg";
import { articleTransaction } from "./db";
import { ArticleError } from "./schema";
import { flushIndexNow, indexNowEnabled } from "./indexnow";

export function apiJson(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" } });
}
export function authorizeArticles(request: Request) {
  const token = process.env.ARTICLES_API_TOKEN;
  if (!token || token.length < 32) throw new ArticleError("api_not_configured", 503);
  const provided = request.headers.get("authorization") ?? "";
  const hash = (value: string) => createHash("sha256").update(value).digest();
  if (!timingSafeEqual(hash(provided), hash(`Bearer ${token}`))) throw new ArticleError("unauthorized", 401);
}
export function checkArticleId(id: string) {
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) throw new ArticleError("article_not_found", 404);
}
export async function readArticleJson(request: Request) {
  if (!request.headers.get("content-type")?.startsWith("application/json")) throw new ArticleError("invalid_content_type", 415);
  const limit = 200000;
  if (Number(request.headers.get("content-length")) > limit) throw new ArticleError("request_too_large", 413);
  const reader = request.body?.getReader();
  if (!reader) throw new ArticleError("invalid_json", 400);
  const chunks: Uint8Array[] = []; let length = 0;
  while (true) { const { done, value } = await reader.read(); if (done) break; length += value.length; if (length > limit) { await reader.cancel(); throw new ArticleError("request_too_large", 413); } chunks.push(value); }
  try { return JSON.parse(Buffer.concat(chunks).toString("utf8")) as unknown; } catch { throw new ArticleError("invalid_json", 400); }
}
export async function mutateArticles(request: Request, payload: unknown, fn: (client: PoolClient) => Promise<unknown>, status = 200) {
  const key = request.headers.get("idempotency-key");
  if (!key || !/^[A-Za-z0-9:_-]{8,128}$/.test(key)) throw new ArticleError("idempotency_key_required", 400);
  const fingerprint = createHash("sha256").update(`${request.method}:${new URL(request.url).pathname}:${JSON.stringify(payload)}`).digest("hex");
  const response = await articleTransaction(async client => {
    await client.query("SELECT pg_advisory_xact_lock(hashtext($1))", [key]);
    const previous = await client.query("SELECT fingerprint,response FROM abbio_editorial.api_operations WHERE key=$1", [key]);
    if (previous.rowCount) {
      if (previous.rows[0].fingerprint !== fingerprint) throw new ArticleError("idempotency_conflict", 409);
      return previous.rows[0].response;
    }
    const result = await fn(client);
    const saved = { data: result, status };
    await client.query("INSERT INTO abbio_editorial.api_operations(key,fingerprint,response) VALUES($1,$2,$3)", [key, fingerprint, JSON.stringify(saved)]);
    return saved;
  });
  // Публичные страницы статей кэшируются — после записи сбрасываем кэш.
  if (request.method !== "GET") revalidateArticles();
  if (indexNowEnabled()) after(flushIndexNow);
  return apiJson(response.data, response.status);
}
export async function articleApi(fn: () => Promise<Response>) {
  try { return await fn(); }
  catch (error) {
    if (error instanceof ArticleError) return apiJson({ error: { code: error.code } }, error.status);
    if (error && typeof error === "object" && "code" in error && error.code === "23505") return apiJson({ error: { code: "constraint" in error && error.constraint === "articles_public_title" ? "seo_title_conflict" : "slug_conflict" } }, 409);
    console.error("Articles API operation failed.");
    return apiJson({ error: { code: "articles_unavailable" } }, 503);
  }
}

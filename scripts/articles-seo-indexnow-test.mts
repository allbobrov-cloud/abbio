import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import sharp from "sharp";
import { articlePool, articleTransaction } from "../src/lib/articles/db";
import { deliverIndexNowBatch, indexNowEnabled } from "../src/lib/articles/indexnow";
import { articleCoverAlt, seoSummary } from "../src/lib/articles/seo";

const base = process.env.SITE_TEST_URL ?? "http://127.0.0.1:3163";
if (!["localhost", "127.0.0.1"].includes(new URL(base).hostname) || !["localhost", "127.0.0.1"].includes(new URL(process.env.DATABASE_URL!).hostname)) throw Error("Isolated local site/database required.");
const token = process.env.ARTICLES_API_TOKEN!;
const source = `rec${randomUUID().replaceAll("-", "").slice(0,14)}`;
const key = `seo-${source}`;
const title = `Как проверить сайт перед публикацией ${source}`;
const description = "Проверяем понятный путь пользователя от первого интереса к обращению. Находим проблемы в навигации и исправляем их до запуска. " + "Дополнительный текст. ".repeat(15);
const png = await sharp({ create: { width: 120, height: 80, channels: 3, background: "#473266" } }).png().toBuffer();
async function request(path: string, method = "GET", body?: unknown, operation = randomUUID(), expected = 200) {
  const response = await fetch(base + path, { method, headers: { Authorization: `Bearer ${token}`, ...(body ? { "Content-Type": "application/json", "Idempotency-Key": operation } : {}) }, ...(body ? { body: JSON.stringify(body) } : {}) });
  assert.equal(response.status, expected, await response.clone().text());
  return response.json();
}
async function importArticle() {
  const form = new FormData();
  for (const [name,value] of Object.entries({ NAME: title, DETAIL_TEXT: `<h1>${title}</h1><p>${description}</p><h2>Следующий шаг</h2><p>Проверьте страницу сайта.</p>`, SOURCE_ID: source, TOPIC: "Сайты", IMAGE_ALT: "kak-proverit-sayt-pered-publikaciey", PREVIEW_PICTURE: `data:image/png;base64,${png.toString("base64")}` })) form.set(name,value);
  const response = await fetch(base + "/api/blog/articles", { method: "POST", headers: { Authorization: `Bearer ${token}`, "Idempotency-Key": key }, body: form });
  assert.equal(response.status, 201, await response.clone().text());
  return response.json();
}
const db = articlePool();
const pending = async () => Number((await db.query("SELECT count(*) FROM abbio_editorial.indexnow_outbox WHERE delivered_at IS NULL")).rows[0].count);
try {
  assert.equal(indexNowEnabled(), false);
  const before = await pending();
  const article = await importArticle();
  assert.equal(await pending(), before + 2);
  assert.equal((await importArticle()).id, article.id);
  assert.equal(await pending(), before + 2, "Idempotent replay must not queue duplicate events");
  assert.equal((await request(`/api/articles?slug=${article.slug}`)).id, article.id);
  await request(`/api/articles/${article.id}/publish`, "POST", { expectedRevision: 1 });
  assert.equal(await pending(), before + 2, "Unchanged public revision must not notify");
  const html = await (await fetch(base + article.url, { headers: { "User-Agent": "Googlebot" } })).text();
  const head = html.split("</head>")[0];
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  assert.ok(head.includes(`<title>${title} | ABBiO</title>`));
  assert.ok(head.includes(`content="${seoSummary(description)}"`));
  assert.ok(head.includes(`href="https://abbio.ru${article.url}"`));
  assert.ok(head.includes('property="og:image:width" content="120"'));
  assert.ok(head.includes('property="og:image:height" content="80"'));
  assert.ok(head.includes('content="index, follow"'));
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map(match => JSON.parse(match[1]));
  const posting = schemas.find(schema => schema["@type"] === "BlogPosting");
  assert.equal(posting.headline, title);
  assert.equal(posting.description, seoSummary(description));
  assert.equal(posting.articleSection, "Сайты");
  assert.equal(posting.url, `https://abbio.ru${article.url}`);
  assert.ok(html.includes('href="/services/websites"'));
  assert.equal(articleCoverAlt(article), title);
  await request(`/api/articles/${article.id}`, "PATCH", { expectedRevision: 1, title: `${title} — обновление` });
  assert.equal(await pending(), before + 2, "Draft edits must not notify");
  await request(`/api/articles/${article.id}/publish`, "POST", { expectedRevision: 2 });
  assert.equal(await pending(), before + 4);
  const removeKey = randomUUID();
  await request(`/api/articles/${article.id}/unpublish`, "POST", { expectedRevision: 2 }, removeKey);
  await request(`/api/articles/${article.id}/unpublish`, "POST", { expectedRevision: 2 }, removeKey);
  assert.equal(await pending(), before + 6);
  assert.equal((await fetch(base + article.url)).status, 404);
  assert.ok(!(await (await fetch(base + "/sitemap.xml")).text()).includes(article.slug));
  // Actual SQL updates and retry intervals; all network transports below are mocks.
  let calls = 0;
  const mock = (status: number) => (async (_url: unknown, init: RequestInit) => {
    calls++;
    const body = JSON.parse(String(init.body));
    assert.equal(body.host, "abbio.ru"); assert.ok(body.urlList.includes(`https://abbio.ru${article.url}`)); assert.ok(body.urlList.includes("https://abbio.ru/articles"));
    assert.equal(body.keyLocation, `https://abbio.ru/${body.key}.txt`);
    return new Response(null, { status });
  }) as typeof fetch;
  await articleTransaction(client => deliverIndexNowBatch(client, mock(429)));
  assert.equal(await pending(), before + 6);
  assert.ok((await db.query("SELECT bool_and(attempts=1 AND next_attempt_at>now() AND last_status=429) AS ok FROM abbio_editorial.indexnow_outbox WHERE delivered_at IS NULL")).rows[0].ok);
  await articleTransaction(client => deliverIndexNowBatch(client, mock(200)));
  assert.equal(calls, 1, "Backoff must suppress immediate resubmission");
  await db.query("UPDATE abbio_editorial.indexnow_outbox SET next_attempt_at=now() WHERE delivered_at IS NULL");
  await articleTransaction(client => deliverIndexNowBatch(client, (async () => { throw Error("mock timeout"); }) as typeof fetch));
  assert.equal(await pending(), before + 6);
  await db.query("UPDATE abbio_editorial.indexnow_outbox SET next_attempt_at=now() WHERE delivered_at IS NULL");
  await articleTransaction(client => deliverIndexNowBatch(client, mock(202)));
  assert.equal(await pending(), 0);
  console.log("PASS: server-rendered SEO, single H1, private slug lookup, publication lifecycle, durable IndexNow queue, idempotency, HTTP429/network retry and accepted delivery. No test URLs submitted externally.");
} finally { await db.end(); }


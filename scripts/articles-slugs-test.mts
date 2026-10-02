import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import sharp from "sharp";
import { articlePool } from "../src/lib/articles/db";
import { migrateArticles } from "../src/lib/articles/migrate";

const base = process.env.SITE_TEST_URL ?? "http://127.0.0.1:3163";
if (!["127.0.0.1","localhost"].includes(new URL(base).hostname) || !["127.0.0.1","localhost"].includes(new URL(process.env.DATABASE_URL!).hostname)) throw Error("Local isolated site/database required.");
const token = process.env.ARTICLES_API_TOKEN!;
const run = randomUUID().slice(0,8);
const source = () => "rec" + randomUUID().replaceAll("-", "").slice(0,14);
const png = await sharp({create:{width:120,height:80,channels:3,background:"#473266"}}).png().toBuffer();
async function api(path: string, body: unknown, key = randomUUID(), status = 200) {
  const response = await fetch(base+path,{method:"POST",headers:{Authorization:`Bearer ${token}`,"Content-Type":"application/json","Idempotency-Key":key},body:JSON.stringify(body)});
  assert.equal(response.status,status,await response.clone().text()); return response.json();
}
async function imported(title: string, sourceId: string, key: string, status=201) {
  const form = new FormData();
  for(const [k,v] of Object.entries({NAME:title,SOURCE_ID:sourceId,DETAIL_TEXT:"<p>Проверка читаемого адреса статьи и сохранения старых ссылок.</p><h2>Проверка</h2><p>Тестовые данные.</p>",PREVIEW_PICTURE:`data:image/png;base64,${png.toString("base64")}`})) form.set(k,v);
  const response=await fetch(base+"/api/blog/articles",{method:"POST",headers:{Authorization:`Bearer ${token}`,"Idempotency-Key":key},body:form});
  assert.equal(response.status,status,await response.clone().text());return response.json();
}
const db=articlePool();
try {
  const firstSource=source(), secondSource=source(), firstKey=randomUUID();
  const first=await imported(`Проверка: адрес ${run}`,firstSource,firstKey);
  assert.ok(!first.slug.includes(firstSource.toLowerCase()));
  const second=await imported(`Проверка — адрес ${run}`,secondSource,randomUUID());
  assert.equal(second.slug,first.slug+"-2");
  assert.equal((await imported(`Проверка: адрес ${run}`,firstSource,firstKey)).id,first.id);
  assert.equal((await imported(`Проверка: адрес ${run}`,firstSource,randomUUID(),409)).error.code,"source_conflict");
  const stem=`migration-${run}`, oldSlug=`${stem}-${source().toLowerCase()}`, createKey=randomUUID();
  const data={title:`Миграция адреса ${run}`,description:"Проверка переноса URL без изменения содержимого статьи.",excerpt:"Локальная проверка.",category:"websites",coverImage:first.coverImage,coverAlt:"Тестовая обложка",content:"## Проверка\n\nЛокальные тестовые данные."};
  await api("/api/articles",{...data,slug:stem,title:`Зарезервированный адрес ${run}`},randomUUID(),201);
  const legacy=await api("/api/articles",{...data,slug:oldSlug},createKey,201);
  await api(`/api/articles/${legacy.id}/publish`,{expectedRevision:1});
  const tombstoneSlug=`deleted-${run}-${source().toLowerCase()}`;
  const tombstone=await api("/api/articles",{...data,slug:tombstoneSlug,title:`Удалённая статья ${run}`},randomUUID(),201);
  await migrateArticles();
  const once=await db.query("SELECT slug,source_id FROM abbio_editorial.articles WHERE id=$1",[legacy.id]);
  assert.equal(once.rows[0].slug,stem+"-2");
  assert.equal(once.rows[0].source_id,oldSlug.slice(-17));
  assert.equal((await api("/api/articles",{...data,slug:oldSlug},createKey,201)).slug,stem+"-2");
  const before=Number((await db.query("SELECT count(*) FROM abbio_editorial.indexnow_outbox")).rows[0].count);
  await migrateArticles();
  assert.equal(Number((await db.query("SELECT count(*) FROM abbio_editorial.indexnow_outbox")).rows[0].count),before);
  const redirect=await fetch(`${base}/articles/${oldSlug}?utm_source=test`,{redirect:"manual"});
  assert.equal(redirect.status,301);
  assert.equal(new URL(redirect.headers.get("location")!,base).pathname,`/articles/${stem}-2`);
  assert.equal(new URL(redirect.headers.get("location")!,base).search,"?utm_source=test");
  const page=await fetch(base+`/articles/${stem}-2`); assert.equal(page.status,200);
  assert.ok((await page.text()).includes(`href="https://abbio.ru/articles/${stem}-2"`));
  const sitemap=await(await fetch(base+"/sitemap.xml")).text(); assert.ok(!sitemap.includes(oldSlug)); assert.ok(sitemap.includes(stem+"-2"));
  assert.equal((await fetch(base+`/articles/${tombstoneSlug}`,{redirect:"manual"})).status,404);
  const removed=(await db.query("SELECT slug,status FROM abbio_editorial.articles WHERE id=$1",[tombstone.id])).rows[0];
  assert.equal(removed.status,"draft"); assert.equal((await fetch(base+`/articles/${removed.slug}`)).status,404);
  console.log("PASS: clean new URLs, collision suffix, source/replay protection, repeatable migration, reserved aliases, exact 301 with query string, canonical/sitemap and draft 404 preserved.");
} finally {await db.end();}

import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import sharp from 'sharp';
import pg from 'pg';

const base = process.env.SITE_TEST_URL || 'http://127.0.0.1:3162';
if (!['localhost','127.0.0.1'].includes(new URL(base).hostname) || !process.env.DATABASE_URL || !['localhost','127.0.0.1'].includes(new URL(process.env.DATABASE_URL).hostname)) throw Error('Use an isolated local test database and site.');
const token = process.env.ARTICLES_API_TOKEN;
if (!token) throw Error('Test token required.');
const db = new pg.Pool({connectionString:process.env.DATABASE_URL});
const source = () => 'rec' + randomUUID().replaceAll('-','').slice(0,14);
const src=source(), run=randomUUID().slice(0,8);
const png=await sharp({create:{width:120,height:70,channels:3,background:'#473266'}}).png().toBuffer();
const input={NAME:`Проверка совместимости Make ${run}`,DETAIL_TEXT:'<article><p>Первый абзац с &amp; и «кавычками».</p><h2>Путь до обращения</h2><p>Проверяем <strong>понятный текст</strong>.</p><h4>Практическая проверка</h4><ul><li>Первый шаг</li><li>Второй шаг</li></ul><table border="1"><caption>Проверка таблицы</caption><thead><tr><th>Шаг</th><th>Результат</th></tr></thead><tbody><tr><td>Проверка</td><td>Готово</td></tr></tbody></table></article>',PREVIEW_PICTURE:'data:;base64,'+png.toString('base64'),DETAIL_PICTURE:'',IMAGE_ALT:'Тестовая фиолетовая обложка',SOURCE_ID:src,TOPIC:'Путь до обращения — Сайты / UX'};
let checks=0;
async function call(fields=input,expected=201,key=`abbio:${src}:import:v1`,auth=true){
 const form=new FormData(); for(const [k,v]of Object.entries(fields)) form.set(k,v);
 const r=await fetch(base+'/api/blog/articles',{method:'POST',headers:{...(auth?{Authorization:`Bearer ${token}`}:{ }),'Idempotency-Key':key},body:form});
 assert.equal(r.status,expected,await r.clone().text()); assert.match(r.headers.get('x-robots-tag'),/noindex/); checks+=2; return r.json();
}
async function counts(){const r=await db.query('SELECT (SELECT count(*) FROM abbio_editorial.articles) AS articles,(SELECT count(*) FROM abbio_editorial.article_assets) AS assets');return r.rows[0];}
try {
 await call(input,401,undefined,false);
 await call({},400);
 await call({...input,SOURCE_ID:'bad'},422);
 await call({...input,DETAIL_TEXT:'<p>Текст</p><script>alert(1)</script>'},422);
 await call({...input,DETAIL_TEXT:'<p onclick="alert(1)">Текст</p>'},422);
 await call({...input,DETAIL_TEXT:'<p><a href="javascript:alert(1)">Ссылка</a></p>'},422);
 await call({...input,PREVIEW_PICTURE:'https://127.0.0.1/private'},422);
 await call({...input,PREVIEW_PICTURE:'data:image/png;base64,YmFk'},422);
 const before=await counts();
 const first=await call();
 assert.equal(first.status,'published'); assert.equal(first.publishedRevision,1); assert.equal(first.category,'websites'); assert.match(first.coverImage,/\.webp$/); assert.match(first.content,/### Практическая проверка/); assert.match(first.content,/\| Шаг\s*\| Результат/); checks+=6;
 const page=await fetch(base+first.url); assert.equal(page.status,200); const pageHtml=await page.text(); assert.match(pageHtml,/BlogPosting/); assert.match(pageHtml,/Первый абзац/); assert.match(pageHtml,/<table/);checks+=4;
 const media=await fetch(base+first.coverImage); assert.equal(media.status,200); assert.match(media.headers.get('content-type'),/image\/webp/);checks+=2;
 assert.equal((await call()).id,first.id);checks++;
 await call({...input,NAME:'Другой текст'},409);
 const after=await counts();assert.equal(Number(after.articles),Number(before.articles)+1);assert.equal(Number(after.assets),Number(before.assets)+1);checks+=2;
 // A failure during publish must roll back the new image and draft together.
 await call({...input,SOURCE_ID:source()},409,'rollback-'+randomUUID());assert.deepEqual(await counts(),after);checks++;
 const next=source(), nextInput={...input,SOURCE_ID:next,NAME:`Проверка параллельного повтора ${run}`},nextKey=`abbio:${next}:import:v1`;
 const pair=await Promise.all([call(nextInput,201,nextKey),call(nextInput,201,nextKey)]);assert.equal(pair[0].id,pair[1].id);checks++;
 const sitemap=await (await fetch(base+'/sitemap.xml')).text();assert.ok(sitemap.includes(first.slug));checks++;
 console.log(`PASS: ${checks} Make multipart import checks; only isolated local data was created.`);
} finally {await db.end();}

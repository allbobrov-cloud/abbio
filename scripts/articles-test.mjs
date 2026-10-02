import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import sharp from 'sharp';
import { writeFile, mkdir } from 'node:fs/promises';

const base = process.env.SITE_TEST_URL || 'http://127.0.0.1:3162';
if (!['localhost', '127.0.0.1'].includes(new URL(base).hostname)) throw new Error('This test only runs against a local isolated site.');
const token = process.env.ARTICLES_API_TOKEN;
if (!token) throw new Error('Set the isolated test API token.');
const run = randomUUID().slice(0, 8);
let checks = 0;
async function call(path, method, data, key = `test-${randomUUID()}`, expected = 200, auth = true) {
  const response = await fetch(new URL(path, base), { method, headers: {
    ...(auth ? { Authorization: `Bearer ${token}` } : {}),
    ...(method !== 'GET' ? { 'Content-Type': 'application/json', 'Idempotency-Key': key } : {}),
  }, ...(method !== 'GET' ? { body: JSON.stringify(data) } : {}) });
  assert.equal(response.status, expected, `${method} ${path}: ${await response.clone().text()}`);
  assert.match(response.headers.get('x-robots-tag'), /noindex/);
  checks++;
  return response.json();
}
async function html(path, status = 200) { const response = await fetch(new URL(path, base)); assert.equal(response.status, status, path); checks++; return response.text(); }
const empty = await html('/articles'); assert.match(empty, /Первый материал/); assert.match(empty, /noindex/); checks += 2;
await call('/api/articles', 'POST', {}, undefined, 401, false);
const svg = await fetch(new URL('/api/articles/assets', base), { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Idempotency-Key': `svg-${run}` }, body: '<svg></svg>' });
assert.equal(svg.status, 422); checks++;
const image = await sharp({ create: { width: 1600, height: 1000, channels: 3, background: '#75609d' } }).png().toBuffer();
const upload = async key => {
  const response = await fetch(new URL('/api/articles/assets', base), { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'image/png', 'Idempotency-Key': key }, body: image });
  assert.equal(response.status, 201, await response.clone().text()); checks++;
  return response.json();
};
const asset = await upload(`cover-${run}`); assert.equal((await upload(`cover-${run}`)).id, asset.id); checks++;
const media = await fetch(new URL(asset.url, base)); assert.equal(media.headers.get('content-type'), 'image/webp'); checks++;
const content = `## Сначала — задача\n\n**Тестовый материал для проверки шаблона.** Эти данные не являются публикацией ABBiO.\n\n## Путь до обращения\n\nПосетителю важно понять предложение, выбрать подходящее решение и увидеть следующий шаг.\n\n### Проверка отдельных состояний\n\n- Короткий пункт\n- Второй пункт с [внутренней ссылкой](/services/websites)\n\n> Цитата для проверки типографики.\n\n:::callout{tone="tip" title="На что посмотреть"}\nПроверьте, насколько понятно следующее действие.\n:::\n\n![Тестовая иллюстрация](${asset.url} "Подпись к тестовой иллюстрации")\n\n| Этап | Что проверяем | Результат | Ответственный | Примечание |\n| --- | --- | --- | --- | --- |\n| Интерес | Предложение | Понимание | Команда | Тестовое содержимое |\n\n\`\`\`json\n{ "longLine": "${'long_value_'.repeat(30)}" }\n\`\`\`\n\n[Длинная ссылка](https://example.com/${'segment-'.repeat(50)})\n\n::cta\n\n---\n\n## Что делать дальше\n\nСледующий раздел материала.`;
const input = { slug: `test-reading-${run}`, status: 'draft', title: 'Тестовый материал: как проверить путь от первого интереса к обращению и работе с заявкой', description: 'Материал для локальной проверки раздела статей. Не клиентский кейс и не редакционная публикация.', excerpt: 'Проверяем длинный заголовок, оглавление, таблицы, изображения и внутренние переходы.', category: 'websites', tags: ['UX', 'CRM'], coverImage: asset.url, coverAlt: 'Тестовая обложка', content, featured: true, relatedServices: ['websites', 'seo'], relatedCases: ['bogov', 'volhonka'] };
const key = `create-${run}`;
const first = await call('/api/articles', 'POST', input, key, 201);
assert.equal((await call('/api/articles', 'POST', input, key, 201)).id, first.id); checks++;
await call('/api/articles', 'POST', { ...input, title: 'Changed' }, key, 409);
await call('/api/articles', 'POST', input, undefined, 409);
await html(`/articles/${first.slug}`, 404);
assert.ok(!(await html('/sitemap.xml')).includes(first.slug)); checks++;
await call(`/api/articles/${first.id}/publish`, 'POST', { expectedRevision: 1, publishedAt: '2099-01-01T00:00:00Z' }, undefined, 422);
const publication = await call(`/api/articles/${first.id}/publish`, 'POST', { expectedRevision: 1 });
const publicHtml = await html(`/articles/${first.slug}`);
assert.match(publicHtml, /BlogPosting/); assert.match(publicHtml, /index, follow/); assert.match(publicHtml, /section-1/); assert.match(publicHtml, /На что посмотреть/); assert.match(publicHtml, /Есть похожая задача/); checks += 5;
assert.ok((await html('/sitemap.xml')).includes(first.slug)); checks++;
const snapshot = await call(`/api/articles/${first.id}`, 'GET'); assert.equal(snapshot.status, 'published'); checks++;
const revision = await call(`/api/articles/${first.id}`, 'PATCH', { expectedRevision: 1, title: 'Новая рабочая редакция — пока не опубликована' });
assert.equal(revision.coverImage, asset.url); assert.deepEqual(revision.tags, input.tags); checks += 2;
assert.equal(revision.revision, 2); assert.ok(!(await html(`/articles/${first.slug}`)).includes(revision.title)); checks += 2;
await call(`/api/articles/${first.id}`, 'PATCH', { expectedRevision: 1, title: 'Stale' }, undefined, 409);
await call(`/api/articles/${first.id}/publish`, 'POST', { expectedRevision: 1 }, undefined, 409);
await call(`/api/articles/${first.id}`, 'PATCH', { expectedRevision: 2, content: '<script>alert(1)</script>' }, undefined, 422);
await call(`/api/articles/${first.id}`, 'PATCH', { expectedRevision: 2, content: '## Bad\n\n[link](javascript:alert(1))' }, undefined, 422);
await call(`/api/articles/${first.id}`, 'PATCH', { expectedRevision: 2, category: 'unknown' }, undefined, 422);
await call(`/api/articles/${first.id}`, 'PATCH', { expectedRevision: 2, relatedServices: ['missing'] }, undefined, 422);
const updated = await call(`/api/articles/${first.id}/publish`, 'POST', { expectedRevision: 2 });
assert.equal(updated.publishedAt, publication.publishedAt); assert.ok((await html(`/articles/${first.slug}`)).includes(revision.title)); checks += 2;
await call(`/api/articles/${first.id}/unpublish`, 'POST', { expectedRevision: 2 });
await html(`/articles/${first.slug}`, 404); assert.ok(!(await html('/sitemap.xml')).includes(first.slug)); checks++;
await call(`/api/articles/${first.id}/publish`, 'POST', { expectedRevision: 2 });
// Restore a long headline for responsive browser checks.
const restored = await call(`/api/articles/${first.id}`, 'PATCH', { expectedRevision: 2, title: input.title });
await call(`/api/articles/${first.id}/publish`, 'POST', { expectedRevision: restored.revision });
const duplicateTitle = await call('/api/articles', 'POST', { ...input, slug: `duplicate-title-${run}` }, undefined, 201);
await call(`/api/articles/${duplicateTitle.id}/publish`, 'POST', { expectedRevision: 1 }, undefined, 409);
for (let i = 0; i < 13; i++) {
  const record = await call('/api/articles', 'POST', { ...input, slug: `test-${run}-${i}`, title: `Тестовая публикация ${i + 1}: решения и практика`, featured: false, category: i % 2 ? 'seo' : 'practice', relatedCases: [], relatedServices: [], relatedArticles: [first.slug] }, undefined, 201);
  await call(`/api/articles/${record.id}/publish`, 'POST', { expectedRevision: 1 });
}
assert.match((await html('/articles?page=2')).replace(/<!--[\s\S]*?-->/g, ''), /Страница 2 из 2/); checks++;
const filtered = await html('/articles?category=seo'); assert.match(filtered, /noindex/); assert.ok(!filtered.includes('Тестовая публикация 1:')); checks += 2;
await mkdir('output/articles', { recursive: true });
await writeFile('output/articles/test-fixture.json', JSON.stringify({ base, slug: first.slug, checks, run }, null, 2));
console.log(`PASS: ${checks} article lifecycle, validation, assets, SEO and pagination checks. Fixtures exist only in the isolated local database.`);

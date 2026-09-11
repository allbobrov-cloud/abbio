import assert from 'node:assert/strict';
const base = process.env.SITE_TEST_URL || 'http://127.0.0.1:3000';
const paths = ['/', '/services', '/services/design', '/services/websites', '/services/marketing', '/cases', '/cases/bogov', '/cases/oss', '/cases/volhonka', '/process', '/about', '/articles'];
for (const path of paths) {
  const response = await fetch(new URL(path, base));
  assert.equal(response.status, 200, `${path}: HTTP status`);
  const html = await response.text();
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${path}: single h1`);
  assert.match(html, /noindex/, `${path}: draft must not be indexed`);
  assert.match(html, /id="contacts"/, `${path}: contact destination`);
  for (const [, href] of html.matchAll(/<a\b[^>]*href="([^"]*)"/g)) {
    assert.notEqual(href, '#', `${path}: empty anchor`);
    if (href.startsWith('#')) assert.ok(html.includes(`id="${href.slice(1)}"`), `${path}: missing ${href}`);
    if (href.startsWith('/')) assert.ok(paths.includes(href), `${path}: untested route ${href}`);
    assert.ok(!href.startsWith('mailto:') && !href.startsWith('tel:') && !href.includes('t.me'), `${path}: placeholder contact must not send`);
  }
  if (path === '/') {
    assert.ok(!html.includes('digital-систем') && !html.includes('Системный маркетинг'));
    assert.ok(!html.includes('+84%') && !html.includes('+127%'));
    assert.match(html, /Портреты сгенерированы AI/);
  }
  console.log(`PASS ${path}`);
}
for (const path of ['/cases/not-a-project', '/services/not-a-service', '/not-a-page']) {
  const response = await fetch(new URL(path, base));
  assert.equal(response.status, 404, `${path}: unknown route must return 404`);
  console.log(`PASS ${path} -> 404`);
}
for (const name of ['product', 'design', 'development']) {
  const response = await fetch(new URL(`/team/${name}.png`, base));
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type'), /image/);
  console.log(`PASS portrait ${name}`);
}

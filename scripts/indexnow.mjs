import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";

const site = new URL("https://abbio.ru");
const endpoint = "https://api.indexnow.org/indexnow";
const args = process.argv.slice(2);

function fail(message) {
  console.error(message);
  process.exitCode = 1;
}

async function getKey() {
  const files = (await readdir(join(process.cwd(), "public")))
    .filter((name) => /^[a-f0-9]{32}\.txt$/.test(name));
  const matches = [];
  for (const file of files) {
    const key = (await readFile(join(process.cwd(), "public", file), "utf8")).trim();
    if (`${key}.txt` === file) matches.push(key);
  }
  if (matches.length !== 1) throw new Error("Ожидался ровно один файл ключа IndexNow в public/.");
  return matches[0];
}

function normalizeUrl(value) {
  const url = new URL(value, site);
  if (url.origin !== site.origin || url.username || url.password || url.hash) {
    throw new Error(`URL должен принадлежать ${site.origin} и не содержать фрагмент: ${value}`);
  }
  return url.toString();
}

async function getSitemapUrls() {
  const response = await fetch(new URL("/sitemap.xml", site), { signal: AbortSignal.timeout(10000) });
  if (!response.ok) throw new Error(`Не удалось получить боевой sitemap: HTTP ${response.status}`);
  const xml = await response.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => normalizeUrl(match[1]));
  if (!urls.length) throw new Error("Боевой sitemap не содержит URL.");
  return urls;
}

async function main() {
  if (!args.length || (args.includes("--all") && args.length !== 1)) {
    throw new Error("Использование: npm run indexnow -- /path [/other] или npm run indexnow -- --all");
  }

  const key = await getKey();
  const keyUrl = new URL(`/${key}.txt`, site);
  const keyResponse = await fetch(keyUrl, { signal: AbortSignal.timeout(10000) });
  if (!keyResponse.ok || (await keyResponse.text()).trim() !== key) {
    throw new Error(`Ключ ещё не опубликован на ${site.host}; сначала завершите деплой.`);
  }

  const urls = [...new Set(args[0] === "--all" ? await getSitemapUrls() : args.map(normalizeUrl))];
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: site.host, key, keyLocation: keyUrl.toString(), urlList: urls }),
    signal: AbortSignal.timeout(15000),
  });
  if (response.status !== 200 && response.status !== 202) {
    throw new Error(`IndexNow отклонил запрос: HTTP ${response.status}`);
  }
  console.log(`IndexNow принял ${urls.length} URL (HTTP ${response.status}). Это не гарантирует индексацию.`);
}

main().catch((error) => fail(error instanceof Error ? error.message : String(error)));

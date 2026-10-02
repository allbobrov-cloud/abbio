import "server-only";
import type { PoolClient } from "pg";
import { articleTransaction } from "./db";

// This is the public domain-verification key, not an API credential.
const key = "1239045b5a9543a19ee19eaa52a20d80";
const origin = "https://abbio.ru";

export function indexNowEnabled() {
  if (process.env.NODE_ENV !== "production" || process.env.INDEXNOW_ENABLED === "false") return false;
  // Local production-mode QA must never submit fixture URLs to search engines.
  const host = new URL(process.env.DATABASE_URL ?? "postgresql://localhost").hostname;
  return !["localhost", "127.0.0.1", "[::1]"].includes(host);
}

export async function queueArticleIndexNow(client: PoolClient, slug: string) {
  await client.query("INSERT INTO abbio_editorial.indexnow_outbox(path) VALUES($1),('/articles')", [`/articles/${slug}`]);
}

export async function flushIndexNow() {
  if (!indexNowEnabled()) return;
  try {
    await articleTransaction(client => deliverIndexNowBatch(client));
  } catch { console.warn("IndexNow queue temporarily unavailable; pending notifications will retry."); }
}

// Injecting transport lets isolated integration tests exercise retries without
// sending test URLs to a real search engine.
export async function deliverIndexNowBatch(client: PoolClient, transport: typeof fetch = fetch) {
      const rows = await client.query(`SELECT id,path,attempts FROM abbio_editorial.indexnow_outbox
        WHERE delivered_at IS NULL AND next_attempt_at<=now() ORDER BY id LIMIT 100 FOR UPDATE SKIP LOCKED`);
      if (!rows.rowCount) return;
      const ids = rows.rows.map(row => row.id);
      const urlList = [...new Set(rows.rows.map(row => new URL(row.path, origin).href))];
      let status: number | null = null;
      try {
        const response = await transport("https://api.indexnow.org/indexnow", {
          method: "POST", headers: { "Content-Type": "application/json; charset=utf-8" },
          body: JSON.stringify({ host: "abbio.ru", key, keyLocation: `${origin}/${key}.txt`, urlList }),
          signal: AbortSignal.timeout(8000),
        });
        status = response.status;
      } catch { /* Keep the committed publication and retry the durable notification. */ }
      if (status === 200 || status === 202) {
        await client.query("UPDATE abbio_editorial.indexnow_outbox SET delivered_at=now(),last_status=$2,attempts=attempts+1 WHERE id=ANY($1::bigint[])", [ids, status]);
        console.log(`IndexNow accepted ${urlList.length} URL(s), HTTP ${status}.`);
      } else {
        await client.query(`UPDATE abbio_editorial.indexnow_outbox SET attempts=attempts+1,last_status=$2,
          next_attempt_at=now()+make_interval(secs=>LEAST(3600,60*power(2,LEAST(attempts,6))))
          WHERE id=ANY($1::bigint[])`, [ids, status]);
        console.warn(`IndexNow notification retained for retry (${status ?? "network error"}).`);
      }
      await client.query("DELETE FROM abbio_editorial.indexnow_outbox WHERE delivered_at < now()-interval '30 days'");
}

const worker = globalThis as typeof globalThis & { abbioIndexNowTimer?: ReturnType<typeof setInterval> };
export function startIndexNowWorker() {
  if (!indexNowEnabled() || worker.abbioIndexNowTimer) return;
  void flushIndexNow();
  worker.abbioIndexNowTimer = setInterval(() => { void flushIndexNow(); }, 60000);
  worker.abbioIndexNowTimer.unref();
}

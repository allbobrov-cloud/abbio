import "server-only";
import { Pool, type PoolClient } from "pg";

const globalDb = globalThis as unknown as { abbioArticlesPool?: Pool };
export function articlePool() {
  if (!process.env.DATABASE_URL) throw new Error("articles_database_not_configured");
  if (!globalDb.abbioArticlesPool) {
    globalDb.abbioArticlesPool = new Pool({ connectionString: process.env.DATABASE_URL, max: 5, connectionTimeoutMillis: 5000, idleTimeoutMillis: 30000, statement_timeout: 10000 });
    globalDb.abbioArticlesPool.on("error", () => console.error("Articles database connection error."));
  }
  return globalDb.abbioArticlesPool;
}
export async function articleTransaction<T>(fn: (client: PoolClient) => Promise<T>): Promise<T> {
  const client = await articlePool().connect();
  try { await client.query("BEGIN"); const result = await fn(client); await client.query("COMMIT"); return result; }
  catch (error) { await client.query("ROLLBACK"); throw error; }
  finally { client.release(); }
}

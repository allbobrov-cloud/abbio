import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { Client } from "pg";

export async function migrateArticles() {
  if (!process.env.DATABASE_URL) throw new Error("Article database is not configured.");
  const client = new Client({ connectionString: process.env.DATABASE_URL, connectionTimeoutMillis: 10000 });
  try {
    await client.connect();
    await client.query("BEGIN");
    await client.query("SELECT pg_advisory_xact_lock(hashtext('abbio-editorial-migrations'))");
    await client.query(await readFile(join(process.cwd(), "migrations/articles/001_editorial.sql"), "utf8"));
    await client.query("COMMIT");
    console.log("ABBiO editorial schema ready.");
  } catch {
    await client.query("ROLLBACK").catch(() => {});
    throw new Error("Article migration failed. Check database access and schema permissions.");
  } finally {
    await client.end();
  }
}

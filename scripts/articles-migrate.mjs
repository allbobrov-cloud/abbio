import { readFile } from 'node:fs/promises';
import pg from 'pg';
import nextEnv from '@next/env';
nextEnv.loadEnvConfig(process.cwd());
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required.');
const client = new pg.Client({ connectionString: process.env.DATABASE_URL, connectionTimeoutMillis: 5000 });
try {
  await client.connect();
  await client.query('BEGIN');
  await client.query("SELECT pg_advisory_xact_lock(hashtext('abbio-editorial-migrations'))");
  await client.query(await readFile(new URL('../migrations/articles/001_editorial.sql', import.meta.url), 'utf8'));
  await client.query('COMMIT');
  console.log('ABBiO editorial schema ready. Existing application tables were not changed.');
} catch {
  await client.query('ROLLBACK').catch(() => {});
  console.error('Article migration failed. Check database access and schema permissions.');
  process.exitCode = 1;
} finally { await client.end(); }

import { NextResponse, type NextRequest } from "next/server";
import { articlePool } from "./lib/articles/db";

export async function proxy(request: NextRequest) {
  if (!process.env.DATABASE_URL || !["GET", "HEAD"].includes(request.method)) return NextResponse.next();
  const slug = request.nextUrl.pathname.slice("/articles/".length);
  // Only historical Make URLs can match an alias. Other pages skip the DB lookup.
  if (!/-rec[a-z0-9]{14}$/.test(slug)) return NextResponse.next();
  const result = await articlePool().query(`SELECT a.slug FROM abbio_editorial.article_slug_aliases old
    JOIN abbio_editorial.articles a ON a.id=old.article_id WHERE old.slug=$1 AND a.status='published'`, [slug]);
  if (!result.rowCount) return NextResponse.next();
  const target = request.nextUrl.clone();
  target.pathname = `/articles/${result.rows[0].slug}`;
  return NextResponse.redirect(target, 301);
}

export const config = { matcher: "/articles/:slug" };

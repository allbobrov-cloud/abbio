import { NextResponse, type NextRequest } from "next/server";
import { articlePool } from "./lib/articles/db";
import { isNpHost, NP_PREFIX } from "./lib/np/host";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // np.abbio.ru: раздел «Потолки Всем для бизнеса» живёт во внутреннем маршруте /np.
  if (isNpHost(request.headers.get("x-forwarded-host") ?? request.headers.get("host"))) {
    const target = request.nextUrl.clone();
    if (pathname !== NP_PREFIX && !pathname.startsWith(`${NP_PREFIX}/`)) {
      target.pathname = pathname === "/" ? NP_PREFIX : `${NP_PREFIX}${pathname}`;
    }
    const response = pathname === target.pathname ? NextResponse.next() : NextResponse.rewrite(target);
    // Раздел открывается только по ссылке: запрет индексации на каждом ответе поддомена.
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    return response;
  }

  // На основном домене внутренний маршрут раздела не открывается.
  if (pathname === NP_PREFIX || pathname.startsWith(`${NP_PREFIX}/`)) {
    const target = request.nextUrl.clone();
    target.pathname = "/__np-unavailable";
    return NextResponse.rewrite(target);
  }

  if (!pathname.startsWith("/articles/")) return NextResponse.next();
  if (!process.env.DATABASE_URL || !["GET", "HEAD"].includes(request.method)) return NextResponse.next();
  const slug = pathname.slice("/articles/".length);
  // Only historical Make URLs can match an alias. Other pages skip the DB lookup.
  if (!/-rec[a-z0-9]{14}$/.test(slug)) return NextResponse.next();
  const result = await articlePool().query(`SELECT a.slug FROM abbio_editorial.article_slug_aliases old
    JOIN abbio_editorial.articles a ON a.id=old.article_id WHERE old.slug=$1 AND a.status='published'`, [slug]);
  if (!result.rowCount) return NextResponse.next();
  const target = request.nextUrl.clone();
  target.pathname = `/articles/${result.rows[0].slug}`;
  return NextResponse.redirect(target, 301);
}

// Страницы без расширения; статика, _next, api и media идут мимо proxy.
export const config = { matcher: ["/((?!_next/|api/|media/|.*\\.[A-Za-z0-9]+$).*)"] };

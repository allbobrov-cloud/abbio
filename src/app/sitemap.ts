import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { isNpHost } from "@/lib/np/host";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { caseIndex, services } from "@/lib/content";
import { absoluteUrl, SITE_URL } from "@/lib/seo";
import { publishedSitemap } from "@/lib/articles/repository";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// The article catalog is added separately once it contains published material.
const excludedPaths = new Set(["/articles", "/found"]);

function staticPagePaths(): string[] {
  // Source folders are absent in a standalone deployment; Next ships this manifest.
  const manifest = JSON.parse(readFileSync(join(process.cwd(), ".next/server/app-paths-manifest.json"), "utf8")) as Record<string, string>;
  return Object.keys(manifest)
    .filter(path => path.endsWith("/page") && !path.split("/").some(segment => /^[\[@_]/.test(segment)))
    .map(path => path.replace(/\/page$/, "").replace(/\/\([^/]+\)/g, "") || "/");
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // На np.abbio.ru (закрытый раздел) карта сайта пустая.
  const requestHeaders = await headers();
  if (isNpHost(requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host"))) return [];
  const articles = await publishedSitemap();
  const paths = new Set([
    ...staticPagePaths(),
    ...services.map(({ slug }) => `/services/${slug}`),
    ...caseIndex.map(({ slug }) => `/cases/${slug}`),
  ]);

  const existing = [...paths]
    // /np — внутренний маршрут закрытого раздела np.abbio.ru.
    .filter((path) => !excludedPaths.has(path) && path !== "/np" && !path.startsWith("/np/"))
    .sort((a, b) => (a === "/" ? -1 : b === "/" ? 1 : a.localeCompare(b)))
    .map((path) => ({ url: path === "/" ? SITE_URL : absoluteUrl(path) }));
  return [...existing, ...(articles.length ? [{ url: absoluteUrl("/articles"), lastModified: articles.reduce((latest, item) => item.updatedAt > latest ? item.updatedAt : latest, articles[0].updatedAt) }] : []),
    ...articles.map(article => ({ url: absoluteUrl(`/articles/${article.slug}`), lastModified: article.updatedAt }))];
}

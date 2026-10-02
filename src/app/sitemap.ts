import type { MetadataRoute } from "next";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { caseIndex, services } from "@/lib/content";
import { absoluteUrl, SITE_URL } from "@/lib/seo";
import { publishedSitemap } from "@/lib/articles/repository";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// The article catalog is added separately once it contains published material.
const excludedPaths = new Set(["/articles", "/found"]);

function staticPagePaths(directory: string, segments: string[] = []): string[] {
  const paths: string[] = [];

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.isFile() && /^page\.[jt]sx?$/.test(entry.name)) {
      paths.push(`/${segments.join("/")}`);
    } else if (entry.isDirectory()) {
      // Dynamic segments are expanded from their content sources below.
      if (entry.name.startsWith("[") || entry.name.startsWith("@")) continue;
      const nextSegments = entry.name.startsWith("(") ? segments : [...segments, entry.name];
      paths.push(...staticPagePaths(join(directory, entry.name), nextSegments));
    }
  }

  return paths;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await publishedSitemap();
  const paths = new Set([
    ...staticPagePaths(join(process.cwd(), "src", "app")),
    ...services.map(({ slug }) => `/services/${slug}`),
    ...caseIndex.map(({ slug }) => `/cases/${slug}`),
  ]);

  const existing = [...paths]
    .filter((path) => !excludedPaths.has(path))
    .sort((a, b) => (a === "/" ? -1 : b === "/" ? 1 : a.localeCompare(b)))
    .map((path) => ({ url: path === "/" ? SITE_URL : absoluteUrl(path) }));
  return [...existing, ...(articles.length ? [{ url: absoluteUrl("/articles"), lastModified: articles.reduce((latest, item) => item.updatedAt > latest ? item.updatedAt : latest, articles[0].updatedAt) }] : []),
    ...articles.map(article => ({ url: absoluteUrl(`/articles/${article.slug}`), lastModified: article.updatedAt }))];
}

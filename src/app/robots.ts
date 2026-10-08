import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { absoluteUrl } from "@/lib/seo";
import { isNpHost } from "@/lib/np/host";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const requestHeaders = await headers();
  // np.abbio.ru закрыт от индексации полностью (решение владельца 09.10.2026):
  // robots.txt запрещает обход, страницы дополнительно отдают noindex в meta и X-Robots-Tag.
  if (isNpHost(requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host"))) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}

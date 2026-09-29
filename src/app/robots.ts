import type { MetadataRoute } from "next";
import { absoluteUrl, indexingEnabled } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    // Crawlers must be able to read the page-level noindex directive before launch.
    rules: { userAgent: "*", allow: "/" },
    ...(indexingEnabled ? { sitemap: absoluteUrl("/sitemap.xml") } : {}),
  };
}

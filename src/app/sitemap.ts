import type { MetadataRoute } from "next";
import { caseIndex, services } from "@/lib/content";
import { absoluteUrl, indexingEnabled } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!indexingEnabled) return [];

  const paths = [
    "/",
    "/services",
    ...services.map(({ slug }) => `/services/${slug}`),
    "/cases",
    ...caseIndex.map(({ slug }) => `/cases/${slug}`),
    "/process",
  ];

  return paths.map((path) => ({ url: absoluteUrl(path) }));
}

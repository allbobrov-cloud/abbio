import type { Metadata } from "next";

export const SITE_URL = "https://abbio.ru";

// Enable only for the production release after forms and published facts are verified.
export const indexingEnabled =
  process.env.NODE_ENV === "production" && process.env.SEO_INDEXING_ENABLED === "true";

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

export function socialMetadata(title: string, description: string): Pick<Metadata, "openGraph" | "twitter"> {
  const image = { url: "/opengraph-image", width: 1200, height: 630, alt: "ABBiO — дизайн, сайты и маркетинг" };
  return {
    openGraph: { type: "website", locale: "ru_RU", siteName: "ABBiO", title, description, images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
  };
}

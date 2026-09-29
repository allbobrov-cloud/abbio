import type { Metadata } from "next";

export const SITE_URL = "https://abbio.ru";

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

export function socialMetadata(title: string, description: string): Pick<Metadata, "openGraph" | "twitter"> {
  const image = { url: "/opengraph-image?v=2", width: 1200, height: 630, alt: "ABBiO — дизайн, сайты и маркетинг для бизнеса" };
  return {
    openGraph: { type: "website", locale: "ru_RU", siteName: "ABBiO", title, description, images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
  };
}

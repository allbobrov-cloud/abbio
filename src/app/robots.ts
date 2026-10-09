import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { absoluteUrl } from "@/lib/seo";
import { isNpHost } from "@/lib/np/host";

const AI_AND_SEARCH_BOTS = [
  "Yandex", "YandexBot", "YandexAdditional", "YandexAdditionalBot",
  "Googlebot", "Google-Extended",
  "OAI-SearchBot", "ChatGPT-User", "GPTBot",
  "PerplexityBot", "Perplexity-User",
  "ClaudeBot", "Claude-SearchBot", "Claude-User",
  "Bingbot", "Applebot", "Applebot-Extended",
];

export default async function robots(): Promise<MetadataRoute.Robots> {
  const requestHeaders = await headers();
  // np.abbio.ru закрыт от индексации полностью (решение владельца 09.10.2026):
  // robots.txt запрещает обход, страницы дополнительно отдают noindex в meta и X-Robots-Tag.
  if (isNpHost(requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host"))) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      // Явно разрешаем поисковых и ИИ-роботов: Алиса/Яндекс, Google (AI Overviews, Gemini), ChatGPT,
      // Perplexity, Claude, Bing/Copilot, Apple. Роботы с отдельной группой не читают «*», поэтому /api/ повторяем.
      { userAgent: AI_AND_SEARCH_BOTS, allow: "/", disallow: "/api/" },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}

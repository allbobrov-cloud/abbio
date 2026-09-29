import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AgencyHeader } from "@/components/AgencyHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactDialog } from "@/components/ContactDialog";
import { CookieBanner } from "@/components/CookieBanner";
import { indexingEnabled, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Агентство ABBiO — дизайн, сайты и маркетинг", template: "%s | Агентство ABBiO" },
  description:
    "Создаём дизайн и сайты, занимаемся SEO, рекламой, CRM и автоматизацией. Посмотрите проекты агентства ABBiO и обсудите свою задачу.",
  robots: { index: indexingEnabled, follow: true },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "ABBiO",
    title: "Агентство ABBiO — дизайн, сайты и маркетинг",
    description: "Создаём дизайн и сайты, занимаемся SEO, рекламой, CRM и автоматизацией.",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" data-scroll-behavior="smooth">
      <body><a className="skip-link" href="#main">Перейти к содержанию</a><AgencyHeader />{children}<SiteFooter /><ContactDialog /><CookieBanner /></body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AgencyHeader } from "@/components/AgencyHeader";
import { AgencyFooter } from "@/components/AgencySections";
import { ContactDialog } from "@/components/ContactDialog";

export const metadata: Metadata = {
  title: { default: "Агентство ABBiO — дизайн, сайты и маркетинг", template: "%s | Агентство ABBiO" },
  description:
    "Создаём дизайн и сайты, занимаемся SEO, рекламой, CRM и автоматизацией. Посмотрите проекты агентства ABBiO и обсудите свою задачу.",
  robots: { index: false, follow: false }
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
      <body><a className="skip-link" href="#main">Перейти к содержанию</a><AgencyHeader />{children}<AgencyFooter /><ContactDialog /></body>
    </html>
  );
}

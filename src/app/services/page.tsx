import type { Metadata } from "next";
import { ServicesOverviewPage } from "@/components/services/ServicesOverviewPage";
import { BreadcrumbJsonLd } from "@/components/StructuredData";
import { socialMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Услуги: дизайн, сайты и продвижение",
  description: "Услуги ABBiO: дизайн, разработка сайтов, маркетинг, SEO-продвижение и Яндекс Директ. Выберите направление или обсудите свою задачу.",
  alternates: { canonical: "/services" },
  ...socialMetadata("Услуги: дизайн, сайты и продвижение | Агентство ABBiO", "Услуги ABBiO: дизайн, разработка сайтов, маркетинг, SEO-продвижение и Яндекс Директ. Выберите направление или обсудите свою задачу."),
};

export default function Page() {
  return <><BreadcrumbJsonLd items={[{ name: "Главная", path: "/" }, { name: "Услуги", path: "/services" }]} /><ServicesOverviewPage /></>;
}

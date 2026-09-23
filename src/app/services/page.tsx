import type { Metadata } from "next";
import { ServicesOverviewPage } from "@/components/services/ServicesOverviewPage";

export const metadata: Metadata = {
  title: "Услуги: дизайн, сайты и продвижение",
  description: "Услуги ABBiO: дизайн, разработка сайтов, маркетинг, SEO-продвижение и Яндекс Директ. Выберите направление или обсудите свою задачу.",
};

export default function Page() {
  return <ServicesOverviewPage />;
}

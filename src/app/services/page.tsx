import type { Metadata } from "next";
import { ServicesOverviewPage } from "@/components/services/ServicesOverviewPage";

export const metadata: Metadata = {
  title: "Услуги для бизнеса",
  description: "Дизайн, разработка сайтов и маркетинг для бизнес-задач — выберите направление или свяжите несколько работ.",
};

export default function Page() {
  return <ServicesOverviewPage />;
}

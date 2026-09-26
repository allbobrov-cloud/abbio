import type { Metadata } from "next";
import { ProflineHero } from "@/components/cases/ProflineHero";
import { ProflineGrowth } from "@/components/cases/ProflineGrowth";
import { ProflineCatalog } from "@/components/cases/ProflineCatalog";
import { ProflineFresh } from "@/components/cases/ProflineFresh";
import { ProflineChoice } from "@/components/cases/ProflineChoice";
import { ProflineSeo } from "@/components/cases/ProflineSeo";
import { ProflineNext } from "@/components/cases/ProflineNext";
import { ProflineResult } from "@/components/cases/ProflineResult";

export const metadata: Metadata = {
  title: { absolute: "ПрофЛайн — кейс разработки и SEO | ABBiO" },
  description:
    "Как специализированный сайт по профнастилу вырос в каталог кровельных, фасадных материалов, сэндвич-панелей и решений для ограждений. Кейс ABBiO.",
};

export default function Page() {
  return (
    <main id="main">
      <ProflineHero />
      <ProflineGrowth />
      <ProflineCatalog />
      <ProflineFresh />
      <ProflineChoice />
      <ProflineSeo />
      <ProflineNext />
      <ProflineResult />
    </main>
  );
}

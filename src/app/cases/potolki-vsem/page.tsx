import type { Metadata } from "next";
import { PotolkiHero } from "@/components/cases/PotolkiHero";
import { PotolkiApproach } from "@/components/cases/PotolkiApproach";
import { PotolkiChoice } from "@/components/cases/PotolkiChoice";
import { PotolkiObjects } from "@/components/cases/PotolkiObjects";
import { PotolkiSeo } from "@/components/cases/PotolkiSeo";
import { PotolkiResults } from "@/components/cases/PotolkiResults";
import { PotolkiBusiness } from "@/components/cases/PotolkiBusiness";
import { PotolkiFuture } from "@/components/cases/PotolkiFuture";
import { PotolkiResult } from "@/components/cases/PotolkiResult";

export const metadata: Metadata = {
  title: { absolute: "Потолки Всем — кейс: многостраничный сайт под органический поиск | ABBiO" },
  description:
    "Вместо лендинга под рекламу — многостраничный сайт натяжных потолков с реальными объектами, ценами и подбором решений. Кейс ABBiO.",
};

export default function Page() {
  return (
    <main id="main">
      <PotolkiHero />
      <PotolkiApproach />
      <PotolkiChoice />
      <PotolkiObjects />
      <PotolkiSeo />
      <PotolkiResults />
      <PotolkiBusiness />
      <PotolkiFuture />
      <PotolkiResult />
    </main>
  );
}

import type { Metadata } from "next";
import { StroybazaHero } from "@/components/cases/StroybazaHero";
import { StroybazaCatalog } from "@/components/cases/StroybazaCatalog";
import { StroybazaParameters } from "@/components/cases/StroybazaParameters";
import { StroybazaProduct } from "@/components/cases/StroybazaProduct";
import { StroybazaTasks } from "@/components/cases/StroybazaTasks";
import { StroybazaCalculator } from "@/components/cases/StroybazaCalculator";
import { StroybazaLogistics } from "@/components/cases/StroybazaLogistics";
import { StroybazaResults } from "@/components/cases/StroybazaResults";
import { BreadcrumbJsonLd } from "@/components/StructuredData";
import { socialMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Стройбаза Волхонка — каталог, расчёт и доставка | ABBiO" },
  description: "Каталог стройматериалов, расчёт и доставка в одном интерфейсе. Кейс ABBiO о Стройбазе Волхонка.",
  alternates: { canonical: "/cases/stroybaza-volhonka" },
  ...socialMetadata("Стройбаза Волхонка — каталог, расчёт и доставка | ABBiO", "Каталог стройматериалов, расчёт и доставка в одном интерфейсе. Кейс ABBiO о Стройбазе Волхонка."),
};

export default function Page() {
  return <main id="main"><BreadcrumbJsonLd items={[{ name: "Главная", path: "/" }, { name: "Кейсы", path: "/cases" }, { name: "Стройбаза Волхонка", path: "/cases/stroybaza-volhonka" }]} /><StroybazaHero /><StroybazaCatalog /><StroybazaParameters /><StroybazaProduct /><StroybazaTasks /><StroybazaCalculator /><StroybazaLogistics /><StroybazaResults /></main>;
}

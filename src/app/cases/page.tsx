import { CasesIndex } from "@/components/cases/CasesIndex";
import { BreadcrumbJsonLd } from "@/components/StructuredData";
import { socialMetadata } from "@/lib/seo";
export const metadata = { title: "Кейсы", description: "Проекты ABBiO: Мотошкола Владимира Богова, ОборонСпецСплав, Металлобаза Волхонка, ПрофЛайн, Потолки Всем и Стройбаза Волхонка.", alternates: { canonical: "/cases" }, ...socialMetadata("Кейсы | Агентство ABBiO", "Проекты ABBiO: сайты, дизайн, SEO и работа с обращениями для разных задач бизнеса.") };
export default function Page() { return <main id="main"><BreadcrumbJsonLd items={[{ name: "Главная", path: "/" }, { name: "Кейсы", path: "/cases" }]} /><CasesIndex /></main>; }

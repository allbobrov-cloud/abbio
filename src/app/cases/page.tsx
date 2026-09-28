import { CasesHero } from "@/components/cases/CasesHero";
import { CasesShowcase } from "@/components/cases/CasesShowcase";
export const metadata = { title: "Кейсы", description: "Проекты ABBiO: Мотошкола Владимира Богова, ОборонСпецСплав, Металлобаза Волхонка и Стройбаза Волхонка." };
export default function Page() { return <main id="main"><CasesHero /><CasesShowcase /></main>; }

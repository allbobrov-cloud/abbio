import { CasesHero } from "@/components/cases/CasesHero";
import { CasesShowcase } from "@/components/cases/CasesShowcase";
export const metadata = { title: "Кейсы", description: "Проекты ABBiO: сайт Мотошколы Владимира Богова, каталог ОборонСпецСплав и Металлобаза Волхонка." };
export default function Page() { return <main id="main"><CasesHero /><CasesShowcase /></main>; }

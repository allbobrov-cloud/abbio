import { CasesBlock } from "@/components/cases/CasesBlock";
import { ProcessHero } from "@/components/process/ProcessHero";
import { ProcessExplorer } from "@/components/process/ProcessExplorer";
import { ProcessTransparency } from "@/components/process/ProcessTransparency";
import { ProcessStart } from "@/components/process/ProcessStart";
import { ProcessFinal } from "@/components/process/ProcessFinal";
export const metadata = { title: "Как работаем", description: "От первого разговора до запуска: задача, согласование, разработка и передача результата." };
export default function Page() { return <main id="main"><ProcessHero /><ProcessExplorer /><ProcessTransparency /><ProcessStart /><CasesBlock id="projects" eyebrow="Проекты" title="Один подход. Разные задачи." description="Процесс понятный, но маршрут зависит от задачи: у каждого проекта свой состав работ." slugs={["volhonka", "profline", "potolki-vsem"]} /><ProcessFinal /></main>; }

import { AgencyCases } from "@/components/AgencySections";
import { PageIntro } from "@/components/PageIntro";
export const metadata = { title: "Кейсы", description: "Проекты ABB: сайт Мотошколы Владимира Богова, каталог ОборонСпецСплав и Металлобаза Волхонка." };
export default function Page() { return <main id="main"><PageIntro title="Разные задачи. Конкретные решения." label="Кейсы" description="Сайты и продвижение для бизнеса — от детской мотошколы до поставщиков промышленной продукции." /><AgencyCases overview /></main>; }

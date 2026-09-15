import { TeamSection } from "@/components/AgencySections";
import { PageIntro } from "@/components/PageIntro";
export const metadata = { title: "Об агентстве", description: "ABB.IO — команда на стыке продукта, дизайна, разработки и маркетинга." };
export default function Page() { return <main id="main"><PageIntro title="Думаем о бизнесе. Внимательны к деталям." label="Об агентстве" description="ABB.IO объединяет продуктовый подход, дизайн, разработку и маркетинг. Берёмся за задачи, где важно не только запустить, но и сделать удобно для клиента." /><TeamSection overview /></main>; }

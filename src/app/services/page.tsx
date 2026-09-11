import { AgencyServices } from "@/components/AgencySections";
import { PageIntro } from "@/components/PageIntro";
export const metadata = { title: "Услуги", description: "Дизайн, разработка сайтов, SEO, реклама, CRM и автоматизация. Выберите направление под вашу задачу." };
export default function Page() { return <main id="main"><PageIntro title="От идеи до работающего проекта." label="Услуги" description="Новый сайт, узнаваемый бренд или больше обращений — начнём с того, что нужно вашему бизнесу." /><AgencyServices overview /></main>; }

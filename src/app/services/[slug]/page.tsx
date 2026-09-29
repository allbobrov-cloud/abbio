import Link from "next/link";
import { notFound } from "next/navigation";
import { services, cases } from "@/lib/content";
import { PageIntro } from "@/components/PageIntro";
import styles from "@/components/Agency.module.css";
import { WebsitesServicePage } from "@/components/services/WebsitesServicePage";
import { MarketingServicePage } from "@/components/services/MarketingServicePage";
import { DesignServicePage } from "@/components/services/DesignServicePage";
import { SeoServicePage } from "@/components/services/SeoServicePage";
import { YandexDirectServicePage } from "@/components/services/YandexDirectServicePage";
import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/StructuredData";
import { socialMetadata } from "@/lib/seo";
export function generateStaticParams() { return services.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find(item => item.slug === slug);
  if (!service) return { title: "Услуга не найдена", robots: { index: false } };
  const descriptions: Record<string, string> = {
    websites: "Разрабатываем сайты для бизнеса: объясняем предложение, ведём посетителя к обращению и передаём заявку в CRM.",
    marketing: "Связываем спрос, каналы, страницы, обращения и CRM в понятный рабочий маршрут.",
    design: "Визуальная концепция, веб-дизайн и материалы, которые помогают ясно представить продукт.",
    seo: "Развиваем сайт под реальный поисковый спрос, связываем страницы с обращениями и снижаем зависимость от платной рекламы.",
    "yandex-direct": "Связываем объявления, посадочные страницы, обращения, CRM и отчётность в управляемый рекламный канал.",
  };
  const titles: Record<string, string> = {
    websites: "Сайты, которые приводят заявки",
    marketing: "Маркетинг для бизнеса",
    design: "Дизайн для бизнеса",
    seo: "SEO-продвижение для бизнеса",
    "yandex-direct": "Настройка Яндекс Директа для бизнеса",
  };
  return {
    title: titles[slug] ?? service.title,
    description: descriptions[slug] ?? service.description,
    alternates: { canonical: `/services/${slug}` },
    ...socialMetadata(`${titles[slug] ?? service.title} | Агентство ABBiO`, descriptions[slug] ?? service.description),
  };
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find(item => item.slug === slug);
  if (!service) notFound();
  const breadcrumb = <BreadcrumbJsonLd items={[{ name: "Главная", path: "/" }, { name: "Услуги", path: "/services" }, { name: service.title, path: `/services/${slug}` }]} />;
  if (slug === "websites") return <>{breadcrumb}<WebsitesServicePage /></>;
  if (slug === "marketing") return <>{breadcrumb}<MarketingServicePage /></>;
  if (slug === "design") return <>{breadcrumb}<DesignServicePage /></>;
  if (slug === "seo") return <>{breadcrumb}<SeoServicePage /></>;
  if (slug === "yandex-direct") return <>{breadcrumb}<YandexDirectServicePage /></>;
  const project = cases.find(item => item.slug === service.caseSlug)!;
  return <main id="main">{breadcrumb}<PageIntro title={service.title} description={service.description} parent={{ href: "/services", title: "Услуги" }} /><section className={styles.detailSection}><div className={styles.container}><div className={styles.detailGrid}><div><h2>{service.problem}</h2><p>Начинаем с вашей задачи и текущей ситуации. Выбираем нужный объём работы, а не добавляем услуги ради списка.</p><a href="#contact-dialog" data-contact-dialog className={styles.button}>Обсудить задачу <span aria-hidden="true">↗</span></a></div><div><h2>Чем можем помочь</h2><ul>{service.deliverables.map(item => <li key={item}>{item}</li>)}</ul></div></div>{slug === "marketing" && <div className={styles.detailGrid}><div><h2>Меньше ручной работы</h2><p>Автоматизируем передачу заявок в CRM, назначения ответственных, уведомления и повторяющиеся действия. Сначала разбираемся в процессе, затем выбираем инструменты.</p></div><div><h2>Понятнее путь клиента</h2><p>Связываем обращения с источниками и этапами продаж. Это помогает видеть, где теряются заявки и какие действия стоит проверить в первую очередь.</p></div></div>}<Link href={`/cases/${project.slug}`} className={styles.relatedLink}>Посмотреть проект: {project.name}<span aria-hidden="true">↗</span></Link><Link className={styles.textLink} href="/process">Как строится работа <span aria-hidden="true">→</span></Link></div></section></main>;
}

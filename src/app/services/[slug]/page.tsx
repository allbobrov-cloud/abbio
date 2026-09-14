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
export function generateStaticParams() { return services.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; if (slug === "websites") return { title: "Сайты, которые приводят заявки", description: "Разрабатываем сайты для бизнеса: объясняем предложение, ведём посетителя к обращению и передаём заявку в CRM." }; if (slug === "marketing") return { title: "Маркетинг для бизнеса", description: "Связываем спрос, каналы, страницы, обращения и CRM в понятный рабочий маршрут." }; if (slug === "design") return { title: "Дизайн для бизнеса", description: "Визуальная концепция, веб-дизайн и материалы, которые помогают ясно представить продукт." }; if (slug === "seo") return { title: "SEO-продвижение для бизнеса", description: "Развиваем сайт под реальный поисковый спрос, связываем страницы с обращениями и снижаем зависимость от платной рекламы." }; if (slug === "yandex-direct") return { title: "Настройка Яндекс Директа для бизнеса", description: "Связываем объявления, посадочные страницы, обращения, CRM и отчётность в управляемый рекламный канал." }; const service = services.find(item => item.slug === slug); return { title: service?.title || "Услуга не найдена", description: service?.description }; }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find(item => item.slug === slug);
  if (!service) notFound();
  if (slug === "websites") return <WebsitesServicePage />;
  if (slug === "marketing") return <MarketingServicePage />;
  if (slug === "design") return <DesignServicePage />;
  if (slug === "seo") return <SeoServicePage />;
  if (slug === "yandex-direct") return <YandexDirectServicePage />;
  const project = cases.find(item => item.slug === service.caseSlug)!;
  return <main id="main"><PageIntro title={service.title} description={service.description} parent={{ href: "/services", title: "Услуги" }} /><section className={styles.detailSection}><div className={styles.container}><div className={styles.detailGrid}><div><h2>{service.problem}</h2><p>Начинаем с вашей задачи и текущей ситуации. Выбираем нужный объём работы, а не добавляем услуги ради списка.</p><a href="#contact-dialog" data-contact-dialog className={styles.button}>Обсудить задачу <span aria-hidden="true">↗</span></a></div><div><h2>Чем можем помочь</h2><ul>{service.deliverables.map(item => <li key={item}>{item}</li>)}</ul></div></div>{slug === "marketing" && <div className={styles.detailGrid}><div><h2>Меньше ручной работы</h2><p>Автоматизируем передачу заявок в CRM, назначения ответственных, уведомления и повторяющиеся действия. Сначала разбираемся в процессе, затем выбираем инструменты.</p></div><div><h2>Понятнее путь клиента</h2><p>Связываем обращения с источниками и этапами продаж. Это помогает видеть, где теряются заявки и какие действия стоит проверить в первую очередь.</p></div></div>}<Link href={`/cases/${project.slug}`} className={styles.relatedLink}>Посмотреть проект: {project.name}<span aria-hidden="true">↗</span></Link><Link className={styles.textLink} href="/process">Как строится работа <span aria-hidden="true">→</span></Link></div></section></main>;
}

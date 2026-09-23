import Image from "next/image";
import Link from "next/link";
import { ActionArrow } from "@/components/ActionArrow";
import styles from "./ServicesOverviewPage.module.css";
import { CasePortfolio } from "./CasePortfolio";
import { ServicesProgressiveSystem } from "./ServicesProgressiveSystem";
import { ServicesSituationExplorer } from "./ServicesSituationExplorer";
import { ServicesHeroVisual } from "./ServicesHeroVisual";

const directions = [
  {
    slug: "websites",
    number: "01",
    title: "Сайты",
    description: "Создаём путь от первого экрана до обращения.",
    items: ["Лендинги", "Корпоративные сайты", "Каталоги", "UX/UI", "Разработка"],
    actionLabel: "Смотреть сайты",
  },
  {
    slug: "design",
    number: "02",
    title: "Дизайн",
    description: "Помогаем понятно и убедительно представить продукт.",
    items: ["Айдентика", "Web/UI", "Презентации", "Материалы для продаж"],
    actionLabel: "Смотреть дизайн",
  },
  {
    slug: "marketing",
    number: "03",
    title: "Маркетинг",
    description: "Привлекаем спрос и связываем его с результатом.",
    items: ["Контент", "CRM", "Аналитика"],
    actionLabel: "Весь маркетинг",
  },
  {
    slug: "seo",
    number: "04",
    title: "SEO-продвижение",
    description: "Развиваем сайт под реальный спрос и измеримые обращения.",
    items: ["Спрос", "Структура", "Измерение"],
    actionLabel: "Смотреть SEO",
  },
  {
    slug: "yandex-direct",
    number: "05",
    title: "Яндекс Директ",
    description: "Запускаем платный поток обращений с понятным отчётом.",
    items: ["Контекстная реклама", "CRM", "Отчётность"],
    actionLabel: "Смотреть Директ",
  },
] as const;

const directionClasses = {
  design: styles.directionDesign,
  websites: styles.directionWebsites,
  marketing: styles.directionMarketing,
  seo: styles.directionSeo,
  "yandex-direct": styles.directionDirect,
};

const marketingIconPaths = {
  search: "M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14Zm9 16-4.35-4.35",
  click: "M5 5v8m0-8 5 12 2-5 5-2-12-5Z",
  message: "M4 6h16v10H8l-4 4V6Z",
  chart: "M5 19V10m6.5 9V5m6.5 14v-7",
  layers: "M12 3 3 8l9 5 9-5-9-5Zm-9 8 9 5 9-5M3 16l9 5 9-5",
  target: "M12 3a9 9 0 1 0 .001 0ZM12 8a4 4 0 1 0 .001 0ZM12 11.2a.8.8 0 1 0 .001 0Z",
  megaphone: "M3 10v4h4l6 4V6l-6 4H3Zm13-2a4 4 0 0 1 0 8",
} as const;

function MarketingIcon({ name }: { name: keyof typeof marketingIconPaths }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d={marketingIconPaths[name]} />
    </svg>
  );
}

function DirectionVisual({ slug }: { slug: (typeof directions)[number]["slug"] }) {
  if (slug === "websites") {
    return (
      <div className={[styles.capabilityVisual, styles.websitesVisual].join(" ")} aria-hidden="true">
        <div className={styles.browserFrame}>
          <div className={styles.browserChrome}><i /><i /><i /><b /></div>
          <div className={styles.browserPage}>
            <span /><em /><strong /><div><i /><i /><i /></div>
          </div>
        </div>
        <div className={styles.wsMobile}>
          <div className={styles.wsMobileNotch} />
          <div className={styles.wsMobileScreen}><i /><i /><em /></div>
        </div>
      </div>
    );
  }

  if (slug === "design") {
    return (
      <div className={[styles.capabilityVisual, styles.designPanel].join(" ")} aria-hidden="true">
        <div className={styles.designType}>
          <strong>Aa</strong>
          <span>Inter<br /><small>Display / Text</small></span>
        </div>
        <div className={styles.designMeta}>
          <div className={styles.designSwatches}><i /><i /><i /><i /></div>
          <div className={styles.designScale}><i /><i /><i /><i /></div>
        </div>
        <div className={styles.designButton}>Button <b>→</b></div>
      </div>
    );
  }

  if (slug === "seo") {
    return (
      <div className={[styles.capabilityVisual, styles.marketingFunnel].join(" ")} aria-hidden="true">
        <div className={styles.marketingNodes}>
          <div className={styles.marketingNode}><MarketingIcon name="search" /><span>Спрос</span></div>
          <div className={styles.marketingNode}><MarketingIcon name="layers" /><span>Структура</span></div>
          <div className={styles.marketingNode}><MarketingIcon name="target" /><span>Измерение</span></div>
        </div>
      </div>
    );
  }

  if (slug === "yandex-direct") {
    return (
      <div className={[styles.capabilityVisual, styles.marketingFunnel].join(" ")} aria-hidden="true">
        <div className={styles.marketingNodes}>
          <div className={styles.marketingNode}><MarketingIcon name="megaphone" /><span>Контекстная реклама</span></div>
          <div className={styles.marketingNode}><MarketingIcon name="message" /><span>CRM</span></div>
          <div className={styles.marketingNode}><MarketingIcon name="chart" /><span>Отчётность</span></div>
        </div>
      </div>
    );
  }

  return (
    <div className={[styles.capabilityVisual, styles.marketingFunnel].join(" ")} aria-hidden="true">
      <div className={styles.marketingNodes}>
        <div className={styles.marketingNode}><MarketingIcon name="search" /><span>Поиск / реклама</span></div>
        <div className={styles.marketingNode}><MarketingIcon name="click" /><span>Переход</span></div>
        <div className={styles.marketingNode}><MarketingIcon name="message" /><span>Обращение</span></div>
        <div className={styles.marketingNode}><MarketingIcon name="chart" /><span>Аналитика</span></div>
      </div>
    </div>
  );
}

export function ServicesOverviewPage() {
  return (
    <main id="main" className={styles.page}>
      <section className={styles.hero} aria-labelledby="services-title">
        <div className={styles.container}>
          <nav className={styles.breadcrumbs} aria-label="Хлебные крошки">
            <Link href="/">Главная</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Услуги</span>
          </nav>

          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.kicker}>Услуги ABBiO</p>
              <h1 id="services-title">Сайты, дизайн и продвижение — в одной системе.</h1>
              <p>Работаем над тем, как компания выглядит, объясняет предложение, находится в поиске и получает обращения: сайтами, дизайном, маркетингом, SEO и рекламой в Яндекс Директе.</p>
              <div className={styles.heroActions}>
                <Link href="#directions" className={styles.primaryAction}>Выбрать направление <ActionArrow /></Link>
                <a href="#contact-dialog" data-contact-dialog className={styles.secondaryAction}>Обсудить задачу</a>
              </div>
            </div>

            <div className={styles.heroVisualWrap}>
              <ServicesHeroVisual />
              <span className={styles.heroVisualNote}>Схематичный пример</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.directions} id="directions" aria-labelledby="directions-title">
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <p className={styles.sectionIndex}>01 / Направления</p>
            <div>
              <h2 id="directions-title">Что можем сделать для вашего проекта.</h2>
            </div>
          </div>

          <div className={styles.directionGrid}>
            {directions.map((item) => (
              <article key={item.slug} className={[styles.direction, directionClasses[item.slug]].join(" ")}>
                <div className={styles.directionMeta}>
                  <span>{item.number}</span>
                  <p>{item.title}</p>
                </div>
                <div className={styles.directionContent}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <ul>
                    {item.items.map((entry) => <li key={entry}>{entry}</li>)}
                  </ul>
                  <div className={styles.directionActions}>
                    <Link href={`/services/${item.slug}`} className={styles.directionLink}>{item.actionLabel} <ActionArrow /></Link>
                  </div>
                </div>
                <DirectionVisual slug={item.slug} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <ServicesSituationExplorer />

      <section className={styles.finalCta} aria-labelledby="start-title">
        <div className={styles.container}>
          <div className={styles.finalPanel}>
            <Image
              className={styles.finalArtwork}
              src="/services/services-final-cta-brief-v1.png"
              alt=""
              fill
              sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1100px) calc(100vw - 64px), 1280px"
            />
            <div>
              <p className={styles.sectionIndex}>Обсудить задачу</p>
              <h2 id="start-title">Расскажите, что хотите сделать.</h2>
            </div>
            <div>
              <p>Необязательно выбирать услугу заранее. Начнём с вашей задачи и определим подходящий объём работ.</p>
              <div className={styles.finalActions}>
                <a href="#contact-dialog" data-contact-dialog className={styles.finalAction}>Обсудить задачу <ActionArrow /></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServicesProgressiveSystem />

      <CasePortfolio
        eyebrow="Кейсы"
        title="Как услуги работают вместе."
        description="В каждом проекте свой набор задач. Где-то достаточно одного направления, а где-то сайт, дизайн и продвижение работают как одна система."
        slugs={["bogov", "oss", "volhonka"]}
        featuredSlug="bogov"
        ctaLabel="Смотреть кейс"
        showServices
      />
    </main>
  );
}

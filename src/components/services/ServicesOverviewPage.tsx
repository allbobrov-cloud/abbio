import Image from "next/image";
import Link from "next/link";
import { ActionArrow } from "@/components/ActionArrow";
import styles from "./ServicesOverviewPage.module.css";
import { CasePortfolio } from "./CasePortfolio";

const directions = [
  {
    slug: "websites",
    number: "01",
    title: "Сайты",
    eyebrow: "От выбора до обращения",
    description: "Разрабатываем лендинги, корпоративные сайты и каталоги: помогаем посетителю выбрать и обратиться.",
    items: ["Структура и прототип", "Адаптивный дизайн", "Разработка и формы"],
  },
  {
    slug: "marketing",
    number: "02",
    title: "Маркетинг",
    eyebrow: "Привлечение и учёт обращений",
    description: "Связываем каналы привлечения с CRM и отчётами, чтобы было видно, откуда приходят обращения и что происходит дальше.",
    items: ["SEO и реклама", "CRM и автоматизация", "Отчётность в согласованном составе"],
  },
  {
    slug: "design",
    number: "03",
    title: "Дизайн",
    eyebrow: "Ясная подача продукта",
    description: "Создаём визуальный язык, страницы и материалы, с которыми предложение проще понять и выбрать.",
    items: ["Визуальная концепция", "Веб-дизайн", "Макеты и презентации"],
  },
  {
    slug: "seo",
    number: "04",
    title: "SEO-продвижение",
    eyebrow: "Органический поиск",
    description: "Развиваем страницы и техническую основу под поисковый спрос, чтобы сайт мог привлекать обращения без оплаты за каждый переход.",
    items: [],
    linkLabel: "Подробнее об SEO",
  },
  {
    slug: "yandex-direct",
    number: "05",
    title: "Яндекс Директ",
    eyebrow: "Контекстная реклама",
    description: "Запускаем рекламу, связываем объявления со страницами и CRM. Расходы и полученные обращения показываем в понятном отчёте.",
    items: [],
    linkLabel: "Подробнее о рекламе",
  },
] as const;

const heroDirections = directions.slice(0, 3);

const heroServices = [
  { slug: "websites", number: "01", label: "Сайты" },
  { slug: "marketing", number: "02", label: "Маркетинг" },
  { slug: "design", number: "03", label: "Дизайн" },
  { slug: "seo", number: "04", label: "SEO" },
  { slug: "yandex-direct", number: "05", label: "Яндекс Директ" },
] as const;

const situations = [
  {
    number: "01",
    title: "Предложение сложно объяснить с первого взгляда",
    text: "Поможем выделить главное и представить продукт в дизайне сайта и других материалах.",
    href: "/services/design",
  },
  {
    number: "02",
    title: "На сайте трудно найти нужное и обратиться",
    text: "Пересоберём структуру, страницы и точки обращения под задачи посетителя.",
    href: "/services/websites",
  },
  {
    number: "03",
    title: "Нужно привлекать клиентов и видеть результат",
    text: "Подберём каналы и свяжем обращения с CRM и отчётностью.",
    href: "/services/marketing",
  },
  {
    number: "04",
    title: "Запускаете новый продукт или направление",
    text: "Можно начать с дизайна, сайта или продвижения — определим, что важнее на старте.",
    href: "#formats",
  },
] as const;

const directionClasses = {
  design: styles.directionDesign,
  websites: styles.directionWebsites,
  marketing: styles.directionMarketing,
  seo: styles.directionSeo,
  "yandex-direct": styles.directionDirect,
};

function DirectionVisual({ slug }: { slug: (typeof directions)[number]["slug"] }) {
  if (slug === "design") {
    return <div className={styles.designVisual} aria-hidden="true"><span>Aa</span><i /><b /><em /></div>;
  }

  if (slug === "websites") {
    return (
      <div className={styles.websiteVisual} aria-hidden="true">
        <Image
          src="/services/services-websites-card-v1.png"
          alt=""
          fill
          sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1100px) 50vw, 42vw"
        />
      </div>
    );
  }

  if (slug === "marketing") {
    return (
      <div className={styles.marketingVisual} aria-hidden="true">
        <Image
          src="/services/services-marketing-card-v1.png"
          alt=""
          fill
          sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1100px) 50vw, 58vw"
        />
      </div>
    );
  }

  if (slug === "seo") {
    return <div className={styles.seoVisual} aria-hidden="true"><span>Поисковый спрос</span><i /><b /><b /><b /></div>;
  }

  return (
    <div className={styles.directVisual} aria-hidden="true">
      <Image
        src="/services/services-yandex-direct-card-v1.png"
        alt=""
        fill
        sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1100px) calc(100vw - 64px), 1280px"
      />
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
              <p className={styles.kicker}>Услуги ABB.IO</p>
              <h1 id="services-title">Сайты, дизайн и продвижение — в одной системе.</h1>
              <p>Работаем над тем, как компания выглядит, объясняет предложение, находится в поиске и получает обращения: сайтами, дизайном, маркетингом, SEO и рекламой в Яндекс Директе.</p>
              <div className={styles.heroActions}>
                <Link href="#directions" className={styles.primaryAction}>Выбрать направление <ActionArrow /></Link>
                <a href="#contact-dialog" data-contact-dialog className={styles.secondaryAction}>Обсудить задачу</a>
              </div>
            </div>

            <div className={styles.heroVisual} aria-label="Пять направлений работы ABB.IO связаны в одну систему">
              <Image
                src="/services/services-hero-workmap-v1.png"
                alt="Рабочая карта с центральной точкой и связанными направлениями"
                fill
                priority
                sizes="(max-width: 1100px) 42vw, 52vw"
              />
              <div className={styles.heroVisualLabels}>
                {heroServices.map((item) => (
                  <Link key={item.slug} href={`/services/${item.slug}`}>
                    <span>{item.number}</span>
                    {item.label}
                    <ActionArrow />
                  </Link>
                ))}
              </div>
            </div>

            <aside className={styles.heroMap} aria-label="Три самостоятельных направления работы ABB.IO">
              <p>Три направления работы</p>
              <ul>
                {heroDirections.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/services/${item.slug}`}>
                      <span>{item.number}</span>
                      <strong>{item.title}</strong>
                      <small>{item.eyebrow}</small>
                      <ActionArrow className={styles.heroMapArrow} />
                    </Link>
                  </li>
                ))}
              </ul>
              <p className={styles.mapNote}>Выберите одну услугу или расскажите о задаче — подскажем, с чего начать.</p>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.directions} id="directions" aria-labelledby="directions-title">
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <p className={styles.sectionIndex}>01 / Направления</p>
            <div>
              <h2 id="directions-title">Что можем сделать для вашего проекта.</h2>
              <p>Пять услуг: от дизайна и разработки сайта до привлечения клиентов и учёта обращений. Каждую можно заказать отдельно.</p>
            </div>
          </div>

          <div className={styles.directionGrid}>
            {directions.map((item) => (
              <article key={item.slug} className={[styles.direction, directionClasses[item.slug]].join(" ")}>
                <div className={styles.directionMeta}>
                  <span>{item.number}</span>
                  <p>{item.eyebrow}</p>
                </div>
                <div className={styles.directionContent}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <ul>
                    {item.items.map((entry) => <li key={entry}>{entry}</li>)}
                  </ul>
                  <Link href={`/services/${item.slug}`} className={styles.directionLink}>{"linkLabel" in item ? item.linkLabel : "Открыть направление"} <ActionArrow /></Link>
                </div>
                <DirectionVisual slug={item.slug} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.situations} aria-labelledby="situations-title">
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <p className={styles.sectionIndex}>02 / Ситуации</p>
            <div>
              <h2 id="situations-title">С какой задачей вы пришли?</h2>
              <p>Выберите похожую ситуацию и откройте направление, которое поможет с ней работать.</p>
            </div>
          </div>
          <ol className={styles.situationList}>
            {situations.map((item) => (
              <li key={item.number}>
                <span>{item.number}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
                <Link href={item.href} aria-label={`Открыть: ${item.title}`}><ActionArrow /></Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

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

      <section className={styles.formats} id="formats" aria-labelledby="formats-title">
        <div className={styles.container}>
          <div className={styles.formatsLead}>
            <p className={styles.sectionIndex}>03 / Формат</p>
            <h2 id="formats-title">Не нужно заказывать всё сразу.</h2>
          </div>
          <div className={styles.formatGrid}>
            <article className={styles.formatSingle}>
              <p>Отдельная услуга</p>
              <h3>Решим задачу, которая важна сейчас.</h3>
              <span>Например, обновим дизайн, разработаем сайт или запустим рекламное направление.</span>
            </article>
            <article className={styles.formatLinked}>
              <p>Несколько услуг</p>
              <h3>Соединим работы, если одной услуги недостаточно.</h3>
              <ul aria-label="Пример связанного маршрута">
                <li>Дизайн</li><li>Сайт</li><li>Маркетинг</li>
              </ul>
              <span>Обсудим задачу и предложим последовательность без лишних работ.</span>
            </article>
          </div>
        </div>
      </section>

      <CasePortfolio
        title="Три проекта — три разные задачи."
        description="Откройте кейс, чтобы посмотреть задачу, решение и материалы проекта."
        slugs={["bogov", "oss", "volhonka"]}
        featuredSlug="bogov"
      />
    </main>
  );
}

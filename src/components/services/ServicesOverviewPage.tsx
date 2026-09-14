import Image from "next/image";
import Link from "next/link";
import { ActionArrow } from "@/components/ActionArrow";
import { cases } from "@/lib/content";
import styles from "./ServicesOverviewPage.module.css";

const directions = [
  {
    slug: "websites",
    number: "01",
    title: "Сайты",
    eyebrow: "Когда важен путь до обращения",
    description: "Собираем сайт, в котором проще разобраться, выбрать и связаться с командой.",
    items: ["Структура и прототип", "Адаптивный дизайн", "Разработка и формы"],
  },
  {
    slug: "marketing",
    number: "02",
    title: "Маркетинг",
    eyebrow: "Когда нужен связанный маршрут",
    description: "Соединяем спрос, каналы, страницы, обращения и следующий шаг для команды.",
    items: ["SEO и реклама", "CRM и автоматизация", "Отчётность в согласованном составе"],
  },
  {
    slug: "design",
    number: "03",
    title: "Дизайн",
    eyebrow: "Когда важно впечатление",
    description: "Помогаем ясно представить продукт и собрать последовательный визуальный язык.",
    items: ["Визуальная концепция", "Веб-дизайн", "Макеты и презентации"],
  },
  {
    slug: "seo",
    number: "04",
    title: "Органический поиск как самостоятельный источник обращений.",
    eyebrow: "SEO-продвижение",
    description: "Развиваем структуру, техническую основу и содержание сайта, чтобы его находили по реальному спросу, а компания меньше зависела от платной рекламы.",
    items: [],
    linkLabel: "Подробнее об SEO",
  },
  {
    slug: "yandex-direct",
    number: "05",
    title: "Быстрый запуск обращений из Яндекс Директа.",
    eyebrow: "Контекстная реклама",
    description: "Настраиваем рекламу, связываем объявления с посадочными страницами и CRM, показываем расходы и обращения в понятном отчёте.",
    items: [],
    linkLabel: "Подробнее о рекламе",
  },
] as const;

const heroDirections = directions.slice(0, 3);

const situations = [
  {
    number: "01",
    title: "Продукт сложно объяснить или запомнить",
    text: "Нужно собрать характер, иерархию и материалы, через которые предложение будет читаться яснее.",
    href: "/services/design",
    label: "Перейти к дизайну",
  },
  {
    number: "02",
    title: "Сайт устарел или мешает выбрать",
    text: "Нужно выстроить понятную структуру, путь пользователя и точки обращения.",
    href: "/services/websites",
    label: "Перейти к сайтам",
  },
  {
    number: "03",
    title: "Предложение не находят или обращения теряются",
    text: "Нужно связать каналы привлечения, страницы, учёт обращений и работу команды.",
    href: "/services/marketing",
    label: "Перейти к маркетингу",
  },
  {
    number: "04",
    title: "Запускается новое направление",
    text: "Можно начать с одного направления, а связанные задачи собрать в общий маршрут по мере готовности.",
    href: "#formats",
    label: "Посмотреть форматы работы",
  },
] as const;

const featuredCases = [
  {
    item: cases.find((item) => item.slug === "bogov")!,
    alt: "Сайт Мотошколы Владимира Богова на экране компьютера и телефона",
    className: "bogov",
  },
  {
    item: cases.find((item) => item.slug === "oss")!,
    alt: "Каталог ОборонСпецСплава с промышленным металлопрокатом",
    className: "oss",
  },
  {
    item: cases.find((item) => item.slug === "volhonka")!,
    alt: "Сайт Металлобазы Волхонка с металлопрокатом",
    className: "volhonka",
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
    return <div className={styles.websiteVisual} aria-hidden="true"><i /><i /><i /><b /><b /><b /></div>;
  }

  if (slug === "marketing") {
    return <div className={styles.marketingVisual} aria-hidden="true"><span>Спрос</span><i /><span>Страница</span><i /><strong>Обращение</strong></div>;
  }

  if (slug === "seo") {
    return <div className={styles.seoVisual} aria-hidden="true"><span>Поисковый спрос</span><i /><b /><b /><b /></div>;
  }

  return <div className={styles.directVisual} aria-hidden="true"><span>Объявление</span><i /><span>Обращение</span><i /><strong>Отчёт</strong></div>;
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
              <p className={styles.kicker}>Направления работы ABB</p>
              <h1 id="services-title">Что должно измениться?</h1>
              <p>Впечатление от бренда, путь к обращению или привлечение клиентов — выберите направление. Если задача затрагивает несколько, соберём их в связанный маршрут.</p>
              <div className={styles.heroActions}>
                <Link href="#directions" className={styles.primaryAction}>Выбрать направление <ActionArrow /></Link>
                <a href="#contact-dialog" data-contact-dialog className={styles.secondaryAction}>Обсудить задачу</a>
              </div>
            </div>

            <aside className={styles.heroMap} aria-label="Три самостоятельных направления работы ABB">
              <p>Можно начать с одной точки</p>
              <ul>
                {heroDirections.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/services/${item.slug}`}>
                      <span>{item.number}</span>
                      <strong>{item.title}</strong>
                      <small>{item.eyebrow.replace("Когда ", "")}</small>
                      <ActionArrow />
                    </Link>
                  </li>
                ))}
              </ul>
              <p className={styles.mapNote}>Направления самостоятельны и могут дополнять друг друга, если того требует задача.</p>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.directions} id="directions" aria-labelledby="directions-title">
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <p className={styles.sectionIndex}>01 / Направления</p>
            <div>
              <h2 id="directions-title">Выберите точку, где нужна работа.</h2>
              <p>Каждое направление можно начать отдельно. Состав и последовательность работ определяем после разговора о задаче.</p>
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
              <h2 id="situations-title">Узнаёте свою задачу?</h2>
              <p>Это не диагностика и не обязательный маршрут — только быстрый способ перейти к релевантному направлению.</p>
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
                <Link href={item.href} aria-label={`${item.label}: ${item.title}`}><span>{item.label}</span><ActionArrow /></Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.formats} id="formats" aria-labelledby="formats-title">
        <div className={styles.container}>
          <div className={styles.formatsLead}>
            <p className={styles.sectionIndex}>03 / Формат</p>
            <h2 id="formats-title">Одна задача. Или несколько связанных.</h2>
          </div>
          <div className={styles.formatGrid}>
            <article className={styles.formatSingle}>
              <p>Один фокус</p>
              <h3>Начинаем с конкретной задачи.</h3>
              <span>Например: собрать визуальную концепцию, обновить сайт или организовать путь обращения.</span>
            </article>
            <article className={styles.formatLinked}>
              <p>Связанный маршрут</p>
              <h3>Соединяем направления, когда они помогают одной цели.</h3>
              <ul aria-label="Пример связанного маршрута">
                <li>Дизайн</li><li>Сайт</li><li>Маркетинг</li>
              </ul>
              <span>Не нужно выбирать весь комплекс заранее — определим нужный объём после контекста.</span>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.cases} aria-labelledby="cases-title">
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <p className={styles.sectionIndex}>04 / Проекты</p>
            <div>
              <h2 id="cases-title">Три проекта из текущей подборки.</h2>
              <p>Показываем только существующие кейсы и роль ABB в рамках зафиксированной информации.</p>
            </div>
          </div>
          <div className={styles.caseGrid}>
            {featuredCases.map(({ item, alt, className }) => (
              <article key={item.slug} className={[styles.caseCard, styles[`case${className[0].toUpperCase()}${className.slice(1)}`]].join(" ")}>
                <Link href={`/cases/${item.slug}`} className={styles.caseLink}>
                  <div className={styles.caseImage}>
                    <Image src={item.image} alt={alt} fill loading={item.slug === "bogov" ? "eager" : "lazy"} sizes="(max-width: 720px) calc(100vw - 40px), (max-width: 1080px) 48vw, 430px" />
                  </div>
                  <div className={styles.caseCopy}>
                    <p>{item.category}</p>
                    <h3>{item.name}</h3>
                    <span>{item.summary}</span>
                  </div>
                  <ActionArrow />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.finalCta} aria-labelledby="start-title">
        <div className={styles.container}>
          <div className={styles.finalPanel}>
            <div>
              <p className={styles.sectionIndex}>Первый разговор</p>
              <h2 id="start-title">Уже понятно направление?</h2>
            </div>
            <div>
              <p>Откройте нужную услугу или расскажите о ситуации — вместе определим, с чего логично начать.</p>
              <div className={styles.finalActions}>
                <Link href="#directions" className={styles.finalLink}>Выбрать услугу</Link>
                <a href="#contact-dialog" data-contact-dialog className={styles.finalAction}>Обсудить задачу <ActionArrow /></a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

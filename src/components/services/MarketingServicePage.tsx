import Image from "next/image";
import Link from "next/link";
import { ActionArrow } from "@/components/ActionArrow";
import styles from "./MarketingServicePage.module.css";
import deliverablesStyles from "./MarketingDeliverables.module.css";
import ctaStyles from "./MarketingCta.module.css";
import heroBlendStyles from "./MarketingHeroBlend.module.css";
import { CasePortfolio } from "./CasePortfolio";
import { MarketingChannelsSection } from "./MarketingChannelsSection";

const reportDemoUrl = "https://docs.google.com/spreadsheets/d/1_t_nzlVjj-NE8Lvdqqsz3XC_L0DNfjz0K1nLGFqu1Tk/edit?gid=185043878#gid=185043878";

const reportMetrics = [
  "Расходы по источникам",
  "Количество обращений",
  "Стоимость обращения",
  "Квалифицированные обращения",
  "Распределение по источникам",
  "Статусы работы",
  "Сделки — когда CRM заполняется и позволяет их учитывать",
];

const promotionPair = [
  {
    id: "seo",
    title: "SEO",
    role: "Устойчивый спрос без оплаты за переход. Развивает сайт под запросы и накапливает эффект со временем.",
    href: "/services/seo",
  },
  {
    id: "direct",
    title: "Яндекс Директ",
    role: "Быстрый запуск потока обращений. Оплата за показ или клик, результат виден сразу после старта.",
    href: "/services/yandex-direct",
  },
] as const;

const deliverables = [
  "Настроенные согласованные источники",
  "Точки обращения",
  "Передача обращений в CRM",
  "Согласованные статусы и ответственные",
  "Структура показателей",
  "Отчёт для руководителя",
  "Доступы и документация в составе проекта",
];

function SectionHeader({
  label,
  title,
  lead,
  titleId,
  light = false,
}: {
  label: string;
  title: string;
  lead: string;
  titleId: string;
  light?: boolean;
}) {
  return (
    <div
      className={[styles.sectionHeader, light ? styles.sectionHeaderLight : ""]
        .filter(Boolean)
        .join(" ")}
    >
      <p className={styles.sectionIndex}>{label}</p>
      <h2 id={titleId}>{title}</h2>
      <p className={styles.sectionLead}>{lead}</p>
    </div>
  );
}

export function MarketingServicePage() {
  return (
    <main id="main" className={styles.page}>
      <section className={styles.hero} aria-labelledby="marketing-title">
        <div className={styles.container}>
          <nav className={styles.breadcrumbs} aria-label="Хлебные крошки">
            <Link href="/">Главная</Link>
            <span aria-hidden="true">/</span>
            <Link href="/services">Услуги</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Маркетинг</span>
          </nav>

          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.kicker}>Управляемый маркетинг</p>
              <h1 id="marketing-title">Маркетинг, где видна каждая заявка.</h1>
              <p className={styles.heroLead}>Настраиваем продвижение, передаём обращения из согласованных источников в CRM и показываем в отчёте, какие каналы приводят клиентов и что происходит дальше.</p>
              <div className={styles.heroActions}>
                <a href="#contact-dialog" data-contact-dialog className={styles.primaryAction}>
                  Обсудить продвижение <ActionArrow />
                </a>
                <Link href="#report-example" className={styles.contextLink}>Посмотреть пример отчёта</Link>
              </div>
            </div>

        <div className={`${styles.heroVisual} ${heroBlendStyles.visual}`} aria-hidden="true">
              <Image
                src="/services/marketing-hero-measurable-workflow-v1.png"
                alt=""
                fill
                priority
                sizes="(max-width: 760px) 100vw, (max-width: 1280px) 55vw, 720px"
              />
            </div>
          </div>
        </div>
      </section>

      <MarketingChannelsSection />

      <section className={styles.seoSection} aria-labelledby="seo-title">
        <div className={styles.container}>
          <SectionHeader
            label="02 / SEO и Яндекс Директ"
            title="Два направления продвижения, разная роль."
            lead="Выбор — под задачу и сроки, а не «что лучше». Иногда работают вместе, иногда достаточно одного."
            titleId="seo-title"
            light
          />
          <div className={styles.promotionPair}>
            {promotionPair.map((item) => (
              <Link href={item.href} className={styles.promotionCard} key={item.id}>
                <h3>{item.title}</h3>
                <p>{item.role}</p>
                <span className={styles.promotionLink}>Перейти к {item.title} <ActionArrow /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.metricsSection} aria-labelledby="metrics-title">
        <div className={styles.container}>
          <SectionHeader
            label="03 / Показатели"
            title="Смотрим на результат каналов, а не на отдельные клики."
            lead="Сопоставляем расходы, количество и качество обращений, источники и текущие статусы — в пределах доступных данных."
            titleId="metrics-title"
          />
          <div className={styles.metricsAtlas}>
            <div className={styles.metricsAtlasMeta}>
              <p className={styles.metricsAtlasLabel}>Структура согласованного отчёта</p>
              <p className={styles.metricsNote}>
                Выручка, ROMI, окупаемость и стоимость продажи могут учитываться, если в проекте есть
                полные данные для их расчёта. Они не появляются автоматически.
              </p>
            </div>
            <ul className={styles.metricsLedger} aria-label="Показатели согласованного отчёта">
              {reportMetrics.map((metric, index) => <li key={metric}><span>{String(index + 1).padStart(2, "0")}</span>{metric}</li>)}
            </ul>
            <p className={styles.metricsNote}>Выручка, ROMI, окупаемость и стоимость продажи могут учитываться, если в проекте есть полные данные для их расчёта. Они не появляются автоматически.</p>
          </div>
        </div>
      </section>

      <section className={styles.startSection} aria-labelledby="report-cta-title">
        <div className={styles.container}>
          <div className={`${styles.startPanel} ${ctaStyles.panel}`}>
            <div className={ctaStyles.image}>
              <Image
                src="/services/marketing-cta-project-brief-v1.png"
                alt=""
                fill
                sizes="(max-width: 1040px) 48vw, 760px"
              />
            </div>
            <div className={ctaStyles.content}>
              <p className={styles.sectionIndex}>Первый разговор</p>
              <h2 id="report-cta-title">Обсудим задачи и найдём следующий шаг.</h2>
            </div>
            <div className={styles.startCopy}>
              <p>Расскажите, что хотите изменить. Подскажем, с чего начать.</p>
              <a href="#contact-dialog" data-contact-dialog className={styles.finalAction}>Обсудить маркетинг <ActionArrow /></a>
              <Link href="/process" className={styles.processLink}>Как строится работа <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.reportSection} id="report-example" aria-labelledby="report-title">
        <div className={styles.container}>
          <SectionHeader
            label="04 / Пример отчётности"
            title="Руководитель видит результат в отчёте."
            lead="Отчёт соединяет расходы, источники, обращения и их дальнейшие статусы. По нему видно, что происходит с продвижением и где требуется решение."
            titleId="report-title"
          />
          <div className={styles.reportHero}>
            <div className={styles.reportCopy}>
              <p className={styles.reportWarning}>Демо: в примере используются условные данные. Это демонстрация структуры отчёта, а не показатели клиента и не гарантия конкретного результата.</p>
              <ul className={styles.reportQuestions}>
                <li>Сколько потрачено по каждому источнику?</li>
                <li>Сколько и какие обращения он приносит?</li>
                <li>Что происходит с обращением дальше?</li>
              </ul>
              <a href={reportDemoUrl} target="_blank" rel="noopener noreferrer" className={styles.reportLink} aria-label="Открыть демонстрацию структуры отчёта в Google Sheets, новая вкладка">
                Открыть демо-отчёт <ActionArrow />
              </a>
            </div>
            <a href={reportDemoUrl} target="_blank" rel="noopener noreferrer" className={styles.reportPreview} aria-label="Открыть демонстрацию структуры отчёта в Google Sheets, новая вкладка">
              <span className={styles.reportDemoBadge} aria-hidden="true">Демо</span>
              <Image src="/home/report-demo-preview-v1.webp" alt="Превью демонстрации структуры отчёта с источниками, обращениями и расходами" width={1440} height={1000} sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1100px) 58vw, 720px" />
              <span aria-hidden="true">Открыть в Google Sheets <ActionArrow /></span>
            </a>
          </div>
          <a href={reportDemoUrl} target="_blank" rel="noopener noreferrer" className={styles.reportMobileCta} aria-label="Открыть демонстрацию структуры отчёта в Google Sheets, новая вкладка">
            Открыть демо-отчёт <ActionArrow />
          </a>
        </div>
      </section>

      <section className={styles.deliverables} aria-labelledby="deliverables-title">
        <div className={styles.container}>
          <SectionHeader
            label="05 / Результат работы"
      title="Результат работы: управляемый маркетинг."
      lead="В результате команда получает настроенные каналы, точки обращения, рабочую связку с CRM, структуру показателей и документацию в согласованном составе проекта. Дальше ABBiO по этим же данным регулярно сверяет каналы и меняет то, что не работает."
            titleId="deliverables-title"
          />
      <ol className={`${styles.deliverableList} ${deliverablesStyles.board}`}>
            {deliverables.map((item, index) => (
              <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>
            ))}
          </ol>
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

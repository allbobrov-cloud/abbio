import Image from "next/image";
import Link from "next/link";
import { ActionArrow } from "@/components/ActionArrow";
import styles from "./MarketingServicePage.module.css";
import deliverablesStyles from "./MarketingDeliverables.module.css";
import ctaStyles from "./MarketingCta.module.css";
import heroBlendStyles from "./MarketingHeroBlend.module.css";
import { CasePortfolio } from "./CasePortfolio";

const reportDemoUrl = "https://docs.google.com/spreadsheets/d/1_t_nzlVjj-NE8Lvdqqsz3XC_L0DNfjz0K1nLGFqu1Tk/edit?gid=185043878#gid=185043878";

const sourceGroups = ["SEO", "Реклама", "Материалы и посадочные страницы", "Формы", "Звонки", "Чаты", "Прямые и другие согласованные переходы", "Email и рассылки"];

const demandStages = [
  {
    title: "Потребность",
    text: "Задача или вопрос, с которым приходит человек.",
    image: "/services/marketing-demand-need-v1.png",
  },
  {
    title: "Канал",
    text: "Согласованный источник приводит к нужному предложению.",
    image: "/services/marketing-demand-channel-v1.png",
  },
  {
    title: "Посадочная страница",
    text: "Страница объясняет предложение и помогает выбрать.",
    image: "/services/marketing-demand-landing-v1.png",
  },
  {
    title: "Действие",
    text: "Форма, звонок или чат дают способ обратиться.",
    image: "/services/marketing-demand-action-v1.png",
  },
  {
    title: "Обращение",
    text: "Интерес получает контакт, контекст и следующий шаг.",
    image: "/services/marketing-demand-lead-v1.png",
  },
];

const crmStages = [
  { title: "Обращение", text: "Контакт сохранён", icon: "/services/marketing-crm-lead-icon-v1.png" },
  { title: "Источник и запрос", text: "Согласованный контекст", icon: "/services/marketing-crm-source-icon-v1.png" },
  { title: "CRM", text: "Рабочая точка команды", icon: "/services/marketing-crm-icon-v1.png" },
  { title: "Ответственный", text: "Обращение передано", icon: "/services/marketing-crm-owner-icon-v1.png" },
  { title: "Статус", text: "Текущий этап виден", icon: "/services/marketing-crm-status-icon-v1.png" },
  { title: "Следующий этап", text: "Работа продолжается", icon: "/services/marketing-crm-next-icon-v1.png" },
];

const reportMetrics = [
  "Расходы по источникам",
  "Количество обращений",
  "Стоимость обращения",
  "Квалифицированные обращения",
  "Распределение по источникам",
  "Статусы работы",
  "Сделки — когда CRM заполняется и позволяет их учитывать",
];

const seoStages = ["Поисковый спрос", "Страницы и материалы", "Органические переходы", "Обращения", "CRM", "Отчёт"];

const improvementStages = ["Запуск", "Данные", "Вывод", "Изменение", "Новый период наблюдения"];

const deliverables = [
  "Настроенные согласованные источники",
  "Точки обращения",
  "Передача обращений в CRM",
  "Согласованные статусы и ответственные",
  "Структура показателей",
  "Отчёт для руководителя",
  "Доступы и документация в составе проекта",
];

function CrmPipelineVisual() {
  return (
    <ol className={styles.bitrixPipeline} aria-label="Маршрут обращения в CRM">
      {crmStages.map((stage) => (
        <li key={stage.title}>
          <div className={styles.crmStageIcon} aria-hidden="true">
            <Image src={stage.icon} alt="" fill sizes="56px" />
          </div>
          <h3>{stage.title}</h3>
          <p>{stage.text}</p>
        </li>
      ))}
    </ol>
  );
}

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

      <section className={styles.sources} id="marketing-situations" aria-labelledby="sources-title">
        <div className={styles.container}>
          <SectionHeader
            label="01 / Источники обращений"
            title="Все источники — в одной системе."
            lead="Связываем каналы и точки контакта с CRM, чтобы было видно, откуда приходят обращения и как они распределяются дальше."
            titleId="sources-title"
          />
          <div className={styles.sourceMap} aria-label="Согласованные источники сходятся в единую точку учёта обращения">
            <ul className={styles.sourceList}>{sourceGroups.map((source, index) => <li key={source}><span>{String(index + 1).padStart(2, "0")}</span>{source}</li>)}</ul>
            <div className={styles.sourceHub}><span>Единая точка учёта</span><strong>Обращение</strong><small>Источник · запрос · контакт</small></div>
            <div className={styles.sourceCrm}><span>CRM</span><strong>Контекст сохранён</strong><small>Данные доступны команде для дальнейшей работы</small></div>
          </div>
        </div>
      </section>

      <section className={styles.seoSection} aria-labelledby="seo-title">
        <div className={styles.container}>
          <SectionHeader
            label="02 / SEO"
            title="SEO развиваем как измеряемый канал."
            lead="Изучаем поисковый спрос, развиваем структуру и материалы сайта, устраняем технические препятствия и связываем органические переходы с обращениями в CRM."
            titleId="seo-title"
            light
          />
          <ol className={styles.seoRoute} aria-label="Маршрут SEO от спроса до отчёта">
            {seoStages.map((stage, index) => <li key={stage}><span>{String(index + 1).padStart(2, "0")}</span><h3>{stage}</h3></li>)}
          </ol>
          <div className={styles.seoLinks}>
            <div><Link href="/services/seo">Перейти к SEO <ActionArrow /></Link></div>
          </div>
        </div>
      </section>

      <section className={styles.demandRoute} aria-labelledby="demand-title">
        <div className={styles.container}>
          <SectionHeader
            label="03 / Путь клиента"
            title="От первого касания — к обращению."
            lead="Связываем потребность, канал и посадочную страницу, чтобы человеку было понятно предложение, следующий шаг и способ связаться."
            titleId="demand-title"
          />
          <ol className={styles.demandPath} aria-label="Путь от потребности до обращения">
            {demandStages.map((stage, index) => (
              <li key={stage.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
              <div className={styles.demandStageVisual} aria-hidden="true">
                <Image src={stage.image} alt="" fill sizes="20vw" />
              </div>
                <h3>{stage.title}</h3>
                <p>{stage.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.bitrixSection} aria-labelledby="crm-title">
        <div className={styles.container}>
          <SectionHeader
            label="04 / CRM"
            title="Каждое обращение фиксируется в CRM."
            lead="Вместе с контактом сохраняются источник и содержание запроса. Команда видит ответственного, текущий статус и следующий этап работы."
            titleId="crm-title"
            light
          />
          <div className={styles.bitrixCanvas}>
            <div className={styles.bitrixCanvasTop}><span>Рабочий контур</span><strong>CRM</strong><small>Согласованный маршрут обращения</small></div>
            <CrmPipelineVisual />
          </div>
        </div>
      </section>

      <section className={styles.metricsSection} aria-labelledby="metrics-title">
        <div className={styles.container}>
          <SectionHeader
            label="05 / Показатели"
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
            label="06 / Пример отчётности"
            title="Руководитель видит результат в отчёте."
            lead="Отчёт соединяет расходы, источники, обращения и их дальнейшие статусы. По нему видно, что происходит с продвижением и где требуется решение."
            titleId="report-title"
          />
          <div className={styles.reportHero}>
            <div className={styles.reportCopy}>
              <p className={styles.reportWarning}>В примере используются условные данные. Это демонстрация структуры отчёта, а не показатели клиента и не гарантия конкретного результата.</p>
              <a href={reportDemoUrl} target="_blank" rel="noopener noreferrer" className={styles.reportLink} aria-label="Открыть демонстрацию структуры отчёта в Google Sheets, новая вкладка">
                Открыть демо-отчёт <ActionArrow />
              </a>
            </div>
            <a href={reportDemoUrl} target="_blank" rel="noopener noreferrer" className={styles.reportPreview} aria-label="Открыть демонстрацию структуры отчёта в Google Sheets, новая вкладка">
              <Image src="/home/report-demo-preview-v1.webp" alt="Превью демонстрации структуры отчёта с источниками, обращениями и расходами" width={1440} height={1000} sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1100px) 58vw, 720px" />
              <span aria-hidden="true">Открыть в Google Sheets <ActionArrow /></span>
            </a>
          </div>
        </div>
      </section>

      <section className={styles.improvementSection} aria-labelledby="improvement-title">
        <div className={styles.container}>
          <SectionHeader
            label="07 / Работа ABB"
            title="Данные помогают развивать работу, а не только фиксировать результат."
            lead="По данным ABB корректирует SEO, рекламу, содержание посадочных страниц, точки обращения, сценарии в CRM и состав отчётности."
            titleId="improvement-title"
          />
          <ol className={styles.improvementCycle} aria-label="Цикл работы ABB по данным">
            {improvementStages.map((stage, index) => <li key={stage}><span>{String(index + 1).padStart(2, "0")}</span><h3>{stage}</h3></li>)}
          </ol>
        </div>
      </section>

      <section className={styles.deliverables} aria-labelledby="deliverables-title">
        <div className={styles.container}>
          <SectionHeader
            label="08 / Результат работы"
      title="Результат работы: управляемый маркетинг."
      lead="В результате команда получает настроенные каналы, точки обращения, рабочую связку с CRM, структуру показателей и документацию в согласованном составе проекта."
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

      <section className={`${styles.startSection} ${styles.postCasesCta}`} aria-labelledby="start-title">
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
          <h2 id="start-title">Обсудим задачу и найдём следующий шаг.</h2>
            </div>
            <div className={styles.startCopy}>
          <p>Расскажите, что хотите изменить. Подскажем, с чего начать.</p>
              <a href="#contact-dialog" data-contact-dialog className={styles.finalAction}>Обсудить маркетинг <ActionArrow /></a>
              <Link href="/process" className={styles.processLink}>Как строится работа <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

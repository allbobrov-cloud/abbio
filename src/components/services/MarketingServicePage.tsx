import Image from "next/image";
import Link from "next/link";
import { ActionArrow } from "@/components/ActionArrow";
import styles from "./MarketingServicePage.module.css";

const reportDemoUrl = "https://docs.google.com/spreadsheets/d/1_t_nzlVjj-NE8Lvdqqsz3XC_L0DNfjz0K1nLGFqu1Tk/edit?gid=185043878#gid=185043878";

const sourceGroups = ["SEO", "Реклама", "Материалы и посадочные страницы", "Формы", "Звонки", "Чаты", "Прямые и другие согласованные переходы"];

const demandStages = [
  { title: "Спрос", text: "Задача или вопрос, с которым приходит человек." },
  { title: "Источник или кампания", text: "Согласованный канал приводит к нужному предложению." },
  { title: "Посадочная страница", text: "Страница объясняет предложение и помогает выбрать." },
  { title: "Действие", text: "Форма, звонок или чат дают способ обратиться." },
  { title: "Заявка", text: "Интерес становится конкретным обращением." },
];

const bitrixStages = [
  { title: "Заявка", text: "Обращение сохранено" },
  { title: "Источник и запрос", text: "Согласованный контекст" },
  { title: "Битрикс24", text: "Рабочая точка команды" },
  { title: "Ответственный", text: "Обращение передано" },
  { title: "Статус", text: "Текущий этап виден" },
  { title: "Следующий этап", text: "Работа продолжается" },
];

const reportMetrics = [
  "Расходы по источникам",
  "Количество заявок",
  "Стоимость заявки",
  "Квалифицированные обращения",
  "Распределение заявок по источникам",
  "Статусы обращений",
  "Сделки — когда CRM заполняется и позволяет их учитывать",
];

const seoStages = ["Поисковый спрос", "Страницы и материалы", "Органические переходы", "Заявки", "Битрикс24", "Отчёт"];

const improvementStages = ["Запуск", "Данные", "Вывод", "Изменение", "Новый период наблюдения"];

const deliverables = [
  "Настроенные согласованные источники",
  "Точки обращения",
  "Передача заявок в Битрикс24",
  "Согласованные статусы и ответственные",
  "Структура показателей",
  "Отчёт для руководителя",
  "Доступы и документация в составе проекта",
];

function BitrixPipelineVisual() {
  return (
    <ol className={styles.bitrixPipeline} aria-label="Маршрут обращения в Битрикс24">
      {bitrixStages.map((stage, index) => (
        <li key={stage.title}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <h3>{stage.title}</h3>
          <p>{stage.text}</p>
        </li>
      ))}
    </ol>
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
              <p className={styles.kicker}>Маркетинг для бизнеса</p>
              <h1 id="marketing-title">Маркетинг, где видна каждая заявка.</h1>
              <p className={styles.heroLead}>Настраиваем продвижение, собираем обращения из согласованных источников в Битрикс24 и показываем в отчёте, сколько заявок пришло, откуда они появились и что с ними происходит дальше.</p>
              <div className={styles.heroActions}>
                <a href="#contact-dialog" data-contact-dialog className={styles.primaryAction}>
                  Обсудить продвижение <ActionArrow />
                </a>
                <Link href="#report-example" className={styles.contextLink}>Посмотреть пример отчёта</Link>
              </div>
            </div>

            <div className={styles.heroRoute}>
              <p className={styles.routeEyebrow}>Управляемый маршрут</p>
              <ol aria-label="Маршрут от источника до отчёта">
                <li><span>01</span><strong>Источник</strong><small>Согласованный канал</small></li>
                <li><span>02</span><strong>Страница</strong><small>Предложение и выбор</small></li>
                <li><span>03</span><strong>Заявка</strong><small>Форма, звонок или чат</small></li>
                <li><span>04</span><strong>Битрикс24</strong><small>Обращение в работе</small></li>
                <li><span>05</span><strong>Отчёт</strong><small>Заявки, источники, движение</small></li>
              </ol>
              <p className={styles.heroRouteNote}>Показываем согласованный состав показателей без выдуманных значений.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.sources} id="marketing-situations" aria-labelledby="sources-title">
        <div className={styles.container}>
          <div className={styles.sourcesHeader}>
            <p className={styles.sectionIndex}>01 / Источники обращений</p>
            <div>
              <h2 id="sources-title">Все источники — в одной картине.</h2>
              <p>Связываем согласованные каналы и точки контакта с обращениями, чтобы руководитель понимал, откуда пришла каждая заявка.</p>
            </div>
          </div>
          <div className={styles.sourceMap} aria-label="Согласованные источники сходятся в единую точку учёта обращения">
            <ul className={styles.sourceList}>{sourceGroups.map((source, index) => <li key={source}><span>{String(index + 1).padStart(2, "0")}</span>{source}</li>)}</ul>
            <div className={styles.sourceHub}><span>Единая точка учёта</span><strong>Заявка</strong><small>Источник · запрос · контакт</small></div>
            <div className={styles.sourceCrm}><span>Битрикс24</span><strong>Обращение сохранено</strong><small>Данные доступны для дальнейшей работы</small></div>
          </div>
        </div>
      </section>

      <section className={styles.seoSection} aria-labelledby="seo-title">
        <div className={styles.container}>
          <div className={styles.seoHeader}>
            <p className={styles.sectionIndex}>02 / SEO</p>
            <div>
              <h2 id="seo-title">SEO развиваем как измеряемый канал.</h2>
              <p>Изучаем поисковый спрос, развиваем структуру и материалы сайта, устраняем технические препятствия и связываем органические переходы с обращениями и Битрикс24.</p>
            </div>
          </div>
          <ol className={styles.seoRoute} aria-label="Маршрут SEO от спроса до отчёта">
            {seoStages.map((stage, index) => <li key={stage}><span>{String(index + 1).padStart(2, "0")}</span><h3>{stage}</h3></li>)}
          </ol>
          <div className={styles.seoLinks}>
            <p>На «Сайтах» закладывается техническая и структурная основа; в «Маркетинге» SEO развивается как постоянный канал привлечения и измерения спроса.</p>
            <div><Link href="/services/websites">Нужны новые или переработанные посадочные страницы <ActionArrow /></Link><Link href="/services/design">Нужна отдельная визуальная работа <ActionArrow /></Link></div>
          </div>
        </div>
      </section>

      <section className={styles.demandRoute} aria-labelledby="demand-title">
        <div className={styles.container}>
          <div className={styles.demandHeader}>
            <p className={styles.sectionIndex}>03 / Путь к заявке</p>
            <div>
              <h2 id="demand-title">От первого интереса — к заявке.</h2>
              <p>Задача маркетинга — не просто привести посещение, а связать интерес с конкретным обращением: показать нужное предложение, дать понятный способ действовать и зафиксировать заявку.</p>
            </div>
          </div>
          <ol className={styles.demandPath} aria-label="Путь от спроса до заявки">
            {demandStages.map((stage, index) => (
              <li key={stage.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div className={styles.demandStageVisual} aria-hidden="true"><i /><i /><b /></div>
                <h3>{stage.title}</h3>
                <p>{stage.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.bitrixSection} aria-labelledby="bitrix-title">
        <div className={styles.container}>
          <div className={styles.bitrixHeader}>
            <div>
              <p className={styles.sectionIndex}>04 / Битрикс24</p>
              <h2 id="bitrix-title">Каждая заявка попадает в Битрикс24.</h2>
            </div>
            <p>Заявка сохраняется вместе с согласованным контекстом: видно источник и содержание запроса, назначается ответственный, появляется статус и следующий этап. Эти данные становятся основой для отчётности.</p>
          </div>
          <div className={styles.bitrixCanvas}>
            <div className={styles.bitrixCanvasTop}><span>Рабочий контур</span><strong>Битрикс24</strong><small>Согласованный маршрут обращения</small></div>
            <BitrixPipelineVisual />
          </div>
        </div>
      </section>

      <section className={styles.metricsSection} aria-labelledby="metrics-title">
        <div className={styles.container}>
          <div className={styles.metricsHeader}>
            <p className={styles.sectionIndex}>05 / Показатели</p>
            <div>
              <h2 id="metrics-title">Считаем не клики, а движение заявок.</h2>
              <p>Бизнес видит не только активность в каналах, но и путь обращения от источника до текущего статуса.</p>
            </div>
          </div>
          <div className={styles.metricsBoard}>
            <p className={styles.metricsBoardLabel}>Структура согласованного отчёта</p>
            <ul>
              {reportMetrics.map((metric, index) => <li key={metric}><span>{String(index + 1).padStart(2, "0")}</span>{metric}</li>)}
            </ul>
            <p className={styles.metricsNote}>Выручка, ROMI, окупаемость и стоимость продажи могут учитываться, если в проекте есть полные данные для их расчёта. Они не появляются автоматически.</p>
          </div>
        </div>
      </section>

      <section className={styles.reportSection} id="report-example" aria-labelledby="report-title">
        <div className={styles.container}>
          <div className={styles.reportHero}>
            <div className={styles.reportCopy}>
              <p className={styles.sectionIndex}>06 / Пример отчётности</p>
              <h2 id="report-title">Руководитель видит результат в отчёте.</h2>
              <p>Отчёт соединяет расходы, источники, заявки и их дальнейший статус. По нему можно увидеть, что происходит с продвижением и где требуется решение.</p>
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
          <div className={styles.improvementHeader}>
            <p className={styles.sectionIndex}>07 / Работа ABB</p>
            <div>
              <h2 id="improvement-title">Данные помогают развивать работу, а не только фиксировать результат.</h2>
              <p>По данным ABB развивает и корректирует SEO, рекламу, содержание и посадочные страницы, точки обращения, учёт источников, согласованные сценарии в Битрикс24 и отчётность.</p>
            </div>
          </div>
          <ol className={styles.improvementCycle} aria-label="Цикл работы ABB по данным">
            {improvementStages.map((stage, index) => <li key={stage}><span>{String(index + 1).padStart(2, "0")}</span><h3>{stage}</h3></li>)}
          </ol>
        </div>
      </section>

      <section className={styles.deliverables} aria-labelledby="deliverables-title">
        <div className={styles.container}>
          <div className={styles.deliverableLead}>
            <p className={styles.sectionIndex}>08 / Результат работы</p>
            <h2 id="deliverables-title">Что получает бизнес.</h2>
            <p>Конкретный состав зависит от согласованного проекта и остаётся у команды для дальнейшей работы.</p>
          </div>
          <ol className={styles.deliverableList}>
            {deliverables.map((item, index) => (
              <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.caseSection} aria-labelledby="case-title">
        <div className={styles.container}>
          <div className={styles.caseGrid}>
            <div className={styles.caseCopy}>
              <p className={styles.sectionIndex}>Кейс / Металлопрокат B2B</p>
              <h2 id="case-title">Металлобаза Волхонка. От поиска металла до заявки на поставку.</h2>
              <p>В проекте соединили сайт и каталог, поисковое продвижение, работу с обращениями и CRM.</p>
              <p>Заявка сохраняет контекст, чтобы отдел продаж мог продолжить разговор с покупателем.</p>
              <Link href="/cases/volhonka" className={styles.caseLink}>Открыть кейс <ActionArrow /></Link>
            </div>
            <div className={styles.caseVisual}>
              <Image src="/cases/volhonka-desktop-v1.webp" alt="Сайт Металлобазы Волхонка с каталогом металлопроката" fill sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1040px) 46vw, 590px" />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.startSection} aria-labelledby="start-title">
        <div className={styles.container}>
          <div className={styles.startPanel}>
            <div>
              <p className={styles.sectionIndex}>Первый разговор</p>
              <h2 id="start-title">Хотите видеть, откуда приходят заявки и что происходит дальше?</h2>
            </div>
            <div className={styles.startCopy}>
              <p>Обсудим источники, текущую работу с обращениями и данные, которые нужны руководителю.</p>
              <a href="#contact-dialog" data-contact-dialog className={styles.finalAction}>Обсудить маркетинг <ActionArrow /></a>
              <Link href="/process" className={styles.processLink}>Как строится работа <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

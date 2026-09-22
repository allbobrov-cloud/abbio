import Image from "next/image";
import Link from "next/link";
import { ActionArrow } from "@/components/ActionArrow";
import { YandexDirectHeroExperience } from "./YandexDirectHeroExperience";
import { YandexDirectAdPage } from "./YandexDirectAdPage";
import { YandexDirectCrmSection } from "./YandexDirectCrmSection";
import styles from "./YandexDirectServicePage.module.css";
import heroStyles from "./SeoHeroBlend.module.css";
import heroLayoutStyles from "./YandexHeroLayout.module.css";

type SectionLeadProps = { index: string; title: string; description: string; id: string };
const reportDemoUrl = "https://docs.google.com/spreadsheets/d/1_t_nzlVjj-NE8Lvdqqsz3XC_L0DNfjz0K1nLGFqu1Tk/edit?gid=185043878#gid=185043878";

function SectionLead({ index, title, description, id }: SectionLeadProps) {
  return <header className={styles.sectionLead}><p className={styles.sectionIndex}>{index}</p><h2 id={id}>{title}</h2><p className={styles.sectionDescription}>{description}</p></header>;
}

export function YandexDirectServicePage() {
  return <main id="main" className={styles.page}>
    <section className={`${styles.hero} ${heroStyles.hero}`} aria-labelledby="direct-title"><div className={`${styles.container} ${heroStyles.container}`}>
      <nav className={styles.breadcrumbs} aria-label="Хлебные крошки"><Link href="/">Главная</Link><span aria-hidden="true">/</span><Link href="/services">Услуги</Link><span aria-hidden="true">/</span><span aria-current="page">Яндекс Директ</span></nav>
      <div className={heroLayoutStyles.stage}>
        <div className={`${styles.heroCopy} ${heroLayoutStyles.copy}`}>
          <p className={styles.kicker}>Контекстная реклама</p>
          <h1 id="direct-title">Спрос уже есть.<br />Приводим его на ваш сайт.</h1>
        </div>
        <div className={heroLayoutStyles.visual} aria-hidden="true">
          <YandexDirectHeroExperience />
        </div>
        <div className={heroLayoutStyles.details}>
          <p className={styles.heroDescription}>Настраиваем Яндекс Директ вокруг реального спроса: связываем запрос, объявление и посадочную страницу, а обращения — с расходами и источником.</p>
          <p className={styles.semanticLine}>Спрос · Объявление · Страница · Обращение</p>
          <div className={styles.heroActions}>
            <a href="#contact-dialog" data-contact-dialog className={styles.primaryAction}>Обсудить рекламу <ActionArrow /></a>
            <Link href="#direct-report" className={styles.reportLink}>Как выглядит отчёт</Link>
          </div>
        </div>
      </div>
    </div></section>

    <section className={styles.section} aria-labelledby="offer-title"><div className={styles.container}>
      <SectionLead index="01 / Задача и предложение" id="offer-title" title="Сначала определяем, что рекламируем и кому." description="Разбираем предложение, аудиторию, географию, ограничения и целевое действие. Настройка начинается с задачи, а не с рекламного кабинета." />
      <div className={styles.offerCanvas}><div className={styles.offerCore}><span>Предложение</span><strong>Что клиент должен понять и сделать?</strong></div><div className={styles.offerAxis}><article><span>Аудитория</span><p>Кому полезно предложение</p></article><article><span>География</span><p>Где доступна услуга</p></article><article><span>Ограничения</span><p>Что влияет на показ</p></article><article><span>Действие</span><p>Как фиксируем обращение</p></article></div></div>
    </div></section>

    <section className={`${styles.section} ${styles.placementsSection}`} aria-labelledby="placements-title"><div className={styles.container}>
      <SectionLead index="02 / Места показа" id="placements-title" title="Выбираем места показа под задачу, а не подключаем всё подряд." description="Поиск, Рекламную сеть Яндекса и другие доступные форматы рассматриваем отдельно. Для каждого направления определяем аудиторию, предложение и подходящую страницу." />
      <div className={styles.placementLanes}>
        <article className={styles.searchLane}>
          <div className={styles.searchVisual} aria-hidden="true"><Image src="/services/yandex-direct-search-query-v1.png" alt="" fill sizes="(max-width: 760px) calc(100vw - 64px), 500px" /></div>
          <header><span>01</span><strong>Поиск</strong></header>
          <div className={styles.searchCopy}><p>Сформированный вопрос, который человек задаёт в поиске.</p><small>Объявление отвечает на запрос и ведёт к подходящей странице.</small></div>
        </article>
        <article className={styles.networkLane}>
          <div className={styles.networkVisual} aria-hidden="true"><Image src="/services/yandex-direct-network-banner-v1.png" alt="" fill sizes="(max-width: 760px) calc(100vw - 64px), 650px" /></div>
          <header><span>02</span><strong>Рекламная сеть Яндекса</strong></header>
          <p>Отдельная работа с аудиторией и подачей.</p>
        </article>
        <article className={styles.optionalLane}><header><span>03</span><strong>Другие форматы</strong></header><p>Рассматриваем только при соответствии задаче.</p><div className={styles.optionalSignal} aria-hidden="true"><i/><i/><i/></div></article>
      </div>
      <p className={styles.placementNote}>Форматы не обязаны использоваться одновременно.</p>
    </div></section>

    <section className={styles.section} aria-labelledby="message-title"><div className={styles.container}>
      <SectionLead index="03 / Объявление и страница" id="message-title" title="Страница должна продолжать смысл объявления." description="Согласуем запрос, текст объявления и содержание посадочной страницы. Если подходящей страницы нет, предлагаем её доработку или создание." />
      <YandexDirectAdPage />
      <div className={styles.relatedInline}><span>Если страницу нужно доработать:</span><Link href="/services/websites">Создание сайтов <b aria-hidden="true">↗</b></Link><Link href="/services/design">Дизайн страниц <b aria-hidden="true">↗</b></Link></div>
    </div></section>

    <section className={`${styles.section} ${styles.campaignSection}`} aria-labelledby="campaign-title"><div className={styles.container}>
      <SectionLead index="04 / Структура кампаний" id="campaign-title" title="Разделяем направления, аудитории и бюджет." description="Строим кампании вокруг предложений, географии и характера спроса. Цели, расписание и правила показов определяем в рамках согласованной задачи." />
      <div className={styles.campaignMap}>
        <div className={styles.campaignVisual} aria-hidden="true">
          <Image src="/services/yandex-direct-campaign-structure-v2.webp" alt="" fill sizes="(max-width: 760px) calc(100vw - 32px), 620px" />
        </div>
        <div className={styles.campaignRoot}><span>Задача</span><strong>Структура запуска</strong></div>
        <div className={styles.campaignColumns}>
          <article><span>Направление 01</span><strong>Предложение</strong><small>свои объявления</small></article>
          <article><span>Направление 02</span><strong>География</strong><small>свои условия</small></article>
          <article><span>Направление 03</span><strong>Характер спроса</strong><small>свой сценарий</small></article>
        </div>
        <div className={styles.budgetLine}><span>Бюджет</span><i/><span>Расписание</span><i/><span>Правила показов</span></div>
      </div>
    </div></section>

    <section className={styles.section} aria-labelledby="actions-title"><div className={styles.container}>
      <SectionLead index="05 / Целевые действия" id="actions-title" title="Формы, звонки и чаты должны быть видны после клика." description="Настраиваем передачу доступных целевых действий и источника обращения в CRM. Коллтрекинг и дополнительные сервисы подключаются отдельно, когда они необходимы задаче." />
      <YandexDirectCrmSection />
    </div></section>

    <section className={`${styles.section} ${styles.metricsSection}`} id="direct-report" aria-labelledby="metrics-title"><div className={styles.container}>
      <SectionLead index="06 / Показатели" id="metrics-title" title="Считаем не только клики и стоимость трафика." description="Сопоставляем расходы, обращения, их стоимость и качество. Сделки и выручку используем в отчёте только тогда, когда эти данные корректно передаются из CRM." />
      <div className={styles.reportBoard}>
        <header className={styles.reportHeader}><div><span>Пример среза отчёта</span><strong>Период: 30 дней</strong></div><small>демонстрационные данные</small></header>
        <div className={styles.reportGrid}>
          <article className={styles.reportSpend}><span>Расходы</span><strong>147 800 <em>₽</em></strong><p>За выбранный период</p></article>
          <div className={styles.reportVisual} aria-hidden="true"><Image src="/services/yandex-direct-report-calibration-v1.png" alt="" fill sizes="(max-width: 760px) calc(100vw - 32px), (max-width: 1080px) 52vw, 700px" /></div>
          <div className={styles.reportSignals}>
            <article><span>Обращения</span><strong>38</strong><small>формы, звонки и чаты</small></article>
            <article><span>Стоимость обращения</span><strong>3 889 <em>₽</em></strong><small>расходы / обращения</small></article>
          </div>
          <aside className={styles.reportCrm}><span>CRM</span><strong>24</strong><p>обращения переданы<br/>с источником</p><small>пример качества данных</small></aside>
        </div>
        <footer><p>Пример визуализации. Значения не являются данными клиента.</p><span>Сделки и выручка добавляются при корректной передаче из CRM.</span></footer>
      </div>
    </div></section>

    <section className={styles.section} aria-labelledby="management-title"><div className={styles.container}>
      <SectionLead index="07 / Управление" id="management-title" title="После запуска рекламой нужно регулярно управлять." description="Проверяем поисковые запросы, площадки, объявления, ставки, бюджеты и посадочные страницы. Решения принимаем на основе накопленных данных." />
      <div className={styles.managementLoop}>
        <div className={styles.managementCore} aria-hidden="true"><span>Данные</span><i /></div>
        <ol className={styles.managementSteps}>
          <li><span>01</span><strong>Проверяем данные</strong></li>
          <li><span>02</span><strong>Находим изменение</strong></li>
          <li><span>03</span><strong>Уточняем гипотезу</strong></li>
          <li><span>04</span><strong>Корректируем кампанию</strong></li>
        </ol>
        <div className={styles.managementVisual} aria-hidden="true"><Image src="/services/yandex-direct-management-loop-v1.png" alt="" fill sizes="(max-width: 760px) calc(100vw - 32px), 720px" /></div>
      </div>
    </div></section>

    <section className={`${styles.section} ${styles.resultSection}`} aria-labelledby="direct-result-title"><div className={styles.container}>
      <SectionLead index="08 / Результат" id="direct-result-title" title="Обращения появляются быстрее, а результат виден в отчёте." description="Яндекс Директ помогает быстро запустить платный поток обращений и проверить спрос. Понятный отчёт показывает расходы, количество обращений и доступные данные об их дальнейшем движении." />
      <div className={styles.resultPanel}><div><span>Запуск</span><strong>Платный поток обращений</strong><small>зависит от условий задачи</small></div><i aria-hidden="true"/><div><span>Контроль</span><strong>Понятный отчёт</strong><small>расходы · обращения · движение</small><a className={styles.resultReportLink} href={reportDemoUrl} target="_blank" rel="noopener noreferrer" aria-label="Открыть демо-отчёт в Google Sheets, новая вкладка">Открыть демо-отчёт <ActionArrow /></a></div></div>
      <p className={styles.disclaimer}>Фактическое количество и стоимость обращений зависят от предложения, бюджета, конкуренции, посадочной страницы и работы с полученными обращениями.</p>
    </div></section>

    <section className={`${styles.section} ${styles.relatedSection}`} aria-labelledby="related-title"><div className={styles.container}>
      <SectionLead index="Связанные услуги" id="related-title" title="Реклама работает вместе со страницей и системой измерения." description="Если для запуска не хватает посадочной страницы, визуальной подачи или долгосрочного поискового канала, подключаем отдельное направление." />
      <div className={styles.relatedServices}>
        <Link href="/services/websites" className={styles.relatedService}>
          <div className={styles.relatedVisual} aria-hidden="true">
            <Image src="/services/yandex-direct-related-websites-v1.png" alt="" fill sizes="(max-width: 760px) calc(100vw - 64px), (max-width: 1080px) 30vw, 400px" />
          </div>
          <span>01</span><h3>Сайты</h3><p>Посадочные страницы и формы для обращения.</p><b>Открыть направление <ActionArrow/></b>
        </Link>
        <Link href="/services/design" className={styles.relatedService}>
          <div className={styles.relatedVisual} aria-hidden="true">
            <Image src="/services/yandex-direct-related-design-v1.png" alt="" fill sizes="(max-width: 760px) calc(100vw - 64px), (max-width: 1080px) 30vw, 400px" />
          </div>
          <span>02</span><h3>Дизайн</h3><p>Визуальная подача объявления и страницы.</p><b>Открыть направление <ActionArrow/></b>
        </Link>
        <Link href="/services/seo" className={styles.relatedService}>
          <div className={styles.relatedVisual} aria-hidden="true">
            <Image src="/services/yandex-direct-related-seo-v1.png" alt="" fill sizes="(max-width: 760px) calc(100vw - 64px), (max-width: 1080px) 30vw, 400px" />
          </div>
          <span>03</span><h3>SEO-продвижение</h3><p>Развитие собственного поискового канала.</p><b>Открыть направление <ActionArrow/></b>
        </Link>
      </div>
    </div></section>

    <section className={styles.finalSection} aria-labelledby="direct-contact-title"><div className={styles.container}><div className={styles.finalPanel}><p className={styles.sectionIndex}>Связаться с ABB.IO</p><h2 id="direct-contact-title">Запустим Яндекс Директ как управляемый канал.</h2><p>Разберём предложение, посадочные страницы, доступный бюджет и текущую передачу обращений, чтобы определить структуру запуска.</p><a href="#contact-dialog" data-contact-dialog className={styles.finalAction}>Обсудить рекламу <ActionArrow/></a><div className={styles.finalVisual} aria-hidden="true"><Image src="/services/yandex-direct-final-launch-v1.png" alt="" fill sizes="(max-width: 760px) calc(100vw - 32px), 760px" /></div></div></div></section>
  </main>;
}

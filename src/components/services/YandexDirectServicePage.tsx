import Link from "next/link";
import { ActionArrow } from "@/components/ActionArrow";
import styles from "./YandexDirectServicePage.module.css";

type SectionLeadProps = { index: string; title: string; description: string; id: string };

function SectionLead({ index, title, description, id }: SectionLeadProps) {
  return <header className={styles.sectionLead}><p className={styles.sectionIndex}>{index}</p><h2 id={id}>{title}</h2><p className={styles.sectionDescription}>{description}</p></header>;
}

const route = ["Спрос и аудитория", "Объявление", "Посадочная страница", "Обращение", "CRM", "Отчёт"];

function DirectRoute() {
  return <div className={styles.directRoute} aria-label="Путь обращения из контекстной рекламы"><header><span>Рекламный маршрут</span><small>Яндекс Директ</small></header><ol>{route.map((item,index)=><li key={item}><span>{String(index+1).padStart(2,"0")}</span><strong>{item}</strong></li>)}</ol><div className={styles.routePulse} aria-hidden="true"><i/><i/><i/><i/><i/><i/></div></div>;
}

export function YandexDirectServicePage() {
  return <main id="main" className={styles.page}>
    <section className={styles.hero} aria-labelledby="direct-title"><div className={styles.container}>
      <nav className={styles.breadcrumbs} aria-label="Хлебные крошки"><Link href="/">Главная</Link><span aria-hidden="true">/</span><Link href="/services">Услуги</Link><span aria-hidden="true">/</span><span aria-current="page">Яндекс Директ</span></nav>
      <div className={styles.heroGrid}><div className={styles.heroCopy}><p className={styles.kicker}>Контекстная реклама</p><h1 id="direct-title">Быстрее получаем обращения и видим результат в понятном отчёте.</h1><p className={styles.heroDescription}>Настраиваем Яндекс Директ, связываем объявления с подходящими страницами, передаём обращения в CRM и показываем результат по рекламным направлениям.</p><div className={styles.heroActions}><a href="#contact-dialog" data-contact-dialog className={styles.primaryAction}>Обсудить рекламу <ActionArrow /></a><Link href="#direct-report" className={styles.reportLink}>Как выглядит отчёт</Link></div></div><DirectRoute /></div>
    </div></section>

    <section className={styles.section} aria-labelledby="offer-title"><div className={styles.container}>
      <SectionLead index="01 / Задача и предложение" id="offer-title" title="Сначала определяем, что рекламируем и кому." description="Разбираем предложение, аудиторию, географию, ограничения и целевое действие. Настройка начинается с задачи, а не с рекламного кабинета." />
      <div className={styles.offerCanvas}><div className={styles.offerCore}><span>Предложение</span><strong>Что человек должен понять и сделать?</strong></div><div className={styles.offerAxis}><article><span>Аудитория</span><p>Кому полезно предложение</p></article><article><span>География</span><p>Где доступна услуга</p></article><article><span>Ограничения</span><p>Что влияет на показ</p></article><article><span>Действие</span><p>Как фиксируем обращение</p></article></div></div>
    </div></section>

    <section className={`${styles.section} ${styles.placementsSection}`} aria-labelledby="placements-title"><div className={styles.container}>
      <SectionLead index="02 / Места показа" id="placements-title" title="Выбираем места показа под задачу, а не подключаем всё подряд." description="Поиск, Рекламную сеть Яндекса и другие доступные форматы рассматриваем отдельно. Для каждого направления определяем аудиторию, предложение и подходящую страницу." />
      <div className={styles.placementLanes}><article><header><span>01</span><strong>Поиск</strong></header><p>Ответ на сформированный запрос.</p><div aria-hidden="true"><i/><i/><i/></div></article><article><header><span>02</span><strong>Рекламная сеть Яндекса</strong></header><p>Отдельная работа с аудиторией и подачей.</p><div aria-hidden="true"><i/><i/><i/></div></article><article><header><span>03</span><strong>Другие форматы</strong></header><p>Рассматриваем только при соответствии задаче.</p><div aria-hidden="true"><i/><i/><i/></div></article></div>
      <p className={styles.placementNote}>Форматы не обязаны использоваться одновременно.</p>
    </div></section>

    <section className={styles.section} aria-labelledby="message-title"><div className={styles.container}>
      <SectionLead index="03 / Объявление и страница" id="message-title" title="Страница должна продолжать смысл объявления." description="Согласуем запрос, текст объявления и содержание посадочной страницы. Если подходящей страницы нет, предлагаем её доработку или создание." />
      <div className={styles.messageBridge}><article className={styles.adMock}><header><span>Запрос</span><small>объявление</small></header><strong>Точный ответ на задачу</strong><p>Понятное предложение и следующий шаг.</p><b>Перейти на сайт</b></article><div className={styles.bridgeArrow} aria-hidden="true"><i/></div><article className={styles.landingMock}><header><span>Посадочная страница</span><i/></header><h3>То же предложение без смыслового разрыва.</h3><div><i/><i/><i/></div><span className={styles.mockAction}>Целевое действие</span></article></div>
      <div className={styles.relatedInline}><span>Если страницу нужно доработать:</span><Link href="/services/websites">Создание сайтов <b aria-hidden="true">↗</b></Link><Link href="/services/design">Дизайн страниц <b aria-hidden="true">↗</b></Link></div>
    </div></section>

    <section className={`${styles.section} ${styles.campaignSection}`} aria-labelledby="campaign-title"><div className={styles.container}>
      <SectionLead index="04 / Структура кампаний" id="campaign-title" title="Разделяем направления, аудитории и бюджет." description="Строим кампании вокруг предложений, географии и характера спроса. Цели, расписание и правила показов определяем в рамках согласованной задачи." />
      <div className={styles.campaignMap}><div className={styles.campaignRoot}><span>Задача</span><strong>Структура запуска</strong></div><div className={styles.campaignColumns}><article><span>Направление 01</span><strong>Предложение</strong><small>свои объявления</small></article><article><span>Направление 02</span><strong>География</strong><small>свои условия</small></article><article><span>Направление 03</span><strong>Характер спроса</strong><small>свой сценарий</small></article></div><div className={styles.budgetLine}><span>Бюджет</span><i/><span>Расписание</span><i/><span>Правила показов</span></div></div>
    </div></section>

    <section className={styles.section} aria-labelledby="actions-title"><div className={styles.container}>
      <SectionLead index="05 / Целевые действия" id="actions-title" title="Формы, звонки и чаты должны быть видны после клика." description="Настраиваем передачу доступных целевых действий и источника обращения в CRM. Коллтрекинг и дополнительные сервисы подключаются отдельно, когда они необходимы задаче." />
      <div className={styles.actionStream}><div className={styles.actionSources}><article><span>Форма</span><i/></article><article><span>Звонок</span><i/></article><article><span>Чат</span><i/></article></div><div className={styles.streamLine} aria-hidden="true"><i/><i/><i/></div><div className={styles.crmCard}><span>CRM</span><strong>Обращение и источник</strong><dl><div><dt>Канал</dt><dd>Яндекс Директ</dd></div><div><dt>Действие</dt><dd>доступные данные</dd></div></dl></div></div>
    </div></section>

    <section className={`${styles.section} ${styles.metricsSection}`} id="direct-report" aria-labelledby="metrics-title"><div className={styles.container}>
      <SectionLead index="06 / Показатели" id="metrics-title" title="Считаем не только клики и стоимость трафика." description="Сопоставляем расходы, обращения, их стоимость и качество. Сделки и выручку используем в отчёте только тогда, когда эти данные корректно передаются из CRM." />
      <div className={styles.reportBoard}><header><div><span>Отчёт по направлениям</span><strong>Доступные данные</strong></div><small>период выбирается</small></header><div className={styles.metricCards}><article><span>Расходы</span><strong>—</strong></article><article><span>Обращения</span><strong>—</strong></article><article><span>Стоимость обращения</span><strong>—</strong></article><article><span>Качество</span><strong>по данным CRM</strong></article></div><div className={styles.reportChart} aria-hidden="true"><i/><i/><i/><i/><i/><i/><i/></div><footer><span>Сделки и выручка</span><p>Только при корректной передаче из CRM</p></footer></div>
    </div></section>

    <section className={styles.section} aria-labelledby="management-title"><div className={styles.container}>
      <SectionLead index="07 / Управление" id="management-title" title="После запуска рекламой нужно регулярно управлять." description="Проверяем поисковые запросы, площадки, объявления, ставки, бюджеты и посадочные страницы. Решения принимаем на основе накопленных данных." />
      <div className={styles.managementCycle}><ol><li><span>01</span><strong>Проверяем данные</strong></li><li><span>02</span><strong>Находим изменение</strong></li><li><span>03</span><strong>Уточняем гипотезу</strong></li><li><span>04</span><strong>Корректируем кампанию</strong></li></ol><div className={styles.cycleCore} aria-hidden="true"><span>Данные</span></div></div>
    </div></section>

    <section className={`${styles.section} ${styles.resultSection}`} aria-labelledby="direct-result-title"><div className={styles.container}>
      <SectionLead index="08 / Результат" id="direct-result-title" title="Обращения появляются быстрее, а результат виден в отчёте." description="Яндекс Директ помогает быстро запустить платный поток обращений и проверить спрос. Понятный отчёт показывает расходы, количество обращений и доступные данные об их дальнейшем движении." />
      <div className={styles.resultPanel}><div><span>Запуск</span><strong>Платный поток обращений</strong><small>зависит от условий задачи</small></div><i aria-hidden="true"/><div><span>Контроль</span><strong>Понятный отчёт</strong><small>расходы · обращения · движение</small></div></div>
      <p className={styles.disclaimer}>Фактическое количество и стоимость обращений зависят от предложения, бюджета, конкуренции, посадочной страницы и работы с полученными обращениями.</p>
    </div></section>

    <section className={`${styles.section} ${styles.relatedSection}`} aria-labelledby="related-title"><div className={styles.container}>
      <SectionLead index="Связанные услуги" id="related-title" title="Реклама работает вместе со страницей и системой измерения." description="Если для запуска не хватает посадочной страницы, визуальной подачи или долгосрочного поискового канала, подключаем отдельное направление." />
      <div className={styles.relatedServices}><Link href="/services/websites"><span>01</span><h3>Сайты</h3><p>Посадочные страницы и формы для обращения.</p><b>Открыть направление <ActionArrow/></b></Link><Link href="/services/design"><span>02</span><h3>Дизайн</h3><p>Визуальная подача объявления и страницы.</p><b>Открыть направление <ActionArrow/></b></Link><Link href="/services/seo"><span>03</span><h3>SEO-продвижение</h3><p>Развитие собственного поискового канала.</p><b>Открыть направление <ActionArrow/></b></Link></div>
    </div></section>

    <section className={styles.finalSection} aria-labelledby="direct-contact-title"><div className={styles.container}><div className={styles.finalPanel}><p className={styles.sectionIndex}>Связаться с ABB.IO</p><h2 id="direct-contact-title">Запустим Яндекс Директ как управляемый канал.</h2><p>Разберём предложение, посадочные страницы, доступный бюджет и текущую передачу обращений, чтобы определить структуру запуска.</p><a href="#contact-dialog" data-contact-dialog className={styles.finalAction}>Обсудить рекламу <ActionArrow/></a><div className={styles.finalRoute} aria-hidden="true"><span>Спрос</span><i/><span>Обращение</span><i/><span>Отчёт</span></div></div></div></section>
  </main>;
}

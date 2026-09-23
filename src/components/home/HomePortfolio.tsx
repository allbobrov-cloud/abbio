import Image from "next/image";
import Link from "next/link";
import { cases, services } from "@/lib/content";
import { ActionArrow } from "../ActionArrow";
import base from "../Agency.module.css";
import styles from "./HomePortfolio.module.css";

export function HomeServices() {
  return <section id="services" className={`${base.section} ${styles.services}`} aria-labelledby="services-title"><div className={base.container}>
    <div className={base.sectionHead}><div><p className={base.eyebrow}>Пять направлений</p><h2 id="services-title" aria-label="Что нужно вашему бизнесу?">Что нужно<br /><em>вашему бизнесу?</em></h2></div><p className={base.sectionIntro}>Подключимся к отдельной задаче<br /> или пройдём весь путь вместе.</p></div>
    <div>{services.map((service) => <Link href={`/services/${service.slug}`} key={service.slug} className={styles.service}>
      <h3>{service.title}</h3>
      <ServiceArt slug={service.slug} />
      <div className={styles.serviceText}><p>{service.problem}</p><div className={base.tags}>{service.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div><ActionArrow />
    </Link>)}</div>
  </div></section>;
}

function ServiceArt({ slug }: { slug: string }) {
  const className = `${styles.serviceArt} ${styles[slug]}`;

  if (slug === "design") return <div className={className} aria-hidden="true"><i /><i /><i /><b>Aa</b></div>;
  if (slug === "websites") return <div className={className} aria-hidden="true"><i /><i /><b>www.</b></div>;
  if (slug === "seo") return <div className={className} aria-hidden="true"><i /><i /><i /><b /></div>;
  if (slug === "yandex-direct") return <div className={className} aria-hidden="true"><i /><i /><i /><b /></div>;
  return <div className={className} aria-hidden="true"><i /><i /><i /><i /></div>;
}

const outputs = [
  [["Структура", "Знакомство со школой"], ["Дизайн", "Характер мотоспорта"], ["Адаптив", "Запись с телефона"]],
  [["Каталог", "Структура ассортимента"], ["Поиск", "Подбор продукции"], ["SEO", "Товарные страницы"]],
  [["Сайт", "Выбор металлопроката"], ["CRM", "Учёт обращений"], ["SEO", "Поиск поставщика"]]
];
const reportDemoUrl = "https://docs.google.com/spreadsheets/d/1_t_nzlVjj-NE8Lvdqqsz3XC_L0DNfjz0K1nLGFqu1Tk/edit?gid=185043878#gid=185043878";

export function HomeCases() {
  return <section id="cases" className={base.section} aria-labelledby="cases-title"><div className={base.container}>
    <div className={base.sectionHead}><div><p className={base.eyebrow}>Избранные проекты</p><h2 id="cases-title">Лучше показать.</h2></div><Link href="/cases" className={base.textLink}>Все кейсы <ActionArrow /></Link></div>
    <div className={styles.caseList}>{cases.map((item, i) => <article key={item.slug} className={styles.caseCard} data-theme={item.slug}>
      <div className={styles.caseInfo}><div className={styles.caseMeta}><span>0{i + 1}</span><small>{item.category}</small></div><h3>{item.name}</h3><h4>Задача</h4><p>{item.task}</p><h4>Решение</h4><p>{item.solution}</p><Link className={styles.caseLink} href={`/cases/${item.slug}`}>Подробнее о проекте <ActionArrow /></Link></div>
      <div className={styles.outputs}><h4>Что сделано</h4>{outputs[i].map(([title, text]) => <div key={title}><span aria-hidden="true">✓</span><strong>{title}<small>{text}</small></strong></div>)}</div>
      <div className={styles.devices}><div className={styles.monitor}><div className={styles.screen}><Image src={item.image} alt={`${item.name} — версия для компьютера`} width={1363} height={654} sizes="(max-width: 760px) 75vw, 42vw" /></div><i /><b /></div><div className={styles.phone}><Image src={item.mobile} alt={`${item.name} — мобильная версия`} width={354} height={692} sizes="(max-width: 760px) 20vw, 110px" /></div></div>
    </article>)}</div>
  </div></section>;
}

export function ReportsPreview() {
  return <section className={`${base.section} ${styles.reports}`} aria-labelledby="reports-title">
    <div className={styles.reportPanel}><div className={`${base.container} ${styles.reportInner}`}>
      <div className={styles.reportCopy}>
        <p className={base.eyebrow}>Отчётность для руководителя</p>
        <h2 id="reports-title" aria-label="Вся картина проекта — в одном отчёте для руководителя.">Вся картина проекта —<br /><em>в одном отчёте для руководителя.</em></h2>
        <p>Показываем не только итоги: в отчёте можно посмотреть количество лидов и обращений, расходы по каналам, источники и статус работ.</p>
      </div>
      <a className={styles.reportBoard} href={reportDemoUrl} target="_blank" rel="noopener noreferrer" aria-label="Открыть демо-отчёт в Google Sheets, новая вкладка">
        <Image className={styles.reportShot} src="/home/report-demo-preview.avif" alt="Превью демо-отчёта маркетинга: дашборд с лидами и расходами" width={1440} height={1000} sizes="(max-width: 760px) calc(100vw - 76px), (max-width: 1100px) 46vw, 48vw" />
        <span className={styles.reportBoardHint}><span className={styles.reportBoardHintCopy}><small>Демо в Google Sheets</small><strong>Открыть таблицу</strong></span><ActionArrow /></span>
      </a>
    </div></div>
  </section>;
}

export function IndustryFocus() {
  return <section className={`${base.section} ${styles.industry}`} aria-labelledby="industry-title"><div className={base.container}>
    <header className={styles.industryLead}>
      <div><p className={base.eyebrow}>Металлопрокат и стройматериалы</p><h2 id="industry-title" aria-label="Помогаем продавать металлопрокат и стройматериалы.">Помогаем продавать<br /><em>металлопрокат<br />и стройматериалы.</em></h2></div>
      <p className={styles.industryIntro}>Собираем сайты и маркетинг для поставщиков: чтобы покупатель нашёл нужную позицию, запросил расчёт и не потерялся до ответа отдела продаж.</p>
    </header>
    <div className={styles.industryField}>
      <div className={styles.industryRoute} aria-label="Путь клиента к обращению">
        <p className={styles.routeLabel}>Что учитываем в этой сфере</p>
        <ol>
          <li><span>01</span><div><strong>Логику большого ассортимента</strong><p>Марка, размер, толщина, профиль и наличие — чтобы найти товар, а не изучать каталог.</p></div></li>
          <li><span>02</span><div><strong>Путь от выбора к расчёту</strong><p>Покупателю не приходится гадать, как уточнить цену или получить условия.</p></div></li>
          <li><span>03</span><div><strong>Работу отдела продаж</strong><p>В заявке сохраняется суть запроса, чтобы менеджер мог продолжить разговор.</p></div></li>
        </ol>
      </div>
      <div className={styles.industryEvidence}>
        <p className={styles.evidenceLabel}>Отраслевые кейсы</p>
        <Link href="/cases/oss" className={`${styles.industryProject} ${styles.ossProject}`}>
          <div className={styles.projectPreview}><Image src="/home/industry-oss-steel-v1.webp" alt="" fill sizes="(max-width: 760px) calc(100vw - 80px), 760px" /></div>
          <div className={styles.projectCopy}><small>Промышленность / спецстали</small><strong>ОборонСпецСплав</strong><span>Каталог · поиск · SEO</span></div><ActionArrow />
        </Link>
        <Link href="/cases/volhonka" className={`${styles.industryProject} ${styles.volhonkaProject}`}>
          <div className={styles.projectCopy}><small>Металлопрокат</small><strong>Металлобаза Волхонка</strong><span>Сайт · CRM · SEO</span></div><ActionArrow />
          <div className={styles.projectPreview}><Image src="/home/industry-volhonka-materials-v1.webp" alt="" fill sizes="(max-width: 760px) calc(100vw - 80px), 760px" /></div>
        </Link>
      </div>
    </div>
  </div></section>;
}

import Image from "next/image";
import Link from "next/link";
import { ActionArrow } from "../ActionArrow";
import base from "../Agency.module.css";
import styles from "./HomePortfolio.module.css";





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
        <Link href="/cases/profline" className={`${styles.industryProject} ${styles.proflineProject}`}>
          <div className={styles.projectPreview}><Image src="/cases/profline-hero.webp" alt="" fill sizes="(max-width: 760px) calc(100vw - 80px), 760px" /></div>
          <div className={styles.projectCopy}><small>Кровельные и фасадные материалы</small><strong>ПрофЛайн</strong><span>Сайт · SEO · Аналитика</span></div><ActionArrow />
        </Link>
        <Link href="/cases/volhonka" className={`${styles.industryProject} ${styles.volhonkaProject}`}>
          <div className={styles.projectCopy}><small>Металлопрокат</small><strong>Металлобаза Волхонка</strong><span>Сайт · CRM · SEO</span></div><ActionArrow />
          <div className={styles.projectPreview}><Image src="/home/industry-volhonka-materials-v1.webp" alt="" fill sizes="(max-width: 760px) calc(100vw - 80px), 760px" /></div>
        </Link>
      </div>
    </div>
  </div></section>;
}

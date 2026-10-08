import Image from "next/image";
import { seoTerms } from "@/lib/np/content";
import { NpIcon, type NpIconName } from "./NpIcon";
import { NpRequestButton } from "./NpBlocks";
import styles from "./NpSeoBlock.module.css";

/* Запросы — примеры типичного спроса, не данные о позициях. */
const queries = ["натяжной потолок на кухню", "матовый потолок цена", "потолок в ванную"];

const groups: { icon: NpIconName; title: string; text: string }[] = [
  { icon: "layout", title: "Страницы под спрос", text: "Структура под реальные запросы вашего города: услуги, помещения, фактуры, цены." },
  { icon: "check", title: "Контент и перелинковка", text: "Тексты, ваши работы и ответы на вопросы. Связи между страницами." },
  { icon: "chart", title: "Техника и аналитика", text: "Скорость, индексация, разметка. Позиции, трафик и обращения в отчёте." },
];

export function NpSeoBlock() {
  return (
    <section className={styles.section} id="seo" aria-labelledby="np-seo">
      <div className={styles.copy}>
        <h2 className={styles.title} id="np-seo">SEO-<em>продвижение</em></h2>
        <p className={styles.kicker}>Ежемесячно · для вашего сайта или сделанного нами</p>
        <p className={styles.text}>Делаем для вашего сайта то же, что для Potolki-vsem.ru: под каждый запрос вашего города — своя страница, которую находят и по которой звонят.</p>
        <div className={styles.groups}>
          {groups.map((group) => (
            <div key={group.title} className={styles.group}>
              <span className={styles.groupIcon}><NpIcon name={group.icon} /></span>
              <strong>{group.title}</strong>
              <span>{group.text}</span>
            </div>
          ))}
        </div>
        <ul className={styles.terms}>
          {seoTerms.slice(1).map((term) => <li key={term}><NpIcon name="check" />{term}</li>)}
        </ul>
        <p className={styles.price}><strong>50 000 ₽</strong><span>в месяц, за нашу работу</span></p>
        <NpRequestButton service="seo" />
      </div>

      <div className={styles.visual}>
        <div className={styles.page}>
          <Image src="/cases/potolki-seo-browser.webp" alt="Страница «Натяжные потолки для кухни» на Potolki-vsem.ru — пример страницы под поисковый запрос" fill sizes="(min-width: 1000px) 46vw, 92vw" />
        </div>
        <ul className={styles.queries} aria-label="Примеры запросов">
          {queries.map((query) => (
            <li key={query}><NpIcon name="search" />{query}</li>
          ))}
        </ul>
        <div className={styles.proof}>
          <strong>98 из 107</strong>
          <span>запросов в ТОП-10 Яндекса · СПб</span>
          <small>Potolki-vsem.ru, Topvisor, 02.09.2026</small>
        </div>
      </div>
    </section>
  );
}

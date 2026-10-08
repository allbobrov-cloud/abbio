import Image from "next/image";
import { websiteSteps, websiteTerms } from "@/lib/np/content";
import { NpIcon, type NpIconName } from "./NpIcon";
import { NpRequestButton } from "./NpBlocks";
import styles from "./NpSiteBlock.module.css";

/* Метки вокруг ноутбука: что меняем под компанию клиента. */
const tags: { label: string; icon?: NpIconName; colors?: string[]; pos: string }[] = [
  { label: "Ваш логотип", icon: "layout", pos: "a" },
  { label: "Ваши цвета", colors: ["#2f6fd6", "#f2b632", "#1f9d55"], pos: "b" },
  { label: "Ваши контакты", icon: "phone", pos: "c" },
  { label: "Ваши работы", icon: "check", pos: "d" },
  { label: "Ваш домен", icon: "external", pos: "e" },
];

export function NpSiteBlock() {
  return (
    <section className={styles.section} id="sajt" aria-labelledby="np-site">
      <div className={styles.visual}>
        <div className={styles.laptop}>
          <Image src="/cases/potolki-laptop.avif" alt="Сайт Potolki-vsem.ru на экране ноутбука — основа для готового сайта" fill sizes="(min-width: 1000px) 50vw, 92vw" />
        </div>
        {tags.map((tag) => (
          <span key={tag.label} className={styles.tag} data-pos={tag.pos}>
            {tag.colors
              ? <span className={styles.swatches} aria-hidden="true">{tag.colors.map((color) => <i key={color} style={{ background: color }} />)}</span>
              : tag.icon && <span className={styles.tagIcon}><NpIcon name={tag.icon} /></span>}
            {tag.label}
          </span>
        ))}
      </div>

      <div className={styles.copy}>
        <h2 className={styles.title} id="np-site">Готовый <em>сайт</em></h2>
        <p className={styles.kicker}>Ваш бренд · ваш домен</p>
        <p className={styles.text}>Берём архитектуру Potolki-vsem.ru, которая уже работает в поиске, и переодеваем её под вашу компанию. Не разработка с нуля — поэтому быстрее и доступнее.</p>
        <ol className={styles.steps}>
          {websiteSteps.map((step) => (
            <li key={step.title}><strong>{step.title}</strong><span>{step.text}</span></li>
          ))}
        </ol>
        <ul className={styles.terms}>
          {websiteTerms.map((term) => <li key={term}><NpIcon name="check" />{term}</li>)}
        </ul>
        <p className={styles.price}><strong>150 000 ₽</strong><span>разово, за всю работу</span></p>
        <NpRequestButton service="website" />
      </div>
    </section>
  );
}

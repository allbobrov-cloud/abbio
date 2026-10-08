import Image from "next/image";
import Link from "next/link";
import { npServices, npSituations } from "@/lib/np/content";
import { NpDirectVisual } from "./NpDirectVisual";
import { NpIcon } from "./NpIcon";
import styles from "./NpFormats.module.css";
import np from "./np.module.css";

const extra: Record<string, { price: string; src?: string; alt?: string }> = {
  "no-site": { price: "от 15 000 ₽ в месяц", src: "/cases/potolki-ui.avif", alt: "Карточка реального объекта Potolki-vsem.ru с расчётом стоимости и подбором решения" },
  "own-site": { price: "150 000 ₽ разово", src: "/cases/potolki-laptop.avif", alt: "Сайт Potolki-vsem.ru на экране ноутбука — основа для готового сайта" },
  "has-site": { price: "50 000 ₽ в месяц", src: "/cases/potolki-seo-browser.webp", alt: "Страница «Натяжные потолки для кухни» — пример посадочной страницы под запрос" },
  "need-now": { price: "30 000 ₽ в месяц · партнёрам бесплатно" },
};

/* Четыре формата сразу на виду: партнёрство крупно слева, сайт и SEO справа, Директ — широкой строкой снизу. */
export function NpFormats() {
  return (
    <div className={styles.bento}>
      {npSituations.map((item, index) => {
        const more = extra[item.id];
        const main = index === 0;
        return (
          <article key={item.id} className={styles.card} data-main={main || undefined} data-format={item.id}>
            <div className={styles.media}>
              {more.src
                ? <Image src={more.src} alt={more.alt ?? ""} fill sizes={main ? "(min-width: 960px) 50vw, 92vw" : "(min-width: 960px) 22vw, 92vw"} />
                : <NpDirectVisual />}
            </div>
            <div className={styles.body}>
              {main && <span className={styles.badge}>Главное предложение</span>}
              <p className={styles.situation}>«{item.question}»</p>
              <h3 className={styles.title}>{item.title}</h3>
              {(main || !more.src) && <p className={styles.text}>{item.text}</p>}
              <ul className={styles.points}>
                {item.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
              <div className={styles.footer}>
                <span className={styles.price}>{more.price}</span>
                <div className={styles.actions}>
                  <Link href={item.href} className={styles.more} aria-label={`${item.title}: подробнее`}><NpIcon name="arrow" /></Link>
                  {main && <button type="button" className={np.button} data-np-request data-service={item.service}>{npServices[item.service].cta}</button>}
                </div>
              </div>
            </div>
            <Link href={item.href} className={styles.cover} tabIndex={-1} aria-hidden="true" />
          </article>
        );
      })}
    </div>
  );
}

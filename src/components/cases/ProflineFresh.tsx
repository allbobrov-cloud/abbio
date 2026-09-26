"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./ProflineFresh.module.css";

// Состояние появления выставляется до первой отрисовки, иначе финал успевает мигнуть.
const useArmingEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

const DATA = [
  { title: "Товары", icon: "m12 3 8 4.2v9.6L12 21l-8-4.2V7.2L12 3ZM4 7.2l8 4.3 8-4.3M12 11.5V21" },
  { title: "Цены", icon: "M5 6c0-1.4 3.1-2.5 7-2.5s7 1.1 7 2.5-3.1 2.5-7 2.5S5 7.4 5 6ZM5 6v5c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6M5 11v5c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-5" },
  { title: "Фото", icon: "M4 5h16v14H4zM4 16l4.5-4.5 4 4 3-3L20 16M9 9.5h.01" },
  { title: "Характеристики", icon: "M7 3h8l4 4v14H7zM15 3v4h4M10 12h6M10 16h6" },
] as const;

function Arrow() {
  return (
    <span className={`${styles.arrow} ${styles.rev}`} aria-hidden="true">
      <svg viewBox="0 0 40 16">
        <path d="M1 8h36M30 1.5 37 8l-7 6.5" />
      </svg>
    </span>
  );
}

export function ProflineFresh() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(true);
  const [armed, setArmed] = useState(false);

  useArmingEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    setArmed(true);
    setSeen(false);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }
        observer.disconnect();
        setSeen(true);
        // Когда появление закончилось, снимаем «взведённое» состояние: задержки входа не мешают hover.
        window.setTimeout(() => setArmed(false), 6500);
      },
      { threshold: 0.2 }
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="fresh-catalog" className={styles.section} aria-labelledby="plf-title">
      <div
        ref={rootRef}
        className={`${styles.stage} ${seen ? styles.seen : ""}`}
        data-armed={armed ? "true" : undefined}
      >
        <header className={styles.head}>
          <div className={styles.copy}>
            <p className={`${styles.eyebrow} ${styles.up}`}>
              <b>03</b> · Актуальный каталог
            </p>
            <h2 id="plf-title" className={styles.up}>
              25&nbsp;000 страниц.
              <em>Данные остаются актуальными.</em>
            </h2>
            <p className={`${styles.description} ${styles.up}`}>
              Товары, цены, изображения и характеристики получаем из каталогов
              официальных поставщиков.
            </p>
          </div>
          <p className={`${styles.side} ${styles.up}`}>
            Актуальные данные.
            <br />
            Надёжные поставщики.
            <br />
            Стабильный каталог.
          </p>
        </header>

        <div className={styles.flow}>
          <div className={`${styles.source} ${styles.rev}`}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 21V10l5 3V9l5 3V6h3l1 15M3 21h18M8 17h.01M12 17h.01M16 17h.01" />
              <path d="M17 6V3h2v3" />
            </svg>
            <strong>
              Официальные
              <br />
              поставщики
            </strong>
            <span>
              Каталоги и обновления
              <br />
              данных
            </span>
          </div>

          <Arrow />

          <ul className={`${styles.data} ${styles.rev}`}>
            {DATA.map((d) => (
              <li key={d.title} className={styles.item}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d={d.icon} />
                </svg>
                <span>{d.title}</span>
              </li>
            ))}
          </ul>

          <Arrow />

          <div className={`${styles.result} ${styles.rev}`}>
            <div className={styles.resultTop}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 3h8l4 4v14H7zM15 3v4h4M10 12h6M10 16h6" />
              </svg>
              <strong>
                Каталог
                <br />
                ПрофЛайн
              </strong>
            </div>
            <p>25 000 страниц</p>
            <span className={styles.status}>
              <i aria-hidden="true" />
              Актуально
            </span>
          </div>
        </div>

        <footer className={`${styles.final} ${styles.up}`}>
          <p>
            Большой каталог имеет смысл только тогда,
            <br />
            когда его данным можно доверять.
          </p>
          <span className={styles.sign}>
            <span>
              Растём вместе
              <br />с надёжными данными
            </span>
            <svg viewBox="0 0 40 16" aria-hidden="true">
              <path d="M1 8h36M30 1.5 37 8l-7 6.5" />
            </svg>
          </span>
        </footer>
      </div>
    </section>
  );
}

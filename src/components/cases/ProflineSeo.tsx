"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./ProflineSeo.module.css";

// Состояние появления выставляется до первой отрисовки, иначе финал успевает мигнуть.
const useArmingEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

// Тематики поисковых направлений: только примеры, без частотности и позиций.
const TOPICS = [
  "профнастил",
  "металлочерепица",
  "сэндвич-панели",
  "кровельные материалы",
  "профнастил для забора",
] as const;

/*
 * Схематичная динамика без числовых значений: общий рост с небольшими плато.
 * Конечная точка (680, 48) совпадает с положением светящейся точки в CSS.
 */
const LINE =
  "M0 352 C48 334 96 322 146 304 C182 291 200 264 240 252 C276 242 300 252 336 238 C376 222 386 192 420 170 C450 152 472 152 506 154 C542 156 556 130 588 102 C616 78 642 62 680 48";
const AREA = `${LINE} L680 400 L0 400 Z`;

export function ProflineSeo() {
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
    <section id="seo" className={styles.section} aria-labelledby="pls-title">
      <div
        ref={rootRef}
        className={`${styles.stage} ${seen ? styles.seen : ""}`}
        data-armed={armed ? "true" : undefined}
      >
        <div className={styles.main}>
          <div className={styles.copy}>
            <p className={`${styles.eyebrow} ${styles.up}`}>
              <b>05</b> · SEO
            </p>
            <p className={`${styles.big} ${styles.up}`} aria-hidden="true">
              60<span>%</span>
            </p>
            <h2 id="pls-title" className={`${styles.title} ${styles.up}`}>
              <span className={styles.srOnly}>60% </span>
              запросов
              <em>уже в ТОП-10.</em>
            </h2>
            <p className={`${styles.description} ${styles.up}`}>
              Отслеживаем 150 высоко- и среднечастотных запросов. По мере
              развития каталога растёт и видимость сайта в поиске.
            </p>
            <ul className={`${styles.chips} ${styles.up}`}>
              {TOPICS.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>

          <figure className={styles.chart}>
            <figcaption className={`${styles.chartTitle} ${styles.up}`}>Видимость в поиске</figcaption>
            <div className={styles.plot}>
              <svg viewBox="0 0 700 400" preserveAspectRatio="none" role="img" aria-label="Схема: видимость сайта в поиске постепенно растёт">
                <defs>
                  <linearGradient id="pls-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#f02a3a" stopOpacity="0.32" />
                    <stop offset="1" stopColor="#f02a3a" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="pls-stroke" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#c81c2c" />
                    <stop offset="1" stopColor="#ff4356" />
                  </linearGradient>
                </defs>
                <g className={styles.grid}>
                  <path d="M0 100H700M0 200H700M0 300H700" />
                  <path d="M140 0V400M280 0V400M420 0V400M560 0V400" />
                </g>
                <path className={styles.area} d={AREA} fill="url(#pls-fill)" />
                <path className={styles.line} d={LINE} pathLength={1} stroke="url(#pls-stroke)" />
              </svg>
              <span className={styles.dot} aria-hidden="true" />
              <span className={styles.callout}>
                Больше запросов
                <br />в ТОП-10
              </span>
            </div>
          </figure>
        </div>

        <footer className={`${styles.final} ${styles.up}`}>
          <p>
            Каталог растёт — вместе с ним
            <br />
            расширяется присутствие сайта в поиске.
          </p>
          <span className={styles.sign}>
            <span>
              Больше видимости
              <br />в поиске
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

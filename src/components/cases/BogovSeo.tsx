"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./BogovSeo.module.css";

// Состояние появления выставляется до первой отрисовки, иначе финал успевает мигнуть.
const useArmingEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/*
 * Цифры и позиции запросов — как переданы владельцем в задании на этот блок.
 * Отдельного файла скриншота Topvisor в проекте нет, поэтому фрагмент
 * скриншота (вторичное доказательство) здесь не показан — только эти данные.
 */
const topQueries = [
  "мотошкола",
  "мотошкола санкт петербург",
  "обучение на мотоцикл",
  "права на мотоцикл",
  "детская мотошкола",
  "стантрайдинг",
  "обучение на категорию а",
];
const otherQueries = [
  { pos: "11", query: "автошкола категория а" },
  { pos: "39", query: "категория а" },
];

const FINAL = 2;

function Stage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(FINAL);
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
    setStep(0);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }
        observer.disconnect();
        window.setTimeout(() => setStep(1), 500);
        window.setTimeout(() => setStep(2), 1000);
      },
      { threshold: 0.3 }
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  const on = (from: number) => (step >= from ? styles.isIn : "");

  return (
    <div
      ref={rootRef}
      className={styles.stage}
      data-armed={armed ? "true" : undefined}
    >
      <div className={`${styles.headline} ${styles.rev} ${on(0)}`}>
        <p className={styles.big}>
          91<span>%</span>
        </p>
        <p className={styles.bigLabel}>запросов в ТОП-10</p>
        <p className={styles.sample}>22 отслеживаемых запроса</p>
        <p className={styles.context}>09.09.2026 · Яндекс · Санкт-Петербург</p>
      </div>

      <ol className={`${styles.top} ${styles.rev} ${on(1)}`}>
        {topQueries.map((query) => (
          <li key={query}>
            <b>#1</b>
            {query}
          </li>
        ))}
      </ol>

      <ol className={`${styles.other} ${styles.rev} ${on(2)}`}>
        {otherQueries.map((item) => (
          <li key={item.query}>
            <b>#{item.pos}</b>
            {item.query}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function BogovSeo() {
  return (
    <section id="seo" className={styles.section} aria-labelledby="seo-title">
      <div className={styles.container}>
        <header className={styles.head}>
          <div>
            <p className={styles.eyebrow}>SEO</p>
            <h2 id="seo-title" aria-label="Сделали сайт — и вывели его в поиск.">
              Сделали сайт —
              <br />
              <em>и вывели его в поиск.</em>
            </h2>
          </div>
          <p className={styles.description}>
            Развили структуру и страницы{" "}
            <br />
            под реальный поисковый спрос.
          </p>
        </header>

        <Stage />
      </div>
    </section>
  );
}

"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./VolhonkaResult.module.css";

// Состояние появления выставляется до первой отрисовки, иначе финал успевает мигнуть.
const useArmingEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

function Arrow({ gold }: { gold?: boolean }) {
  return (
    <span className={`${styles.arrow} ${gold ? styles.gold : ""} ${styles.rev}`} aria-hidden="true">
      <svg viewBox="0 0 100 30" preserveAspectRatio="none">
        <path d="M1 15h96M84 3l13 12-13 12" />
      </svg>
    </span>
  );
}

export function VolhonkaResult() {
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
      },
      { threshold: 0.2 }
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="result" className={styles.section} aria-labelledby="vres-title">
      <div
        ref={rootRef}
        className={`${styles.stage} ${seen ? styles.seen : ""}`}
        data-armed={armed ? "true" : undefined}
      >
        <div className={styles.glow} aria-hidden="true" />

        <div className={`${styles.copy} ${styles.rev}`}>
          <p className={styles.eyebrow}>
            <b>06</b> · Результат
          </p>
          <h2 id="vres-title">
            Сайт стал частью{" "}
            <br />
            <em>системы продаж.</em>
          </h2>
          <p className={styles.description}>
            Сайт, SEO и аналитика работают вместе: помогают Металлобазе Волхонка
            находить существующий спрос, приводить потенциальных клиентов на
            нужные страницы и видеть обращения.
          </p>
        </div>

        <div className={styles.formula}>
          <div className={`${styles.word} ${styles.w1} ${styles.rev}`}>
            <strong>Сайт</strong>
            <span>помогает выбрать</span>
          </div>
          <Arrow />
          <div className={`${styles.word} ${styles.w2} ${styles.rev} ${styles.d2}`}>
            <strong>Спрос</strong>
            <span>приходит из поиска</span>
          </div>
          <Arrow gold />
          <div className={`${styles.word} ${styles.w3} ${styles.rev} ${styles.d3}`}>
            <strong>Обращения</strong>
            <span>становятся измеримыми</span>
          </div>
        </div>

        <p className={`${styles.final} ${styles.rev} ${styles.d4}`}>
          <span>Digital стал частью системы продаж</span>
          <em>Металлобазы Волхонка.</em>
        </p>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./PotolkiResult.module.css";

// Состояние появления выставляется до первой отрисовки, иначе финал успевает мигнуть.
const useArmingEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

const ICON = {
  pages: "M4 5h16v14H4zM4 9h16M8 7h.01M11 7h.01",
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM20 20l-4-4",
  growth: "M3 17l6-6 4 4 8-8M15 7h6v6",
} as const;

function StepIcon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 40 16" aria-hidden="true">
      <path d="M1 8h36M30 1.5 37 8l-7 6.5" />
    </svg>
  );
}

/*
 * 08 · Результат — финал в цветовой системе ABBiO (по образцу ProflineResult), а не в
 * палитре клиента. Визуал — ступени «01 Страницы → 02 Поиск → 03 Рост» нарисованы кодом
 * (готового фото-ассета под этот сюжет нет, в отличие от Profline). Логотип клиента —
 * оригинальный public/cases/potolki-logo.svg (белый текст, уже подходит для тёмного фона,
 * как и на Hero — см. PotolkiHero.tsx).
 */
export function PotolkiResult() {
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
        // Когда появление закончилось, снимаем «взведённое» состояние.
        window.setTimeout(() => setArmed(false), 4500);
      },
      { threshold: 0.2 }
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="result" className={styles.section} aria-labelledby="pr-title">
      <div
        ref={rootRef}
        className={`${styles.stage} ${seen ? styles.seen : ""}`}
        data-armed={armed ? "true" : undefined}
      >
        <div className={styles.copy}>
          <div className={`${styles.head} ${styles.up}`}>
            <p className={styles.eyebrow}>
              <b>08</b> · Результат
            </p>
            <h2 id="pr-title">
              Не лендинг под рекламу —
              <em>сайт для органического поиска.</em>
            </h2>
            <span className={styles.rule} aria-hidden="true" />
          </div>

          <p className={`${styles.phrase} ${styles.up}`}>
            Сайт работает.
            <em>Рост продолжается.</em>
          </p>
        </div>

        <div className={`${styles.visualWrap} ${styles.slide}`}>
          <span className={styles.floor} aria-hidden="true" />
          <div className={styles.visual}>
            <div className={styles.podium} aria-hidden="true">
              <div className={`${styles.step} ${styles.p1}`}>
                <span className={styles.num}>01</span>
                <span className={styles.ico}>
                  <StepIcon d={ICON.pages} />
                </span>
                <span className={styles.label}>Страницы</span>
              </div>
              <span className={styles.arrow}>
                <Arrow />
              </span>
              <div className={`${styles.step} ${styles.p2}`}>
                <span className={styles.num}>02</span>
                <span className={styles.ico}>
                  <StepIcon d={ICON.search} />
                </span>
                <span className={styles.label}>Поиск</span>
              </div>
              <span className={styles.arrow}>
                <Arrow />
              </span>
              <div className={`${styles.step} ${styles.p3}`}>
                <span className={styles.glow} aria-hidden="true" />
                <span className={styles.num}>03</span>
                <span className={styles.ico}>
                  <StepIcon d={ICON.growth} />
                </span>
                <span className={styles.label}>Рост</span>
              </div>
            </div>
          </div>
          <p className={styles.caption} aria-hidden="true">
            Каждый этап
            <br />
            усиливает следующий
          </p>
          <p className={styles.sign}>
            <span className={styles.wordmark} aria-label="ABBiO">
              <span>ABB</span>
              <span className={styles.wordI}>i</span>
              <span>O</span>
            </span>
            <span className={styles.times} aria-hidden="true">
              ×
            </span>
            {/* Оригинальный логотип клиента (белый текст — уже подходит для тёмного фона) */}
            <Image
              className={styles.client}
              src="/cases/potolki-logo.svg"
              alt="Потолки Всем"
              width={490}
              height={143}
            />
          </p>
        </div>
      </div>
    </section>
  );
}

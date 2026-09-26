"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./ProflineResult.module.css";

// Состояние появления выставляется до первой отрисовки, иначе финал успевает мигнуть.
const useArmingEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export function ProflineResult() {
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
    <section id="result" className={styles.section} aria-labelledby="plr-title">
      <div
        ref={rootRef}
        className={`${styles.stage} ${seen ? styles.seen : ""}`}
        data-armed={armed ? "true" : undefined}
      >
        <div className={styles.copy}>
          <div className={`${styles.head} ${styles.up}`}>
            <p className={styles.eyebrow}>
              <b>07</b> · Результат
            </p>
            <h2 id="plr-title">
              Из идеи —
              <em>в digital-продукт.</em>
            </h2>
            <span className={styles.rule} aria-hidden="true" />
          </div>

          <p className={`${styles.phrase} ${styles.up}`}>
            Сайт запущен.
            <em>Развитие продолжается.</em>
          </p>
        </div>

        <div className={`${styles.visualWrap} ${styles.slide}`}>
          <span className={styles.floor} aria-hidden="true" />
          <div className={styles.visual}>
            <Image
              src="/cases/profline-result.avif"
              alt="Три этапа проекта: 01 каталог, 02 поиск, 03 развитие"
              width={1549}
              height={1015}
              sizes="(max-width: 860px) 92vw, 68vw"
            />
          </div>
          <p className={styles.caption} aria-hidden="true">
            Система продолжает
            <br />
            развиваться
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
            <img
              className={styles.client}
              src="/cases/profline-logo.svg"
              alt="ПрофЛайн"
              width="741"
              height="152"
            />
          </p>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./PotolkiResults.module.css";

// Состояние появления выставляется до первой отрисовки, иначе финал успевает мигнуть.
const useArmingEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

function Arrow() {
  return (
    <svg className={styles.arrow} viewBox="0 0 40 16" aria-hidden="true">
      <path d="M1 8h36M30 1.5 37 8l-7 6.5" />
    </svg>
  );
}

const SEGMENTS = Array.from({ length: 10 }, (_, i) => i);

/*
 * Показатели даны владельцем: Яндекс — Санкт-Петербург 80% из 107, Москва 50% из 117 (в готовой
 * картинке public/cases/potolki-results.webp); Google — Санкт-Петербург 10% из 107 (блок ниже).
 * Карта — public/cases/potolki-map.avif. Исторических значений, договоров и обращений здесь нет.
 */
export function PotolkiResults() {
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
        window.setTimeout(() => setArmed(false), 5000);
      },
      { threshold: 0.15 }
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="results" className={styles.section} aria-labelledby="pr-title">
      <div
        ref={rootRef}
        className={`${styles.stage} ${seen ? styles.seen : ""}`}
        data-armed={armed ? "true" : undefined}
      >
        <div className={styles.grid}>
          <div className={styles.left}>
            <div className={`${styles.head} ${styles.rev}`}>
              <p className={styles.eyebrow}>
                <b>05</b>
                <i aria-hidden="true" />
                Результаты в поиске
              </p>
              <h2 id="pr-title">
                Сайт начал занимать{" "}
                <br />
                <em>своё место в поиске.</em>
              </h2>
              <p className={styles.description}>
                Продвигаем проект сразу в двух регионах. Результат уже виден по
                коммерческим запросам.
              </p>
            </div>

            <div className={`${styles.map} ${styles.rev}`}>
              <Image
                src="/cases/potolki-map.avif"
                alt="Карта России: Санкт-Петербург и Москва"
                width={1672}
                height={941}
                sizes="(max-width: 860px) 92vw, 34vw"
              />
            </div>
          </div>

          <div className={styles.right}>
            <div className={`${styles.main} ${styles.rev}`}>
              <div className={styles.mainScroll}>
                <Image
                  src="/cases/potolki-results.webp"
                  alt="Яндекс, ТОП-10: Санкт-Петербург — 80% из 107 отслеживаемых запросов, Москва — 50% из 117"
                  width={1721}
                  height={914}
                  sizes="(max-width: 860px) 760px, 64vw"
                  quality={90}
                />
              </div>
            </div>

            <div className={`${styles.google} ${styles.rev}`}>
              <div className={styles.gMain}>
                <p className={styles.gLabel}>Google · Санкт-Петербург</p>
                <p className={styles.gNum}>
                  <strong>10%</strong>
                  <span>в ТОП-10</span>
                </p>
                <p className={styles.gCap}>107 отслеживаемых запросов</p>
              </div>
              <div className={styles.progress} aria-label="10 из 100 процентов">
                {SEGMENTS.map((i) => (
                  <i key={i} className={i === 0 ? styles.on : undefined} />
                ))}
              </div>
              <div className={styles.status}>
                <p className={styles.sTitle}>
                  В работе <Arrow />
                </p>
                <p className={styles.sText}>
                  Продолжаем развивать{" "}
                  <br />
                  видимость.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.final} ${styles.rev}`}>
          <p className={styles.thesis}>
            SEO здесь уже не гипотеза.
            <em>Сайт занимает позиции по реальному спросу.</em>
          </p>
          <p className={styles.note}>
            Результат оцениваем по отслеживаемым{" "}
            <br />
            поисковым запросам в каждом регионе.
          </p>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./VolhonkaSeo.module.css";

// Состояние появления выставляется до первой отрисовки, иначе финал успевает мигнуть.
const useArmingEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/* SEO-визуал — единый готовый asset public/cases/volhonka-seo-ui.avif (1536 × 1024, RGBA). */
const works = [
  {
    title: "Семантика",
    text: ["Собираем и кластеризуем", "коммерческие запросы."],
    icon: "M10.5 4a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM15.5 15.5l5 5",
  },
  {
    title: "Страницы",
    text: ["Создаём и оптимизируем", "посадочные страницы."],
    icon: "M7 3h8l4 4v14H7zM15 3v4h4M10 12h6M10 16h6",
  },
  {
    title: "Рост позиций",
    text: ["Выводим запросы", "в ТОП по региону."],
    icon: "M5 20v-6M11 20V9M17 20V4M3 20h18",
  },
  {
    title: "Аналитика",
    text: ["Отслеживаем трафик", "и обращения из поиска."],
    icon: "M20 11a8 8 0 0 0-14-4.5L4 9M4 4v5h5M4 13a8 8 0 0 0 14 4.5L20 15M20 20v-5h-5",
  },
] as const;

export function VolhonkaSeo() {
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
    <section id="seo" className={styles.section} aria-labelledby="vseo-title">
      <div
        ref={rootRef}
        className={`${styles.stage} ${seen ? styles.seen : ""}`}
        data-armed={armed ? "true" : undefined}
      >
        <div className={styles.glow} aria-hidden="true" />

        <div className={`${styles.copy} ${styles.rev}`}>
          <p className={styles.eyebrow}>
            <b>04</b> · SEO
          </p>
          <h2 id="vseo-title">
            250 запросов.{" "}
            <br />
            Поиск стал <em>каналом продаж.</em>
          </h2>
          <p className={styles.description}>
            Развиваем сайт под реальный спрос на металлопрокат. Собираем
            поисковые запросы, создаём и улучшаем посадочные страницы и выводим
            их в поиск по коммерческим запросам.
          </p>
        </div>

        <ul className={styles.works}>
          {works.map((w, i) => (
            <li
              key={w.title}
              className={styles.rev}
              style={{ transitionDelay: `${0.4 + i * 0.1}s` }}
            >
              <span className={styles.ic}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d={w.icon} />
                </svg>
              </span>
              <span>
                <b>{w.title}</b>
                {w.text[0]}{" "}
                <br />
                {w.text[1]}
              </span>
            </li>
          ))}
        </ul>

        <div className={`${styles.visual} ${styles.rev} ${styles.visualRev}`}>
          <Image
            src="/cases/volhonka-seo-ui.avif"
            alt="Поисковая выдача Яндекса по запросу «профильная труба 09Г2С купить спб» с сайтом Металлобазы на первом месте, список из десяти запросов в продвижении, график органического трафика за 12 месяцев и отметка «ТОП-10 по ключевым коммерческим запросам»"
            fill
            sizes="(max-width: 900px) 100vw, 60vw"
          />
        </div>

        <p className={`${styles.final} ${styles.rev} ${styles.d5}`}>
          <span>Не продвигаем сайт «в целом».</span>
          <em>Занимаем поиск там, где клиент уже ищет металл.</em>
        </p>
      </div>
    </section>
  );
}

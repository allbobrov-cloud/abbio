"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./VolhonkaLive.module.css";

// Состояние появления выставляется до первой отрисовки, иначе финал успевает мигнуть.
const useArmingEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/* Интерфейсы сайта — единый готовый asset public/cases/volhonka-live-ui.avif (1437 × 1095, RGBA). */
const works = [
  {
    title: "Цены и ассортимент",
    text: ["Поддерживаем", "актуальность каталога."],
    icon: "M20 11a8 8 0 0 0-14-4.5L4 9M4 4v5h5M4 13a8 8 0 0 0 14 4.5L20 15M20 20v-5h-5",
  },
  {
    title: "Новые страницы",
    text: ["Расширяем сайт под новые", "направления и спрос."],
    icon: "M7 3h8l4 4v14H7zM15 3v4h4M10 12h6M10 16h6",
  },
  {
    title: "Доработки",
    text: ["Улучшаем функциональность", "по мере появления новых задач."],
    icon: "M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM19.4 13a7.6 7.6 0 0 0 0-2l2-1.5-2-3.5-2.3 1a7.5 7.5 0 0 0-1.7-1L15 3.5h-4l-.4 2.5a7.5 7.5 0 0 0-1.7 1l-2.3-1-2 3.5 2 1.5a7.6 7.6 0 0 0 0 2l-2 1.5 2 3.5 2.3-1a7.5 7.5 0 0 0 1.7 1l.4 2.5h4l.4-2.5a7.5 7.5 0 0 0 1.7-1l2.3 1 2-3.5-2-1.5Z",
  },
  {
    title: "Контент",
    text: ["Развиваем существующие", "страницы и материалы."],
    icon: "M5 20V11M11 20V5M17 20v-7M3 20h18",
  },
] as const;

export function VolhonkaLive() {
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
    <section id="live-site" className={styles.section} aria-labelledby="vl-title">
      <div
        ref={rootRef}
        className={`${styles.stage} ${seen ? styles.seen : ""}`}
        data-armed={armed ? "true" : undefined}
      >
        <div className={styles.glow} aria-hidden="true" />

        <div className={`${styles.copy} ${styles.rev}`}>
          <p className={styles.eyebrow}>
            <b>03</b> · Живой сайт
          </p>
          <h2 id="vl-title">
            Сайт не закончили.{" "}
            <br />
            С ним работают{" "}
            <br />
            <em>каждый день.</em>
          </h2>
          <p className={styles.description}>
            После запуска мы продолжаем развивать сайт вместе с Металлобазой
            Волхонка: обновляем цены и ассортимент, добавляем новые страницы,
            улучшаем существующие разделы и функциональность.
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
            src="/cases/volhonka-live-ui.avif"
            alt="Сайт Металлобазы Волхонка после запуска: обновлённый каталог профильных труб, карточка товара с ценой, статья в блоге и отметки об изменениях — новые позиции, обновлённые цены, добавленная статья"
            fill
            sizes="(max-width: 900px) 100vw, 60vw"
          />
        </div>

        <p className={`${styles.final} ${styles.rev} ${styles.d5}`}>
          <span>Сайт развивается вместе с бизнесом —</span>
          <em>а не остаётся таким, каким был в день запуска.</em>
        </p>
      </div>
    </section>
  );
}

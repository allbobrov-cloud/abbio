"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./VolhonkaBrand.module.css";

// Состояние появления выставляется до первой отрисовки, иначе финал успевает мигнуть.
const useArmingEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/*
 * Композиция в сетке 1672 × 941 (пропорции фонового изображения).
 * Фон — готовый replaceable asset: public/cases/volhonka-brand-bg.avif.
 */
const W = 1672;
const H = 941;
const pctX = (v: number) => `${(v / W) * 100}%`;
const pctY = (v: number) => `${(v / H) * 100}%`;

const parts = [
  {
    n: "01",
    title: "Сайт",
    text: ["единый", "визуальный образ"],
    icon: "M3 5h18v11H3zM9 20h6M12 16v4",
    x: 716, y: 176, w: 236,
  },
  {
    n: "02",
    title: "Каталог",
    text: ["понятное", "предложение"],
    icon: "m12 3 9 4.5-9 4.5-9-4.5L12 3ZM3 12l9 4.5 9-4.5M3 16.5 12 21l9-4.5",
    x: 968, y: 176, w: 236,
  },
  {
    n: "03",
    title: "Поиск",
    text: ["постоянная", "видимость"],
    icon: "M10.5 4a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM15.5 15.5l5 5",
    x: 716, y: 566, w: 236,
  },
  {
    n: "04",
    title: "Контент",
    text: ["акции · цены ·", "материалы"],
    icon: "M7 3h8l4 4v14H7zM15 3v4h4M10 12h6M10 16h6",
    x: 968, y: 566, w: 236,
  },
] as const;

export function VolhonkaBrand() {
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
    <section id="brand" className={styles.section} aria-labelledby="vb-title">
      <div className={styles.bg} aria-hidden="true">
        <Image
          src="/cases/volhonka-brand-bg.avif"
          alt=""
          fill
          sizes="100vw"
          quality={85}
        />
      </div>
      <div className={styles.shade} aria-hidden="true" />
      <div
        ref={rootRef}
        className={`${styles.stage} ${seen ? styles.seen : ""}`}
        data-armed={armed ? "true" : undefined}
      >
        <div className={`${styles.copy} ${styles.rev}`}>
          <p className={styles.eyebrow}>
            <b>01</b> · Бренд
          </p>
          <h2 id="vb-title">
            Металлобаза{" "}
            <br />
            стала <em>брендом.</em>
          </h2>
          <p className={styles.description}>
            Задача была шире разработки сайта. Нужно было сделать Металлобазу
            Волхонка заметной в Санкт-Петербурге, сформировать узнаваемый образ и
            связать его с постоянным присутствием в поиске.
          </p>
        </div>

        <p className={`${styles.final} ${styles.rev} ${styles.d4}`}>
          <span>Не просто точка продажи металла.</span>
          <em>Бренд, который находят и запоминают.</em>
        </p>

        <div className={`${styles.center} ${styles.rev} ${styles.d1}`}>
          <small>Региональный digital-бренд</small>
          <strong>
            Металлобаза{" "}
            <br />
            Волхонка
          </strong>
          <span>Сайт · Каталог · Поиск · Контент</span>
        </div>

        <ul className={styles.parts}>
          {parts.map((p, i) => (
            <li
              key={p.n}
              className={styles.rev}
              style={
                {
                  "--x": pctX(p.x),
                  "--y": pctY(p.y),
                  "--w": pctX(p.w),
                  transitionDelay: `${0.5 + i * 0.12}s`,
                } as CSSProperties
              }
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d={p.icon} />
              </svg>
              <span>
                <b>{p.title}</b>
                {p.text[0]}{" "}
                <br />
                {p.text[1]}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

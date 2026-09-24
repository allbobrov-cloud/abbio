"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./OssResult.module.css";

// Состояние появления выставляется до первой отрисовки, иначе финал успевает мигнуть.
const useArmingEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/*
 * Показатели — в одном месте, остальные компоненты берут значения отсюда.
 * TODO(content): значения переданы владельцем и требуют подтверждения перед публикацией.
 * Чтобы добавить третий показатель (например, обращения), допишите элемент в STATS.
 */
const REGIONS = "35";
const TRAFFIC = "25–30 тыс.";
const STATS = [
  {
    key: "traffic",
    value: TRAFFIC,
    label: "пользователей в месяц*",
    caption: ["Органический поиск"],
  },
  {
    key: "regions",
    value: REGIONS,
    label: "региональных\nнаправлений",
    caption: ["Одна система —", `без ${REGIONS} отдельных проектов`],
  },
] as const;

/* Композиция в сетке 1536 × 1024 */
const W = 1536;
const H = 1024;
const pctX = (v: number) => `${(v / W) * 100}%`;
const pctY = (v: number) => `${(v / H) * 100}%`;

const parts = [
  {
    key: "catalog",
    title: "Каталог",
    text: ["Тысячи товарных", "сценариев"],
    icon: "m12 3 9 4.5-9 4.5-9-4.5L12 3ZM3 12l9 4.5 9-4.5M3 16.5 12 21l9-4.5",
    x: 866, y: 80, w: 270, h: 99,
  },
  {
    key: "entry",
    title: "Точки входа",
    text: ["Марки · ГОСТы ·", "статьи"],
    icon: "M7 3h8l4 4v14H7zM15 3v4h4M10 12h6M10 16h6",
    x: 564, y: 195, w: 256, h: 105,
  },
  {
    key: "geo",
    title: "География",
    text: [`${REGIONS} региональных`, "направлений"],
    icon: "M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11ZM12 10m-2.4 0a2.4 2.4 0 1 0 4.8 0 2.4 2.4 0 1 0-4.8 0",
    x: 564, y: 351, w: 256, h: 104,
  },
  {
    key: "ux",
    title: "UX / UI",
    text: ["Понятный путь", "к продукции"],
    icon: "M3 5h18v11H3zM9 20h6M12 16v4",
    x: 1203, y: 195, w: 270, h: 105,
  },
  {
    key: "seo",
    title: "SEO",
    text: [TRAFFIC, "пользователей / мес.*"],
    icon: "M10.5 4a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM15.5 15.5l5 5",
    x: 1196, y: 352, w: 275, h: 105,
  },
] as const;

const NODE = { x: 1005, y: 341, r: 125 };

export function OssResult() {
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
    <section id="result" className={styles.section} aria-labelledby="oss-result-title">
      <div className={styles.bg} aria-hidden="true" />
      <div
        ref={rootRef}
        className={`${styles.stage} ${seen ? styles.seen : ""}`}
        data-armed={armed ? "true" : undefined}
      >
        <div className={styles.glow} aria-hidden="true" />

        <div className={`${styles.copy} ${styles.rev}`}>
          <p className={styles.eyebrow}>06 · Результат</p>
          <h2 id="oss-result-title">
            Не просто сайт.
            {" "}
            <br />
            Система для работы
            {" "}
            <br />
            со спросом.
          </h2>
          <p className={styles.description}>
            Каталог, справочная структура, регионы
            {" "}
            <br />
            и органический поиск работают вместе —
            {" "}
            <br />
            помогают находить нужную продукцию
            {" "}
            <br />
            и приводят пользователей к обращению.
          </p>
        </div>

        <p className={`${styles.cap} ${styles.capL} ${styles.rev} ${styles.d4}`}>
          Цифровая система
          <br />
          для реального бизнеса
          <br />
          в металлургии
        </p>
        <p className={`${styles.cap} ${styles.capR} ${styles.rev} ${styles.d4}`}>
          Больше
          <br />
          возможностей
          <br />
          для роста
          <br />
          вашего бизнеса
        </p>

        <svg className={styles.net} viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
          <circle className={styles.ring} cx={NODE.x} cy={NODE.y + 40} r="500" />
          <g className={styles.wires}>
            <path pathLength={1} d="M 1005 179 V 216" />
            <path pathLength={1} d="M 820 254 C 850 254, 866 284, 887 308" />
            <path pathLength={1} d="M 820 403 C 850 403, 866 372, 887 372" />
            <path pathLength={1} d="M 1203 254 C 1170 254, 1150 284, 1127 308" />
            <path pathLength={1} d="M 1196 403 C 1160 403, 1146 372, 1127 372" />
            <path className={styles.hotWire} pathLength={1} d="M 1005 466 V 498 M 1005 541 V 546 M 1005 613 V 618 M 1005 686" />
          </g>
          <g className={styles.pts}>
            <circle cx="1005" cy="179" r="3.5" />
            <circle cx="1005" cy="216" r="3.5" />
            <circle cx="820" cy="254" r="3.5" />
            <circle cx="820" cy="403" r="3.5" />
            <circle cx="1203" cy="254" r="3.5" />
            <circle cx="1196" cy="403" r="3.5" />
            <circle cx="1005" cy="466" r="4" />
          </g>
          <path className={styles.flowArrow} d="M 1005 548 V 566 M 999 560 l 6 6 6 -6 M 1005 620 V 638 M 999 632 l 6 6 6 -6" />
        </svg>

        <div className={`${styles.node} ${styles.rev} ${styles.d1}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.nodeLogo} src="/cases/oss-logo.svg" alt="" width="26" height="40" />
          <small>Оборонспецсплав</small>
          <strong>
            Единая
            <br />
            система
          </strong>
          <span>
            Каталог · Содержание
            <br />
            Регионы · SEO
          </span>
        </div>

        {parts.map((p, i) => (
          <div
            key={p.key}
            className={`${styles.part} ${styles.rev} ${p.key === "seo" ? styles.seoPart : ""}`}
            style={
              {
                "--x": pctX(p.x),
                "--y": pctY(p.y),
                "--w": pctX(p.w),
                "--h": pctY(p.h),
                transitionDelay: `${0.45 + i * 0.1}s`,
              } as CSSProperties
            }
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d={p.icon} />
            </svg>
            <span>
              <b>{p.title}</b>
              {p.text[0]}
              {" "}
              <br />
              {p.text[1]}
            </span>
          </div>
        ))}

        <ol className={`${styles.flow} ${styles.rev} ${styles.d3}`}>
          <li>Система</li>
          <li className={styles.hot}>Спрос</li>
          <li className={styles.end}>Обращение</li>
        </ol>

        <div className={`${styles.stats} ${styles.rev} ${styles.d4}`}>
          {STATS.map((s) => (
            <div key={s.key} className={styles[s.key]}>
              <p className={styles.big}>
                <strong>{s.value}</strong>
                {s.key === "regions" ? (
                  <span>
                    {s.label.split("\n")[0]}
                    <br />
                    {s.label.split("\n")[1]}
                  </span>
                ) : (
                  <b>{s.label}</b>
                )}
              </p>
              <p className={styles.capt}>
                {s.caption[0]}
                {s.caption[1] ? (
                  <>
                    <br />
                    {s.caption[1]}
                  </>
                ) : null}
              </p>
            </div>
          ))}
        </div>
        <p className={`${styles.note} ${styles.rev} ${styles.d4}`}>
          * Точные показатели уточняются перед публикацией кейса
        </p>

        <p className={`${styles.final} ${styles.rev} ${styles.d5}`}>
          Сложность осталась внутри системы.
          <br />
          Снаружи — понятный путь <em>от поиска до обращения.</em>
        </p>
        <p className={`${styles.cap} ${styles.capF} ${styles.rev} ${styles.d5}`}>
          Реальный спрос.
          <br />
          Реальные результаты.
        </p>
      </div>
    </section>
  );
}

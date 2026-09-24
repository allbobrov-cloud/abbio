"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./OssGeo.module.css";

// Состояние появления выставляется до первой отрисовки, иначе финал успевает мигнуть.
const useArmingEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/*
 * Композиция в сетке 1536 × 1024. Центральный visual — готовый replaceable asset
 * public/cases/oss-geo-visual.webp (1536 × 1024, RGBA): переключатель городов
 * и страница товара. Всё остальное — HTML/SVG.
 * TODO(content): «35 региональных направлений» и список городов сверить с клиентом.
 */
const W = 1536;
const H = 1024;
const pctX = (v: number) => `${(v / W) * 100}%`;
const pctY = (v: number) => `${(v / H) * 100}%`;

const system = [
  { label: "Каталог", d: "M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" },
  { label: "Марки", d: "m12 3 9 4.5-9 4.5-9-4.5L12 3ZM3 12l9 4.5 9-4.5M3 16.5 12 21l9-4.5" },
  { label: "ГОСТы", d: "M7 3h8l4 4v14H7zM15 3v4h4M10 12h6M10 16h6" },
  { label: "Статьи", d: "M3 5h7a2 2 0 0 1 2 2v13a2 2 0 0 0-2-2H3V5ZM21 5h-7a2 2 0 0 0-2 2v13a2 2 0 0 1 2-2h7V5Z" },
] as const;

/* Города ветки: y — центр чипа в сетке */
const cities = [
  { name: "Москва", y: 452 },
  { name: "Санкт-Петербург", y: 494 },
  { name: "Краснодар", y: 535, active: true },
  { name: "Калининград", y: 577 },
  { name: "Саратов", y: 618 },
  { name: "Ростов-на-Дону", y: 660 },
  { name: "Екатеринбург", y: 701 },
  { name: "Казань", y: 743 },
  { name: "...", y: 785 },
] as const;

/* Города вокруг visual: label — позиция текста, dot — узел */
const around = [
  { name: "Санкт-Петербург", label: [511, 188], dot: [646, 183], op: 0.9 },
  { name: "Казань", label: [1360, 190], dot: [1340, 190], op: 0.9, right: true },
  { name: "Екатеринбург", label: [1380, 290], dot: [1360, 290], op: 0.8, right: true },
  { name: "Калининград", label: [1413, 422], dot: [1393, 420], op: 0.85, right: true },
  { name: "Саратов", label: [1414, 521], dot: [1393, 518], op: 0.8, right: true },
  { name: "Москва", label: [520, 532], dot: [592, 530], op: 0.3 },
  { name: "Ростов-на-Дону", label: [520, 610], dot: [575, 580], op: 0.3 },
  { name: "и ещё 27 городов", label: [1365, 650], dot: [1404, 622], op: 0.32, right: true },
] as const;

const NODE = { x: 287, y: 600 };
const ROWS = cities.map((c) => c.y);
const ACTIVE = cities.find((c) => "active" in c)!;

export function OssGeo() {
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
    <section id="geography" className={styles.section} aria-labelledby="oss-geo-title">
      <div className={styles.bg} aria-hidden="true" />
      <div
        ref={rootRef}
        className={`${styles.stage} ${seen ? styles.seen : ""}`}
        data-armed={armed ? "true" : undefined}
      >
        <div className={styles.glow} aria-hidden="true" />

        <div className={`${styles.copy} ${styles.rev}`}>
          <p className={styles.eyebrow}>04 · География</p>
          <h2 id="oss-geo-title">
            Один каталог.
            {" "}
            <br />
            Разный спрос
            {" "}
            <br />
            в разных городах.
          </h2>
          <p className={styles.description}>
            Единая структура сайта масштабируется под региональный спрос. Каталог,
            марки, ГОСТы и материалы получают региональные точки входа без
            создания отдельных сайтов вручную.
          </p>
        </div>

        <div className={`${styles.system} ${styles.rev} ${styles.d1}`}>
          <p>Единая система</p>
          <ul>
            {system.map((item) => (
              <li key={item.label}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d={item.d} />
                </svg>
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Сеть: ветка городов слева и абстрактная сеть вокруг visual */}
        <svg className={styles.net} viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
          <path className={`${styles.link} ${styles.l1}`} pathLength={1} d={`M 231 ${NODE.y} H ${NODE.x}`} />
          <path
            className={`${styles.link} ${styles.l2}`}
            pathLength={1}
            d={`M ${NODE.x} ${ROWS[0]} V ${ROWS[ROWS.length - 1]} M ${NODE.x} ${NODE.y} H 322`}
          />
          {cities.map((c) => (
            <path
              key={c.name}
              className={`${styles.link} ${styles.l2} ${"active" in c ? styles.hot : ""}`}
              pathLength={1}
              d={`M ${NODE.x} ${c.y} H 350`}
            />
          ))}
          <path
            className={`${styles.link} ${styles.hot} ${styles.l3}`}
            pathLength={1}
            d={`M ${NODE.x} ${NODE.y} V ${ACTIVE.y} H 350`}
          />
          <circle className={`${styles.node} ${styles.hotNode}`} cx={NODE.x} cy={NODE.y} r="6" />

          {/* URL → карточка региона */}
          <path className={`${styles.link} ${styles.hot} ${styles.l3}`} pathLength={1} d="M 978 200 V 240" />

          {/* Города вокруг */}
          <path className={`${styles.link} ${styles.soft} ${styles.l3}`} pathLength={1} d="M 646 183 C 700 190, 720 210, 740 236" />
          <path className={`${styles.link} ${styles.soft} ${styles.l3}`} pathLength={1} d="M 1340 190 C 1290 196, 1260 216, 1244 238" />
          <path className={`${styles.link} ${styles.soft} ${styles.l3}`} pathLength={1} d="M 1360 290 C 1330 300, 1320 315, 1316 330" />
          <path className={`${styles.link} ${styles.soft} ${styles.l3}`} pathLength={1} d="M 1393 420 C 1360 424, 1345 440, 1336 460" />
          <path className={`${styles.link} ${styles.soft} ${styles.l3}`} pathLength={1} d="M 1393 518 C 1370 520, 1350 526, 1338 540" />
          <path className={`${styles.link} ${styles.hot} ${styles.l3}`} pathLength={1} d="M 548 309 C 548 340, 560 366, 570 385 C 590 410, 620 420, 640 420" />
          {around.map((c) => (
            <circle key={c.name} className={`${styles.node} ${styles.late}`} cx={c.dot[0]} cy={c.dot[1]} r="4" style={{ opacity: c.op }} />
          ))}
          <circle className={`${styles.node} ${styles.hotNode} ${styles.late}`} cx="548" cy="309" r="6" />
          <circle className={`${styles.node} ${styles.hotNode} ${styles.late}`} cx="570" cy="385" r="4" />
        </svg>

        <ul className={styles.tree}>
          {cities.map((c, i) => (
            <li
              key={c.name}
              className={`${"active" in c ? styles.active : ""} ${styles.rev}`}
              style={
                {
                  "--y": pctY(c.y - 17),
                  transitionDelay: `${0.45 + i * 0.06}s`,
                } as CSSProperties
              }
            >
              {c.name}
            </li>
          ))}
        </ul>

        <ul className={styles.around}>
          {around.map((c) => (
            <li
              key={c.name}
              className={`${styles.late} ${styles.rev}`}
              style={
                {
                  "--x": pctX(c.label[0]),
                  "--y": pctY(c.label[1] - 11),
                  "--o": c.op,
                } as CSSProperties
              }
            >
              {c.name}
            </li>
          ))}
          <li
            className={`${styles.krd} ${styles.late} ${styles.rev}`}
            style={{ "--x": pctX(506), "--y": pctY(268) } as CSSProperties}
          >
            Краснодар
          </li>
        </ul>

        <div className={`${styles.urls} ${styles.rev} ${styles.late}`}>
          <p className={styles.urlBase}>
            <span>oboronspecsplav.ru/catalog/list-12h18n10t</span>
          </p>
          <i aria-hidden="true">↓</i>
          <p className={styles.urlReg}>
            <em>krasnodar.</em>
            oboronspecsplav.ru/catalog/list-12h18n10t
          </p>
        </div>

        <div className={`${styles.visual} ${styles.rev} ${styles.visualRev}`}>
          <Image
            src="/cases/oss-geo-visual.webp"
            alt="Региональная версия каталога: переключатель городов с активным Краснодаром и страница товара «Лист 12Х18Н10Т» с характеристиками и наличием в Краснодаре"
            fill
            sizes="(max-width: 1180px) 130vw, 58vw"
          />
        </div>

        <div className={`${styles.stat} ${styles.rev} ${styles.d3}`}>
          <strong>35</strong>
          <span>
            региональных
            <br />
            направлений
          </span>
          <p>
            Одна система —
            <br />
            без 35 отдельных проектов.
          </p>
        </div>

        <p className={`${styles.accent} ${styles.rev} ${styles.d3}`}>
          <span>Там, где нужна металлургия.</span>
          <em>Там, где вы.</em>
        </p>

        <ul className={styles.chips} aria-label="Региональные направления">
          {["Москва", "СПб", "Краснодар", "Калининград", "Саратов", "..."].map((name) => (
            <li key={name} className={name === "Краснодар" ? styles.chipOn : ""}>
              {name}
            </li>
          ))}
        </ul>
        <div className={styles.urlsMobile}>
          <p>oboronspecsplav.ru</p>
          <i aria-hidden="true">↓</i>
          <p>
            <em>krasnodar.</em>oboronspecsplav.ru
          </p>
        </div>
      </div>
    </section>
  );
}

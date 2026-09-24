"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./OssSeo.module.css";

// Состояние появления выставляется до первой отрисовки, иначе финал успевает мигнуть.
const useArmingEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/*
 * Данные результата — в одном месте.
 * TODO(content): TRAFFIC переданo владельцем и требует подтверждения перед публикацией.
 * LEADS: значение взято из референса владельца и тоже требует подтверждения.
 * Если поставить null — вместо числа покажется нейтральный блок «Обращения».
 */
const TRAFFIC = { value: "25–30 тыс.", label: "пользователей в месяц", note: "органический поиск" };
const LEADS: { value: string | null; label: string } = {
  value: "600–700",
  label: "обращений в месяц",
};

/* Композиция в сетке 1536 × 1024 */
const W = 1536;
const H = 1024;
const pctY = (v: number) => `${(v / H) * 100}%`;

const rows = [
  { query: "лист 12х18н10т", kind: "Коммерческий запрос", type: "Товар", sub: "Страница товара", icon: "box", y: 374 },
  { query: "12х18н10т характеристики", kind: "Информационный запрос", type: "Марка", sub: "Марочник", icon: "flask", y: 465 },
  { query: "гост 5632-2014", kind: "Нормативный запрос", type: "ГОСТ", sub: "Страница ГОСТ", icon: "doc", y: 555 },
  { query: "как выбрать нержавеющую сталь", kind: "Экспертный запрос", type: "Статья", sub: "Экспертный материал", icon: "book", y: 647 },
  { query: "лист 12х18н10т краснодар", kind: "Региональный запрос", type: "Регион", sub: "Региональная страница", icon: "pin", y: 739 },
] as const;

const ICONS: Record<(typeof rows)[number]["icon"], string> = {
  box: "m12 3 8 4.2v9.6L12 21l-8-4.2V7.2L12 3ZM4 7.2l8 4.3 8-4.3M12 11.5V21",
  flask: "M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 18l-5-9V3M7.5 15h9",
  doc: "M7 3h8l4 4v14H7zM15 3v4h4M10 12h6M10 16h6",
  book: "M3 5h7a2 2 0 0 1 2 2v13a2 2 0 0 0-2-2H3V5ZM21 5h-7a2 2 0 0 0-2 2v13a2 2 0 0 1 2-2h7V5Z",
  pin: "M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11ZM12 10m-2.4 0a2.4 2.4 0 1 0 4.8 0 2.4 2.4 0 1 0-4.8 0",
};

const NODE = { x: 1032, y: 522 };

/* Кривая от карточки к узлу: красный усиливается ближе к центру за счёт градиента stroke */
function toNode(y: number) {
  const ty = NODE.y + (y - NODE.y) * 0.16;
  return `M 765 ${y} C 860 ${y}, 880 ${ty}, 941 ${ty}`;
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.5 15.5 5 5" />
    </svg>
  );
}

export function OssSeo() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(true);
  const [armed, setArmed] = useState(false);
  const [hover, setHover] = useState<number | null>(null);

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

  const cls = (i: number) =>
    hover === null ? "" : hover === i ? styles.hl : styles.dim;

  return (
    <section id="seo" className={styles.section} aria-labelledby="oss-seo-title">
      <div className={styles.bg} aria-hidden="true" />
      <div
        ref={rootRef}
        className={`${styles.stage} ${seen ? styles.seen : ""}`}
        data-armed={armed ? "true" : undefined}
      >
        <div className={styles.glow} aria-hidden="true" />

        <div className={`${styles.copy} ${styles.rev}`}>
          <p className={styles.eyebrow}>05 · SEO</p>
          <h2 id="oss-seo-title">
            Структура сайта стала
            {" "}
            <br />
            структурой поискового спроса.
          </h2>
          <p className={styles.description}>
            Каталог, марки, ГОСТы, экспертные материалы
            {" "}
            <br />
            и региональные страницы охватывают разные сценарии
            {" "}
            <br />
            поиска — от конкретного товара до вопроса о свойствах
            {" "}
            <br />
            материала.
          </p>
        </div>

        <svg className={styles.net} viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
          <defs>
            <linearGradient id="oss-seo-flow" gradientUnits="userSpaceOnUse" x1="765" y1="0" x2="941" y2="0">
              <stop offset="0" stopColor="#ff7386" stopOpacity="0.95" />
              <stop offset="0.55" stopColor="#ff4a60" stopOpacity="0.95" />
              <stop offset="1" stopColor="#ff3a52" stopOpacity="1" />
            </linearGradient>
          </defs>
          {rows.map((r, i) => (
            <g key={r.query} className={`${styles.route} ${cls(i)}`}>
              <path className={`${styles.cold} ${styles.a1}`} pathLength={1} d={`M 383 ${r.y} H 515`} />
              <path className={`${styles.flow} ${styles.a2}`} pathLength={1} d={toNode(r.y)} />
              <circle className={styles.dot} cx="383" cy={r.y} r="3.5" />
              <circle className={styles.rdot} cx="510" cy={r.y} r="3.2" />
              <circle className={styles.rdot} cx="769" cy={r.y} r="3.2" />
            </g>
          ))}
          <path className={`${styles.out} ${styles.a3}`} pathLength={1} d="M 1126 522 H 1160 C 1182 522, 1176 397, 1200 397" />
          <path className={`${styles.out} ${styles.a3}`} pathLength={1} d="M 1340 470 V 503 M 1340 547 V 580" />
          <circle className={styles.rdot} cx="1126" cy="522" r="3.5" />
          <circle className={styles.rdot} cx="1200" cy="397" r="3.2" />
          <circle className={styles.rdot} cx="1340" cy="469" r="3" />
          <circle className={styles.rdot} cx="1340" cy="580" r="3" />
          <path className={styles.arc} d="M 800 1024 C 980 860, 1240 745, 1536 712" />
        </svg>

        <ol className={styles.pairs}>
          {rows.map((r, i) => (
            <li
              key={r.query}
              className={`${styles.pair} ${cls(i)}`}
              style={{ "--y": pctY(r.y - 22), "--ty": pctY(r.y - 39) } as CSSProperties}
            >
              <div className={`${styles.query} ${styles.rev}`} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} style={{ transitionDelay: `${0.1 + i * 0.07}s` }}>
                <p>
                  <SearchIcon />
                  {r.query}
                </p>
                <small>{r.kind}</small>
              </div>
              <i className={styles.down} aria-hidden="true">↓</i>
              <div className={`${styles.card} ${styles.rev}`} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} style={{ transitionDelay: `${0.4 + i * 0.07}s` }}>
                <svg className={styles.ic} viewBox="0 0 24 24" aria-hidden="true">
                  <path d={ICONS[r.icon]} />
                </svg>
                <span>
                  <b>{r.type}</b>
                  <small>{r.sub}</small>
                </span>
                <svg className={styles.chev} viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m9 6 6 6-6 6" />
                </svg>
              </div>
            </li>
          ))}
        </ol>

        <div className={`${styles.node} ${styles.rev} ${styles.d2}`}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path d="m15.5 15.5 5 5" />
          </svg>
          <span>
            Органический
            <br />
            поиск
          </span>
        </div>

        <div className={`${styles.result} ${styles.r1} ${styles.rev} ${styles.d3}`}>
          <strong>
            {TRAFFIC.value.slice(0, TRAFFIC.value.lastIndexOf(" "))}
            <span> {TRAFFIC.value.slice(TRAFFIC.value.lastIndexOf(" ") + 1)}</span>
          </strong>
          <b>{TRAFFIC.label}</b>
          <small>{TRAFFIC.note}</small>
        </div>
        <i className={`${styles.resArrow} ${styles.rev} ${styles.d3}`} aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M12 5v14M6 13l6 6 6-6" />
          </svg>
        </i>
        <div className={`${styles.result} ${styles.r2} ${styles.rev} ${styles.d4}`}>
          {LEADS.value ? (
            <>
              <strong>{LEADS.value}</strong>
              <b>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3.5 7 8.5 6 8.5-6" />
                </svg>
                {LEADS.label}
              </b>
            </>
          ) : (
            <>
              <small className={styles.up}>Обращения</small>
              <b>из органического поиска</b>
            </>
          )}
        </div>

        <p className={`${styles.cap} ${styles.capTop} ${styles.rev}`}>
          Разные запросы.
          <br />
          Одна система.
          <br />
          Реальный результат.
        </p>
        <p className={`${styles.cap} ${styles.capBottom} ${styles.rev} ${styles.d4}`}>
          Больше видимости.
          <br />
          Больше возможностей
          <br />
          для бизнеса.
        </p>

        <p className={`${styles.accent} ${styles.rev} ${styles.d4}`}>
          <span>Не одна SEO-страница.</span>
          <em>Система точек входа под реальный спрос.</em>
        </p>
      </div>
    </section>
  );
}

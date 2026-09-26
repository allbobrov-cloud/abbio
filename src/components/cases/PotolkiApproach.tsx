"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./PotolkiApproach.module.css";

// Состояние появления выставляется до первой отрисовки, иначе финал успевает мигнуть.
const useArmingEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

const ICON = {
  page: "M4 5h16v14H4zM4 9h16M8 7h.01",
  ads: "M5 20v-6M11 20V9M17 20V4",
  users: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3 20a6 6 0 0 1 12 0M16 8a3 3 0 0 1 0 6M18 20a5 5 0 0 0-3-4.6",
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM20 20l-4-4",
  panel: "M3 6h18v12H3zM3 10h18",
  sun: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4",
  tag: "M3 12V4h8l10 10-8 8L3 12ZM7.5 8h.01",
  image: "M4 5h16v14H4zM4 16l4.5-4.5 4 4 3-3L20 16M9 9.5h.01",
  layers: "m12 3 9 4.5-9 4.5-9-4.5L12 3ZM3 12l9 4.5 9-4.5M3 16.5 12 21l9-4.5",
  doc: "M7 3h8l4 4v14H7zM15 3v4h4M10 12h6M10 16h6",
} as const;

const USUAL = [
  { title: "Лендинг", text: "1 страница", icon: ICON.page },
  { title: "Директ", text: "Платный трафик", icon: ICON.ads },
  { title: "Обращения", text: "Заявки с рекламы", icon: ICON.users },
] as const;

const LEFT = [
  { title: ["Натяжные", "потолки"], icon: ICON.panel },
  { title: ["Освещение"], icon: ICON.sun },
  { title: ["Цены"], icon: ICON.tag },
] as const;
const RIGHT = [
  { title: ["Реальные", "объекты"], icon: ICON.image },
  { title: ["Решения"], icon: ICON.layers },
  { title: ["Полезные", "статьи"], icon: ICON.doc },
] as const;

function Svg({ d, className }: { d: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

function Down({ className }: { className?: string }) {
  return (
    <span className={className} aria-hidden="true">
      <svg viewBox="0 0 16 40">
        <path d="M8 1v34M2 29l6 7 6-7" />
      </svg>
    </span>
  );
}

function Dir({
  item,
  side,
  n,
  tint,
}: {
  item: { title: readonly string[]; icon: string };
  side: "l" | "r";
  n: number;
  tint?: boolean;
}) {
  return (
    <li className={`${styles.dir} ${side === "l" ? styles.dl : styles.dr} ${styles[`row${n}`]} ${tint ? styles.tint : ""} ${styles.rev}`}>
      <Svg d={item.icon} />
      <span>
        {item.title[0]}
        {item.title[1] ? (
          <>
            {" "}
            <br />
            {item.title[1]}
          </>
        ) : null}
      </span>
    </li>
  );
}

export function PotolkiApproach() {
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
        // Когда появление закончилось, снимаем «взведённое» состояние: задержки входа не мешают hover.
        window.setTimeout(() => setArmed(false), 6000);
      },
      { threshold: 0.15 }
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="approach" className={styles.section} aria-labelledby="pa-title">
      <div
        ref={rootRef}
        className={`${styles.stage} ${seen ? styles.seen : ""}`}
        data-armed={armed ? "true" : undefined}
      >
        <div className={styles.grid}>
          <div className={`${styles.copy} ${styles.rev}`}>
            <p className={styles.eyebrow}>
              <b>01</b>
              <i aria-hidden="true" />
              Другой подход
            </p>
            <h2 id="pa-title">
              В этой нише обычно{" "}
              <br />
              делают лендинг.{" "}
              <br />
              <em>
                Мы сразу строили{" "}
                <br />
                сайт под поиск.
              </em>
            </h2>
            <p className={styles.description}>
              Вместо одной рекламной страницы — структура, которую можно
              развивать под разные услуги, решения и поисковые запросы.
            </p>
          </div>

          <div className={`${styles.usual} ${styles.rev}`}>
            <p className={styles.tag}>
              <i aria-hidden="true" />
              Обычно
            </p>
            <ol>
              {USUAL.map((u, i) => (
                <li key={u.title}>
                  <div className={styles.uCard}>
                    <Svg d={u.icon} />
                    <span>
                      <b>{u.title}</b>
                      {u.text}
                    </span>
                  </div>
                  {i < USUAL.length - 1 ? <Down className={styles.uArrow} /> : null}
                </li>
              ))}
            </ol>
            <p className={styles.alert}>
              <span aria-hidden="true">!</span>
              Трафик зависит{" "}
              <br />
              от рекламы
            </p>
          </div>

          <div className={styles.ours}>
            <p className={`${styles.tag} ${styles.tagRed} ${styles.rev}`}>
              <i aria-hidden="true" />
              Наш подход
            </p>

            <div className={`${styles.demand} ${styles.rev}`}>
              <span className={styles.demandIcon}>
                <Svg d={ICON.search} />
              </span>
              <span>
                <b>Поисковый спрос</b>
                разные запросы · разные потребности
              </span>
            </div>
            <Down className={`${styles.arrow} ${styles.a1} ${styles.rev}`} />

            <div className={`${styles.site} ${styles.rev}`}>
              <span className={styles.chrome} aria-hidden="true">
                <i />
                <i />
                <i />
                <em />
              </span>
              {/* Оригинальный логотип клиента (тёмная версия для светлого фона) */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className={styles.logo} src="/cases/potolki-logo-dark.svg" alt="Потолки Всем" width="490" height="143" />
              <strong>Многостраничный сайт</strong>
              <span className={styles.sub}>структура под SEO</span>
            </div>

            <ul className={styles.dirs} aria-label="Направления сайта">
              {LEFT.map((d, i) => (
                <Dir key={d.title[0]} item={d} side="l" n={i + 1} tint={d.title[0] === "Цены"} />
              ))}
              {RIGHT.map((d, i) => (
                <Dir key={d.title[0]} item={d} side="r" n={i + 1} tint={d.title[0] === "Реальные"} />
              ))}
            </ul>

            <Down className={`${styles.arrow} ${styles.a2} ${styles.rev}`} />
            <div className={`${styles.result} ${styles.rev}`}>
              <span className={styles.demandIcon}>
                <Svg d={ICON.users} />
              </span>
              <span>
                <b>Обращения</b>
                из органического поиска
              </span>
            </div>
          </div>
        </div>

        <div className={`${styles.final} ${styles.rev}`}>
          <p>
            Не покупать каждый переход.
            <em>Создавать собственную поисковую видимость.</em>
          </p>
          <p className={styles.finalNote}>
            Продуманная структура сайта —{" "}
            <br />
            основа для дальнейшего SEO-развития.
          </p>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./PotolkiSeo.module.css";

// Состояние появления выставляется до первой отрисовки, иначе финал успевает мигнуть.
const useArmingEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

const ICON = {
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM20 20l-4-4",
  home: "m3 11 9-7 9 7M5 10v10h14V10M10 20v-6h4v6",
  layers: "m12 3 9 4.5-9 4.5-9-4.5L12 3ZM3 12l9 4.5 9-4.5M3 16.5 12 21l9-4.5",
  sun: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4",
  tag: "M3 12V4h8l10 10-8 8L3 12ZM7.5 8h.01",
  grid: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
  doc: "M7 3h8l4 4v14H7zM15 3v4h4M10 12h6M10 16h6",
  target: "M12 21a9 9 0 1 1 9-9M12 16a4 4 0 1 1 4-4M12 12l8-8M17 3v4h4",
} as const;

// Поисковые формулировки — примеры спроса; без частотности и позиций.
const QUERIES = [
  "натяжной потолок на кухню",
  "натяжной потолок с трековым освещением",
  "теневой натяжной потолок",
  "скрытый карниз в натяжном потолке",
  "натяжной потолок в ванной",
  "цены на натяжные потолки",
] as const;

const CATS = [
  { title: "Помещения", icon: ICON.home },
  { title: "Типы потолков", icon: ICON.layers },
  { title: "Освещение", icon: ICON.sun },
  { title: "Цены", icon: ICON.tag },
  { title: "Решения", icon: ICON.grid },
  { title: "Статьи", icon: ICON.doc },
] as const;

function Arrow() {
  return (
    <svg className={styles.arrow} viewBox="0 0 40 16" aria-hidden="true">
      <path d="M1 8h36M30 1.5 37 8l-7 6.5" />
    </svg>
  );
}

function Svg({ d, className }: { d: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

export function PotolkiSeo() {
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
    <section id="seo-architecture" className={styles.section} aria-labelledby="ps-title">
      <div
        ref={rootRef}
        className={`${styles.stage} ${seen ? styles.seen : ""}`}
        data-armed={armed ? "true" : undefined}
      >
        <div className={styles.grid}>
          <div className={styles.left}>
            <div className={`${styles.head} ${styles.rev}`}>
              <p className={styles.eyebrow}>
                <b>04</b>
                <i aria-hidden="true" />
                SEO-архитектура
              </p>
              <h2 id="ps-title">
                Один сайт.{" "}
                <br />
                <em>Сотни точек входа.</em>
              </h2>
              <p className={styles.description}>
                Структуру развиваем вокруг реального поискового спроса:
                отдельные страницы отвечают на разные задачи и приводят
                пользователя сразу к нужному решению.
              </p>
            </div>

            <div className={styles.queries}>
              <h3 className={`${styles.qTitle} ${styles.rev}`}>Что ищут</h3>
              <ul>
                {QUERIES.map((q, i) => (
                  <li key={q} className={`${styles.q} ${i === 0 ? styles.active : ""} ${styles.rev} ${styles[`q${i + 1}`]}`}>
                    <Svg className={styles.qIcon} d={ICON.search} />
                    <span>{q}</span>
                    <Arrow />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={`${styles.right} ${styles.rev} ${styles.slide}`}>
            <p className={styles.tagline}>
              Каждому запросу —{" "}
              <br />
              своя страница
            </p>
            <div className={styles.browser}>
              <Image
                src="/cases/potolki-seo-browser.webp"
                alt="Страница сайта «Натяжные потолки для кухни»: адрес, шапка, заголовок, блоки решений и преимущества"
                width={1536}
                height={1024}
                sizes="(max-width: 860px) 92vw, 62vw"
                quality={90}
              />
            </div>
          </div>
        </div>

        <ul className={`${styles.cats} ${styles.rev}`} aria-label="Разделы структуры сайта">
          {CATS.map((c) => (
            <li key={c.title}>
              <Svg d={c.icon} />
              <span>{c.title}</span>
            </li>
          ))}
        </ul>

        <div className={`${styles.final} ${styles.rev}`}>
          <span className={styles.finalIcon} aria-hidden="true">
            <Svg d={ICON.target} />
          </span>
          <p className={styles.thesis}>
            Человек приходит не «на сайт вообще».
            <em>Он попадает сразу туда, где есть ответ на его запрос.</em>
          </p>
          <p className={styles.note}>
            Больше релевантных страниц —{" "}
            <br />
            больше возможностей быть найденными в поиске.
          </p>
        </div>
      </div>
    </section>
  );
}

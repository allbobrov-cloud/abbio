"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./BogovSeo.module.css";

// Состояние появления выставляется до первой отрисовки, иначе финал успевает мигнуть.
const useArmingEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/*
 * Цифры — из ТЗ владельца: 91 из 97 отслеживаемых запросов (93,8% → 94%),
 * срез 09.09.2026, Яндекс, Санкт-Петербург. Скриншота исходных данных
 * (Топвизор / Вебмастер) в проекте нет, поэтому proof-source не показываем.
 */
const MAIN_QUERY = "мотошкола санкт петербург";
const queries = [
  "мотошкола",
  "обучение на мотоцикл",
  "права на мотоцикл",
  "детская мотошкола",
  "стантрайдинг",
  "обучение на категорию а",
  "категория а",
];

/* 0 заголовок · 1 «94%» · 2 строка · 3 ввод · 4 первый результат · 5..11 запросы */
const FINAL = 4 + queries.length;

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.5 15.5 5 5" />
    </svg>
  );
}

function Stage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(FINAL);
  const [armed, setArmed] = useState(false);
  const [typed, setTyped] = useState(MAIN_QUERY.length);

  useArmingEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    setArmed(true);
    setStep(-1);
    setTyped(0);

    const timers: number[] = [];
    let typing = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }
        observer.disconnect();
        const at = [0, 350, 800, 1150, 2000];
        at.forEach((ms, i) => timers.push(window.setTimeout(() => setStep(i), ms)));
        queries.forEach((_, i) =>
          timers.push(window.setTimeout(() => setStep(5 + i), 2350 + i * 170))
        );
        timers.push(
          window.setTimeout(() => {
            let n = 0;
            typing = window.setInterval(() => {
              n += 1;
              setTyped(n);
              if (n >= MAIN_QUERY.length) {
                window.clearInterval(typing);
              }
            }, 34);
          }, 1150)
        );
      },
      { threshold: 0.25 }
    );
    observer.observe(root);
    return () => {
      observer.disconnect();
      timers.forEach((timer) => window.clearTimeout(timer));
      window.clearInterval(typing);
    };
  }, []);

  const on = (from: number) => (step >= from ? styles.isIn : "");

  return (
    <div
      ref={rootRef}
      className={styles.stage}
      data-armed={armed ? "true" : undefined}
    >
      <header className={`${styles.head} ${styles.rev} ${on(0)}`}>
        <p className={styles.eyebrow}>04 · SEO</p>
        <h2 id="seo-title" aria-label="Сделали сайт — и вывели его в поиск.">
          Сделали сайт —
          <br />
          <em>и вывели его в поиск.</em>
        </h2>
      </header>

      <p className={`${styles.intro} ${styles.rev} ${on(0)}`}>
        Развили структуру и страницы
        <br />
        под реальный поисковый спрос.
      </p>

      <div className={styles.metricVisual}>
        <div className={`${styles.helmet} ${styles.rev} ${on(0)}`} aria-hidden="true">
          <Image
            src="/cases/bogov-seo-helmet.webp"
            alt=""
            fill
            sizes="(max-width: 900px) 100vw, 90vw"
          />
        </div>

        <div className={`${styles.result} ${styles.rev} ${on(1)}`}>
          <p className={styles.big}>
            94<span>%</span>
          </p>
          <p className={styles.bigLabel}>запросов в ТОП-10</p>
          <p className={styles.sample}>91 из 97 отслеживаемых запросов</p>
          <p className={styles.context}>09.09.2026 · Яндекс · Санкт-Петербург</p>
        </div>
      </div>

      <div className={styles.serp}>
        <div className={`${styles.bar} ${styles.rev} ${on(2)}`}>
          <span className={styles.mark}>
            <Image src="/cases/yandex-mark.png" alt="" width={90} height={90} />
          </span>
          <span className={styles.query}>
            {MAIN_QUERY.slice(0, typed)}
            <i aria-hidden="true" />
          </span>
          <span className={styles.clear} aria-hidden="true">
            ×
          </span>
          <SearchIcon />
        </div>

        <nav className={`${styles.tabs} ${styles.rev} ${on(2)}`} aria-hidden="true">
          <b>Поиск</b>
          <span>Картинки</span>
          <span>Видео</span>
          <span>Карты</span>
          <span>Товары</span>
          <span>Переводчик</span>
          <span>Все</span>
        </nav>

        <article className={`${styles.featured} ${styles.rev} ${on(4)}`}>
          <span className={styles.logo} aria-hidden="true">
            Bogov
            <br />
            Team
          </span>
          <div>
            <h3>Мотошкола Владимира Богова</h3>
            <p>
              Обучаем уверенной и безопасной езде на мотоцикле —{" "}
              <br />
              от первого урока до города.
            </p>
            <span className={styles.url}>bogov-team.ru</span>
          </div>
          <b className={styles.pill}>1 место</b>
        </article>

        <ol className={styles.rows}>
          {queries.map((query, i) => (
            <li key={query} className={`${styles.rev} ${on(5 + i)}`}>
              <span className={styles.num}>{String(i + 2).padStart(2, "0")}</span>
              <SearchIcon />
              <span className={styles.q}>{query}</span>
              <b className={styles.pillSm}>1 место</b>
            </li>
          ))}
        </ol>

        <p className={`${styles.more} ${styles.rev} ${on(FINAL)}`}>
          и ещё 89 запросов
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </p>
      </div>
    </div>
  );
}

export function BogovSeo() {
  return (
    <section id="seo" className={styles.section} aria-labelledby="seo-title">
      <div className={styles.container}>
        <Stage />
      </div>
    </section>
  );
}

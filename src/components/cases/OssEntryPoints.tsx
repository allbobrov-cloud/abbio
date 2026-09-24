"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./OssEntryPoints.module.css";

// Состояние появления выставляется до первой отрисовки, иначе финал успевает мигнуть.
const useArmingEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/*
 * Три сценария входа. Изображения продукции — обычные файлы в public/cases/,
 * их можно заменить подменой файла без правок кода.
 */
const routes = [
  {
    key: "brand",
    n: "01",
    label: "Марка",
    query: "12Х18Н10Т",
    kind: "Марка стали",
    value: "12Х18Н10Т",
    icon: "layers",
    tags: ["Состав", "Свойства", "Аналоги"],
    resultTitle: "Подходящая продукция",
    image: "/cases/oss-entry-pipes.avif",
    alt: "Трубы из нержавеющей стали",
    item: "Трубы нержавеющие",
    note: ["Разные диаметры", "и исполнения"],
  },
  {
    key: "gost",
    n: "02",
    label: "ГОСТ",
    query: "ГОСТ 5632-2014",
    kind: "ГОСТ",
    value: "5632-2014",
    icon: "doc",
    tags: ["Требования", "Марки", "Применение"],
    resultTitle: "Продукция по ГОСТ",
    image: "/cases/oss-entry-sheet.avif",
    alt: "Стопка стальных листов",
    item: "Лист стальной",
    note: ["В наличии", "и под заказ"],
  },
  {
    key: "question",
    n: "03",
    label: "Вопрос",
    query: "как выбрать нержавеющую сталь",
    kind: "Экспертная статья",
    value: "Как выбрать\nнержавеющую сталь",
    icon: "doc",
    tags: ["Объяснение", "Сравнение", "Рекомендации"],
    resultTitle: "Марки и продукция",
    image: "/cases/oss-entry-rebar.avif",
    alt: "Пучок арматуры",
    item: "Подходящие марки",
    note: ["Рекомендации", "и примеры применения"],
  },
] as const;

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.5 15.5 5 5" />
    </svg>
  );
}

function Chevron() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

function KindIcon({ kind }: { kind: "layers" | "doc" }) {
  return kind === "layers" ? (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m12 3 9 4.5-9 4.5-9-4.5L12 3Z" />
      <path d="m3 12 9 4.5 9-4.5" />
      <path d="m3 16.5 9 4.5 9-4.5" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 3h8l4 4v14H7z" />
      <path d="M15 3v4h4M10 12h6M10 16h6" />
    </svg>
  );
}

export function OssEntryPoints() {
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
    <section
      id="entry-points"
      className={styles.section}
      aria-labelledby="oss-entry-title"
    >
      <div className={styles.bg} aria-hidden="true" />
      <div
        ref={rootRef}
        className={`${styles.stage} ${seen ? styles.seen : ""}`}
        data-armed={armed ? "true" : undefined}
      >
        <div className={styles.glow} aria-hidden="true" />

        <div className={`${styles.copy} ${styles.rev}`}>
          <p className={styles.eyebrow}>02 · Точки входа</p>
          <h2 id="oss-entry-title">
            Искать металл
            {" "}
            <br />
            начинают не только
            {" "}
            <br />
            с товара.
          </h2>
          <p className={styles.description}>
            Клиент может знать марку материала, искать конкретный ГОСТ или только
            разбираться в задаче. Для каждого сценария на сайте есть своя точка
            входа.
          </p>
        </div>

        <svg className={styles.lines} viewBox="0 0 1536 1024" aria-hidden="true">
          <path className={`${styles.link} ${styles.top} ${styles.lc}`} pathLength={1} d="M 990 185 H 680 Q 657 185 657 208 V 215" />
          <path className={`${styles.link} ${styles.top} ${styles.lm}`} pathLength={1} d="M 990 155 V 215" />
          <path className={`${styles.link} ${styles.top} ${styles.lr}`} pathLength={1} d="M 990 185 H 1300 Q 1323 185 1323 208 V 215" />
          <path className={`${styles.link} ${styles.hot} ${styles.bl}`} pathLength={1} d="M 657 715 V 730 Q 657 752 680 752 H 990" />
          <path className={`${styles.link} ${styles.hot} ${styles.bm}`} pathLength={1} d="M 991 715 V 792" />
          <path className={`${styles.link} ${styles.hot} ${styles.br}`} pathLength={1} d="M 1323 715 V 730 Q 1323 752 1300 752 H 990" />
          <circle className={styles.dot} cx="990" cy="185" r="4" />
          <circle className={styles.dot} cx="990" cy="752" r="4" />
        </svg>

        <div className={`${styles.search} ${styles.rev} ${styles.d1}`}>
          <SearchIcon />
          <span className={styles.ask}>Что ищет снабженец?</span>
          <span className={styles.hint}>Марка, ГОСТ, применение...</span>
          <svg className={styles.go} viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 12h16M14 6l6 6-6 6" />
          </svg>
        </div>

        <div className={styles.cols}>
          {routes.map((route, i) => (
            <article
              key={route.key}
              className={`${styles.col} ${styles[`c${i + 1}`]} ${styles.rev}`}
              style={{ transitionDelay: `${0.5 + i * 0.15}s` }}
            >
              <header>
                <b>{route.n}</b>
                <span>{route.label}</span>
              </header>
              <div className={styles.field}>
                <SearchIcon />
                {route.query}
              </div>
              <i className={styles.arrow} aria-hidden="true">↓</i>
              <div className={styles.kind}>
                <span>
                  <small>{route.kind}</small>
                  <strong>
                    {route.value.split("\n").map((line, j) => (
                      <span key={line}>
                        {j > 0 ? <br /> : null}
                        {line}
                      </span>
                    ))}
                  </strong>
                </span>
                <KindIcon kind={route.icon} />
              </div>
              <ul className={styles.tags}>
                {route.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <i className={styles.arrow} aria-hidden="true">↓</i>
              <div className={styles.result}>
                <p>
                  {route.resultTitle}
                  <Chevron />
                </p>
                <div className={styles.item}>
                  <span className={styles.thumb}>
                    <Image
                      src={route.image}
                      alt={route.alt}
                      fill
                      sizes="140px"
                    />
                  </span>
                  <span>
                    <strong>{route.item}</strong>
                    <small>
                      {route.note[0]}
                      <br />
                      {route.note[1]}
                    </small>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className={`${styles.final} ${styles.rev}`}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 4h2.4l2.2 10.2h10.2L20 7H6.2" />
            <circle cx="9" cy="19" r="1.6" />
            <circle cx="17.5" cy="19" r="1.6" />
          </svg>
          <span>
            <b>Каталог / продукция</b>
            Конкретные товары под ваш запрос
          </span>
          <Chevron />
        </div>

        <p className={`${styles.accent} ${styles.rev} ${styles.d1}`}>
          <span>Разные намерения —</span>
          <em>один коммерческий результат.</em>
        </p>
      </div>
    </section>
  );
}

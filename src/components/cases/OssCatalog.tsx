"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./OssCatalog.module.css";

// Состояние появления выставляется до первой отрисовки, иначе финал успевает мигнуть.
const useArmingEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/*
 * Показатели — из ТЗ владельца, точные значения не подтверждены данными проекта.
 * TODO(content): сверить с клиентом перед публикацией кейса.
 */
const stats = [
  { key: "categories", value: "6", label: "основных\nкатегорий" },
  { key: "kinds", value: "35+", label: "видов продукции" },
  { key: "gost", value: "Сотни", label: "марок, параметров\nи ГОСТов" },
] as const;

function StatIcon({ kind }: { kind: (typeof stats)[number]["key"] }) {
  if (kind === "categories") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m12 3 9 4.5-9 4.5-9-4.5L12 3Z" />
        <path d="m3 12 9 4.5 9-4.5" />
        <path d="m3 16.5 9 4.5 9-4.5" />
      </svg>
    );
  }
  if (kind === "kinds") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m12 3 8 4.2v9.6L12 21l-8-4.2V7.2L12 3Z" />
        <path d="m4 7.2 8 4.3 8-4.3M12 11.5V21" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 3h8l4 4v14H7z" />
      <path d="M15 3v4h4M10 12h6M10 16h6" />
    </svg>
  );
}

export function OssCatalog() {
  const rootRef = useRef<HTMLDivElement>(null);
  const visualScrollRef = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(true);
  const [armed, setArmed] = useState(false);

  useArmingEffect(() => {
    const scroller = visualScrollRef.current;
    if (!scroller) return;

    const mobile = window.matchMedia("(max-width: 760px)");
    const showCatalogRoot = () => {
      if (!mobile.matches) return;
      const imageWidth = scroller.firstElementChild?.getBoundingClientRect().width ?? 0;
      // Начальный обзор показывает верхний узел схемы; остальное остаётся доступным прокруткой.
      scroller.scrollLeft = Math.max(0, imageWidth * 0.65 - scroller.clientWidth + 32);
    };

    showCatalogRoot();
    const observer = new ResizeObserver(showCatalogRoot);
    observer.observe(scroller);
    mobile.addEventListener("change", showCatalogRoot);
    return () => {
      observer.disconnect();
      mobile.removeEventListener("change", showCatalogRoot);
    };
  }, []);

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
      id="catalog"
      className={styles.section}
      aria-labelledby="oss-catalog-title"
    >
      <div className={styles.bg} aria-hidden="true" />
      <div
        ref={rootRef}
        className={`${styles.stage} ${seen ? styles.seen : ""}`}
        data-armed={armed ? "true" : undefined}
      >
        <div className={styles.glow} aria-hidden="true" />

        <div className={`${styles.copy} ${styles.rev}`}>
          <p className={styles.eyebrow}>01 · Каталог</p>
          <h2 id="oss-catalog-title">Каталог, который нельзя было собрать вручную.</h2>
          <p className={styles.description}>
            Большая номенклатура строится по единой логике: категория, вид
            продукции, марка, параметры и ГОСТ формируют конкретные страницы под
            конкретный спрос.
          </p>
        </div>

        <p className={`${styles.accent} ${styles.rev} ${styles.d1}`}>
          <span>Одна структура.</span>
          <em>Тысячи конкретных страниц.</em>
        </p>

        <div className={`${styles.visualWrap} ${styles.rev} ${styles.visualRev}`}>
          <div ref={visualScrollRef} className={styles.visualScroll} tabIndex={0} aria-label="Схема структуры каталога, можно прокручивать по горизонтали">
            <div className={styles.visual}>
              <Image
                src="/cases/oss-catalog-structure.webp"
                alt="Схема каталога ОборонСпецСплав: раздел «Черный металлопрокат» делится на шесть категорий, активный путь от арматуры через марку А500С, диаметр 12 мм и ГОСТ 34028-2016 ведёт на страницу товара"
                fill
                sizes="(max-width: 1180px) 900px, 62vw"
              />
            </div>
          </div>
          <p className={styles.hint} aria-hidden="true">
            Схему можно листать →
          </p>
        </div>

        <ul className={styles.stats}>
          {stats.map((item, i) => (
            <li
              key={item.key}
              className={styles.rev}
              style={{ transitionDelay: `${0.35 + i * 0.12}s` }}
            >
              <StatIcon kind={item.key} />
              <span>
                <b>{item.value}</b>
                {item.label.split("\n").map((line, j) => (
                  <span key={line}>
                    {j > 0 ? <br /> : null}
                    {line}
                  </span>
                ))}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

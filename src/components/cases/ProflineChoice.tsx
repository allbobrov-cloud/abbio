"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./ProflineChoice.module.css";

// Состояние появления выставляется до первой отрисовки, иначе финал успевает мигнуть.
const useArmingEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

const CATEGORIES = [
  "Металлочерепица",
  "Профнастил",
  "Сайдинг",
  "Водосточные системы",
  "Фасадные материалы",
  "Комплектующие",
] as const;
const ACTIVE = "Профнастил";

const FILTERS = [
  { label: "Толщина", value: "0,45 мм" },
  { label: "Цвет", value: "RR 32", dot: true },
  { label: "Покрытие", value: "PE" },
  { label: "Применение", value: "Для кровли" },
] as const;

const SPECS = [
  { value: "0,45 мм", label: "Толщина" },
  { value: "RR 32", label: "Цвет" },
  { value: "PE", label: "Покрытие" },
] as const;

function Arrow() {
  return (
    <span className={`${styles.arrow} ${styles.rev}`} aria-hidden="true">
      <svg viewBox="0 0 40 16">
        <path d="M1 8h36M30 1.5 37 8l-7 6.5" />
      </svg>
    </span>
  );
}

function Chevron() {
  return (
    <svg className={styles.chevron} viewBox="0 0 24 24" aria-hidden="true">
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

function Caret() {
  return (
    <svg className={styles.caret} viewBox="0 0 24 24" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function ProflineChoice() {
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
        window.setTimeout(() => setArmed(false), 6500);
      },
      { threshold: 0.2 }
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="easy-choice" className={styles.section} aria-labelledby="plc4-title">
      <div
        ref={rootRef}
        className={`${styles.stage} ${seen ? styles.seen : ""}`}
        data-armed={armed ? "true" : undefined}
      >
        <header className={styles.head}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>
              <b>04</b> · Удобный выбор
            </p>
            <h2 id="plc4-title">
              Большой каталог.
              <em>Простой выбор.</em>
            </h2>
            <p className={styles.description}>
              Категории и фильтры помогают быстро перейти от тысяч товаров к
              конкретному материалу с нужными параметрами.
            </p>
          </div>
          <p className={styles.side}>
            Нужные товары.
            <br />
            Точные параметры.
            <br />
            Без лишнего.
          </p>
        </header>

        <div className={styles.flow}>
          <div className={`${styles.panel} ${styles.cats} ${styles.rev}`}>
            <div className={styles.panelHead}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m12 3 9 4.5-9 4.5-9-4.5L12 3ZM3 12l9 4.5 9-4.5M3 16.5 12 21l9-4.5" />
              </svg>
              <h3>Категории</h3>
            </div>
            <ul>
              {CATEGORIES.map((c) => (
                <li key={c} className={c === ACTIVE ? styles.active : undefined}>
                  <span>{c}</span>
                  <Chevron />
                </li>
              ))}
            </ul>
          </div>

          <Arrow />

          <div className={`${styles.panel} ${styles.filters} ${styles.rev}`}>
            <div className={styles.panelHead}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 5h18l-7 8v6l-4 2v-8L3 5Z" />
              </svg>
              <h3>Фильтры</h3>
              <span className={styles.reset}>Сбросить все</span>
            </div>
            <dl>
              {FILTERS.map((f) => (
                <div key={f.label} className={styles.row}>
                  <dt>{f.label}</dt>
                  <dd>
                    <span>{f.value}</span>
                    {"dot" in f ? <i className={styles.dot} aria-hidden="true" /> : null}
                    <Caret />
                  </dd>
                </div>
              ))}
            </dl>
            <span className={styles.cta}>
              Показать товары
              <svg viewBox="0 0 40 16" aria-hidden="true">
                <path d="M1 8h36M30 1.5 37 8l-7 6.5" />
              </svg>
            </span>
          </div>

          <Arrow />

          <article className={`${styles.panel} ${styles.product} ${styles.rev}`}>
            <div className={styles.productTop}>
              <span className={styles.status}>
                <i aria-hidden="true" />
                Актуально
              </span>
              <svg className={styles.heart} viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 20.5s-8-4.9-8-11A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 2.5c0 6.1-8 11-8 11Z" />
              </svg>
            </div>
            <div className={styles.photo}>
              <Image
                src="/cases/profline-c21r.avif"
                alt="Профнастил C21R бордового цвета RR 32"
                width={1999}
                height={787}
                sizes="(max-width: 860px) 90vw, 26vw"
              />
            </div>
            <h3>Профнастил C21R Grand Line</h3>
            <dl className={styles.specs}>
              {SPECS.map((s) => (
                <div key={s.label}>
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>
            <div className={styles.buy}>
              <strong>734,80&nbsp;₽/м²</strong>
              <span className={styles.cart}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3 4h2.5l2 11h10l2-8H7M9.5 20h.01M17 20h.01" />
                </svg>
                В корзину
              </span>
            </div>
          </article>
        </div>

        <footer className={styles.final}>
          <p>
            Масштаб каталога не должен
            <br />
            усложнять выбор.
          </p>
          <span className={styles.sign}>
            <span>
              Больше товаров
              <br />
              ближе к вашим задачам
            </span>
            <svg viewBox="0 0 40 16" aria-hidden="true">
              <path d="M1 8h36M30 1.5 37 8l-7 6.5" />
            </svg>
          </span>
        </footer>
      </div>
    </section>
  );
}

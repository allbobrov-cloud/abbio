"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./ProflineCatalog.module.css";

// Состояние появления выставляется до первой отрисовки, иначе финал успевает мигнуть.
const useArmingEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/*
 * Только подтверждённые числа: 1 000 — первоначальный масштаб, 25 000 — сейчас,
 * 100 000 — ПЛАН (цель развития, не достигнуто).
 */
const SCALE = [
  { key: "start", value: "1 000", label: "первоначальный масштаб" },
  { key: "now", value: "25 000", label: "страниц сейчас" },
  { key: "plan", value: "100 000", label: "цель развития" },
] as const;

const ARCH = [
  { title: ["Категории"], icon: "m12 3 9 4.5-9 4.5-9-4.5L12 3ZM3 12l9 4.5 9-4.5M3 16.5 12 21l9-4.5" },
  { title: ["Товары"], icon: "m12 3 8 4.2v9.6L12 21l-8-4.2V7.2L12 3ZM4 7.2l8 4.3 8-4.3M12 11.5V21" },
  { title: ["Характеристики"], icon: "M7 3h8l4 4v14H7zM15 3v4h4M10 12h6M10 16h6" },
  { title: ["Фильтры"], icon: "M3 5h18l-7 8v6l-4 2v-8L3 5Z" },
  { title: ["Посадочные", "страницы"], icon: "M7 3h8l4 4v14H7zM15 3v4h4M10 12h6M10 16h4" },
] as const;

function Arrow({ hot }: { hot?: boolean }) {
  return (
    <span className={`${styles.arrow} ${hot ? styles.hotArrow : ""}`} aria-hidden="true">
      <svg viewBox="0 0 40 16">
        <path d="M1 8h36M30 1.5 37 8l-7 6.5" />
      </svg>
    </span>
  );
}

export function ProflineCatalog() {
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
    <section id="big-catalog" className={styles.section} aria-labelledby="plc-title">
      <div className={styles.bg} aria-hidden="true">
        <Image
          src="/cases/profline-catalog-bg.webp"
          alt=""
          fill
          quality={80}
          sizes="100vw"
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
            <b>02</b> · Большой каталог
          </p>
          <h2 id="plc-title">
            Каталог вырос{" "}
            <br />
            <em>в 25 раз.</em>
          </h2>
          <p className={styles.description}>
            Проектировали примерно на 1&nbsp;000 страниц — структура выросла
            до 25&nbsp;000.
          </p>
        </div>

        <div className={styles.scale}>
          {SCALE.map((m, i) => (
            <div key={m.key} className={styles.scaleItem}>
              {i > 0 ? <Arrow hot={i === 1} /> : null}
              <article
                className={`${styles.metric} ${styles[m.key]} ${styles.rev}`}
                style={armed ? { transitionDelay: `${0.3 + i * 0.25}s` } : undefined}
              >
                {m.key === "plan" ? <span className={styles.badge}>План</span> : null}
                <strong>{m.value}</strong>
                <span>{m.label}</span>
              </article>
            </div>
          ))}
        </div>

        <ol className={styles.arch}>
          {ARCH.map((a, i) => (
            <li key={a.title[0]} className={styles.archItem}>
              {i > 0 ? <Arrow /> : null}
              <div className={`${styles.step} ${styles.rev}`} style={armed ? { transitionDelay: `${1 + i * 0.08}s` } : undefined}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d={a.icon} />
                </svg>
                <span>
                  {a.title[0]}
                  {a.title[1] ? (
                    <>
                      {" "}
                      <br />
                      {a.title[1]}
                    </>
                  ) : null}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

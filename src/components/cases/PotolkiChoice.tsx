"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./PotolkiChoice.module.css";

// Состояние появления выставляется до первой отрисовки, иначе финал успевает мигнуть.
const useArmingEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

const ICON = {
  panel: "M3 6h18v12H3zM3 10h18",
  sun: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4",
  home: "m3 11 9-7 9 7M5 10v10h14V10M10 20v-6h4v6",
  layers: "m12 3 9 4.5-9 4.5-9-4.5L12 3ZM3 12l9 4.5 9-4.5M3 16.5 12 21l9-4.5",
  users: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3 20a6 6 0 0 1 12 0M16 8a3 3 0 0 1 0 6M18 20a5 5 0 0 0-3-4.6",
} as const;

const NAV = [
  { title: "Натяжные потолки", icon: ICON.panel },
  { title: "Освещение", icon: ICON.sun },
  { title: "Помещения", icon: ICON.home },
  { title: "Готовые решения", icon: ICON.layers },
] as const;

// Точки выбора: координаты заданы в стилях (--x/--y — кольцо, угол и длина линии — к объекту на фото).
const NOTES = [
  { key: "a1", n: "01", label: "Помещение", value: "Гостиная" },
  { key: "a2", n: "02", label: "Потолок", value: "Матовый" },
  { key: "a3", n: "03", label: "Освещение", value: "Трековые светильники" },
] as const;

function Arrow() {
  return (
    <svg className={styles.arrow} viewBox="0 0 40 16" aria-hidden="true">
      <path d="M1 8h36M30 1.5 37 8l-7 6.5" />
    </svg>
  );
}

export function PotolkiChoice() {
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
    <section id="choice" className={styles.section} aria-labelledby="pc-title">
      <div
        ref={rootRef}
        className={`${styles.stage} ${seen ? styles.seen : ""}`}
        data-armed={armed ? "true" : undefined}
      >
        <div className={styles.bg}>
          <Image
            src="/cases/potolki-choice-bg.avif"
            alt="Современная гостиная с потолочным освещением"
            fill
            sizes="100vw"
            quality={85}
          />
        </div>
        <div className={styles.shade} aria-hidden="true" />

        <div className={`${styles.head} ${styles.rev}`}>
          <p className={styles.eyebrow}>
            <b>02</b>
            <i aria-hidden="true" />
            Выбор решения
          </p>
          <h2 id="pc-title">
            Не просто{" "}
            <br />
            показать потолки.{" "}
            <br />
            <em>Помочь выбрать.</em>
          </h2>
          <p className={styles.description}>
            Сайт построен так, чтобы человек мог разобраться в вариантах,
            увидеть реальные решения и понять порядок стоимости ещё до обращения.
          </p>
        </div>

        <div className={styles.nav}>
          <ul>
            {NAV.map((n, i) => (
              <li key={n.title} className={`${styles.item} ${i === 0 ? styles.on : ""} ${styles.rev} ${styles[`n${i + 1}`]}`}>
                <span className={styles.ico} aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d={n.icon} />
                  </svg>
                </span>
                <span className={styles.name}>{n.title}</span>
                <Arrow />
              </li>
            ))}
          </ul>
          <p className={`${styles.catalog} ${styles.rev}`}>
            Перейти в каталог <Arrow />
          </p>
        </div>

        <div className={styles.annos}>
          {NOTES.map((a) => (
            <div key={a.key} className={`${styles.anno} ${styles[a.key]} ${styles.rev}`}>
              <span className={styles.ring} aria-hidden="true">
                <i />
              </span>
              <span className={styles.line} aria-hidden="true" />
              <span className={styles.target} aria-hidden="true" />
              <div className={styles.card}>
                <span className={styles.aLabel}>
                  {a.n} · {a.label}
                </span>
                <span className={styles.aValue}>
                  {a.value}
                  <Arrow />
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className={`${styles.ui} ${styles.rev}`}>
          <Image
            src="/cases/potolki-choice-card.avif"
            alt="Подходит для вашей задачи: матовый потолок, трековые светильники, скрытый карниз, расчёт стоимости и похожие объекты"
            width={1041}
            height={1510}
            sizes="(max-width: 860px) 80vw, 26vw"
          />
        </div>

        <div className={`${styles.final} ${styles.rev}`}>
          <span className={styles.finalIcon} aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d={ICON.users} />
            </svg>
          </span>
          <p>
            Сначала разобраться.
            <em>Потом оставить заявку.</em>
          </p>
          <p className={styles.note}>
            Больше информации на сайте —{" "}
            <br />
            больше уверенности в выборе.
          </p>
        </div>
      </div>
    </section>
  );
}

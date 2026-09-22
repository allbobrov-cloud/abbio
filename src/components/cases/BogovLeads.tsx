"use client";

import { SiteCrop } from "./SiteCrop";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./BogovLeads.module.css";

// Состояние появления выставляется до первой отрисовки, иначе финал успевает мигнуть.
const useArmingEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/*
 * Источник и способ обработки не подтверждены данными проекта — используем
 * нейтральные подписи вместо названия CRM/канала, как и на самом сайте нет
 * ничего, что можно было бы выдать за конкретную систему.
 */
const entries = [
  { key: "form", label: "Форма", y: 96 },
  { key: "call", label: "Звонок", y: 172 },
  { key: "chat", label: "Мессенджер", y: 248 },
] as const;

const CARD_X = 470;
const CARD_Y = 130;
const STATUS_X = 860;

function path(originY: number) {
  return `M 300 ${originY} C 380 ${originY}, 420 172, ${CARD_X} 172 C 620 172, 700 172, ${STATUS_X} 172`;
}

/* 0 сайт · 1 точка входа · 2 signal · 3 обращение · 4 источник · 5 в работе */
const FINAL = 5;
const SEQUENCE = [
  { phase: 0, at: 0 },
  { phase: 1, at: 450 },
  { phase: 2, at: 950 },
  { phase: 3, at: 1550 },
  { phase: 4, at: 1950 },
  { phase: 5, at: 2400 },
];

function Stage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(FINAL);
  const [armed, setArmed] = useState(false);
  const [active, setActive] = useState(0);

  useArmingEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    setArmed(true);
    setPhase(-1);

    let timers: number[] = [];
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }
        observer.disconnect();
        timers = SEQUENCE.map((item) =>
          window.setTimeout(() => setPhase(item.phase), item.at)
        );
      },
      { threshold: 0.3 }
    );
    observer.observe(root);
    return () => {
      observer.disconnect();
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  const on = (from: number) => (phase >= from ? styles.isIn : "");
  const signal = armed && phase >= 2 && phase < 3;
  const d = path(entries[active].y);

  return (
    <div
      ref={rootRef}
      className={styles.stage}
      data-armed={armed ? "true" : undefined}
    >
      {/* Крупный план точки записи на реальном сайте; правый край уходит в темноту */}
      <div className={`${styles.site} ${styles.rev} ${on(0)}`}>
        <SiteCrop
          className={styles.siteCrop}
          src="/cases/bogov-desktop.avif"
          width={1361}
          height={652}
          alt="Кнопка записи на сайте bogov-team.ru"
          area={{ x1: 0.02, y1: 0.6, x2: 0.36, y2: 0.99 }}
          sizes="(max-width: 760px) 92vw, 30vw"
        />
        <span className={styles.siteFade} aria-hidden="true" />
      </div>

      <div className={`${styles.entries} ${styles.rev} ${on(1)}`}>
        {entries.map((entry, index) => (
          <button
            key={entry.key}
            type="button"
            className={`${styles.entry} ${index === active ? styles.entryOn : ""}`}
            style={{ top: `${(entry.y / 340) * 100}%` }}
            onClick={() => setActive(index)}
            aria-pressed={index === active}
          >
            <i />
            {entry.label}
          </button>
        ))}
      </div>

      <svg className={styles.lines} viewBox="0 0 1000 340" aria-hidden="true">
        <path
          className={`${styles.trace} ${styles.draw} ${on(2)}`}
          pathLength={1}
          d={d}
        />
        {signal && (
          <circle className={styles.signal} r="4">
            <animateMotion dur="1.1s" fill="freeze" path={d} />
          </circle>
        )}
      </svg>

      {/* Новое обращение — самая заметная сущность блока */}
      <div
        className={`${styles.lead} ${styles.rev} ${styles.lift} ${on(3)}`}
        style={{ left: `${(CARD_X / 1000) * 100}%`, top: `${(CARD_Y / 340) * 100}%` }}
      >
        <p className={styles.leadTitle}>Новое обращение</p>
        <dl className={`${styles.leadMeta} ${styles.rev} ${on(4)}`}>
          <div>
            <dt>Источник</dt>
            <dd>Источник определён</dd>
          </div>
          <div>
            <dt>Точка обращения</dt>
            <dd>{entries[active].label}</dd>
          </div>
        </dl>
      </div>

      {/* Передано в обработку */}
      <div
        className={`${styles.status} ${styles.rev} ${on(5)}`}
        style={{ left: `${(STATUS_X / 1000) * 100}%` }}
      >
        <p className={styles.statusStep}>
          <i />
          Обращение принято
        </p>
        <p className={`${styles.statusStep} ${styles.statusActive}`}>
          <i />В работе
        </p>
      </div>
    </div>
  );
}

export function BogovLeads() {
  return (
    <section
      id="leads"
      className={styles.section}
      aria-labelledby="leads-title"
    >
      <div className={styles.container}>
        <header className={styles.head}>
          <div>
            <p className={styles.eyebrow}>03 · Обращения</p>
            <h2 id="leads-title" aria-label="Заявка не заканчивается кнопкой.">
              Заявка не заканчивается
              <br />
              <em>кнопкой.</em>
            </h2>
          </div>
          <p className={styles.description}>
            Связали точки обращения с источниками,{" "}
            <br />
            чтобы понимать, откуда приходит клиент.
          </p>
        </header>

        <Stage />
      </div>
    </section>
  );
}

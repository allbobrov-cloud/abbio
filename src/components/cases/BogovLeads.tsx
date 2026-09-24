"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./BogovLeads.module.css";

// Состояние появления выставляется до первой отрисовки, иначе финал успевает мигнуть.
const useArmingEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/*
 * Композиция по референсу в сетке 1672 × 941.
 * FORM_SCREEN — готовый ассет (кнопка «Форма» уже нарисована на нём).
 * Телефона, имени клиента и категории в карточке нет: данные формы в проекте
 * не передают категорию, а личные данные на схеме не показываем.
 */
const W = 1672;
const H = 941;

const pctX = (v: number) => `${(v / W) * 100}%`;
const pctY = (v: number) => `${(v / H) * 100}%`;

const box = (x: number, y: number, w: number, h?: number) =>
  ({
    "--x": pctX(x),
    "--y": pctY(y),
    "--w": pctX(w),
    ...(h ? { "--h": pctY(h) } : {}),
  }) as CSSProperties;

/* Ассет 1536×1024: видимая рамка сайта — x 113..1423, y 82..932. */
const FORM = { x: 12, y: 286, w: 712 };
/* Кнопка «Форма» на ассете: правый край (1383, 548) */
const FORM_DOT = {
  x: FORM.x + (1383 / 1536) * FORM.w,
  y: FORM.y + (548 / 1536) * FORM.w,
};

const LEAD = { x: 805, y: 397, w: 390, h: 246 };
const SRC_Y = 342;
const STATUS_Y = 526;

/* 0 форма · 1 «Форма» · 2 источник · 3 связь · 4 обращение · 5 статус · 6 в работе */
const FINAL = 6;

const sources = [
  { key: "seo", label: "SEO", w: 95 },
  { key: "ads", label: "Яндекс Директ", w: 168 },
  { key: "social", label: "Соцсети", w: 125 },
] as const;

function SourceIcon({ kind }: { kind: "seo" | "social" }) {
  return kind === "seo" ? (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.5 15.5 5 5" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 20V14M11 20V9M17 20V4M22 20H3" />
    </svg>
  );
}

function YandexMark() {
  return (
    <span className={styles.mark}>
      <Image src="/cases/yandex-mark.png" alt="" width={90} height={90} />
    </span>
  );
}

function Stage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(FINAL);
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
    setStep(-1);

    let timers: number[] = [];
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }
        observer.disconnect();
        timers = [0, 500, 1000, 1500, 1900, 2400, 2900].map((at, i) =>
          window.setTimeout(() => setStep(i), at)
        );
      },
      { threshold: 0.25 }
    );
    observer.observe(root);
    return () => {
      observer.disconnect();
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  const on = (from: number) => (step >= from ? styles.isIn : "");

  return (
    <div
      ref={rootRef}
      className={styles.stage}
      data-armed={armed ? "true" : undefined}
    >
      <header className={styles.head}>
        <p className={styles.eyebrow}>03 · Обращения</p>
        <h2 id="leads-title">
          Заявка не заканчивается
          <br />
          <em>кнопкой.</em>
        </h2>
      </header>

      <p className={styles.intro}>
        Связали точки обращения с источниками,
        <br />
        чтобы понимать, откуда приходит клиент.
      </p>

      <div className={styles.glow} aria-hidden="true" />

      <div
        className={`${styles.form} ${styles.rev} ${on(0)}`}
        style={box(FORM.x, FORM.y, FORM.w)}
      >
        <Image
          src="/cases/bogov-leads-form.webp"
          alt="Страница записи на обучение на сайте Мотошколы Владимира Богова: форма заявки, звонок и мессенджер"
          fill
          sizes="(max-width: 900px) 100vw, 44vw"
        />
      </div>

      <svg className={styles.lines} viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
        {/* «Форма» → обращение */}
        <path
          className={`${styles.link} ${on(1)}`}
          pathLength={1}
          d={`M ${FORM_DOT.x} ${FORM_DOT.y} H 690 C 760 ${FORM_DOT.y}, 740 432, ${LEAD.x} 432`}
        />
        <circle className={`${styles.dot} ${on(1)}`} cx={FORM_DOT.x} cy={FORM_DOT.y} r="3.5" />
        <circle className={`${styles.dot} ${on(4)}`} cx={LEAD.x} cy="432" r="3.5" />
        {/* «Яндекс Директ» → обращение */}
        <path
          className={`${styles.link} ${on(3)}`}
          pathLength={1}
          d={`M 942 ${SRC_Y} V 358 C 942 384, 1005 366, 1005 ${LEAD.y}`}
        />
        <circle className={`${styles.dot} ${on(3)}`} cx="942" cy={SRC_Y} r="3.5" />
        <circle className={`${styles.dot} ${on(4)}`} cx="1005" cy={LEAD.y} r="3.5" />
        {/* обращение → статус */}
        <path
          className={`${styles.link} ${on(5)}`}
          pathLength={1}
          d={`M ${LEAD.x + LEAD.w} ${STATUS_Y} H 1232`}
        />
        <circle className={`${styles.dot} ${on(5)}`} cx={LEAD.x + LEAD.w} cy={STATUS_Y} r="3.5" />
        <circle className={`${styles.dot} ${on(5)}`} cx="1232" cy={STATUS_Y} r="3.5" />
      </svg>

      <div
        className={`${styles.sources} ${styles.rev} ${on(2)}`}
        style={box(752, 250, 427)}
      >
        <p className={styles.sourcesLabel}>Источник обращения</p>
        <ul>
          {sources.map((s) => (
            <li
              key={s.key}
              className={s.key === "ads" ? styles.active : undefined}
              aria-current={s.key === "ads" ? "true" : undefined}
              style={{ flexBasis: `${(s.w / 427) * 100}%` }}
            >
              {s.key === "ads" ? (
                <YandexMark />
              ) : (
                <SourceIcon kind={s.key} />
              )}
              {s.label}
            </li>
          ))}
        </ul>
      </div>

      <article
        className={`${styles.lead} ${styles.rev} ${on(4)}`}
        style={box(LEAD.x, LEAD.y, LEAD.w, LEAD.h)}
      >
        <header>
          <h3>
            <i aria-hidden="true" />
            Новое обращение
          </h3>
          <span>Сегодня, 14:26</span>
        </header>
        <dl>
          <div>
            <YandexMark />
            <dt>Источник</dt>
            <dd>Яндекс Директ</dd>
          </div>
          <div>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 3h7l4 4v14H7z" />
              <path d="M14 3v4h4M10 12h5M10 16h5" />
            </svg>
            <dt>Точка обращения</dt>
            <dd>Форма</dd>
          </div>
        </dl>
      </article>

      <div
        className={`${styles.status} ${styles.rev} ${on(5)}`}
        style={box(1232, 456, 385)}
      >
        <p className={styles.sourcesLabel}>Статус обращения</p>
        <ol>
          <li>
            <i aria-hidden="true" />
            Новое
          </li>
          <li>
            <i aria-hidden="true" />
            Принято
          </li>
          <li className={`${styles.work} ${on(6)}`}>
            <i aria-hidden="true" />
            В работе
          </li>
        </ol>
        <p className={`${styles.notice} ${styles.rev} ${on(6)}`}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M13 2 4 14h7l-1 8 9-12h-7z" />
          </svg>
          Заявка ушла в работу.
        </p>
      </div>

      <p className={`${styles.foot} ${styles.rev} ${on(FINAL)}`}>
        <span>Клик закончился.</span>
        <i aria-hidden="true" />
        <span>Путь клиента — нет.</span>
      </p>
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
        <Stage />
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./OssUx.module.css";

// Состояние появления выставляется до первой отрисовки, иначе финал успевает мигнуть.
const useArmingEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/*
 * Композиция в сетке 1536 × 1024. Монитор — готовый replaceable asset:
 * public/cases/oss-ux-monitor.webp (1536 × 1024, RGBA). Callout позиционируются
 * относительно этой же сетки, поэтому при замене файла того же формата
 * достаточно поправить координаты точек ниже.
 */
const W = 1536;
const H = 1024;
const pctX = (v: number) => `${(v / W) * 100}%`;
const pctY = (v: number) => `${(v / H) * 100}%`;

const steps = [
  { n: "01", title: "Выбрать продукцию", text: "Например, арматуру", active: true },
  { n: "02", title: "Уточнить параметры", text: "Диаметр, класс, ГОСТ", active: false },
  { n: "03", title: "Получить подходящие позиции", text: "Актуальные остатки и цены", active: false },
] as const;

/* card — левый верхний угол карточки, dot — точка на изображении, path — линия */
const callouts = [
  {
    key: "category",
    title: "Категория",
    text: "Выбор вида продукции",
    card: { x: 612, y: 190, w: 200 },
    dot: [717, 387],
    path: "M 717 259 V 387",
  },
  {
    key: "params",
    title: "Параметры",
    text: "Простые и понятные фильтры",
    card: { x: 1290, y: 171, w: 194 },
    dot: [1389, 443],
    path: "M 1389 255 V 443",
  },
  {
    key: "result",
    title: "Результат",
    text: "Конкретные товары\nпод ваш запрос",
    card: { x: 1396, y: 654, w: 134 },
    dot: [1362, 684],
    path: "M 1362 684 H 1396",
  },
] as const;

export function OssUx() {
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
    <section id="ux-ui" className={styles.section} aria-labelledby="oss-ux-title">
      <div className={styles.bg} aria-hidden="true" />
      <div
        ref={rootRef}
        className={`${styles.stage} ${seen ? styles.seen : ""}`}
        data-armed={armed ? "true" : undefined}
      >
        <div className={styles.glow} aria-hidden="true" />

        <div className={`${styles.copy} ${styles.rev}`}>
          <p className={styles.eyebrow}>03 · UX / UI</p>
          <h2 id="oss-ux-title">
            Тысячи страниц.
            {" "}
            <br />
            Один понятный
            {" "}
            <br />
            интерфейс.
          </h2>
          <p className={styles.description}>
            Сложность структуры остаётся внутри системы. Пользователь видит
            привычный путь: находит нужный вид продукции, уточняет параметры и
            переходит к конкретному предложению.
          </p>
        </div>

        <ol className={styles.steps}>
          {steps.map((step, i) => (
            <li
              key={step.n}
              className={`${styles.step} ${step.active ? styles.on : ""} ${styles.rev}`}
              style={{ transitionDelay: `${0.45 + i * 0.14}s` }}
            >
              <i aria-hidden="true">{step.n}</i>
              <span>
                <b>{step.title}</b>
                {step.text}
              </span>
            </li>
          ))}
        </ol>

        <p className={`${styles.accent} ${styles.rev} ${styles.d2}`}>
          <span>Большой каталог.</span>
          <em>Удобная работа.</em>
        </p>

        <div className={`${styles.visual} ${styles.rev} ${styles.visualRev}`}>
          <Image
            src="/cases/oss-ux-monitor.webp"
            alt="Каталог ОборонСпецСплав на мониторе: страница арматуры с фильтрами по диаметру, классу и ГОСТ и списком подходящих позиций с ценами"
            fill
            sizes="(max-width: 1180px) 130vw, 77vw"
          />
        </div>

        <svg className={styles.lines} viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
          {callouts.map((c) => (
            <g key={c.key} className={`${styles.callLine} ${styles.late}`}>
              <path pathLength={1} d={c.path} />
              <circle cx={c.dot[0]} cy={c.dot[1]} r="5" />
            </g>
          ))}
        </svg>

        {callouts.map((c) => (
          <div
            key={c.key}
            className={`${styles.callout} ${styles.late} ${styles.rev}`}
            style={
              {
                "--x": pctX(c.card.x),
                "--y": pctY(c.card.y),
                "--w": pctX(c.card.w),
              } as CSSProperties
            }
          >
            <b>{c.title}</b>
            {c.text.split("\n").map((line, i) => (
              <span key={line}>
                {i > 0 ? <br /> : null}
                {line}
              </span>
            ))}
          </div>
        ))}

        {/* Мобильная версия: те же три подписи списком под visual */}
        <ul className={styles.notes}>
          {callouts.map((c) => (
            <li key={c.key}>
              <b>{c.title}</b>
              {c.text.replace("\n", " ")}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

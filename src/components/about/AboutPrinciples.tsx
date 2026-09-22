"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import styles from "./AboutPrinciples.module.css";

// Состояние выставляется до первой отрисовки, иначе финал успевает мигнуть.
const useArmingEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

const principles = [
  { number: "01", lines: ["Сначала понять"] },
  { number: "02", lines: ["Показать", "до финала"] },
  { number: "03", lines: ["Объяснить", "решение"] },
  { number: "04", lines: ["Проверить", "результат"] },
];

/* Доля траектории, пройденная к каждому принципу (десктоп и телефон). */
const DESK_PROGRESS = [0.03, 0.27, 0.53, 0.93];
const MOB_PROGRESS = [0.06, 0.34, 0.62, 0.92];

/* Ступенчатая траектория: по направляющим у номеров и под фразами. */
const TRACE =
  "M 4 12 V 60 Q 4 72 16 72 H 312 Q 324 72 324 84 V 200 Q 324 212 312 212 H 96 Q 84 212 84 224 V 340 Q 84 352 96 352 H 532 Q 544 352 544 364 V 474";

function Stage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<Array<HTMLLIElement | null>>([]);
  // -1: ни один принцип ещё не активен.
  const [active, setActive] = useState(principles.length - 1);
  const [final, setFinal] = useState(true);
  const [armed, setArmed] = useState(false);

  useArmingEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    setArmed(true);
    setActive(-1);
    setFinal(false);
  }, []);

  useEffect(() => {
    if (!armed) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = rowRefs.current.indexOf(entry.target as HTMLLIElement);
          if (index < 0) {
            return;
          }
          // Принцип активен, пока пересекает середину экрана; ушедший вверх — пройден.
          const passed = !entry.isIntersecting && entry.boundingClientRect.top < 0;
          if (entry.isIntersecting || passed) {
            setActive((current) => Math.max(current, index));
          }
        });
      },
      { rootMargin: "-42% 0px -42% 0px" }
    );

    rowRefs.current.forEach((row) => row && observer.observe(row));

    return () => {
      observer.disconnect();
    };
  }, [armed]);

  // После раскрытия 04 показываем все четыре сразу.
  useEffect(() => {
    if (!armed || active < principles.length - 1) {
      return;
    }
    const timer = window.setTimeout(() => setFinal(true), 1100);
    return () => window.clearTimeout(timer);
  }, [armed, active]);

  const state = (index: number) =>
    final
      ? styles.lit
      : index === active
        ? styles.now
        : index < active
          ? styles.past
          : styles.next;

  const deskP = final || active < 0 ? (final ? 1 : 0) : DESK_PROGRESS[active];
  const mobP = final || active < 0 ? (final ? 1 : 0) : MOB_PROGRESS[active];

  return (
    <div
      ref={rootRef}
      className={styles.stage}
      style={
        { "--pd": deskP, "--pm": mobP } as CSSProperties
      }
    >
      <div className={styles.guides} aria-hidden="true" />

      <svg className={styles.lines} viewBox="0 0 1000 490" aria-hidden="true">
        <path className={styles.trackBase} d={TRACE} />
        <path className={styles.trackFill} pathLength={1} d={TRACE} />
        {[
          [4, 10],
          [324, 100],
          [84, 240],
          [544, 380],
        ].map(([x, y], index) => (
          <circle
            key={index}
            className={`${styles.node} ${
              final || index <= active ? styles.nodeOn : ""
            }`}
            cx={x}
            cy={y}
            r="4.5"
          />
        ))}
      </svg>
      <span className={styles.rail} aria-hidden="true" />

      <ol className={styles.list}>
        {principles.map((item, index) => (
          <li
            key={item.number}
            ref={(node) => {
              rowRefs.current[index] = node;
            }}
            className={`${styles.row} ${styles[`row${index + 1}`]} ${state(index)}`}
          >
            <span className={styles.num}>{item.number}</span>
            <p className={styles.phrase}>
              {item.lines.map((line, lineIndex) => (
                <span key={line} className={styles.line}>
                  {line}
                  {lineIndex === item.lines.length - 1 && (
                    <span className={styles.stop}>.</span>
                  )}
                </span>
              ))}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function AboutPrinciples() {
  return (
    <section
      id="principles"
      className={styles.section}
      aria-labelledby="principles-title"
    >
      <div className={styles.container}>
        <header className={styles.head}>
          <p className={styles.eyebrow}>Принципы</p>
          <h2 id="principles-title" aria-label="Не магия. Нормальная работа.">
            Не магия.
            <br />
            <em>Нормальная работа.</em>
          </h2>
        </header>

        <Stage />
      </div>
    </section>
  );
}

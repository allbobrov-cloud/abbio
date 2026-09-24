"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./BogovDesign.module.css";

// Состояние появления выставляется до первой отрисовки, иначе финал успевает мигнуть.
const useArmingEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/*
 * Композиция по референсу в сетке 1536 × 1024.
 * LAPTOP и PHONE — готовые ассеты (RGBA), интерфейс внутри не перерисовывается.
 */
const W = 1536;
const H = 1024;

const pctX = (v: number) => `${(v / W) * 100}%`;
const pctY = (v: number) => `${(v / H) * 100}%`;

/* 0 ноутбук · 1 «01» · 2 «02» · 3 телефон · 4 «03» */
const FINAL = 4;

const notes = [
  {
    key: "one",
    n: "01",
    title: "Понять формат",
    text: "Сразу понятно, чему учим и для кого.",
    x: 268,
    y: 330,
    path: "M 310 348 C 400 336, 490 372, 566 430",
    dot: [566, 430],
  },
  {
    key: "two",
    n: "02",
    title: "Выбрать обучение",
    text: "Направления под разные цели.",
    x: 232,
    y: 640,
    path: "M 274 656 C 360 660, 450 646, 540 634",
    dot: [540, 634],
  },
  {
    key: "three",
    n: "03",
    title: "Записаться",
    text: "Короткий путь до обращения.",
    x: 1392,
    y: 748,
    path: "M 1394 772 C 1376 810, 1362 850, 1338 884",
    dot: [1338, 884],
  },
] as const;

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
        timers = [0, 550, 1050, 1550, 2050].map((at, i) =>
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
  const noteStep = { one: 1, two: 2, three: 4 } as const;

  return (
    <div
      ref={rootRef}
      className={styles.stage}
      data-armed={armed ? "true" : undefined}
    >
      <header className={styles.head}>
        <p className={styles.eyebrow}>02 · UX / UI</p>
        <h2 id="design-title">
          Собрали сайт
          <br />
          <em>вокруг выбора ученика.</em>
        </h2>
      </header>

      <div className={styles.glow} aria-hidden="true" />

      <div className={`${styles.laptop} ${styles.rev} ${on(0)}`}>
        <Image
          src="/cases/bogov-ux-laptop.webp"
          alt="Сайт Мотошколы Владимира Богова на ноутбуке: первый экран и блок «Направления обучения»"
          fill
          sizes="(max-width: 900px) 100vw, 80vw"
          priority
        />
      </div>

      <div className={`${styles.phone} ${styles.rev} ${on(3)}`}>
        <Image
          src="/cases/bogov-ux-phone.webp"
          alt="Сайт Мотошколы Владимира Богова на телефоне: форма записи на обучение"
          fill
          sizes="(max-width: 900px) 70vw, 26vw"
          priority
        />
      </div>

      <svg className={styles.lines} viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
        {notes.map((note) => (
          <g key={note.key}>
            <path
              className={`${styles.link} ${on(noteStep[note.key])}`}
              pathLength={1}
              d={note.path}
            />
            <circle
              className={`${styles.dot} ${on(noteStep[note.key])}`}
              cx={note.dot[0]}
              cy={note.dot[1]}
              r="3.5"
            />
          </g>
        ))}
      </svg>

      {notes.map((note) => (
        <div
          key={note.key}
          className={`${styles.note} ${styles[note.key]} ${styles.rev} ${on(noteStep[note.key])}`}
          style={
            {
              "--x": pctX(note.x),
              "--y": pctY(note.y),
            } as CSSProperties
          }
        >
          <i>{note.n}</i>
          <h3>{note.title}</h3>
          <p>{note.text}</p>
        </div>
      ))}

      <p className={`${styles.foot} ${styles.rev} ${on(FINAL)}`}>
        <span>Понять</span>
        <i aria-hidden="true" />
        <span>Выбрать</span>
        <i aria-hidden="true" />
        <span>Записаться</span>
      </p>
    </div>
  );
}

export function BogovDesign() {
  return (
    <section
      id="design"
      className={styles.section}
      aria-labelledby="design-title"
    >
      <div className={styles.container}>
        <Stage />
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./BogovStructure.module.css";

// Состояние появления выставляется до первой отрисовки, иначе финал успевает мигнуть.
const useArmingEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/*
 * Реальная структура bogov-team.ru (меню и главная страница):
 * названия — пункты меню, заголовок во фрагменте — H1 соответствующей страницы.
 * Скриншотов подстраниц в проекте нет, поэтому их фрагменты собраны из реальных
 * заголовков в стиле сайта; для главной используется настоящий скриншот.
 * Когда появятся скриншоты — задайте поле image, и он заменит фрагмент.
 */
type Direction = {
  key: string;
  name: string;
  heading: string;
  image?: string;
  /* положение и размер на сцене 1000 × 700 */
  x: number;
  y: number;
  w: number;
  aspect: number;
  /* x ответвления от общей шины */
  drop: number;
};

const directions: Direction[] = [
  { key: "courses", name: "Курсы категории А", heading: "Курсы и форматы обучения", x: 0, y: 320, w: 280, aspect: 1.7, drop: 140 },
  { key: "trial", name: "Пробный урок", heading: "Спокойный первый шаг в обучение", x: 350, y: 335, w: 220, aspect: 1.6, drop: 460 },
  { key: "city", name: "Городской курс", heading: "Городской курс на мотоцикле", x: 640, y: 324, w: 220, aspect: 1.7, drop: 750 },
  { key: "skills", name: "Переобучение", heading: "Навыки вождения", x: 210, y: 530, w: 190, aspect: 1.6, drop: 315 },
  { key: "kids", name: "Детская мотошкола", heading: "Детская мотошкола", x: 480, y: 528, w: 240, aspect: 1.7, drop: 605 },
  { key: "stunt", name: "Стантрайдинг", heading: "Стантрайдинг", x: 860, y: 540, w: 140, aspect: 1.35, drop: 930 },
];

const BUS_Y = 270;
const ORIGIN_X = 500;

function branch(dir: Direction) {
  const dx = dir.drop;
  const r = 12;
  const step = dx < ORIGIN_X ? dx + r : dx - r;
  return `M ${ORIGIN_X} ${BUS_Y} H ${step} Q ${dx} ${BUS_Y} ${dx} ${BUS_Y + r} V ${dir.y}`;
}

const HOME = { x: 280, y: 0, w: 440, aspect: 1363 / 654 };
const HOME_BOTTOM = Math.round(HOME.y + HOME.w / HOME.aspect);

/* 0 главная · 1 шина · 2..7 направления · 8 итоговая строка */
const FINAL = 8;

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
    setStep(0);

    let timers: number[] = [];
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }
        observer.disconnect();
        timers = Array.from({ length: FINAL }, (_, i) =>
          window.setTimeout(() => setStep(i + 1), 500 + i * 420)
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
  const pct = (value: number, of: number) => `${(value / of) * 100}%`;

  return (
    <div
      ref={rootRef}
      className={styles.stage}
      data-armed={armed ? "true" : undefined}
    >
      {/* Тонкие связи: главная → шина → направления */}
      <svg className={styles.lines} viewBox="0 0 1000 700" aria-hidden="true">
        <path
          className={`${styles.link} ${styles.draw} ${on(1)}`}
          pathLength={1}
          d={`M ${ORIGIN_X} ${HOME_BOTTOM} V ${BUS_Y}`}
        />
        {directions.map((dir, index) => (
          <g key={dir.key} className={styles[`c-${dir.key}`]}>
            <path
              className={`${styles.link} ${styles.branch} ${styles.draw} ${on(index + 2)}`}
              pathLength={1}
              d={branch(dir)}
            />
            <circle
              className={`${styles.dot} ${styles.rev} ${on(index + 2)}`}
              cx={dir.drop}
              cy={dir.y}
              r="3.2"
            />
          </g>
        ))}
        <circle className={styles.dot} cx={ORIGIN_X} cy={BUS_Y} r="3.2" />
      </svg>

      {/* Главная — самый крупный node карты. Реальные заголовок и кнопка сайта. */}
      <div
        className={`${styles.home} ${styles.rev} ${on(0)} ${styles.node}`}
        style={{
          left: pct(HOME.x, 1000),
          top: pct(HOME.y, 700),
          width: pct(HOME.w, 1000),
        }}
      >
        <div className={styles.pvHome}>
          <span className={styles.bars} aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className={styles.homeH}>
            Мотошкола
            <br />
            Владимира Богова
          </span>
          <span className={styles.homeCta} aria-hidden="true">
            Записаться
          </span>
        </div>
        <p className={styles.cap}>
          <span>Bogov Team</span>
          <strong>Главная</strong>
        </p>
      </div>

      {directions.map((dir, index) => (
        <div
          key={dir.key}
          className={`${styles.node} ${styles.dir} ${styles[`n-${dir.key}`]} ${styles.rev} ${on(index + 2)}`}
          style={
            {
              left: pct(dir.x, 1000),
              top: pct(dir.y, 700),
              width: pct(dir.w, 1000),
              "--aspect": dir.aspect,
            } as CSSProperties
          }
        >
          <div className={styles.pv}>
            {dir.image ? (
              <Image src={dir.image} alt="" fill sizes="30vw" />
            ) : (
              <>
                <span className={styles.bars} aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                <span className={styles.h}>{dir.heading}</span>
              </>
            )}
          </div>
          <p className={styles.cap}>
            <strong>{dir.name}</strong>
          </p>
        </div>
      ))}

      <p className={`${styles.foot} ${styles.rev} ${on(FINAL)}`}>
        Разные задачи ученика <i>→</i> своя страница <i>→</i> один сайт
      </p>
    </div>
  );
}

export function BogovStructure() {
  return (
    <section
      id="structure"
      className={styles.section}
      aria-labelledby="structure-title"
    >
      <div className={styles.container}>
        <header className={styles.head}>
          <div>
            <p className={styles.eyebrow}>01 · Структура</p>
            <h2 id="structure-title" aria-label="Одного лендинга здесь было мало.">
              Одного лендинга
              <br />
              <em>здесь было мало.</em>
            </h2>
          </div>
          <p className={styles.description}>
            Разные программы требуют разных сценариев выбора{" "}
            <br />— собрали их в одну структуру сайта.
          </p>
        </header>

        <Stage />
      </div>
    </section>
  );
}

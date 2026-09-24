"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./BogovStructure.module.css";

// Состояние появления выставляется до первой отрисовки, иначе финал успевает мигнуть.
const useArmingEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/*
 * Схема 3 + 2 по референсу. Координаты — в сетке 1536 × 1024.
 * Названия и описания направлений взяты из ТЗ владельца.
 */
const W = 1536;
const H = 1024;

type Card = {
  key: string;
  n: string;
  title: string;
  text: string;
  image: string;
  pos: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

const cards: Card[] = [
  { key: "courses", n: "01", title: "Курсы и форматы обучения", text: "Категория А и дополнительные форматы.", image: "/cases/bogov-structure-courses.webp", pos: "72% 55%", x: 161, y: 506, w: 382, h: 165 },
  { key: "first", n: "02", title: "Спокойный первый шаг в обучение", text: "Пробный урок и знакомство с мотоциклом.", image: "/cases/bogov-structure-first.webp", pos: "62% 55%", x: 615, y: 506, w: 343, h: 165 },
  { key: "city", n: "03", title: "Городской курс на мотоцикле", text: "Реальные условия. Уверенная езда по городу.", image: "/cases/bogov-structure-city.webp", pos: "70% 50%", x: 1033, y: 506, w: 349, h: 165 },
  { key: "skills", n: "04", title: "Навыки вождения", text: "Переобучение и совершенствование навыков.", image: "/cases/bogov-structure-skills.webp", pos: "72% 45%", x: 352, y: 714, w: 407, h: 171 },
  { key: "kids", n: "05", title: "Детская мотошкола", text: "Безопасный старт для юных райдеров.", image: "/cases/bogov-structure-kids.webp", pos: "62% 50%", x: 818, y: 714, w: 365, h: 171 },
];

const MAIN = { x: 544, y: 178, w: 511, h: 247 };
const BUS_Y = 461;
const CX = MAIN.x + MAIN.w / 2;

/* 0 главная · 1 ствол · 2 шина · 3..7 карточки · 8 подпись */
const FINAL = 8;

const pctX = (v: number) => `${(v / W) * 100}%`;
const pctY = (v: number) => `${(v / H) * 100}%`;

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
          window.setTimeout(() => setStep(i + 1), 350 + i * 380)
        );
      },
      { threshold: 0.2 }
    );
    observer.observe(root);
    return () => {
      observer.disconnect();
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  const on = (from: number) => (step >= from ? styles.isIn : "");

  const link = (d: string, from: number) => (
    <path className={`${styles.link} ${on(from)}`} pathLength={1} d={d} />
  );
  const dot = (cx: number, cy: number, from: number) => (
    <circle className={`${styles.dot} ${on(from)}`} cx={cx} cy={cy} r="5" />
  );

  return (
    <div
      ref={rootRef}
      className={styles.stage}
      data-armed={armed ? "true" : undefined}
    >
      <header className={styles.head}>
        <p className={styles.eyebrow}>01 · Структура</p>
        <h2 id="structure-title">
          Вся мотошкола
          <br />
          <em>в одной системе.</em>
        </h2>
        <p className={styles.description}>
          Разные направления обучения, единый сайт и понятная структура. Каждый
          раздел решает свою задачу и ведёт к записи на обучение.
        </p>
      </header>

      <svg
        className={styles.lines}
        viewBox={`0 0 ${W} ${H}`}
        aria-hidden="true"
      >
        {link(`M ${CX} ${MAIN.y + MAIN.h} V ${BUS_Y}`, 1)}
        {link(`M ${CX} ${BUS_Y} H 347 Q 335 ${BUS_Y} 335 ${BUS_Y + 12} V 495`, 2)}
        {link(`M ${CX} ${BUS_Y} H 1200 Q 1212 ${BUS_Y} 1212 ${BUS_Y + 12} V 495`, 2)}
        {link(`M ${CX} ${BUS_Y} V 495`, 2)}
        {link(`M 579 ${BUS_Y} V 703`, 6)}
        {link(`M 994 ${BUS_Y} V 703`, 7)}
        {dot(CX, BUS_Y, 2)}
        {dot(335, 495, 3)}
        {dot(CX, 495, 4)}
        {dot(1212, 495, 5)}
        {dot(579, 703, 6)}
        {dot(994, 703, 7)}
      </svg>

      <div
        className={`${styles.main} ${styles.rev} ${on(0)}`}
        style={
          {
            "--x": pctX(MAIN.x),
            "--y": pctY(MAIN.y),
            "--w": pctX(MAIN.w),
            "--h": pctY(MAIN.h),
          } as CSSProperties
        }
      >
        <div className={styles.mainBg} aria-hidden="true">
          <Image
            src="/cases/bogov-structure-main.webp"
            alt=""
            fill
            loading="eager"
            sizes="(max-width: 760px) 100vw, 36vw"
          />
        </div>
        <span className={styles.mainShade} aria-hidden="true" />
        <div className={styles.mainBody}>
          <p className={styles.mainTag}>Bogov Team</p>
          <p className={styles.mainTitle}>
            Мотошкола
            <br />
            <em>Владимира Богова</em>
          </p>
          <p className={styles.mainText}>
            Навыки. Дисциплина. Свобода.
            <br />
            На дороге и в жизни.
          </p>
          <span className={styles.mainCta}>
            Записаться <b aria-hidden="true">→</b>
          </span>
        </div>
      </div>

      <div className={styles.cards}>
        {cards.map((card, index) => (
          <article
            key={card.key}
            className={`${styles.card} ${styles.rev} ${on(index + 3)}`}
            style={
              {
                "--x": pctX(card.x),
                "--y": pctY(card.y),
                "--w": pctX(card.w),
                "--h": pctY(card.h),
                "--pos": card.pos,
              } as CSSProperties
            }
          >
            <div className={styles.cardBg} aria-hidden="true">
              <Image
                src={card.image}
                alt=""
                fill
                loading="eager"
                sizes="(max-width: 760px) 100vw, 26vw"
              />
            </div>
            <span className={styles.cardShade} aria-hidden="true" />
            <div className={styles.cardBody}>
              <span className={styles.num}>{card.n}</span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </div>
            <span className={styles.arrow} aria-hidden="true">
              →
            </span>
          </article>
        ))}
      </div>

      <p className={`${styles.foot} ${styles.rev} ${on(FINAL)}`}>
        <span>Разные задачи ученика</span>
        <i aria-hidden="true" />
        <span>Свои страницы</span>
        <i aria-hidden="true" />
        <span>Один сайт</span>
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
      <div className={styles.bg} aria-hidden="true">
        <Image
          src="/cases/bogov-structure-bg.webp"
          alt=""
          fill
          loading="eager"
          sizes="70vw"
        />
      </div>
      <div className={styles.container}>
        <Stage />
      </div>
    </section>
  );
}

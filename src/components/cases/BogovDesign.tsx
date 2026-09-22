"use client";

import Image from "next/image";
import { SiteCrop } from "./SiteCrop";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./BogovDesign.module.css";

// Состояние появления выставляется до первой отрисовки, иначе финал успевает мигнуть.
const useArmingEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/*
 * Путь ученика отмечен на реальных экранах сайта:
 * 01 и 03 — заголовок и кнопка «Записаться» на реальном desktop-скриншоте,
 * 02 — реальные плитки выбора формата на мобильном экране (десктопного
 * скриншота с отдельным блоком выбора программ в проекте нет).
 */
const TRACE =
  "M 570 278 C 500 300, 380 312, 288 320 C 340 332, 392 344, 430 352";

/* 0 desktop · 1 точка 01 · 2 траектория к 02 · 3 траектория к 03 · 4 mobile */
const FINAL = 4;
const SEQUENCE = [
  { phase: 0, at: 0 },
  { phase: 1, at: 500 },
  { phase: 2, at: 950 },
  { phase: 3, at: 1500 },
  { phase: 4, at: 2000 },
];

function Stage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(FINAL);
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
      { threshold: 0.25 }
    );
    observer.observe(root);
    return () => {
      observer.disconnect();
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  const on = (from: number) => (phase >= from ? styles.isIn : "");

  return (
    <div
      ref={rootRef}
      className={styles.stage}
      data-armed={armed ? "true" : undefined}
    >
      {/* Крупный план первого экрана: как посетитель понимает формат */}
      <SiteCrop
        className={`${styles.crop} ${styles.cropTop} ${styles.rev} ${on(0)}`}
        src="/cases/bogov-desktop.avif"
        width={1361}
        height={652}
        alt="Первый экран сайта bogov-team.ru крупным планом"
        area={{ x1: 0.03, y1: 0.12, x2: 0.52, y2: 0.66 }}
        sizes="(max-width: 760px) 92vw, 42vw"
        priority
      />

      {/* Мобильный экран — главный объект: выбор формата живёт и на телефоне.
          Ассет — снимок телефона с системными панелями, показываем только экран. */}
      <div className={`${styles.mobile} ${styles.rev} ${styles.lift} ${on(4)}`}>
        <div className={styles.mobileInner}>
          <Image
            src="/cases/bogov-mobile.avif"
            alt="Мобильный экран сайта bogov-team.ru с выбором формата обучения"
            fill
            sizes="(max-width: 760px) 70vw, 28vw"
          />
        </div>
      </div>

      {/* Крупный план точки записи */}
      <SiteCrop
        className={`${styles.crop} ${styles.cropCta} ${styles.rev} ${on(3)}`}
        src="/cases/bogov-desktop.avif"
        width={1361}
        height={652}
        alt="Кнопка записи на сайте bogov-team.ru крупным планом"
        area={{ x1: 0.02, y1: 0.795, x2: 0.33, y2: 0.995 }}
        sizes="(max-width: 760px) 92vw, 32vw"
      />

      {/* Тонкая траектория: понять формат → выбрать обучение → записаться */}
      <svg className={styles.lines} viewBox="0 0 1000 500" aria-hidden="true">
        <path
          className={`${styles.trace} ${styles.draw} ${on(2)}`}
          pathLength={1}
          d={TRACE}
        />
      </svg>

      <span className={`${styles.point} ${styles.p1} ${styles.rev} ${on(1)}`}>
        <i>01</i>Понять формат
      </span>
      <span className={`${styles.point} ${styles.p2} ${styles.rev} ${on(2)}`}>
        <i>02</i>Выбрать обучение
      </span>
      <span className={`${styles.point} ${styles.p3} ${styles.rev} ${on(3)}`}>
        <i>03</i>Записаться
      </span>
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
        <header className={styles.head}>
          <div>
            <p className={styles.eyebrow}>02 · UX / UI</p>
            <h2 id="design-title" aria-label="Собрали сайт вокруг выбора ученика.">
              Собрали сайт
              <br />
              <em>вокруг выбора ученика.</em>
            </h2>
          </div>
          <p className={styles.description}>
            Помогаем понять формат, выбрать обучение{" "}
            <br />и перейти к записи.
          </p>
        </header>

        <Stage />
      </div>
    </section>
  );
}

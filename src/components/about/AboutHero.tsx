"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ActionArrow } from "@/components/ActionArrow";
import styles from "./AboutHero.module.css";

// Состояние появления выставляется до первой отрисовки, иначе финальная
// композиция успевает мигнуть перед стартом последовательности.
const useArmingEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/* 1 задача · 2 дизайн · 3 разработка · 4 маркетинг · 5 клик · 6 сигнал · 7 цельное решение */
const FINAL = 7;
const SEQUENCE = [
  { phase: 1, at: 250 },
  { phase: 2, at: 1000 },
  { phase: 3, at: 1900 },
  { phase: 4, at: 2800 },
  { phase: 5, at: 3900 },
  { phase: 6, at: 4500 },
  { phase: 7, at: 5400 },
];

const principles = [
  "Задача раньше услуги",
  "Один связанный результат",
  "Прямой контакт",
  "Решения на основе данных",
];

function Visual() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(FINAL);
  const [armed, setArmed] = useState(false);

  useArmingEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    setArmed(true);
    setPhase(0);
    const timers = SEQUENCE.map((item) =>
      window.setTimeout(() => setPhase(item.phase), item.at)
    );
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, []);

  const on = (from: number) => (phase >= from ? styles.isIn : "");
  const phaseClasses = Array.from({ length: FINAL }, (_, i) =>
    phase >= i + 1 ? styles[`p${i + 1}`] : ""
  ).join(" ");

  return (
    <div
      ref={rootRef}
      className={`${styles.stage} ${phaseClasses}`}
      data-armed={armed ? "true" : undefined}
      role="img"
      aria-label="Схема: задача бизнеса «Нужно больше обращений» проходит через дизайн, разработку, маркетинг и аналитику и собирается в одно цельное решение — от входящего спроса до обращения и данных."
    >
      <div className={styles.field} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />

      {/* Слои ABBiO — сверху, включаются по ходу сборки */}
      <ul className={styles.layers}>
        <li className={`${styles.tag} ${styles.rev} ${on(2)}`}><i />Дизайн</li>
        <li className={`${styles.tag} ${styles.rev} ${on(3)}`}><i />Разработка</li>
        <li className={`${styles.tag} ${styles.rev} ${on(4)}`}><i />Маркетинг</li>
        <li className={`${styles.tag} ${styles.rev} ${on(6)}`}><i />Аналитика</li>
      </ul>

      {/* Исходная задача */}
      <div className={`${styles.chip} ${styles.rev} ${styles.lift} ${on(1)}`}>
        <span>Задача бизнеса</span>
        <strong>«Нужно больше обращений»</strong>
      </div>

      {/* Один объект: слои добавляются к нему */}
      <div className={styles.panelWrap}>
        <div className={styles.tilt}>
          <div className={styles.panel}>
            <svg className={styles.panelSvg} viewBox="0 0 660 570" aria-hidden="true">
              <rect className={styles.frame} x="0.5" y="0.5" width="659" height="569" rx="18" />

              {/* Слой 1 — дизайн: сетка, структура, иерархия, CTA */}
              <g className={`${styles.rev} ${on(2)}`}>
                <g className={styles.dLine}>
                  <circle cx="28" cy="28" r="4" />
                  <circle cx="44" cy="28" r="4" />
                  <circle cx="60" cy="28" r="4" />
                  <rect x="86" y="20" width="200" height="16" rx="8" />
                  <path d="M 476 28 h 34 M 528 28 h 34 M 580 28 h 34" />
                  <path d="M 0 56 H 660" />
                </g>
                <g className={`${styles.rev} ${styles.late} ${on(2)}`}>
                  <rect className={styles.bar1} x="40" y="100" width="264" height="24" rx="4" />
                  <rect className={styles.bar1} x="40" y="136" width="196" height="24" rx="4" />
                  <rect className={styles.bar2} x="40" y="180" width="250" height="8" rx="4" />
                  <rect className={styles.bar2} x="40" y="196" width="214" height="8" rx="4" />
                  <rect className={styles.cta} x="40" y="236" width="168" height="52" rx="26" />
                  <rect className={styles.ctaLabel} x="70" y="258" width="76" height="8" rx="4" />
                  <path className={styles.ctaArrow} d="M 170 262 h 18 m -6 -6 l 6 6 l -6 6" />
                  <g className={styles.ph}>
                    <rect className={styles.dashed} x="350" y="90" width="270" height="230" rx="12" />
                    <path className={styles.dashed} d="M 350 90 L 620 320 M 620 90 L 350 320" />
                  </g>
                  {[40, 245, 450].map((x) => (
                    <g key={x}>
                      <rect className={styles.block} x={x} y="420" width="170" height="110" rx="10" />
                      <rect className={styles.blockIcon} x={x + 16} y="436" width="22" height="22" rx="6" />
                      <rect className={styles.bar2} x={x + 16} y="474" width="110" height="7" rx="3.5" />
                      <rect className={styles.bar2} x={x + 16} y="490" width="76" height="7" rx="3.5" />
                    </g>
                  ))}
                </g>
              </g>

              {/* Слой 2 — разработка: controls, состояния, рабочие связи */}
              <g className={`${styles.rev} ${on(3)}`}>
                <rect className={styles.pillOn} x="350" y="104" width="78" height="26" rx="13" />
                <rect className={styles.pill} x="436" y="104" width="78" height="26" rx="13" />
                <rect className={styles.pill} x="522" y="104" width="78" height="26" rx="13" />
                <rect className={styles.input} x="350" y="150" width="270" height="46" rx="9" />
                <rect className={styles.inputText} x="368" y="169" width="104" height="8" rx="4" />
                <path className={styles.caret} d="M 482 162 V 184" />
                <rect className={styles.input} x="350" y="208" width="270" height="46" rx="9" />
                <rect className={styles.inputText} x="368" y="227" width="64" height="8" rx="4" />
                <rect className={styles.toggle} x="350" y="270" width="48" height="26" rx="13" />
                <circle className={styles.knob} cx="385" cy="283" r="10" />
                <rect className={styles.inputText} x="412" y="279" width="116" height="8" rx="4" />
                <rect className={styles.blockOn} x="245" y="420" width="170" height="110" rx="10" />
                <path className={styles.tickMark} d="M 262 448 l 6 6 l 12 -13" />
              </g>

              {/* Слой 4 — аналитика: действие через CTA */}
              <g className={`${styles.rev} ${on(5)}`}>
                <path className={styles.cursor} d="M 132 270 l 0 22 l 6 -6 l 5 12 l 5 -2 l -5 -12 l 9 0 z" />
              </g>
            </svg>

            {/* Сигнал: обращение зафиксировано */}
            <div className={`${styles.card} ${styles.rev} ${styles.lift} ${on(6)}`}>
              <div>
                <strong>Обращение</strong>
                <span><i />зафиксировано</span>
              </div>
              <b aria-hidden="true">
                <em />
                <em />
                <em />
                <em />
                <em />
              </b>
            </div>
          </div>
        </div>
      </div>

      <p className={`${styles.whole} ${styles.rev} ${on(7)}`}>
        <i />Цельное решение
      </p>
    </div>
  );
}

export function AboutHero() {
  return (
    <section className={styles.hero} aria-labelledby="about-title">
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>Об ABBiO</p>
            <h1 id="about-title">
              Не делим <em>задачу</em>{" "}
              <br />
              на сайт, дизайн{" "}
              <br />и маркетинг.
            </h1>
            <p className={styles.description}>
              Смотрим на задачу целиком и собираем решение вокруг неё.
            </p>
            <a href="#contact-dialog" data-contact-dialog className={styles.action}>
              Обсудить задачу <ActionArrow />
            </a>
          </div>
          <div className={styles.visual}>
            <Visual />
          </div>
        </div>

        <ul className={styles.principles}>
          {principles.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}


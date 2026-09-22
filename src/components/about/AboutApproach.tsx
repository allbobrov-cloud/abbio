"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./AboutApproach.module.css";

// Состояние появления выставляется до первой отрисовки, иначе финальная
// композиция успевает мигнуть перед стартом последовательности.
const useArmingEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/* 1 запрос · 2 «Зачем?» · 3 запрос раскрывается · 4 вопросы · 5 траектория · 6 задача · 7 путь */
const FINAL = 7;
const SEQUENCE = [
  { phase: 1, at: 150 },
  { phase: 2, at: 900 },
  { phase: 3, at: 1700 },
  { phase: 4, at: 2400 },
  { phase: 5, at: 3100 },
  { phase: 6, at: 4300 },
  { phase: 7, at: 5100 },
];

/* Общая нижняя опора: запрос → под «Зачем?» → вверх к настоящей задаче */
const TRACE = "M 275 352 H 680 C 725 352, 715 182, 750 182";

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
    setPhase(0);

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
      { threshold: 0.35 }
    );

    observer.observe(root);
    return () => {
      observer.disconnect();
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  const on = (from: number) => (phase >= from ? styles.isIn : "");
  const open = phase >= 3 ? styles.open : "";
  // Комета бежит по траектории только в момент её прорисовки.
  const comet = armed && phase >= 5 && phase < 7;

  return (
    <div
      ref={rootRef}
      className={`${styles.stage} ${open} ${on(7) ? styles.done : ""}`}
      data-armed={armed ? "true" : undefined}
      role="img"
      aria-label="Запрос «Нужен новый сайт» разбирается вопросом «Зачем?» и превращается в настоящую задачу: «Нужно изменить путь до обращения» — от «Увидел» через «Понял» к «Обратился»."
    >
      <div className={styles.glow} aria-hidden="true" />
      <span className={`${styles.ghost} ${styles.rev} ${on(2)}`} aria-hidden="true">
        ?
      </span>

      <svg className={styles.lines} viewBox="0 0 1200 470" aria-hidden="true">
        <defs>
          <linearGradient id="approach-trace" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#b7a0ef" stopOpacity="0.25" />
            <stop offset="0.55" stopColor="#c9b8f7" stopOpacity="0.9" />
            <stop offset="1" stopColor="#efe8ff" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="approach-spine" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#b7a0ef" stopOpacity="0.9" />
            <stop offset="1" stopColor="#b7a0ef" stopOpacity="0" />
          </linearGradient>
        </defs>

        <path
          className={`${styles.trace} ${styles.draw} ${on(5)}`}
          pathLength={1}
          d={TRACE}
        />
        <path
          className={`${styles.spine} ${styles.draw} ${on(6)}`}
          pathLength={1}
          d="M 750 128 V 340"
        />

        {/* Вертикальная аннотация под «Зачем?» */}
        <path
          className={`${styles.leader} ${styles.draw} ${on(4)}`}
          pathLength={1}
          d="M 310 352 V 414"
        />
        <circle className={`${styles.dotSmall} ${styles.rev} ${on(4)}`} cx="310" cy="381" r="3" />
        <circle className={`${styles.dotSmall} ${styles.rev} ${styles.late} ${on(4)}`} cx="310" cy="413" r="3" />

        <circle className={`${styles.tip} ${styles.rev} ${on(6)}`} cx="750" cy="182" r="5" />
        <circle className={`${styles.halo} ${on(6)}`} cx="750" cy="182" r="5" />

        {comet && (
          <circle className={styles.comet} r="4.5">
            <animateMotion dur="1.3s" fill="freeze" path={TRACE} />
          </circle>
        )}
      </svg>

      {/* Симптом: маленькая простая формулировка, которая раскрывается */}
      <p className={`${styles.request} ${styles.rev} ${on(1)}`}>
        <span>«Нужен</span>
        <span>новый</span>
        <span>сайт»</span>
      </p>

      {/* Главный вопрос */}
      <p className={`${styles.why} ${styles.rev} ${styles.lift} ${on(2)}`}>Зачем?</p>

      {/* Detail layer */}
      <p className={`${styles.q} ${styles.q1} ${styles.rev} ${on(4)}`}>
        Что сейчас не работает?
      </p>
      <p className={`${styles.q} ${styles.q2} ${styles.rev} ${styles.late} ${on(4)}`}>
        Что должно измениться?
      </p>

      {/* Суть */}
      <p className={`${styles.label} ${styles.rev} ${on(6)}`}>Настоящая задача</p>
      <p className={`${styles.task} ${styles.focus} ${on(6)}`}>
        «Нужно изменить
        <br />
        <em>путь до</em>
        <br />
        <em>обращения</em>»
      </p>

      <ol className={`${styles.chain} ${on(7)}`}>
        <li className={styles.step1}>
          <i />
          Увидел
        </li>
        <li className={styles.step2}>
          <i />
          Понял
        </li>
        <li className={styles.step3}>
          <i />
          Обратился
        </li>
      </ol>
    </div>
  );
}

export function AboutApproach() {
  return (
    <section
      id="approach"
      className={styles.section}
      aria-labelledby="approach-title"
    >
      <div className={styles.container}>
        <header className={styles.head}>
          <div>
            <p className={styles.eyebrow}>Подход</p>
            <h2 id="approach-title" aria-label="Сначала — зачем. Потом — что делать.">
              Сначала — <em>зачем.</em>
              <br />
              Потом — что делать.
            </h2>
          </div>
          <p className={styles.description}>
            Не начинаем с готового решения.{" "}
            <br />
            Сначала выясняем, что должно измениться.
          </p>
        </header>

        <Stage />
      </div>
    </section>
  );
}

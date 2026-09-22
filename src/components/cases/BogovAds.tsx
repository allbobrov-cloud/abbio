"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./BogovAds.module.css";

// Состояние появления выставляется до первой отрисовки, иначе финал успевает мигнуть.
const useArmingEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/*
 * Подтверждённых цифр по рекламе (расход, стоимость обращения, конверсия)
 * в данных проекта нет, поэтому сравнение «до / после» не строим —
 * используем запасной сценарий: реклама → сайт → понятное предложение.
 */
const TRACE = "M 40 130 C 160 130, 220 130, 300 130 C 560 130, 640 130, 760 130";

const FINAL = 3;
const SEQUENCE = [
  { phase: 0, at: 0 },
  { phase: 1, at: 550 },
  { phase: 2, at: 1050 },
  { phase: 3, at: 1500 },
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
      { threshold: 0.3 }
    );
    observer.observe(root);
    return () => {
      observer.disconnect();
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  const on = (from: number) => (phase >= from ? styles.isIn : "");
  const signal = armed && phase >= 1 && phase < 2;

  return (
    <div
      ref={rootRef}
      className={styles.stage}
      data-armed={armed ? "true" : undefined}
    >
      <span className={`${styles.tag} ${styles.tagLeft} ${styles.rev} ${on(0)}`}>
        Рекламный трафик
      </span>

      <svg className={styles.lines} viewBox="0 0 1000 260" aria-hidden="true">
        <path
          className={`${styles.trace} ${styles.draw} ${on(1)}`}
          pathLength={1}
          d={TRACE}
        />
        {signal && (
          <circle className={styles.signal} r="4">
            <animateMotion dur="1s" fill="freeze" path={TRACE} />
          </circle>
        )}
      </svg>

      <div className={`${styles.site} ${styles.rev} ${on(1)}`}>
        <Image
          src="/cases/bogov-desktop.avif"
          alt="Целевая страница bogov-team.ru"
          fill
          sizes="(max-width: 760px) 92vw, 34vw"
        />
      </div>

      <ol className={`${styles.steps} ${styles.rev} ${styles.lift} ${on(2)}`}>
        <li>Понятное предложение</li>
        <li>Программы</li>
        <li>Запись</li>
      </ol>
    </div>
  );
}

export function BogovAds() {
  return (
    <section id="ads" className={styles.section} aria-labelledby="ads-title">
      <div className={styles.container}>
        <header className={styles.head}>
          <div>
            <p className={styles.eyebrow}>Яндекс Директ</p>
            <h2 id="ads-title" aria-label="Хороший сайт меняет экономику рекламы.">
              Хороший сайт меняет
              <br />
              <em>экономику рекламы.</em>
            </h2>
          </div>
          <p className={styles.description}>
            Рекламный переход ведёт на страницу{" "}
            <br />
            конкретного курса, а не на общую главную.
          </p>
        </header>

        <Stage />
      </div>
    </section>
  );
}

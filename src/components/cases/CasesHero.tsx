"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useState, type CSSProperties } from "react";
import { cases } from "@/lib/content";
import styles from "./CasesHero.module.css";

// Состояние появления выставляется до первой отрисовки, иначе финал успевает мигнуть.
const useArmingEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/* Порядок и кадрирование: самый выразительный фрагмент каждого реального скриншота. */
const composition = [
  {
    slug: "bogov",
    position: "14% 46%",
    origin: "14% 46%",
    scale: 1.02,
  },
  {
    slug: "oss",
    position: "0% 40%",
    origin: "0% 44%",
    scale: 1,
  },
  {
    slug: "volhonka",
    position: "22% 92%",
    origin: "22% 92%",
    scale: 1.5,
  },
] as const;

/* 1 главный · 2 второй · 3 третий · 4 нить · 5 подписи (≈1.4 с) */
const FINAL = 5;
const SEQUENCE = [
  { phase: 1, at: 0 },
  { phase: 2, at: 250 },
  { phase: 3, at: 500 },
  { phase: 4, at: 750 },
  { phase: 5, at: 1050 },
];

/* Тонкая нить через центры трёх проектов */
const THREAD =
  "M 330 433 C 480 430, 600 240, 770 178 C 940 116, 1010 400, 930 560 C 880 650, 850 690, 800 688";
const NODES = [
  [330, 433],
  [770, 178],
  [800, 688],
];

function Collage() {
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

  const projects = composition.map((item, index) => {
    const project = cases.find((entry) => entry.slug === item.slug);
    return project ? { ...item, project, index } : null;
  });

  return (
    <div className={styles.stage} data-armed={armed ? "true" : undefined}>
      <div className={styles.glow} aria-hidden="true" />

      {projects.map((entry) => {
        if (!entry) {
          return null;
        }
        const { project, index, position, origin, scale } = entry;
        const crop: CSSProperties = {
          objectPosition: position,
          transformOrigin: origin,
          transform: `scale(${scale})`,
        };

        return (
          <Link
            key={project.slug}
            href={`/cases/${project.slug}`}
            className={`${styles.proj} ${styles[`p${index + 1}`]} ${styles.rev} ${on(index + 1)}`}
            aria-label={`${project.name}: ${project.tags.join(", ")}`}
          >
            <span className={styles.frame}>
              <Image
                src={project.image}
                alt=""
                fill
                sizes="(max-width: 760px) 90vw, 36vw"
                style={crop}
                priority={index === 0}
              />
            </span>
            <span className={`${styles.meta} ${styles.rev} ${on(5)}`}>
              <i>0{index + 1}</i>
              <strong>{project.name}</strong>
              <em>{project.tags.join(" · ")}</em>
            </span>
          </Link>
        );
      })}

      {/* Одна тонкая нить: разные проекты — один подход */}
      <svg className={styles.thread} viewBox="0 0 1000 860" aria-hidden="true">
        <path
          className={`${styles.line} ${styles.draw} ${on(4)}`}
          pathLength={1}
          d={THREAD}
        />
        {NODES.map(([x, y], index) => (
          <circle
            key={index}
            className={`${styles.node} ${styles.rev} ${on(4)}`}
            cx={x}
            cy={y}
            r="4"
          />
        ))}
      </svg>
    </div>
  );
}

export function CasesHero() {
  return (
    <section className={styles.hero} aria-labelledby="cases-title">
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>Кейсы</p>
            <h1 id="cases-title">
              Не показываем
              <br />
              работы.
              <br />
              <em>
                Показываем,
                <br />
                что изменили.
              </em>
            </h1>
            <p className={styles.line2}>Задача → решение → результат.</p>
          </div>
          <div className={styles.visual}>
            <Collage />
          </div>
        </div>
      </div>
    </section>
  );
}

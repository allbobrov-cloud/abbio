"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FooterContactForm } from "@/components/FooterContactForm";
import styles from "./ProcessFinal.module.css";

const useArmingEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

const examples = [
  "Нужно переделать сайт.",
  "Хотим больше обращений.",
  "Не понимаем, с чего начать.",
];

export function ProcessFinal() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(2);
  const [armed, setArmed] = useState(false);

  // Базовое состояние — финальное; при движении текст, затем форма мягко проявляются.
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
        timers = [
          window.setTimeout(() => setPhase(1), 0),
          window.setTimeout(() => setPhase(2), 260),
        ];
      },
      { threshold: 0.2 }
    );

    observer.observe(root);
    return () => {
      observer.disconnect();
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  const isIn = (from: number) => (phase >= from ? styles.isIn : "");

  return (
    <section
      id="first-step"
      className={styles.section}
      aria-labelledby="first-step-title"
    >
      <div className={styles.container}>
        <div
          ref={rootRef}
          className={styles.grid}
          data-armed={armed ? "true" : undefined}
        >
          <div className={`${styles.copy} ${isIn(1)}`}>
            <p className={styles.eyebrow}>Первый шаг</p>
            <h2
              id="first-step-title"
              aria-label="Первый шаг — разобраться в задаче."
            >
              Первый шаг — <em>разобраться в задаче.</em>
            </h2>
            <p className={styles.description}>
              Не обязательно заранее знать, какая услуга вам нужна. Расскажите,
              что хотите изменить — вместе определим точку старта.
            </p>

            <div className={styles.examples}>
              <p className={styles.label}>Можно начать с нескольких слов</p>
              <ul>
                {examples.map((item) => (
                  <li key={item}>«{item}»</li>
                ))}
              </ul>
            </div>

            <p className={styles.path}>
              <span>Задача</span>
              <i aria-hidden="true">→</i>
              <span>первый разговор</span>
              <i aria-hidden="true">→</i>
              <span>точка старта</span>
            </p>
          </div>

          <div className={`${styles.form} ${isIn(2)}`}>
            <FooterContactForm variant="task" />
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./ProcessStart.module.css";

const useArmingEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

// Базовое состояние — финальное; фазы нужны только для появления.
const FINAL_PHASE = 4;
const SEQUENCE: Array<{ phase: number; at: number }> = [
  { phase: 1, at: 0 },
  { phase: 2, at: 450 },
  { phase: 3, at: 800 },
  { phase: 4, at: 1150 },
];

/* Примеры показывают механику, а не обязательный состав работ. */
const examples = [
  {
    phrase: "Сайт есть, но обращений мало.",
    scope: ["Анализ", "Структура", "UX/UI", "Аналитика"],
    stages: ["Анализ", "Проектирование", "Изменения", "Проверка"],
  },
  {
    phrase: "Нужно запустить новое направление.",
    scope: ["Предложение", "Страница запуска", "Дизайн", "Каналы"],
    stages: ["Задача", "Структура", "Дизайн", "Запуск"],
  },
  {
    phrase: "Не понимаем, работает ли реклама.",
    scope: ["Источники", "Аналитика", "Отчётность", "Кампании"],
    stages: ["Данные", "Аналитика", "Корректировки", "Отчёт"],
  },
] as const;

function Refresh() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M13.5 8a5.5 5.5 0 1 1-1.7-4M13.5 2.5v3h-3" />
    </svg>
  );
}

function StartStage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(FINAL_PHASE);
  const [armed, setArmed] = useState(false);
  const [active, setActive] = useState(0);

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
      { threshold: 0.3 }
    );

    observer.observe(root);
    return () => {
      observer.disconnect();
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  const isIn = (from: number) => (phase >= from ? styles.isIn : "");
  const example = examples[active];
  const next = () => setActive((current) => (current + 1) % examples.length);

  return (
    <div
      ref={rootRef}
      className={styles.root}
      data-armed={armed ? "true" : undefined}
    >
      {/* Исходная фраза клиента — как введённая в поле */}
      <div className={`${styles.ask} ${isIn(1)}`}>
        <span className={styles.askLabel}>Задача</span>
        <p className={styles.askText} key={active} aria-live="polite">
          {example.phrase}
        </p>
        <button type="button" className={styles.askNext} onClick={next}>
          <span>Другой пример</span>
          <small>
            {active + 1} / {examples.length}
          </small>
          <i>
            <Refresh />
          </i>
        </button>
      </div>

      <div className={`${styles.funnel} ${styles.fresh}`} key={active}>
        <p className={`${styles.link} ${isIn(2)}`} aria-hidden="true">
          <span>Первый разбор</span>
        </p>

        {/* Состав — штриховая рамка */}
        <section className={`${styles.band} ${styles.bandScope} ${isIn(2)}`}>
          <p className={styles.microLabel}>
            Состав работ <em>пример после разбора</em>
          </p>
          <ul>
            {example.scope.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <span className={`${styles.link} ${isIn(3)}`} aria-hidden="true" />

        {/* Этапы — сплошная сегментная полоса */}
        <section className={`${styles.band} ${styles.bandStages} ${isIn(3)}`}>
          <p className={styles.microLabel}>Этапы</p>
          <ol>
            {example.stages.map((item, index) => (
              <li key={item}>
                <span>0{index + 1}</span>
                {item}
              </li>
            ))}
          </ol>
        </section>

        <span className={`${styles.link} ${isIn(4)}`} aria-hidden="true" />

        {/* Условия — заливка: конкретика */}
        <section className={`${styles.band} ${styles.bandTerms} ${isIn(4)}`}>
          <dl>
            <div>
              <dt>Сроки</dt>
              <dd>Фиксируем по этапам</dd>
            </div>
            <div>
              <dt>Стоимость</dt>
              <dd>Определяем после понимания объёма</dd>
            </div>
          </dl>
        </section>
      </div>
    </div>
  );
}

export function ProcessStart() {
  return (
    <section
      id="start"
      className={styles.section}
      aria-labelledby="start-title"
    >
      <div className={styles.container}>
        <header className={styles.head}>
          <div>
            <p className={styles.eyebrow}>Старт проекта</p>
            <h2
              id="start-title"
              aria-label="Для старта не нужно готовое ТЗ."
            >
              Для старта
              <br />
              <em>не нужно готовое ТЗ.</em>
            </h2>
          </div>
          <p className={styles.description}>
            Достаточно рассказать, что хотите изменить.{" "}
            <br />
            Вместе определим необходимый объём работ.
          </p>
        </header>
        <StartStage />
      </div>
    </section>
  );
}

"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import styles from "./ProcessProjectState.module.css";

// Состояние появления выставляется до первой отрисовки, иначе финальная
// композиция успевает мигнуть перед стартом последовательности.
const useArmingEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

const REVEAL_ORDER = [
  "idle",
  "project",
  "done",
  "current",
  "today",
  "status",
  "request",
  "next",
  "future",
] as const;

type Reveal = (typeof REVEAL_ORDER)[number];

const revealIndex = (step: Reveal) => REVEAL_ORDER.indexOf(step);

const SEQUENCE: Array<{ step: Reveal; at: number }> = [
  { step: "project", at: 0 },
  { step: "done", at: 300 },
  { step: "current", at: 600 },
  { step: "today", at: 900 },
  { step: "status", at: 1200 },
  { step: "request", at: 1500 },
  { step: "next", at: 1800 },
  { step: "future", at: 2000 },
];

const doneStages = [
  { number: "01", title: "Задача", detail: "Бриф зафиксирован" },
  { number: "02", title: "Структура", detail: "Карта страниц" },
  { number: "03", title: "Прототип", detail: "Основные сценарии" },
];

const futureStages = [
  { number: "05", title: "Разработка", detail: "После согласования дизайна" },
  { number: "06", title: "Запуск", detail: "Проверка и передача" },
];

const SUMMARY =
  "Демонстрация состояния условного проекта: корпоративный сайт, этап 04 из 06. " +
  "Завершены задача, структура и прототип. Сейчас идёт дизайн: в работе главная страница, макет ожидает согласования. " +
  "От клиента нужно посмотреть главную страницу и оставить комментарии. " +
  "Далее — адаптивные версии, затем разработка и запуск.";

export function ProcessProjectState() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [reveal, setReveal] = useState<Reveal>("future");
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
    setReveal("idle");

    let timers: number[] = [];
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }
        observer.disconnect();
        timers = SEQUENCE.map((item) =>
          window.setTimeout(() => setReveal(item.step), item.at)
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

  const shown = (step: Reveal) => revealIndex(reveal) >= revealIndex(step);
  const mark = (step: Reveal) => (shown(step) ? styles.isIn : "");
  const delay = (index: number) => ({ "--i": index }) as CSSProperties;

  return (
    <div
      ref={rootRef}
      className={styles.root}
      data-armed={armed ? "true" : undefined}
      role="img"
      aria-label={SUMMARY}
    >
      <div className={`${styles.project} ${mark("project")}`} aria-hidden="true">
        <div className={styles.projectTitle}>
          <p className={styles.projectLabel}>
            Проект <i>·</i> <b>Демо</b>
          </p>
          <strong>Корпоративный сайт</strong>
          <small>ABBiO × Клиент</small>
        </div>
        <p className={styles.projectStage}>
          <span>Этап</span>
          <b>04</b>
          <i>/ 06</i>
        </p>
      </div>

      <div className={styles.mini} aria-hidden="true">
        <ol className={styles.miniBar}>
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <li
              key={n}
              className={n < 4 ? styles.miniDone : n === 4 ? styles.miniNow : ""}
            />
          ))}
        </ol>
        <dl className={styles.miniList}>
          <div>
            <dt>Готово</dt>
            <dd>Задача · Структура · Прототип</dd>
          </div>
          <div className={styles.miniCurrent}>
            <dt>Сейчас</dt>
            <dd>Дизайн главной страницы</dd>
          </div>
          <div>
            <dt>Дальше</dt>
            <dd>Адаптив · Разработка · Запуск</dd>
          </div>
        </dl>
        <p className={styles.miniAsk}>
          <span>Нужно от вас</span>
          Посмотреть макет и оставить комментарии
        </p>
      </div>

      <div className={styles.register} aria-hidden="true">
        {doneStages.map((stage, index) => (
          <div
            key={stage.number}
            className={`${styles.row} ${styles.rowDone} ${mark("done")}`}
            style={delay(index)}
          >
            <span className={styles.rowNumber}>{stage.number}</span>
            <span className={styles.rowTitle}>{stage.title}</span>
            <span className={styles.rowDetail}>{stage.detail}</span>
            <span className={styles.rowState}>
              <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.5 6.4 4.9 8.8 9.6 3.5" />
              </svg>
            </span>
          </div>
        ))}

        <div className={`${styles.current} ${mark("current")}`}>
          <div className={styles.currentHead}>
            <span className={styles.currentNumber}>04</span>
            <p className={styles.currentTitle}>Дизайн</p>
            <span className={styles.currentBadge}>
              <i />
              Сейчас
            </span>
          </div>
          <p className={styles.currentScope}>
            В работе <em>—</em> Главная страница
          </p>

          <div className={`${styles.today} ${mark("today")}`}>
            <p className={styles.microLabel}>Сегодня</p>
            <div className={styles.todayLine}>
              <strong>Дизайн главной страницы</strong>
              <span className={styles.version}>Версия 02</span>
            </div>
            <p className={`${styles.status} ${mark("status")}`}>
              <i />
              Ожидает согласования
            </p>
          </div>

          <div className={`${styles.request} ${mark("request")}`}>
            <p className={styles.microLabel}>Нужно от вас</p>
            <p className={styles.requestText}>
              Посмотреть главную страницу и оставить комментарии
            </p>
            <span className={styles.requestControl}>Открыть макет</span>
            <p className={styles.requestHint}>Иллюстрация, не активная кнопка</p>
          </div>
        </div>

        <div className={`${styles.nextStrip} ${mark("next")}`} aria-hidden="true">
          <span className={styles.microLabel}>Далее</span>
          <strong>Адаптивные версии</strong>
        </div>

        {futureStages.map((stage, index) => (
          <div
            key={stage.number}
            className={`${styles.row} ${styles.rowFuture} ${mark("future")}`}
            style={delay(index)}
          >
            <span className={styles.rowNumber}>{stage.number}</span>
            <span className={styles.rowTitle}>{stage.title}</span>
            <span className={styles.rowDetail}>{stage.detail}</span>
            <span className={styles.rowState}>Далее</span>
          </div>
        ))}
      </div>
    </div>
  );
}

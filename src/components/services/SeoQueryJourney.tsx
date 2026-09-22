"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./SeoQueryJourney.module.css";

const QUERY = "профильная труба 09г2с купить спб";

const steps = [
  { id: "query", label: "Запрос", value: `«${QUERY}»`, muted: false },
  { id: "search", label: "Поиск", value: "Страница есть в выдаче", muted: true },
  { id: "page", label: "Страница", value: "Каталог: профильная труба 09Г2С", muted: false },
  { id: "action", label: "Действие", value: "Заявка на расчёт", muted: false },
  { id: "lead", label: "Обращение", value: "Источник: органический поиск", muted: false },
] as const;

export function SeoQueryJourney() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className={[styles.journey, revealed ? styles.revealed : ""].join(" ")}
      role="img"
      aria-label="Путь одного запроса: от поиска через страницу и заявку до обращения в CRM со статусом «Принято в работу». Позиция в поиске — лишь один из шагов, а не главный результат"
    >
      <div className={styles.line} aria-hidden="true" />
      <ol className={styles.steps} aria-hidden="true">
        {steps.map((step, index) => (
          <li
            key={step.id}
            className={[styles.step, step.muted ? styles.stepMuted : ""].join(" ")}
            style={{ "--si": index } as React.CSSProperties}
          >
            <i className={styles.dot} />
            <span className={styles.stepLabel}>{step.label}</span>
            <p className={styles.stepValue}>{step.value}</p>
          </li>
        ))}
        <li className={styles.step} style={{ "--si": steps.length } as React.CSSProperties}>
          <i className={styles.dot} />
          <span className={styles.stepLabel}>CRM</span>
          <p className={styles.crmStatus}><i />Принято в работу</p>
        </li>
      </ol>
    </div>
  );
}

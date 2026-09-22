"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./SeoDemandSpace.module.css";

type Query = { text: string; size?: "lg" | "md" };

const groups: { id: string; label: string; hint: string; queries: Query[] }[] = [
  {
    id: "buy",
    label: "Купить",
    hint: "Человек уже готов выбирать поставщика",
    queries: [
      { text: "арматура купить спб", size: "lg" },
      { text: "труба 09г2с цена" },
      { text: "профильная труба 60×40 купить" },
    ],
  },
  {
    id: "choose",
    label: "Выбрать",
    hint: "Нужно помочь принять решение",
    queries: [
      { text: "какая арматура нужна для фундамента", size: "lg" },
      { text: "какую профильную трубу выбрать" },
    ],
  },
  {
    id: "compare",
    label: "Сравнить",
    hint: "Человек сравнивает варианты",
    queries: [
      { text: "09г2с или ст3", size: "lg" },
      { text: "а500с или а400" },
    ],
  },
  {
    id: "learn",
    label: "Разобраться",
    hint: "Человек ищет информацию до выбора",
    queries: [
      { text: "вес профильной трубы", size: "lg" },
      { text: "размеры профильной трубы" },
      { text: "как рассчитать вес трубы" },
    ],
  },
];

export function SeoDemandSpace() {
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
      className={[styles.space, revealed ? styles.revealed : ""].join(" ")}
      role="img"
      aria-label="Множество поисковых запросов вокруг темы «металлопрокат» группируется по намерению: купить, выбрать, сравнить или разобраться"
    >
      <div className={styles.topic} aria-hidden="true">
        <span>Поисковая тема</span>
        <strong>металлопрокат</strong>
      </div>

      <div className={styles.grid} aria-hidden="true">
        {groups.map((group, gIndex) => (
          <div className={styles.zone} data-zone={group.id} key={group.id} style={{ "--gi": gIndex } as React.CSSProperties}>
            <p className={styles.zoneLabel}>
              {String(gIndex + 1).padStart(2, "0")} / {group.label.toUpperCase()}
              <em>{group.hint}</em>
            </p>
            <div className={styles.chips}>
              {group.queries.map((q, qIndex) => (
                <span
                  className={[styles.chip, q.size === "lg" ? styles.chipLg : ""].join(" ")}
                  style={{ "--qi": qIndex } as React.CSSProperties}
                  key={q.text}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                    <circle cx="11" cy="11" r="6.2" />
                    <path d="M20 20l-4.2-4.2" />
                  </svg>
                  {q.text}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className={styles.closingLine}>
        Разные запросы — разные задачи клиента.
        <span>Сначала понимаем спрос. Затем решаем, какие страницы должны на него отвечать.</span>
      </p>
    </div>
  );
}

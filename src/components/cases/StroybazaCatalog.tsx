"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./StroybazaCatalog.module.css";

// Состояние появления выставляется до первой отрисовки, иначе финал успевает мигнуть.
const useArmingEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

const categories = [
  { title: "Стены и кладка", tags: ["Кирпич", "Газобетон"] },
  { title: "Кровля", tags: ["Профнастил", "Черепица"] },
  { title: "Металл", tags: ["Трубы", "Арматура"] },
  { title: "Фасад и утепление", tags: ["Изоляция", "Материалы"] },
  { title: "Пиломатериалы", tags: ["Доска", "Брус"] },
  { title: "Благоустройство", tags: ["Заборы", "Ограждения"] },
];

const facts = [
  { value: "6+", label: "основных направлений" },
  { value: "Сотни", label: "подкатегорий и параметров" },
  { value: "Удобная", label: "навигация до товара" },
];

export function StroybazaCatalog() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(true);
  const [armed, setArmed] = useState(false);

  useArmingEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setArmed(true);
    setSeen(false);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        setSeen(true);
        window.setTimeout(() => setArmed(false), 4200);
      },
      { threshold: 0.15 }
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="stroybaza-catalog" className={styles.section} aria-labelledby="stroybaza-catalog-title">
      <div
        ref={rootRef}
        className={`${styles.stage} ${seen ? styles.seen : ""}`}
        data-armed={armed ? "true" : undefined}
      >
        <p className={styles.corner}>Весь ассортимент для строительных задач.</p>

        <div className={`${styles.head} ${styles.rev}`}>
          <p className={styles.eyebrow}><span aria-hidden="true" />01 · Структура каталога</p>
          <h2 id="stroybaza-catalog-title">Разные материалы.<br /><em>Одна понятная система.</em></h2>
          <p className={styles.description}>От кирпича до кровли и металла — единая структура: категория, подкатегория, товар.</p>
        </div>

        <div className={`${styles.facts} ${styles.rev}`} aria-label="Каталог в цифрах">
          {facts.map((fact) => (
            <div key={fact.label}><strong>{fact.value}</strong><span>{fact.label}</span></div>
          ))}
        </div>

        <div className={styles.grid} aria-label="Шесть направлений каталога">
          {categories.map((category, index) => (
            <article className={`${styles.card} ${styles.rev} ${styles[`c${index}`]}`} key={category.title}>
              <span className={`${styles.art} ${styles[`art${index}`]}`} role="img" aria-label={category.title} />
              <h3>{category.title}</h3>
              <p className={styles.tags}>
                {category.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </p>
              <span className={styles.go} aria-hidden="true">→</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

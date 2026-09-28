"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./StroybazaResults.module.css";

// Состояние появления выставляется до первой отрисовки, иначе финал успевает мигнуть.
const useArmingEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

const TOP_TOTAL = 150;
const TOP_SHARE = 0.7;
const TOP_LIT = Math.round(TOP_TOTAL * TOP_SHARE);

const kpis = [
  { id: "top", target: 70, format: (v: number) => `${v}%`, title: "запросов в ТОП-10", sub: "из 150 отслеживаемых" },
  { id: "users", target: 15000, format: (v: number) => `≈ ${v.toLocaleString("ru-RU")}`, title: "пользователей в месяц", sub: "из поиска" },
  { id: "leads", target: 500, format: (v: number) => `≈ ${v}`, title: "заявок в месяц", sub: "за счёт SEO" },
] as const;

const COUNT_MS = 1600;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);

// Точки матрицы плавно переходят из цвета клиента в фирменный фиолетовый ABBiO.
function mix(from: number[], to: number[], t: number) {
  return `rgb(${from.map((c, i) => Math.round(c + (to[i] - c) * t)).join(" ")})`;
}
const dotColors = Array.from({ length: TOP_LIT }, (_, i) => mix([54, 190, 255], [183, 160, 239], i / (TOP_LIT - 1)));

/*
 * 07 · Результат — финал кейса. Бенто-раскладка: главный KPI с матрицей 150 отслеживаемых
 * запросов (70% загораются), два KPI справа. Цвет цифр и фона уходит от синего клиента
 * к фиолетовому ABBiO, чтобы блок бесшовно передавал страницу в футер агентства.
 */
export function StroybazaResults() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(true);
  const [armed, setArmed] = useState(false);
  const [progress, setProgress] = useState(1);

  useArmingEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setArmed(true);
    setSeen(false);
    setProgress(0);
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        setSeen(true);
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / COUNT_MS);
          setProgress(easeOut(t));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        window.setTimeout(() => setArmed(false), 3200);
      },
      { threshold: 0.25 }
    );
    observer.observe(root);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  const shown = (target: number, step: number) => Math.round((target * progress) / step) * step;

  return (
    <section id="stroybaza-results" className={styles.section} aria-labelledby="stroybaza-results-title">
      <div
        ref={rootRef}
        className={`${styles.stage} ${seen ? styles.seen : ""}`}
        data-armed={armed ? "true" : undefined}
      >
        <p className={`${styles.eyebrow} ${styles.rev}`}><span aria-hidden="true" />07 · Результат</p>
        <h2 id="stroybaza-results-title" className={styles.rev}>
          Сайт работает{" "}
          <br />
          <em>как канал привлечения.</em>
        </h2>

        <div className={styles.bento} aria-label="Результаты SEO-продвижения">
          {kpis.map((kpi, index) => {
            const value = kpi.format(shown(kpi.target, kpi.target >= 1000 ? 100 : 1));
            return (
              <article
                key={kpi.id}
                className={`${styles.card} ${styles[kpi.id]} ${styles.rev}`}
                style={{ transitionDelay: armed ? `${0.25 + index * 0.12}s` : undefined }}
              >
                <div className={styles.copy}>
                  <p className={styles.value}>
                    <span className={styles.srOnly}>{kpi.format(kpi.target)}</span>
                    <span aria-hidden="true">{value}</span>
                  </p>
                  <p className={styles.title}>{kpi.title}</p>
                  <p className={styles.sub}>{kpi.sub}</p>
                </div>

                {kpi.id === "top" && (
                  <div className={styles.matrix} aria-hidden="true">
                    {Array.from({ length: TOP_TOTAL }, (_, i) => (
                      <i
                        key={i}
                        className={i < TOP_LIT ? styles.lit : undefined}
                        style={i < TOP_LIT ? ({ "--c": dotColors[i], "--i": i } as CSSProperties) : undefined}
                      />
                    ))}
                  </div>
                )}
              </article>
            );
          })}
        </div>

        <p className={`${styles.finalThesis} ${styles.rev}`}>
          <b>SEO</b> стало самостоятельным каналом привлечения клиентов.
        </p>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./ServicesOverviewPage.module.css";

type Stage = {
  number: string;
  title: string;
  summary: string;
};

const stages: Stage[] = [
  { number: "01", title: "Сайт", summary: "Создаём основу" },
  { number: "02", title: "Привлечение", summary: "Приводим спрос" },
  { number: "03", title: "CRM", summary: "Не теряем обращения" },
  { number: "04", title: "Аналитика", summary: "Понимаем результат" },
];

export function ServicesProgressiveSystem() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [activeStage, setActiveStage] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.22 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.formats} id="formats" aria-labelledby="formats-title" ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.progressiveHeader}>
          <p className={styles.sectionIndex}>Поэтапная работа</p>
          <div>
            <h2 id="formats-title">Можно начать с одной задачи.</h2>
            <p>Не обязательно запускать всё одновременно. Начинаем с того, что важно сейчас, и подключаем следующие направления по мере необходимости.</p>
          </div>
        </div>

        <div className={[styles.evolutionSystem, isRevealed ? styles.evolutionSystemRevealed : ""].join(" ")}>
          <div className={styles.evolutionIntro}>
            <span>Пример развития системы</span>
            <p>Точка старта зависит от задачи.</p>
          </div>

          <div className={styles.evolutionChain} aria-label="Пример развития проекта: сайт, привлечение, CRM, аналитика">
            {stages.map((stage, index) => (
              <div className={styles.evolutionStep} data-precedes-active={activeStage === index + 1 || undefined} key={stage.title}>
                <button
                  aria-label={`${stage.title}: ${stage.summary}. Можно начать с этого этапа.`}
                  className={styles.evolutionNode}
                  data-active={activeStage === index || undefined}
                  onClick={() => setActiveStage(index)}
                  onFocus={() => setActiveStage(index)}
                  onMouseEnter={() => setActiveStage(index)}
                  style={{ "--stage": index } as CSSProperties}
                  type="button"
                >
                  <span className={styles.evolutionNumber}>{stage.number}</span>
                  <strong>{stage.title}</strong>
                  <small>{stage.summary}</small>
                  <em>Можно начать здесь</em>
                </button>
                {index < stages.length - 1 && (
                  <div aria-hidden="true" className={styles.evolutionConnector} style={{ "--stage": index } as CSSProperties}>
                    <span>+</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className={styles.evolutionConclusion}>
            <strong>Не обязательно запускать всё одновременно.</strong>
            <span>Начинаем с того, что даст результат сейчас. Остальное подключаем по мере необходимости.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

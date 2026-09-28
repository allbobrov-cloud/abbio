"use client";

import { useState, type CSSProperties } from "react";
import page from "./ServicesOverviewPage.module.css";
import styles from "./ServicesProgressive.module.css";

const stages = [
  { number: "01", title: "Сайт", summary: "Создаём основу", art: "site" },
  { number: "02", title: "Привлечение", summary: "Приводим спрос", art: "reach" },
  { number: "03", title: "CRM", summary: "Не теряем обращения", art: "crm" },
  { number: "04", title: "Аналитика", summary: "Понимаем результат", art: "stats" },
] as const;

/* Мини-иллюстрации этапов, нарисованные разметкой — без картинок */
function Art({ kind }: { kind: (typeof stages)[number]["art"] }) {
  if (kind === "site") {
    return (
      <span className={`${styles.art} ${styles.artSite}`} aria-hidden="true">
        <b><i /><i /><i /></b>
        <em /><em /><s />
      </span>
    );
  }
  if (kind === "reach") {
    return (
      <span className={`${styles.art} ${styles.artReach}`} aria-hidden="true">
        {[38, 52, 46, 68, 84].map((h, i) => <i key={i} style={{ "--h": `${h}%`, "--i": i } as CSSProperties} />)}
      </span>
    );
  }
  if (kind === "crm") {
    return (
      <span className={`${styles.art} ${styles.artCrm}`} aria-hidden="true">
        {[0, 1, 2].map((i) => <i key={i} style={{ "--i": i } as CSSProperties}><b /><em /></i>)}
      </span>
    );
  }
  return (
    <span className={`${styles.art} ${styles.artStats}`} aria-hidden="true">
      <svg viewBox="0 0 120 60" preserveAspectRatio="none">
        <path className={styles.area} d="M0 52 L20 44 L40 47 L60 30 L80 34 L100 16 L120 10 L120 60 L0 60 Z" />
        <path className={styles.line} d="M0 52 L20 44 L40 47 L60 30 L80 34 L100 16 L120 10" pathLength={1} />
      </svg>
    </span>
  );
}

/*
 * «Можно начать с одной задачи»: четыре этапа развития системы. Выбранный — точка старта
 * (по умолчанию «Сайт»), следующие отмечены как подключаемые позже, предыдущие — как необязательные.
 */
export function ServicesProgressiveSystem() {
  const [start, setStart] = useState(0);

  return (
    <section className={styles.section} id="formats" aria-labelledby="formats-title">
      <div className={page.container}>
        <header className={styles.head}>
          <div>
            <p className={styles.eyebrow}>Поэтапная работа</p>
            <h2 id="formats-title">
              Можно начать{" "}
              <em>с одной задачи.</em>
            </h2>
          </div>
          <p className={styles.lead}>
            Не обязательно запускать всё одновременно. Начинаем с того, что важно сейчас, и подключаем следующие
            направления по мере необходимости.
          </p>
        </header>

        <div className={styles.board}>
          <div className={styles.boardHead}>
            <span>Пример развития системы</span>
            <p>Выберите точку старта — она зависит от задачи</p>
          </div>

          <ol className={styles.chain} style={{ "--start": start } as CSSProperties}>
            {stages.map((stage, index) => {
              const state = index === start ? "start" : index > start ? "later" : "optional";
              return (
                <li key={stage.title} data-state={state}>
                  <button
                    type="button"
                    className={styles.card}
                    aria-pressed={index === start}
                    onClick={() => setStart(index)}
                    onPointerEnter={(event) => event.pointerType === "mouse" && setStart(index)}
                  >
                    <span className={styles.top}>
                      <span className={styles.num}>{stage.number}</span>
                      <span className={styles.badge}>
                        {state === "start" ? "Старт здесь" : state === "later" ? "+ Позже" : "По желанию"}
                      </span>
                    </span>
                    <Art kind={stage.art} />
                    <strong>{stage.title}</strong>
                    <span className={styles.summary}>{stage.summary}</span>
                  </button>
                  {index < stages.length - 1 && <span className={styles.link} aria-hidden="true"><i /></span>}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

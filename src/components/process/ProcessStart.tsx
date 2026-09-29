"use client";

import { useState, type CSSProperties } from "react";
import styles from "./ProcessStart.module.css";

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

/* Оттенки пунктов плана: синий, лавандовый, янтарный, зелёный — те же, что в статусах сайта. */
const hues = ["#7c9bff", "#b7a0ef", "#f2b64c", "#3fd98a"];

/*
 * «Для старта не нужно готовое ТЗ»: слева — задача своими словами (три примера на выбор),
 * справа — черновик плана после первого разбора: состав работ, этапы и условия.
 */
export function ProcessStart() {
  const [active, setActive] = useState(0);
  const example = examples[active];

  return (
    <section id="start" className={styles.section} aria-labelledby="start-title">
      <div className={styles.container}>
        <header className={styles.head}>
          <div>
            <p className={styles.eyebrow}>Старт проекта</p>
            <h2 id="start-title">
              Для старта{" "}
              <br />
              <em>не нужно готовое ТЗ.</em>
            </h2>
          </div>
          <p className={styles.lead}>Достаточно рассказать, что хотите изменить. Вместе определим необходимый объём работ.</p>
        </header>

        <div className={styles.grid}>
          <div className={styles.ask}>
            <p className={styles.label}><span>01</span>Вы рассказываете</p>
            <p className={styles.bubble} key={active} aria-live="polite">
              <small>
                <i className={styles.avatar} aria-hidden="true">Вы</i>
                Задача своими словами
              </small>
              <span>
                «{example.phrase}»
                <i className={styles.caret} aria-hidden="true" />
              </span>
            </p>
            <div className={styles.examples} role="group" aria-label="Примеры задач">
              <span>Выберите пример</span>
              {examples.map((item, index) => (
                <button key={item.phrase} type="button" aria-pressed={index === active} onClick={() => setActive(index)}>
                  {item.phrase}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.beam} aria-hidden="true">
            <span className={styles.beamLine} />
            <span className={styles.beamPill}>Первый разбор</span>
          </div>

          <article className={styles.plan} key={active}>
            <header className={styles.planHead}>
              <p className={styles.label}><span>02</span>Мы предлагаем план</p>
              <span className={styles.draft}>Пример после разбора</span>
            </header>

            <div className={styles.block} style={{ "--d": 0 } as CSSProperties}>
              <p className={styles.blockLabel}>Состав работ</p>
              <ul className={styles.scope}>
                {example.scope.map((item, index) => (
                  <li key={item} style={{ "--c": hues[index], "--i": index } as CSSProperties}>{item}</li>
                ))}
              </ul>
            </div>

            <div className={styles.block} style={{ "--d": 1 } as CSSProperties}>
              <p className={styles.blockLabel}>Этапы</p>
              <ol className={styles.stages}>
                {example.stages.map((item, index) => (
                  <li key={item} style={{ "--c": hues[index], "--i": index } as CSSProperties}>
                    <b>{String(index + 1).padStart(2, "0")}</b>
                    {item}
                  </li>
                ))}
              </ol>
            </div>

            <dl className={styles.terms} style={{ "--d": 2 } as CSSProperties}>
              <div className={styles.time}>
                <dt><svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>Сроки</dt>
                <dd>Фиксируем по этапам</dd>
              </div>
              <div className={styles.cost}>
                <dt><svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true"><path d="M9 20V4h5a4 4 0 0 1 0 8H7M7 16h8" /></svg>Стоимость</dt>
                <dd>Определяем после понимания объёма</dd>
              </div>
            </dl>
          </article>
        </div>
      </div>
    </section>
  );
}

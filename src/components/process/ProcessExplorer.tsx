"use client";

import { useId, useState, type ReactNode } from "react";
import styles from "./ProcessExplorer.module.css";

type StageId = "discover" | "agree" | "build" | "launch";

type Stage = {
  id: StageId;
  number: string;
  title: string;
  summary: string;
  heading: string;
  result: string;
  finalNote?: string;
};

const stages: Stage[] = [
  {
    id: "discover",
    number: "01",
    title: "Разбираемся",
    summary: "Понимаем задачу и что должно измениться.",
    heading: "Сначала понимаем задачу, а не предлагаем услугу.",
    result: "Задача сформулирована.",
  },
  {
    id: "agree",
    number: "02",
    title: "Договариваемся",
    summary: "Фиксируем состав работ и условия.",
    heading: "До старта понятно, что именно делаем.",
    result: "Понятен объём проекта и условия работы.",
  },
  {
    id: "build",
    number: "03",
    title: "Делаем",
    summary: "Показываем промежуточный результат.",
    heading: "Не исчезаем до финальной презентации.",
    result: "Согласованный результат готов к запуску.",
  },
  {
    id: "launch",
    number: "04",
    title: "Запускаем",
    summary: "Проверяем, запускаем и передаём.",
    heading: "Запуск — не момент, когда мы просто отдаём файлы.",
    result: "Проект работает и передан клиенту.",
    finalNote: "Если нужно развитие — определяем следующий этап отдельно.",
  },
];

function Tick() {
  return (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2.5 6.4 4.9 8.8 9.6 3.5" />
    </svg>
  );
}

/* 01 — исходная фраза клиента ветвится на четыре вопроса разбора. */
function DiscoverVisual() {
  const questions = [
    ["Бизнес", "Что продаём?"],
    ["Клиент", "Кому?"],
    ["Сейчас", "Что не работает?"],
    ["Цель", "Что должно измениться?"],
  ];

  return (
    <div className={styles.discover}>
      <p className={styles.quote}>Сайт есть, но обращений мало.</p>
      <ul className={styles.branch}>
        {questions.map(([label, text]) => (
          <li key={label}>
            <span>{label}</span>
            <strong>{text}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* 02 — состав проекта как набор слоёв с зафиксированными условиями. */
function AgreeVisual() {
  const scope = [
    { title: "Структура", note: "страницы и разделы" },
    { title: "UX/UI", note: "макеты и состояния" },
    { title: "Разработка", note: "вёрстка и логика" },
    { title: "CRM", note: "передача обращений" },
  ];
  const terms = ["Состав", "Этапы", "Сроки", "Стоимость"];

  return (
    <div className={styles.agree}>
      <p className={styles.projectName}>Корпоративный сайт</p>
      <ul className={styles.layers}>
        {scope.map((item) => (
          <li key={item.title}>
            <i className={styles.tick}>
              <Tick />
            </i>
            <strong>{item.title}</strong>
            <em>{item.note}</em>
          </li>
        ))}
      </ul>
      <ul className={styles.locks}>
        {terms.map((term) => (
          <li key={term}>
            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
              <rect x="2.5" y="5.4" width="7" height="5" rx="1.2" />
              <path d="M4.2 5.4V4a1.8 1.8 0 0 1 3.6 0v1.4" />
            </svg>
            {term}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* 03 — каркас страницы, над которой идёт работа, рядом с ходом проекта. */
function BuildVisual() {
  const track = [
    { title: "Структура", state: "Согласована", done: true },
    { title: "Прототип", state: "Согласован", done: true },
    { title: "Дизайн", state: "В работе", current: true },
    { title: "Разработка", state: "Далее" },
  ];

  return (
    <>
      <div className={styles.build}>
        <div className={styles.wire} aria-hidden="true">
          <span className={styles.wireTop} />
          <div className={styles.wireHero}>
            <i />
            <i />
            <b />
          </div>
          <div className={styles.wireRow}>
            <span />
            <span />
            <span />
          </div>
          <span className={styles.wireNote}>Главная · в работе</span>
        </div>

        <ol className={styles.track}>
          {track.map((item) => (
            <li
              key={item.title}
              className={[
                item.done ? styles.trackDone : "",
                item.current ? styles.trackCurrent : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <strong>{item.title}</strong>
              <span>
                {item.current && <i className={styles.dot} aria-hidden="true" />}
                {item.state}
                {item.done && (
                  <i className={styles.tick}>
                    <Tick />
                  </i>
                )}
              </span>
            </li>
          ))}
        </ol>
      </div>
      <p className={styles.statement}>
        Вы видите проект до того, как изменения становятся дорогими.
      </p>
    </>
  );
}

/* 04 — проверка на устройствах и статус запуска. */
function LaunchVisual() {
  const checks = ["Формы", "Интеграции", "Аналитика"];

  return (
    <div className={styles.launch}>
      <div className={styles.devices} aria-hidden="true">
        <div className={styles.deviceDesktop}>
          <span />
          <span />
          <i className={styles.deviceTick}>
            <Tick />
          </i>
        </div>
        <div className={styles.devicePhone}>
          <span />
          <i className={styles.deviceTick}>
            <Tick />
          </i>
        </div>
      </div>

      <div className={styles.launchSide}>
        <ul className={styles.checks}>
          {checks.map((check) => (
            <li key={check}>
              <i className={styles.tick}>
                <Tick />
              </i>
              {check}
            </li>
          ))}
        </ul>
        <p className={styles.launchStatus}>
          <i className={styles.dot} aria-hidden="true" />
          Проект запущен
          <small>доступы и материалы переданы</small>
        </p>
      </div>
    </div>
  );
}

const visuals: Record<StageId, ReactNode> = {
  discover: <DiscoverVisual />,
  agree: <AgreeVisual />,
  build: <BuildVisual />,
  launch: <LaunchVisual />,
};

export function ProcessExplorer() {
  const [active, setActive] = useState<StageId>("discover");
  const baseId = useId();
  const activeIndex = stages.findIndex((stage) => stage.id === active);

  return (
    <section
      id="process"
      className={styles.section}
      aria-labelledby={`${baseId}-title`}
    >
      <div className={styles.container}>
        <header className={styles.head}>
          <div>
            <p className={styles.eyebrow}>Как идёт проект</p>
            <h2
              id={`${baseId}-title`}
              aria-label="От задачи до запуска — четыре понятных этапа."
            >
              От задачи до запуска —
              <br />
              <em>четыре понятных этапа.</em>
            </h2>
          </div>
          <p className={styles.description}>
            На каждом этапе понятно, что происходит сейчас{" "}
            <br />
            и что будет дальше.
          </p>
        </header>

        <div className={styles.explorer}>
          {stages.map((stage, index) => {
            const isActive = index === activeIndex;
            const isPassed = index < activeIndex;
            const nextStage = stages[index + 1];
            const buttonId = `${baseId}-${stage.id}-tab`;
            const panelId = `${baseId}-${stage.id}-panel`;

            return [
              <button
                key={`${stage.id}-button`}
                type="button"
                id={buttonId}
                data-tint={stage.id}
                className={[
                  styles.stage,
                  isActive ? styles.stageActive : "",
                  isPassed ? styles.stagePassed : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-expanded={isActive}
                aria-controls={panelId}
                onClick={() => setActive(stage.id)}
              >
                <span className={styles.stageNumber}>{stage.number}</span>
                <span className={styles.stageTitle}>{stage.title}</span>
                <span className={styles.stageSummary}>{stage.summary}</span>
              </button>,
              <div
                key={`${stage.id}-panel`}
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                data-tint={stage.id}
                className={styles.panel}
                hidden={!isActive}
              >
                {isActive && (
                  <div className={styles.panelBody} key={stage.id}>
                    <h3 className={styles.panelTitle}>{stage.heading}</h3>
                    <div className={styles.visual}>{visuals[stage.id]}</div>

                    <footer className={styles.outcome}>
                      <p className={styles.result}>
                        <i className={styles.tick}>
                          <Tick />
                        </i>
                        {stage.result}
                      </p>
                      {nextStage ? (
                        <button
                          type="button"
                          className={styles.nextAction}
                          onClick={() => setActive(nextStage.id)}
                        >
                          Далее: {nextStage.title.toLowerCase()}
                          <span aria-hidden="true">→</span>
                        </button>
                      ) : (
                        <p className={styles.finalNote}>{stage.finalNote}</p>
                      )}
                    </footer>
                  </div>
                )}
              </div>,
            ];
          })}
        </div>
      </div>
    </section>
  );
}

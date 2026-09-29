"use client";

import { useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";
import styles from "./ProcessStages.module.css";

type StageId = "discover" | "agree" | "build" | "launch";

const stages: { id: StageId; title: string; summary: string; heading: string; text: string; result: string; finalNote?: string }[] = [
  {
    id: "discover",
    title: "Разбираемся",
    summary: "Понимаем задачу и что должно измениться",
    heading: "Сначала понимаем задачу, а не предлагаем услугу.",
    text: "Выясняем, что вы продаёте, кому и что сейчас мешает. Формулируем задачу до того, как выбирать решение.",
    result: "Задача сформулирована",
  },
  {
    id: "agree",
    title: "Договариваемся",
    summary: "Фиксируем состав работ и условия",
    heading: "До старта понятно, что именно делаем.",
    text: "Фиксируем состав работ, этапы, сроки и стоимость. В процессе не появляется неожиданных пунктов.",
    result: "Понятны объём проекта и условия",
  },
  {
    id: "build",
    title: "Делаем",
    summary: "Показываем промежуточный результат",
    heading: "Не исчезаем до финальной презентации.",
    text: "Показываем структуру, прототип и дизайн по шагам. Вы видите проект до того, как изменения становятся дорогими.",
    result: "Согласованный результат готов к запуску",
  },
  {
    id: "launch",
    title: "Запускаем",
    summary: "Проверяем, запускаем и передаём",
    heading: "Запуск — не просто передача файлов.",
    text: "Проверяем формы, интеграции и аналитику на всех устройствах, запускаем и передаём доступы и материалы.",
    result: "Проект работает и передан вам",
    finalNote: "Если нужно развитие — определяем следующий этап отдельно.",
  },
];

function Tick() {
  return (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2.5 6.4 4.9 8.8 9.6 3.5" />
    </svg>
  );
}

function Discover() {
  const questions = [["Бизнес", "Что продаём?"], ["Клиент", "Кому?"], ["Сейчас", "Что не работает?"], ["Цель", "Что должно измениться?"]];
  return (
    <div className={styles.discover}>
      <p className={styles.quote}><span>Клиент</span>«Сайт есть, но обращений мало»</p>
      <span className={styles.stem} />
      <ul>
        {questions.map(([label, text], i) => (
          <li key={label} style={{ "--i": i } as CSSProperties}><small>{label}</small>{text}</li>
        ))}
      </ul>
    </div>
  );
}

function Agree() {
  const scope = [["Структура", "страницы и разделы"], ["UX/UI", "макеты и состояния"], ["Разработка", "вёрстка и логика"], ["CRM", "передача обращений"]];
  return (
    <div className={styles.agree}>
      <p className={styles.doc}><span>Договорённость</span>Корпоративный сайт</p>
      <ul className={styles.scope}>
        {scope.map(([title, note], i) => (
          <li key={title} style={{ "--i": i } as CSSProperties}><i><Tick /></i><strong>{title}</strong><em>{note}</em></li>
        ))}
      </ul>
      <ul className={styles.terms}>
        {["Состав", "Этапы", "Сроки", "Стоимость"].map((term) => (
          <li key={term}>
            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true"><rect x="2.5" y="5.4" width="7" height="5" rx="1.2" /><path d="M4.2 5.4V4a1.8 1.8 0 0 1 3.6 0v1.4" /></svg>
            {term}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Build() {
  const track = [["Структура", "Согласована", "done"], ["Прототип", "Согласован", "done"], ["Дизайн", "В работе", "now"], ["Разработка", "Далее", "next"]];
  return (
    <div className={styles.build}>
      <div className={styles.wire}>
        <span className={styles.wireBar}><i /><i /><i /></span>
        <span className={styles.wireHero}><i /><i /><b /></span>
        <span className={styles.wireRow}><i /><i /><i /></span>
        <span className={styles.wireTag}>Главная · в работе</span>
      </div>
      <ol className={styles.track}>
        {track.map(([title, state, kind]) => (
          <li key={title} data-kind={kind}>
            <strong>{title}</strong>
            <span>{kind === "done" && <i><Tick /></i>}{kind === "now" && <b />}{state}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Launch() {
  return (
    <div className={styles.launch}>
      <div className={styles.devices}>
        <span className={styles.desktop}><i /><i /><b><Tick /></b></span>
        <span className={styles.phone}><i /><b><Tick /></b></span>
      </div>
      <div className={styles.launchSide}>
        <ul>
          {["Формы", "Интеграции", "Аналитика"].map((c, i) => (
            <li key={c} style={{ "--i": i } as CSSProperties}><i><Tick /></i>{c}</li>
          ))}
        </ul>
        <p className={styles.live}><b />Проект запущен<small>доступы и материалы переданы</small></p>
      </div>
    </div>
  );
}

const visuals: Record<StageId, ReactNode> = { discover: <Discover />, agree: <Agree />, build: <Build />, launch: <Launch /> };

/*
 * «От задачи до запуска — четыре этапа»: сверху шкала этапов со светящейся линией прогресса,
 * ниже карточка выбранного этапа — текст слева, иллюстрация справа. Все четыре карточки лежат
 * в одной grid-ячейке, поэтому высота блока не меняется при переключении.
 */
export function ProcessStages() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (index: number) => {
    const next = (index + stages.length) % stages.length;
    setActive(next);
    tabs.current[next]?.focus();
  };
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const moves: Record<string, number> = { ArrowRight: index + 1, ArrowDown: index + 1, ArrowLeft: index - 1, ArrowUp: index - 1, Home: 0, End: stages.length - 1 };
    if (!(event.key in moves)) return;
    event.preventDefault();
    select(moves[event.key]);
  };

  return (
    <section id="process" className={styles.section} aria-labelledby="process-stages-title" style={{ "--active": active } as CSSProperties}>
      <div className={styles.container}>
        <header className={styles.head}>
          <div>
            <p className={styles.eyebrow}>Как идёт проект</p>
            <h2 id="process-stages-title">
              От задачи до запуска —{" "}
              <br />
              <em>четыре понятных этапа.</em>
            </h2>
          </div>
          <p className={styles.lead}>На каждом этапе понятно, что происходит сейчас и что будет дальше.</p>
        </header>

        <div className={styles.rail} role="tablist" aria-label="Этапы проекта">
          <span className={styles.line} aria-hidden="true"><span /></span>
          {stages.map((stage, index) => (
            <button
              key={stage.id}
              ref={(node) => { tabs.current[index] = node; }}
              type="button"
              role="tab"
              id={`stage-tab-${stage.id}`}
              aria-selected={index === active}
              aria-controls="stage-panel"
              tabIndex={index === active ? 0 : -1}
              data-state={index < active ? "done" : index === active ? "now" : "next"}
              className={styles.tab}
              onClick={() => setActive(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
            >
              <span className={styles.node} aria-hidden="true">{index < active ? <Tick /> : String(index + 1).padStart(2, "0")}</span>
              <strong>{stage.title}</strong>
              <small>{stage.summary}</small>
            </button>
          ))}
        </div>

        <div className={styles.panel} role="tabpanel" id="stage-panel" aria-labelledby={`stage-tab-${stages[active].id}`}>
          {stages.map((stage, index) => {
            const on = index === active;
            const next = stages[index + 1];
            return (
              <div key={stage.id} className={`${styles.card} ${on ? styles.cardOn : ""}`} aria-hidden={!on} inert={!on} data-n={String(index + 1).padStart(2, "0")}>
                <div className={styles.copy}>
                  <p className={styles.step}>Этап {String(index + 1).padStart(2, "0")} / 04</p>
                  <h3>{stage.heading}</h3>
                  <p className={styles.text}>{stage.text}</p>
                  <p className={styles.result}><i><Tick /></i>{stage.result}</p>
                  {next ? (
                    <button type="button" className={styles.next} onClick={() => select(index + 1)}>
                      Далее: {next.title.toLowerCase()} <span aria-hidden="true">→</span>
                    </button>
                  ) : (
                    <p className={styles.final}>{stage.finalNote}</p>
                  )}
                </div>
                <div className={styles.visual} aria-hidden="true">{visuals[stage.id]}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

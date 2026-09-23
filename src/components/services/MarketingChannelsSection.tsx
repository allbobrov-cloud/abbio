"use client";

import { useState } from "react";
import styles from "./MarketingServicePage.module.css";

const lanes = [
  {
    id: "attraction",
    label: "Привлечение",
    note: "Откуда приходит интерес",
    items: ["SEO", "Реклама", "Контент"],
  },
  {
    id: "contact",
    label: "Контакт",
    note: "Как посетитель обращается",
    items: ["Форма", "Звонок", "Чат"],
  },
  {
    id: "processing",
    label: "Обработка",
    note: "Кто и как ведёт обращение дальше",
    items: ["CRM", "Ответственный"],
  },
] as const;

export function MarketingChannelsSection() {
  const [exampleOpen, setExampleOpen] = useState(false);

  return (
    <section className={styles.sources} id="marketing-situations" aria-labelledby="sources-title">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <p className={styles.sectionIndex}>01 / Обращения</p>
          <h2 id="sources-title">Откуда пришли и как обратились — разные вопросы.</h2>
          <p className={styles.sectionLead}>Канал привлечения, способ обращения и дальнейшая обработка — три разных слоя. Показываем модель, а не список подключённых у вас каналов.</p>
        </div>

        <div className={styles.channelLanes} aria-label="Модель обращения: привлечение, контакт, обработка">
          {lanes.map((lane, index) => (
            <div className={styles.channelLane} key={lane.id}>
              <div className={styles.channelLaneHead}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <strong>{lane.label}</strong>
                  <small>{lane.note}</small>
                </div>
              </div>
              <ul>
                {lane.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <div className={styles.channelExample}>
          <button
            type="button"
            className={styles.channelExampleToggle}
            aria-expanded={exampleOpen}
            aria-controls="channel-example-panel"
            onClick={() => setExampleOpen((value) => !value)}
          >
            {exampleOpen ? "Скрыть пример обращения" : "Показать пример обращения"}
          </button>
          {exampleOpen && (
            <div className={styles.channelExamplePanel} id="channel-example-panel">
              <p className={styles.channelExampleLabel}>Пример записи, не реальное обращение</p>
              <dl>
                <div><dt>Источник</dt><dd>SEO / Google</dd></div>
                <div><dt>Тема обращения</dt><dd>Корпоративный сайт</dd></div>
                <div><dt>Ответственный</dt><dd>Менеджер отдела продаж</dd></div>
              </dl>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

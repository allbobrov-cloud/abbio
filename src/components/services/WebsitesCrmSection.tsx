"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./WebsitesServicePage.module.css";

type Stage = "idle" | "signal" | "meta" | "card" | "assigned";

const sources = [
  { id: "form", label: "Форма", detail: "Заявка с сайта" },
  { id: "call", label: "Звонок", detail: "+7 XXX XX-XX" },
  { id: "chat", label: "Чат", detail: "Нужен сайт для компании" },
  { id: "email", label: "Email", detail: "Запрос на разработку" },
] as const;

const metaChips = [
  { label: "Источник", value: "SEO / Google" },
  { label: "Страница", value: "/services/websites" },
  { label: "Интерес", value: "Корпоративный сайт" },
] as const;

const theses = [
  "Все обращения в одном месте",
  "Источник не теряется",
  "Менеджер видит контекст",
] as const;

const sourceIconPaths: Record<(typeof sources)[number]["id"], string> = {
  form: "M5 4h14v16H5V4Zm3 5h8M8 12h8M8 15h5",
  call: "M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v3a2 2 0 0 1-2 2C10.5 20 4 13.5 4 6a2 2 0 0 1 1-2Z",
  chat: "M4 5h16v11H8l-4 4V5Z",
  email: "M4 6h16v12H4V6Zm0 0 8 7 8-7",
};

function SourceIcon({ id }: { id: (typeof sources)[number]["id"] }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={sourceIconPaths[id]} />
    </svg>
  );
}

const STAGE_ORDER: Stage[] = ["idle", "signal", "meta", "card", "assigned"];

function stageIndex(stage: Stage) {
  return STAGE_ORDER.indexOf(stage);
}

export function WebsitesCrmSection() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState<Stage>("idle");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || started) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }
        setStarted(true);
        observer.disconnect();

        if (reduceMotion) {
          setStage("assigned");
          return;
        }

        const timers = [
          setTimeout(() => setStage("signal"), 150),
          setTimeout(() => setStage("meta"), 550),
          setTimeout(() => setStage("card"), 950),
          setTimeout(() => setStage("assigned"), 1600),
        ];
        return () => timers.forEach(clearTimeout);
      },
      { threshold: 0.35 }
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [started]);

  const reached = (target: Stage) => stageIndex(stage) >= stageIndex(target);

  return (
    <section className={styles.crmSection} aria-labelledby="crm-title">
      <div className={styles.container}>
        <div className={styles.crmLayout}>
          <div className={styles.crmCopy}>
            <p className={styles.sectionIndex}>05 / Сайт + CRM</p>
            <h2 id="crm-title">Заявка не должна потеряться после сайта.</h2>
            <p className={styles.crmLead}>
              Собираем обращения из разных точек, сохраняем источник и контекст
              и передаём всё в работу менеджеру.
            </p>
            <ol className={styles.crmTheses}>
              {theses.map((text, index) => (
                <li key={text}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{text}</p>
                </li>
              ))}
            </ol>
          </div>

          <div
            ref={rootRef}
            className={styles.crmStage}
            data-stage={stage}
            role="img"
            aria-label="Обращения с сайта из формы, звонка, чата и почты попадают в CRM вместе с источником и страницей обращения, затем назначается ответственный менеджер"
          >
            <div className={styles.crmStageGlow} aria-hidden="true" />

            <svg className={styles.crmSignal} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <path className={styles.crmSignalBase} d="M8,18 C22,26 30,34 38,42 C46,50 50,54 56,58" />
              <path className={styles.crmSignalBase} d="M8,34 C20,36 30,40 38,42" />
              <path className={styles.crmSignalBase} d="M8,50 C20,46 30,44 38,42" />
              <path className={styles.crmSignalBase} d="M8,64 C22,56 32,48 38,42" />
              <path className={styles.crmSignalTravel} d="M8,18 C22,26 30,34 38,42 C46,50 50,54 56,58" />
              <path className={styles.crmSignalDown} d="M62,66 C64,74 64,80 62,88" />
            </svg>

            <div className={styles.crmSources} aria-hidden="true">
              {sources.map((source, index) => (
                <div className={styles.crmSource} data-index={index} key={source.id}>
                  <SourceIcon id={source.id} />
                  <div>
                    <strong>{source.label}</strong>
                    <span>{source.detail}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.crmMeta} aria-hidden="true">
              {metaChips.map((chip) => (
                <div className={styles.crmMetaChip} key={chip.label}>
                  <span>{chip.label}</span>
                  <strong>{chip.value}</strong>
                </div>
              ))}
            </div>

            <div className={styles.crmCardMain} aria-hidden="true">
              <div className={styles.crmCardTop}>
                <span>Новое обращение</span>
                <time>14:32</time>
              </div>
              <span className={styles.crmCompanyNote}>Тема: Корпоративный сайт</span>
              <div className={styles.crmStatusRow}>
                <span>Статус</span>
                <strong className={reached("assigned") ? styles.crmStatusDone : styles.crmStatusNew}>
                  <i aria-hidden="true" />
                  {reached("assigned") ? "В работе" : "Новая"}
                </strong>
              </div>
            </div>

            <div className={styles.crmManager} aria-hidden="true">
              <span>Ответственный</span>
              <strong>Менеджер отдела продаж</strong>
              <em className={reached("assigned") ? styles.crmStatusDone : undefined}>
                <i aria-hidden="true" />
                {reached("assigned") ? "Получил обращение" : "Ожидает назначения"}
              </em>
            </div>

            <p className={styles.crmDemoLabel}>Пример записи, не реальное обращение</p>
          </div>
        </div>
      </div>
    </section>
  );
}

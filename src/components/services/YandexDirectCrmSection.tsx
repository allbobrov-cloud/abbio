"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./YandexDirectCrmSection.module.css";

type Stage = "sources" | "formActive" | "lead" | "context" | "crm" | "manager" | "done";
const STAGE_ORDER: Stage[] = ["sources", "formActive", "lead", "context", "crm", "manager", "done"];
const stageIndex = (s: Stage) => STAGE_ORDER.indexOf(s);

const sources = [
  { id: "form", label: "Форма", detail: "Нужна консультация по заказу", time: "14:32", active: true },
  { id: "call", label: "Звонок", detail: "Входящий · 02:14", time: "14:34", active: false },
  { id: "chat", label: "Чат", detail: "Подскажите по наличию размера M", time: "14:36", active: false },
] as const;

const contextRows = [
  { label: "Источник", value: "Яндекс Директ" },
  { label: "Кампания", value: "Женские пальто" },
  { label: "Страница входа", value: "/women/coats" },
  { label: "Действие", value: "Форма" },
] as const;

const sourceIconPaths: Record<(typeof sources)[number]["id"], string> = {
  form: "M5 4h14v16H5V4Zm3 5h8M8 12h8M8 15h5",
  call: "M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v3a2 2 0 0 1-2 2C10.5 20 4 13.5 4 6a2 2 0 0 1 1-2Z",
  chat: "M4 5h16v11H8l-4 4V5Z",
};

function SourceIcon({ id }: { id: (typeof sources)[number]["id"] }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={sourceIconPaths[id]} />
    </svg>
  );
}

export function YandexDirectCrmSection() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState<Stage>("sources");
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
          setStage("done");
          return;
        }

        const timers = [
          setTimeout(() => setStage("formActive"), 200),
          setTimeout(() => setStage("lead"), 500),
          setTimeout(() => setStage("context"), 850),
          setTimeout(() => setStage("crm"), 1400),
          setTimeout(() => setStage("manager"), 1700),
          setTimeout(() => setStage("done"), 2000),
        ];
        return () => timers.forEach(clearTimeout);
      },
      { threshold: 0.35 }
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [started]);

  const reached = (s: Stage) => stageIndex(stage) >= stageIndex(s);

  return (
    <div
      ref={rootRef}
      className={styles.composition}
      role="img"
      aria-label="Обращение из формы на сайте попадает в CRM вместе с источником Яндекс Директ, кампанией «Женские пальто» и страницей входа /women/coats, после чего назначается ответственный менеджер"
    >
      <svg className={styles.trajectory} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path className={styles.linkBase} d="M17,20 C 30,20 34,48 46,50" vectorEffect="non-scaling-stroke" />
        <path className={styles.linkBase} d="M17,50 C 30,50 34,50 46,50" vectorEffect="non-scaling-stroke" />
        <path className={styles.linkBase} d="M17,80 C 30,80 34,52 46,50" vectorEffect="non-scaling-stroke" />
        <path className={[styles.linkActive, reached("formActive") ? styles.linkActiveOn : ""].join(" ")} d="M17,20 C 30,20 34,48 46,50" vectorEffect="non-scaling-stroke" />
        <path className={[styles.linkRight, reached("crm") ? styles.linkRightOn : ""].join(" ")} d="M63,50 C 76,50 78,50 90,50" vectorEffect="non-scaling-stroke" />
      </svg>

      <div className={styles.sources} aria-hidden="true">
        {sources.map((source) => (
          <div className={[styles.sourceEvent, source.active && reached("formActive") ? styles.sourceEventActive : ""].join(" ")} key={source.id}>
            <SourceIcon id={source.id} />
            <div className={styles.sourceBody}>
              <div className={styles.sourceTop}><strong>{source.label}</strong><time>{source.time}</time></div>
              <span>{source.detail}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={[styles.leadCard, reached("lead") ? styles.leadVisible : ""].join(" ")} aria-hidden="true">
        <div className={styles.leadTop}><span>Новое обращение</span></div>
        <strong className={styles.leadProduct}>Пальто Form 02</strong>
        <p className={styles.leadSize}>Размер <b>M</b></p>
        <dl className={[styles.leadContext, reached("context") ? styles.leadContextVisible : ""].join(" ")}>
          {contextRows.map((row, i) => (
            <div key={row.label} style={{ "--ci": i } as React.CSSProperties}>
              <dt>{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>
        <div className={styles.leadStatusRow}>
          <span>Статус</span>
          <strong className={styles.statusNew}><i />Новое</strong>
        </div>
      </div>

      <div className={styles.crmColumn} aria-hidden="true">
        <div className={[styles.crmRow, reached("crm") ? styles.revealed : ""].join(" ")}>
          <span className={styles.microLabel}>CRM</span>
          <strong className={styles.statusNew}><i />Новое обращение</strong>
        </div>
        <div className={[styles.crmRow, reached("manager") ? styles.revealed : ""].join(" ")}>
          <span className={styles.microLabel}>Ответственный</span>
          <strong>Менеджер назначен</strong>
        </div>
        <div className={[styles.crmRow, reached("done") ? styles.revealed : ""].join(" ")}>
          <span className={styles.microLabel}>Статус</span>
          <strong className={styles.statusDone}><i />В работе</strong>
        </div>
      </div>
    </div>
  );
}

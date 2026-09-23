"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./SeoHealthScan.module.css";

const PAGE_URL = "metallobazav.ru/catalog/trubu-profilnye/";
const DUPLICATE_PARAM = "?sort=price";

const effects = [
  { term: "Индексация", plain: "Страницы доступны поиску, а не спрятаны от него." },
  { term: "Canonical и дубли", plain: "Нет конкурирующих версий одной страницы." },
  { term: "Скорость и мобильная версия", plain: "Пользователю удобно на любом экране." },
];

const checks = [
  "Индексация",
  "Адреса страниц",
  "Метаданные",
  "Внутренние ссылки",
  "Мобильная версия",
  "Скорость загрузки",
  "robots.txt и sitemap.xml",
  "Микроразметка",
];

type Stage = "idle" | "scan" | "issue" | "fix" | "resolved";
const STAGE_ORDER: Stage[] = ["idle", "scan", "issue", "fix", "resolved"];
const stageIndex = (s: Stage) => STAGE_ORDER.indexOf(s);

export function SeoHealthScan() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState<Stage>("idle");
  const [started, setStarted] = useState(false);
  const [checklistOpen, setChecklistOpen] = useState(false);

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
          setStage("resolved");
          return;
        }

        setStage("scan");
        const timers = [
          setTimeout(() => setStage("issue"), 1300),
          setTimeout(() => setStage("fix"), 1900),
          setTimeout(() => setStage("resolved"), 2300),
        ];

        return () => timers.forEach(clearTimeout);
      },
      { threshold: 0.35 }
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [started]);

  const reached = (s: Stage) => stageIndex(stage) >= stageIndex(s);
  const isResolved = reached("resolved");

  return (
    <div ref={rootRef} className={styles.scan}>
      <span className={styles.demoBadge} aria-hidden="true">Схематичный пример</span>

      <div className={styles.urlBar}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
          <circle cx="11" cy="11" r="6.5" />
          <path d="M20 20l-4.3-4.3" />
        </svg>
        <span>{PAGE_URL}</span>
      </div>

      <ul className={styles.effects} aria-label="Что это даёт бизнесу">
        {effects.map((effect) => (
          <li key={effect.term}>
            <strong>{effect.term}</strong>
            <p>{effect.plain}</p>
          </li>
        ))}
      </ul>

      <div
        className={[
          styles.issueCard,
          reached("issue") ? styles.issueVisible : "",
          isResolved ? styles.issueResolved : "",
        ].join(" ")}
        role="img"
        aria-label="Найден дубль страницы с параметром сортировки, настроен canonical, дубль устранён"
      >
        <p className={styles.issueLabel}>{isResolved ? "Дубль устранён" : "Найден дубль страницы"}</p>
        <p className={styles.issueExplain}>Без canonical поисковик мог посчитать адрес с сортировкой отдельной страницей и не понять, какую версию показывать в выдаче.</p>
        <div className={styles.issueUrls}>
          <span className={isResolved ? styles.urlStrike : ""}>{PAGE_URL}</span>
          <span className={isResolved ? styles.urlStrike : ""}>{PAGE_URL}{DUPLICATE_PARAM}</span>
        </div>
        <p className={[styles.fixLine, reached("fix") ? styles.fixLineVisible : ""].join(" ")}>
          {isResolved ? "Canonical указывает на основной адрес" : "Настраиваем canonical…"}
        </p>
      </div>

      <button
        type="button"
        className={styles.checklistToggle}
        aria-expanded={checklistOpen}
        aria-controls="seo-technical-checklist"
        onClick={() => setChecklistOpen((value) => !value)}
      >
        {checklistOpen ? "Скрыть" : "Что проверяем"} <i aria-hidden="true">{checklistOpen ? "−" : "+"}</i>
      </button>

      {checklistOpen && (
        <div className={styles.checklist} id="seo-technical-checklist" aria-label="Полный технический список проверок">
          {checks.map((c) => (
            <div className={styles.checkItem} key={c}>
              <i aria-hidden="true" />
              <span>{c}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import Link from "next/link";
import { ActionArrow } from "@/components/ActionArrow";
import page from "./ServicesOverviewPage.module.css";
import styles from "./ServicesSituation.module.css";

type Situation = {
  number: string;
  navigationLabel: string;
  title: string;
  description: string;
  directions: { label: string; href?: string }[];
  action: { label: string; href: string; contactDialog?: boolean };
  path: string[];
};

const situations: Situation[] = [
  {
    number: "01",
    navigationLabel: "Сложно объяснить предложение",
    title: "Сделать предложение понятным и убедительным.",
    description: "Разберём продукт, структуру подачи и визуальную коммуникацию, чтобы клиент быстрее понимал, что вы предлагаете и почему стоит обратиться.",
    directions: [{ label: "Дизайн", href: "/services/design" }, { label: "Сайты", href: "/services/websites" }],
    action: { label: "Посмотреть дизайн", href: "/services/design" },
    path: ["Предложение", "Структура", "Подача"],
  },
  {
    number: "02",
    navigationLabel: "Сайт не приводит к обращению",
    title: "Упростить путь клиента до обращения.",
    description: "Разберём структуру, сценарии и точки контакта. Найдём барьеры, из-за которых посетители не доходят до заявки.",
    directions: [{ label: "Сайты", href: "/services/websites" }, { label: "UX/UI" }, { label: "Аналитика" }],
    action: { label: "Посмотреть сайты", href: "/services/websites" },
    path: ["Страница", "Путь", "Заявка"],
  },
  {
    number: "03",
    navigationLabel: "Нужны новые клиенты",
    title: "Привлекать спрос и понимать, что приносит обращения.",
    description: "Изучим существующий спрос, подберём каналы привлечения и свяжем переходы с обращениями, чтобы результат можно было оценивать по данным.",
    directions: [
      { label: "SEO", href: "/services/seo" },
      { label: "Яндекс Директ", href: "/services/yandex-direct" },
      { label: "Сайт" },
      { label: "Аналитика" },
    ],
    action: { label: "Посмотреть маркетинг", href: "/services/marketing" },
    path: ["Поиск / реклама", "Переход", "Обращение"],
  },
  {
    number: "04",
    navigationLabel: "Запускаем новый проект",
    title: "Собрать основу для запуска.",
    description: "Поможем сформулировать предложение, определить структуру, подготовить сайт и выбрать каналы, через которые продукт найдёт первых клиентов.",
    directions: [{ label: "Дизайн", href: "/services/design" }, { label: "Сайты", href: "/services/websites" }, { label: "Маркетинг", href: "/services/marketing" }],
    action: { label: "Обсудить задачу", href: "#contact-dialog", contactDialog: true },
    path: ["Идея", "Основа", "Запуск"],
  },
];

/*
 * «Что хотите изменить?»: слева ситуации (вкладки), справа сцена превращения —
 * проблема зачёркивается, появляется решение, путь из трёх шагов загорается по очереди.
 */
export function ServicesSituationExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const stageRef = useRef<HTMLDivElement>(null);
  const active = situations[activeIndex];

  const select = (index: number) => {
    const next = (index + situations.length) % situations.length;
    setActiveIndex(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const moves: Record<string, number> = { ArrowDown: index + 1, ArrowRight: index + 1, ArrowUp: index - 1, ArrowLeft: index - 1, Home: 0, End: situations.length - 1 };
    if (!(event.key in moves)) return;
    event.preventDefault();
    select(moves[event.key]);
  };

  // Подсветка сцены следует за курсором (только мышь/тачпад)
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    stageRef.current.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    stageRef.current.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  return (
    <section className={styles.section} aria-labelledby="situations-title">
      <div className={page.container}>
        <header className={styles.head}>
          <p className={styles.eyebrow}>С какой задачей вы пришли</p>
          <h2 id="situations-title">Что хотите изменить?</h2>
          <p className={styles.lead}>Выберите ситуацию — покажем, с чего можно начать.</p>
        </header>

        <div className={styles.explorer}>
          <div className={styles.tabs} role="tablist" aria-label="Ситуации" aria-orientation="vertical">
            {situations.map((situation, index) => {
              const selected = index === activeIndex;
              return (
                <button
                  key={situation.number}
                  ref={(node) => { tabRefs.current[index] = node; }}
                  type="button"
                  role="tab"
                  id={`situation-tab-${situation.number}`}
                  aria-selected={selected}
                  aria-controls="situation-panel"
                  tabIndex={selected ? 0 : -1}
                  className={styles.tab}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={(event) => onKeyDown(event, index)}
                >
                  <span className={styles.tabNum}>{situation.number}</span>
                  <span className={styles.tabLabel}>{situation.navigationLabel}</span>
                  <span className={styles.tabArrow} aria-hidden="true">→</span>
                </button>
              );
            })}
          </div>

          <div
            ref={stageRef}
            className={styles.stage}
            role="tabpanel"
            id="situation-panel"
            aria-labelledby={`situation-tab-${active.number}`}
            onPointerMove={onPointerMove}
          >
            <span className={styles.watermark} aria-hidden="true">{active.number}</span>

            {/* Все сцены лежат в одной ячейке: высота карточки = самой длинной сцене и не прыгает */}
            {situations.map((situation, sceneIndex) => {
              const isActive = sceneIndex === activeIndex;
              return (
                <div
                  key={situation.number}
                  className={`${styles.scene} ${isActive ? styles.sceneActive : ""}`}
                  aria-hidden={!isActive}
                  inert={!isActive}
                >
                  <p className={styles.shift}>
                    <span className={styles.now}>
                      <small>Сейчас</small>
                      <s>{situation.navigationLabel}</s>
                    </span>
                    <span className={styles.shiftArrow} aria-hidden="true" />
                    <span className={styles.next}>Решение</span>
                  </p>

                  <h3>{situation.title}</h3>
                  <p className={styles.description}>{situation.description}</p>

                  <ol className={styles.route} aria-label="С чего начнём">
                    {situation.path.map((step, index) => (
                      <li key={step} style={{ "--i": index } as CSSProperties}>
                        <span className={styles.node} aria-hidden="true" />
                        <span className={styles.stepNum}>{String(index + 1).padStart(2, "0")}</span>
                        <strong>{step}</strong>
                      </li>
                    ))}
                  </ol>

                  <div className={styles.foot}>
                    <div className={styles.directions}>
                      <span>Направления</span>
                      <div>
                        {situation.directions.map((direction) => direction.href ? (
                          <Link key={direction.label} href={direction.href}>{direction.label}</Link>
                        ) : (
                          <span key={direction.label}>{direction.label}</span>
                        ))}
                      </div>
                    </div>
                    {situation.action.contactDialog ? (
                      <a href={situation.action.href} data-contact-dialog className={page.primaryAction}>{situation.action.label} <ActionArrow /></a>
                    ) : (
                      <Link href={situation.action.href} className={page.primaryAction}>{situation.action.label} <ActionArrow /></Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

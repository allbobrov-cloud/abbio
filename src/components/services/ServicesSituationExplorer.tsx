"use client";

import { useState } from "react";
import Link from "next/link";
import { ActionArrow } from "@/components/ActionArrow";
import styles from "./ServicesOverviewPage.module.css";

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
    directions: [{ label: "Дизайн" }, { label: "Сайты" }],
    action: { label: "Посмотреть дизайн", href: "/services/design" },
    path: ["Предложение", "Структура", "Подача"],
  },
  {
    number: "02",
    navigationLabel: "Сайт не приводит к обращению",
    title: "Упростить путь клиента до обращения.",
    description: "Разберём структуру, сценарии и точки контакта. Найдём барьеры, из-за которых посетители не доходят до заявки.",
    directions: [{ label: "Сайты" }, { label: "UX/UI" }, { label: "Аналитика" }],
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
    directions: [{ label: "Дизайн" }, { label: "Сайты" }, { label: "Маркетинг" }],
    action: { label: "Обсудить задачу", href: "#contact-dialog", contactDialog: true },
    path: ["Идея", "Основа", "Запуск"],
  },
];

function SituationSolution({ situation, compact = false }: { situation: Situation; compact?: boolean }) {
  const isContactAction = situation.action.contactDialog;

  return (
    <div className={[styles.situationSolution, compact ? styles.situationSolutionCompact : ""].filter(Boolean).join(" ")}>
      <div className={styles.solutionCopy}>
        <p className={styles.solutionEyebrow}>Решение</p>
        <h3>{situation.title}</h3>
        <p>{situation.description}</p>
        <p className={styles.solutionDirections}>Подходящие направления</p>
        <div className={styles.solutionTags}>
          {situation.directions.map((direction) => direction.href ? (
            <Link href={direction.href} key={direction.label}>{direction.label}</Link>
          ) : <span key={direction.label}>{direction.label}</span>)}
        </div>
        {isContactAction ? (
          <a href={situation.action.href} data-contact-dialog className={styles.solutionAction}>{situation.action.label} <ActionArrow /></a>
        ) : (
          <Link href={situation.action.href} className={styles.solutionAction}>{situation.action.label} <ActionArrow /></Link>
        )}
      </div>
      <div className={styles.solutionPath} aria-hidden="true">
        {situation.path.map((step, index) => (
          <div key={step}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{step}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ServicesSituationExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSituation = situations[activeIndex];

  return (
    <section className={styles.situations} aria-labelledby="situations-title">
      <div className={styles.container}>
        <div className={styles.sectionHeading}>
          <p className={styles.sectionIndex}>С какой задачей вы пришли</p>
          <div>
            <h2 id="situations-title">Что хотите изменить?</h2>
            <p>Выберите ситуацию — покажем, с чего можно начать.</p>
          </div>
        </div>

        <div className={styles.situationExplorer}>
          <div className={styles.situationNavigation} aria-label="Выберите ситуацию">
            {situations.map((situation, index) => {
              const isActive = index === activeIndex;
              const panelId = `mobile-situation-panel-${situation.number}`;

              return (
                <div className={styles.situationItem} key={situation.number}>
                  <button
                    type="button"
                    className={styles.situationOption}
                    aria-expanded={isActive}
                    aria-controls={panelId}
                    onClick={() => setActiveIndex(index)}
                  >
                    <span>{situation.number}</span>
                    <strong>{situation.navigationLabel}</strong>
                    <i aria-hidden="true">→</i>
                  </button>
                  {isActive && (
                    <div className={styles.mobileSituationPanel} id={panelId}>
                      <SituationSolution situation={situation} compact />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className={styles.desktopSituationPanel} id={`desktop-situation-panel-${activeSituation.number}`}>
            <SituationSolution key={activeSituation.number} situation={activeSituation} />
          </div>
        </div>
      </div>
    </section>
  );
}

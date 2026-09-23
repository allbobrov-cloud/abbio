"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./DesignServicePage.module.css";

const situations = [
  {
    code: "language",
    label: "Язык",
    title: "Визуальный язык потерял цельность",
    change: "Собираем правила цвета, типографики и композиции вокруг задачи.",
    outcome: "Согласованный визуальный язык, который применяется предсказуемо.",
  },
  {
    code: "system",
    label: "Система",
    title: "Страницы не складываются в один опыт",
    change: "Определяем ритм, компоненты и последовательность действия пользователя.",
    outcome: "Связанные макеты для разных экранов, а не набор случайных страниц.",
  },
  {
    code: "clarity",
    label: "Ясность",
    title: "Предложение не считывается сразу",
    change: "Выделяем главное в предложении и выстраиваем визуальную иерархию.",
    outcome: "Направление, с которым проще обсуждать решение.",
  },
  {
    code: "presentation",
    label: "Подача",
    title: "Продукт нужно представить убедительнее",
    change: "Собираем содержание вокруг вопросов аудитории и логики рассказа.",
    outcome: "Материалы для понятного представления продукта.",
  },
] as const;

function SituationVisual({ code }: { code: (typeof situations)[number]["code"] }) {
  if (code === "language") {
    return (
      <div className={styles.situationVisual} aria-hidden="true">
        <div className={styles.svType}><strong>Aa</strong><span>Inter<br /><small>Display / Text</small></span></div>
        <div className={styles.svSwatches}><i /><i /><i /><i /></div>
      </div>
    );
  }

  if (code === "system") {
    return (
      <div className={styles.situationVisual} aria-hidden="true">
        <div className={styles.svPages}>
          <div className={styles.svPage}><b /><i /><i /></div>
          <div className={styles.svPage}><b /><i /><i /></div>
          <div className={styles.svPage}><b /><i /><i /></div>
        </div>
      </div>
    );
  }

  if (code === "clarity") {
    return (
      <div className={styles.situationVisual} aria-hidden="true">
        <div className={styles.svHierarchy}>
          <div className={styles.svHead}><span>1</span></div>
          <div className={styles.svSub}><span>2</span></div>
          <div className={styles.svCta}><span>3</span></div>
        </div>
        <dl className={styles.svLegend}>
          <div><dt>1</dt><dd>Заголовок — главная мысль</dd></div>
          <div><dt>2</dt><dd>Подзаголовок — кому и зачем</dd></div>
          <div><dt>3</dt><dd>Действие — следующий шаг</dd></div>
        </dl>
      </div>
    );
  }

  return (
    <div className={`${styles.situationVisual} ${styles.svPhoto}`} aria-hidden="true">
      <Image src="/services/design-situation-presentation-v3.png" alt="" fill sizes="(max-width: 760px) calc(100vw - 64px), 420px" />
    </div>
  );
}

export function DesignSituationExplorer() {
  const [active, setActive] = useState(2);
  const situation = situations[active];

  return (
    <section className={styles.situations} id="design-situations" aria-labelledby="situations-title">
      <div className={styles.container}>
        <div className={styles.sectionHeading}>
          <p className={styles.sectionIndex}>02 / Ситуации</p>
          <div>
            <h2 id="situations-title">Когда дизайну нужно собрать разрозненное в понятное целое.</h2>
            <p className={styles.situationsIntro}>Особенно заметно на старте нового бренда, продукта или направления — когда нужно решить сразу несколько из этих задач.</p>
          </div>
        </div>

        <div className={styles.situationExplorer}>
          <div className={styles.situationNav} role="group" aria-label="Выберите ситуацию">
            {situations.map((item, index) => {
              const isActive = index === active;
              return (
                <button
                  key={item.code}
                  type="button"
                  className={styles.situationNavItem}
                  aria-pressed={isActive}
                  aria-controls="design-situation-panel"
                  onClick={() => setActive(index)}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{item.title}</strong>
                  <small>{item.label}</small>
                </button>
              );
            })}
          </div>

          <div className={styles.situationPanel} id="design-situation-panel" aria-live="polite">
            <div className={styles.situationPanelCopy}>
              <div>
                <p className={styles.svFieldLabel}>Что меняем</p>
                <p className={styles.svFieldValue}>{situation.change}</p>
              </div>
              <div>
                <p className={styles.svFieldLabel}>Что получаете</p>
                <p className={styles.svFieldValue}>{situation.outcome}</p>
              </div>
            </div>
            <SituationVisual code={situation.code} />
          </div>
        </div>
      </div>
    </section>
  );
}

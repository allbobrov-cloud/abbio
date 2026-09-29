"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./ProcessTransparency.module.css";

// Условный пример согласования прототипа главной страницы.
const steps = [
  { date: "14 сент", title: "Показали прототип", note: "Версия 01 главной — до дизайна и разработки" },
  { date: "15 сент", title: "Получили комментарии", note: "Отметки прямо на макете: 3 замечания" },
  { date: "16 сент", title: "Внесли изменения", note: "Версия 02: заголовок, кнопка и форма" },
  { date: "16 сент", title: "Согласовали", note: "Фиксируем версию и идём дальше" },
] as const;

const comments = [
  "Заголовок про компанию, а не про задачу клиента",
  "«Подробнее» — непонятно, что будет дальше",
  "Форме не хватает поля для задачи",
];

const STEP_MS = 1400;

function Tick() {
  return (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2.5 6.4 4.9 8.8 9.6 3.5" />
    </svg>
  );
}

/* Номер замечания на макете; тексты — в карточке «Замечания» рядом */
function Pin({ n, side = "right" }: { n: number; side?: "right" | "left" }) {
  return <span className={styles.pin} data-side={side} style={{ "--i": n } as CSSProperties}>{n}</span>;
}

/*
 * «Проект не превращается в чёрный ящик»: слева история согласования, справа прототип главной,
 * который меняется вместе с шагом — появляются замечания, затем версия 02, затем отметка «Согласовано».
 * При первом показе шаги проигрываются автоматически; дальше шаг выбирается кликом.
 */
export function ProcessTransparency() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(3);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timers: number[] = [];
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        setPlaying(true);
        setStep(0);
        timers = [1, 2, 3].map((s) => window.setTimeout(() => {
          setStep(s);
          if (s === 3) setPlaying(false);
        }, s * STEP_MS));
      },
      { threshold: 0.35 },
    );
    observer.observe(root);
    return () => {
      observer.disconnect();
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  const v2 = step >= 2;
  const mode = step === 1 ? "comments" : step === 2 ? "changed" : step === 3 ? "approved" : "draft";
  const status = mode === "approved" ? "Согласовано" : mode === "changed" ? "Изменения внесены" : mode === "comments" ? "3 замечания" : "На согласовании";

  return (
    <section id="transparency" className={styles.section} aria-labelledby="transparency-title">
      <div className={styles.container}>
        <header className={styles.head}>
          <div>
            <p className={styles.eyebrow}>Внутри проекта</p>
            <h2 id="transparency-title">
              Проект не превращается{" "}
              <br />
              <em>в чёрный ящик.</em>
            </h2>
          </div>
          <p className={styles.lead}>Вы видите результат по ходу работы и участвуете в решениях.</p>
        </header>

        <div ref={rootRef} className={styles.grid} data-mode={mode}>
          <div className={styles.history}>
            <p className={styles.historyLabel}>Пример согласования</p>
            <ol className={styles.steps} style={{ "--step": step } as CSSProperties}>
              {steps.map((item, index) => {
                const state = index === step ? "now" : index < step ? "done" : "next";
                return (
                  <li key={item.title} data-state={state}>
                    <button type="button" aria-pressed={index === step} disabled={playing} onClick={() => setStep(index)}>
                      <span className={styles.dot} aria-hidden="true">{index < step || (index === 3 && step === 3) ? <Tick /> : null}</span>
                      <span className={styles.stepBody}>
                        <time>{item.date}</time>
                        <strong>{item.title}</strong>
                        <small>{item.note}</small>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          <figure className={styles.stage}>
            <div className={styles.glow} aria-hidden="true" />
            <div className={styles.window} aria-hidden="true">
              <div className={styles.chrome}>
                <span className={styles.dots}><i /><i /><i /></span>
                <span className={styles.url}>prototype / главная</span>
                <span className={styles.version} key={v2 ? "v2" : "v1"}>{v2 ? "V02" : "V01"}</span>
                <span className={styles.status} data-mode={mode}><i />{status}</span>
              </div>

              <div className={styles.page} key={v2 ? "p2" : "p1"}>
                <div className={styles.nav}>
                  <span className={styles.logo} /><strong>Компания</strong>
                  <span className={styles.links}><i>Услуги</i><i>О нас</i><i>Контакты</i></span>
                </div>

                <div className={styles.hero}>
                  <div className={styles.heroCopy}>
                    <div className={`${styles.zone} ${styles.zoneHead}`}>
                      <strong>{v2 ? "Понятное решение для вашей задачи" : "Добро пожаловать в нашу компанию"}</strong>
                      <p>{v2 ? "Расскажите, что хотите изменить, — предложим решение." : "Коротко о компании и наших услугах."}</p>
                      <Pin n={1} />
                    </div>
                    <span className={`${styles.zone} ${styles.zoneButton}`}>
                      {v2 ? "Обсудить задачу" : "Подробнее"}
                      <Pin n={2} />
                    </span>
                  </div>

                  <div className={`${styles.zone} ${styles.zoneForm}`}>
                    <strong>{v2 ? "Расскажите о задаче" : "Оставьте контакты"}</strong>
                    <span className={styles.field}>Имя</span>
                    <span className={styles.field}>Телефон</span>
                    {v2 && <span className={`${styles.field} ${styles.fieldTall}`}>Задача</span>}
                    <span className={styles.submit}>{v2 ? "Обсудить" : "Отправить"}</span>
                    <Pin n={3} side="left" />
                  </div>
                </div>

                <div className={styles.cards}><i /><i /><i /></div>
              </div>

              <div className={styles.notes}>
                <p>Замечания клиента</p>
                <ol>
                  {comments.map((text, i) => (
                    <li key={text} style={{ "--i": i + 1 } as CSSProperties}><b>{i + 1}</b>{text}</li>
                  ))}
                </ol>
              </div>

              <span className={styles.stamp}><i><Tick /></i>Согласовано · 16 сент</span>
            </div>
          </figure>
          <p className="sr-only" aria-live="polite">{`Шаг ${step + 1}: ${steps[step].title}. ${steps[step].note}.`}</p>
        </div>
      </div>
    </section>
  );
}

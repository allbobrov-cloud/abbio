"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./ProcessTransparency.module.css";

const useArmingEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/* Один объект: прототип меняется вместе с шагами истории. */
const steps = [
  { date: "14 сент", title: "Показали прототип" },
  { date: "15 сент", title: "Получили комментарии" },
  { date: "16 сент", title: "Внесли изменения" },
  { date: "16 сент", title: "Согласовали" },
] as const;

const LAST = steps.length;
const INTRO_STEP_MS = 800;

type Mode = "idle" | "comments" | "changed" | "approved";

function Tick() {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2.5 6.4 4.9 8.8 9.6 3.5" />
    </svg>
  );
}

function Marker({ on, children }: { on: boolean; children: string }) {
  return (
    <b
      className={`${styles.marker} ${on ? styles.markerOn : ""}`}
      aria-hidden="true"
    >
      {children}
    </b>
  );
}

const benefits = [
  ["Понятный процесс", "Этапы и сроки заранее"],
  ["Прозрачные условия", "Состав работ фиксируем"],
  ["Поддержка", "Помогаем после запуска"],
] as const;

function TransparencyStage() {
  const rootRef = useRef<HTMLDivElement>(null);
  // step — выбранный шаг, reveal — сколько шагов уже показано при появлении.
  const [step, setStep] = useState<number>(LAST);
  const [reveal, setReveal] = useState<number>(LAST);
  const [armed, setArmed] = useState(false);
  const [ready, setReady] = useState(true);

  useArmingEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    setArmed(true);
    setReady(false);
    setStep(0);
    setReveal(0);

    let timers: number[] = [];
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }
        observer.disconnect();
        timers = steps.map((_, index) =>
          window.setTimeout(() => {
            setStep(index + 1);
            setReveal(index + 1);
            if (index + 1 === LAST) {
              setReady(true);
            }
          }, index * INTRO_STEP_MS)
        );
      },
      { threshold: 0.3 }
    );

    observer.observe(root);
    return () => {
      observer.disconnect();
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  const version = step >= 3 ? "v2" : "v1";
  const mode: Mode =
    step === 2
      ? "comments"
      : step === 3
        ? "changed"
        : step === LAST
          ? "approved"
          : "idle";
  const commentsOn = mode === "comments";
  const v2 = version === "v2";

  const status =
    step === 0
      ? ""
      : mode === "approved"
        ? "Версия 02, согласована"
        : mode === "changed"
          ? "Версия 02, внесены изменения"
          : mode === "comments"
            ? "Версия 01, получены комментарии"
            : "Версия 01, на согласовании";

  const caption =
    mode === "comments"
      ? "Комментарии: 1 первый экран · 2 кнопка · 3 форма"
      : mode === "changed"
        ? "Изменено: заголовок, кнопка, форма"
        : mode === "approved"
          ? "Версия 02 согласована 16 сентября"
          : "Первая версия на согласовании";

  return (
    <div
      ref={rootRef}
      className={styles.root}
      data-armed={armed ? "true" : undefined}
    >
      <div className={styles.grid}>
        {/* Прототип главной страницы */}
        <div className={`${styles.proto} ${reveal >= 1 ? styles.isIn : ""}`}>
          <div className={styles.protoHead}>
            <span className={styles.label}>Прототип главной</span>
            <span className={styles.version} key={version}>
              {v2 ? "V02" : "V01"}
            </span>
            {mode === "approved" && (
              <span className={styles.approved}>
                <i>
                  <Tick />
                </i>
                Согласован
              </span>
            )}
          </div>

          <div className={styles.site} data-version={version} data-mode={mode}>
            <div className={styles.siteBody} key={version} aria-hidden="true">
              <div className={styles.chrome}>
                <i />
                <i />
                <i />
                <span>prototype / главная</span>
              </div>

              <div className={styles.bar}>
                <span className={styles.logo} />
                <strong>Компания</strong>
                <nav>
                  <span>Услуги</span>
                  <span>О нас</span>
                  <span>Контакты</span>
                </nav>
              </div>

              <div className={styles.text}>
                <div className={`${styles.zone} ${styles.headline}`}>
                  <strong>
                    {v2
                      ? "Понятное решение для вашей задачи"
                      : "Добро пожаловать в нашу компанию"}
                  </strong>
                  <p>
                    {v2
                      ? "Расскажите, что хотите изменить, — предложим решение."
                      : "Коротко о компании и наших услугах."}
                  </p>
                  <Marker on={commentsOn}>1</Marker>
                </div>
                <span className={`${styles.zone} ${styles.button}`}>
                  {v2 ? "Обсудить задачу" : "Подробнее"}
                  <Marker on={commentsOn}>2</Marker>
                </span>
              </div>

              <div className={styles.benefits}>
                {benefits.map(([title, note]) => (
                  <div key={title}>
                    <i />
                    <strong>{title}</strong>
                    <span>{note}</span>
                  </div>
                ))}
              </div>

              <div className={`${styles.zone} ${styles.form}`}>
                <strong>{v2 ? "Расскажите о задаче" : "Оставьте контакты"}</strong>
                <span className={styles.field}>Имя</span>
                <span className={styles.field}>Телефон</span>
                {v2 && <span className={`${styles.field} ${styles.fieldTall}`}>Задача</span>}
                <span className={styles.formButton}>
                  {v2 ? "Обсудить" : "Отправить"}
                </span>
                <Marker on={commentsOn}>3</Marker>
              </div>

              <div className={styles.foot}>
                <span>Контакты</span>
                <span>Политика конфиденциальности</span>
              </div>

              <span className={styles.stamp}>
                <i>
                  <Tick />
                </i>
                Согласовано
              </span>
            </div>
          </div>

          <p className={styles.caption} key={caption}>
            {caption}
          </p>
          <span className="sr-only" aria-live="polite">
            {status}
          </span>
        </div>

        {/* Шаги истории — переключают прототип */}
        <div className={styles.stepsGroup}>
          <p className={styles.stepsLabel}>Пример согласования</p>
          <ol className={styles.steps}>
          {steps.map((item, index) => {
            const number = index + 1;
            const state =
              number === step ? "now" : number < step ? "done" : "next";

            return (
              <li
                key={item.title}
                className={`${styles.stepItem} ${
                  reveal >= number ? styles.isIn : ""
                }`}
              >
                <button
                  type="button"
                  className={`${styles.step} ${styles[state]}`}
                  aria-current={number === step ? "step" : undefined}
                  disabled={!ready}
                  onClick={() => setStep(number)}
                >
                  <time>{item.date}</time>
                  <strong>{item.title}</strong>
                  {number === LAST && (
                    <i className={styles.stepTick}>
                      <Tick />
                    </i>
                  )}
                </button>
              </li>
            );
          })}
          </ol>
        </div>
      </div>
    </div>
  );
}

export function ProcessTransparency() {
  return (
    <section
      id="transparency"
      className={styles.section}
      aria-labelledby="transparency-title"
    >
      <div className={styles.container}>
        <header className={styles.head}>
          <div>
            <p className={styles.eyebrow}>Внутри проекта</p>
            <h2
              id="transparency-title"
              aria-label="Проект не превращается в чёрный ящик."
            >
              Проект не превращается
              <br />
              <em>в чёрный ящик.</em>
            </h2>
          </div>
          <p className={styles.description}>
            Вы видите результат по ходу работы{" "}
            <br />и участвуете в решениях.
          </p>
        </header>
        <TransparencyStage />
      </div>
    </section>
  );
}

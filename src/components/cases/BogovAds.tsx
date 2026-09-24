"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./BogovAds.module.css";

// Состояние появления выставляется до первой отрисовки, иначе финал успевает мигнуть.
const useArmingEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/*
 * Композиция по референсу в сетке 1672 × 941.
 * COURSE_PAGE — готовое изображение, аннотации на нём уже есть.
 * Текст объявления и запроса — из ТЗ владельца; метрик рекламы не показываем.
 */
const W = 1672;
const H = 941;

const pctX = (v: number) => `${(v / W) * 100}%`;
const pctY = (v: number) => `${(v / H) * 100}%`;

const box = (x: number, y: number, w: number) =>
  ({ "--x": pctX(x), "--y": pctY(y), "--w": pctX(w) }) as CSSProperties;

const QUERY = "обучение на категорию а спб";

/* 0 строка · 1 запрос · 2 линия · 3 объявление · 4 линия · 5 страница */
const FINAL = 5;

function Stage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(FINAL);
  const [armed, setArmed] = useState(false);
  const [typed, setTyped] = useState(QUERY.length);

  useArmingEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    setArmed(true);
    setStep(-1);
    setTyped(0);

    const timers: number[] = [];
    let typing = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }
        observer.disconnect();
        [0, 500, 1550, 2100, 2900, 3400].forEach((ms, i) =>
          timers.push(window.setTimeout(() => setStep(i), ms))
        );
        timers.push(
          window.setTimeout(() => {
            let n = 0;
            typing = window.setInterval(() => {
              n += 1;
              setTyped(n);
              if (n >= QUERY.length) {
                window.clearInterval(typing);
              }
            }, 32);
          }, 550)
        );
      },
      { threshold: 0.25 }
    );
    observer.observe(root);
    return () => {
      observer.disconnect();
      timers.forEach((timer) => window.clearTimeout(timer));
      window.clearInterval(typing);
    };
  }, []);

  const on = (from: number) => (step >= from ? styles.isIn : "");

  return (
    <div
      ref={rootRef}
      className={styles.stage}
      data-armed={armed ? "true" : undefined}
    >
      <header className={styles.head}>
        <p className={styles.eyebrow}>05 · Яндекс Директ</p>
        <h2 id="ads-title">
          Реклама ведёт
          {" "}
          <br />
          <em>
            на страницу курса, а не на
            {" "}
            <br />
            главную.
          </em>
        </h2>
      </header>

      <p className={styles.intro}>
        Запрос, объявление и страница
        {" "}
        <br />
        продолжают одну потребность.
      </p>

      <svg className={styles.lines} viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
        <path
          className={`${styles.link} ${on(2)}`}
          pathLength={1}
          d="M 448 503 C 486 503, 470 558, 509 558"
        />
        <circle className={`${styles.dot} ${on(2)}`} cx="448" cy="503" r="3.5" />
        <circle className={`${styles.dot} ${on(3)}`} cx="509" cy="558" r="3.5" />
        <path
          className={`${styles.link} ${on(4)}`}
          pathLength={1}
          d="M 828 515 C 866 515, 858 558, 898 558"
        />
        <circle className={`${styles.dot} ${on(4)}`} cx="828" cy="515" r="3.5" />
        <circle className={`${styles.dot} ${on(5)}`} cx="898" cy="558" r="3.5" />
      </svg>

      <section className={`${styles.step} ${styles.s1}`} style={box(75, 362, 373)}>
        <div className={`${styles.stepHead} ${styles.rev} ${on(0)}`}>
          <p>
            <b>01</b>
            <span>Запрос</span>
          </p>
          <p className={styles.text}>
            Человек ищет конкретный
            {" "}
            <br />
            курс, а не просто
            {" "}
            <br />
            мотошколу.
          </p>
        </div>
        <div className={`${styles.search} ${styles.rev} ${on(0)}`}>
          <span className={styles.mark}>
            <Image src="/cases/yandex-mark.png" alt="" width={90} height={90} />
          </span>
          <span className={styles.query}>
            {QUERY.slice(0, typed)}
            <i aria-hidden="true" />
          </span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path d="m15.5 15.5 5 5" />
          </svg>
        </div>
      </section>

      <section className={`${styles.step} ${styles.s2}`} style={box(509, 362, 319)}>
        <div className={`${styles.stepHead} ${styles.rev} ${on(3)}`}>
          <p>
            <b>02</b>
            <span>Объявление</span>
          </p>
          <p className={styles.text}>
            Показываем конкретное
            {" "}
            <br />
            предложение под запрос.
          </p>
        </div>
        <article className={`${styles.ad} ${styles.rev} ${on(3)}`}>
          <span className={styles.tag}>Реклама</span>
          <h3>
            Обучение на категорию А —
            {" "}
            <br />
            мотошкола Bogov Team
          </h3>
          <p>
            Практика в городе и на площадке.
            {" "}
            <br />
            Подготовка к экзамену. Запись онлайн.
          </p>
          <span className={styles.url}>
            <i aria-hidden="true" />
            bogov-team.ru/category-a
          </span>
          <span className={styles.go}>
            Перейти <b aria-hidden="true">→</b>
          </span>
        </article>
      </section>

      <section className={`${styles.step} ${styles.s3}`} style={box(900, 282, 690)}>
        <div className={`${styles.stepHead} ${styles.rev} ${on(5)}`}>
          <p>
            <b>03</b>
            <span>Страница курса</span>
          </p>
          <p className={styles.text}>
            Пользователь сразу попадает
            {" "}
            <br />
            на нужную страницу.
          </p>
        </div>
        <div className={`${styles.page} ${styles.rev} ${on(5)}`}>
          <Image
            src="/cases/bogov-ads-course.webp"
            alt="Страница курса «Категория А» на сайте Мотошколы Владимира Богова"
            fill
            sizes="(max-width: 900px) 100vw, 42vw"
          />
        </div>
      </section>

      <p className={`${styles.foot} ${styles.rev} ${on(FINAL)}`}>
        <span>Рекламный трафик</span>
        <i aria-hidden="true" />
        <span>Конкретные люди</span>
        <i aria-hidden="true" />
        <span>Релевантная страница</span>
      </p>
    </div>
  );
}

export function BogovAds() {
  return (
    <section id="ads" className={styles.section} aria-labelledby="ads-title">
      <div className={styles.container}>
        <Stage />
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./BogovFinal.module.css";

// Состояние появления выставляется до первой отрисовки, иначе финал успевает мигнуть.
const useArmingEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/*
 * Композиция по референсу в сетке 1600 × 1110.
 * LAPTOP и PHONE — готовые RGBA-ассеты; итог собирает историю кейса,
 * новых данных здесь нет: 94% и 91 из 97 — из блока «SEO».
 */
const W = 1600;
const H = 1110;

const pctX = (v: number) => `${(v / W) * 100}%`;
const pctY = (v: number) => `${(v / H) * 100}%`;

const box = (x: number, y: number, w: number) =>
  ({ "--x": pctX(x), "--y": pctY(y), "--w": pctX(w) }) as CSSProperties;

/* 0 H2 · 1 ноутбук и свечение · 2 телефон · 3 — · 4 «01/02» · 5 «03–05» · 6 фраза · 7 CTA */
const FINAL = 7;

function Stage({ next }: { next: { slug: string; name: string } }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(FINAL);
  const [armed, setArmed] = useState(false);

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

    let timers: number[] = [];
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }
        observer.disconnect();
        timers = [0, 400, 850, 1250, 1900, 2500, 3000, 3400].map((at, i) =>
          window.setTimeout(() => setStep(i), at)
        );
      },
      { threshold: 0.25 }
    );
    observer.observe(root);
    return () => {
      observer.disconnect();
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  const on = (from: number) => (step >= from ? styles.isIn : "");

  return (
    <div
      ref={rootRef}
      className={styles.stage}
      data-armed={armed ? "true" : undefined}
    >
      <div className={`${styles.glow} ${styles.rev} ${on(1)}`} aria-hidden="true">
        <span className={styles.glowWide} />
        <span className={styles.glowCore} />
        <span className={styles.glowFloor} />
      </div>

      <header className={`${styles.head} ${styles.rev} ${on(0)}`}>
        <p className={styles.eyebrow}>Итог</p>
        <h2 id="final-title">
          Сайт перестал быть
          {" "}
          <br />
          <em>
            просто страницей
            {" "}
            <br />
            мотошколы.
          </em>
        </h2>
      </header>

      <div className={styles.devices}>
        <div className={`${styles.laptop} ${styles.rev} ${on(1)}`} style={box(380, 247, 930)}>
          <Image
            src="/cases/bogov-final-laptop.webp"
            alt="Сайт Мотошколы Владимира Богова на ноутбуке"
            fill
            sizes="(max-width: 900px) 110vw, 54vw"
          />
        </div>
        <div className={`${styles.phone} ${styles.rev} ${on(2)}`} style={box(262, 355, 340)}>
          <Image
            src="/cases/bogov-final-phone.webp"
            alt="Мобильная версия сайта Мотошколы Владимира Богова"
            fill
            sizes="(max-width: 900px) 40vw, 20vw"
          />
        </div>
      </div>

      <section className={`${styles.point} ${styles.p1} ${styles.rev} ${on(4)}`} style={box(40, 225, 230)}>
        <p className={styles.title}>
          <b>01</b>
          <span>Создали</span>
        </p>
        <p className={styles.text}>
          Сайт с нуля
          {" "}
          <br />
          под задачи бизнеса.
        </p>
        <div className={`${styles.mini} ${styles.wire}`}>
          <svg viewBox="0 0 64 44" aria-hidden="true">
            <rect x="1" y="1" width="62" height="42" rx="3" />
            <path d="M1 9h62M1 9l62 34M63 9 1 43" />
          </svg>
          <span>
            Структура
            <br />
            Дизайн
            <br />
            Контент
            <br />
            Запись на обучение
          </span>
        </div>
      </section>

      <section className={`${styles.point} ${styles.p2} ${styles.rev} ${on(4)}`} style={box(40, 600, 262)}>
        <p className={styles.title}>
          <b>02</b>
          <span>Адаптировали</span>
        </p>
        <p className={styles.text}>Desktop + Mobile</p>
        <div className={`${styles.mini} ${styles.devicesMini}`}>
          <span>
            <svg viewBox="0 0 32 28" aria-hidden="true">
              <rect x="2" y="2" width="28" height="18" rx="2" />
              <path d="M11 26h10M16 20v6" />
            </svg>
            Desktop
          </span>
          <span>
            <svg viewBox="0 0 20 28" aria-hidden="true">
              <rect x="2" y="1" width="16" height="26" rx="3" />
              <path d="M8 23h4" />
            </svg>
            Mobile
          </span>
        </div>
      </section>

      <section className={`${styles.point} ${styles.p3} ${styles.rev} ${on(5)}`} style={box(1300, 415, 240)}>
        <p className={styles.title}>
          <b>03</b>
          <span>Связали</span>
        </p>
        <p className={styles.text}>
          Обращения + источники
          {" "}
          <br />
          в единую систему.
        </p>
        <div className={`${styles.mini} ${styles.signal}`}>
          <span className={styles.channels}>Форма · Звонок · Мессенджер</span>
          <span className={styles.arrow} aria-hidden="true">
            →
          </span>
          <span className={styles.state}>
            <i aria-hidden="true" />В работе
          </span>
        </div>
      </section>

      <section className={`${styles.point} ${styles.p4} ${styles.rev} ${on(5)}`} style={box(1300, 190, 240)}>
        <p className={styles.title}>
          <b>04</b>
          <span>Вывели в поиск</span>
        </p>
        <p className={styles.big}>
          94<span>%</span>
          <em>
            запросов
            {" "}
            <br />в ТОП-10
          </em>
        </p>
        <div className={`${styles.mini} ${styles.stat}`}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 20v-6M10 20V9M16 20V4M21 20H2" />
          </svg>
          <span>
            <b>91 из 97</b>
            отслеживаемых запросов
          </span>
        </div>
      </section>

      <section className={`${styles.point} ${styles.p5} ${styles.rev} ${on(5)}`} style={box(1300, 655, 240)}>
        <p className={styles.title}>
          <b>05</b>
          <span>Настроили связку</span>
        </p>
        <p className={styles.text}>Директ → страница курса</p>
        <div className={`${styles.mini} ${styles.chain}`}>
          <span className={styles.mark}>
            <Image src="/cases/yandex-mark.png" alt="" width={90} height={90} />
          </span>
          <span>
            Запрос
            <br />→ Объявление
            <br />→ Страница курса
          </span>
        </div>
      </section>

      <p className={`${styles.statement} ${styles.rev} ${on(6)}`}>
        Сайт связал выбор обучения, обращения,
        {" "}
        <br />
        поиск и рекламу в одну систему.
      </p>

      <div className={`${styles.cta} ${styles.rev} ${on(7)}`}>
        <a className={styles.button} href="#contact-dialog" data-contact-dialog>
          Обсудить похожую задачу
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
        <Link className={styles.next} href={`/cases/${next.slug}`}>
          Следующий кейс: {next.name}
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>

      <p className={`${styles.credit} ${styles.rev} ${on(7)}`}>
        <span>ABBiO</span>
        <i aria-hidden="true">×</i>
        <span>Bogov Team</span>
      </p>
      <p className={`${styles.tagline} ${styles.rev} ${on(7)}`}>
        Сайты, которые работают
      </p>
    </div>
  );
}

export function BogovFinal({
  next,
}: {
  next: { slug: string; name: string };
  service?: string;
}) {
  return (
    <section id="final" className={styles.section} aria-labelledby="final-title">
      <div className={styles.container}>
        <Stage next={next} />
      </div>
    </section>
  );
}

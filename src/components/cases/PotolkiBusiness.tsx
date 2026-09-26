"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./PotolkiBusiness.module.css";

// Состояние появления выставляется до первой отрисовки, иначе финал успевает мигнуть.
const useArmingEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

const ICON = {
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM20 20l-4-4",
  page: "M4 5h16v14H4zM4 9h16M8 7h.01M11 7h.01",
  message: "M4 5h16v11H9l-5 4V5Z",
  contract: "M7 3h8l4 4v14H7zM15 3v4h4M9.5 14l2 2 3.5-4",
} as const;

function Svg({ d, className }: { d: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

function Link() {
  return (
    <span className={`${styles.link} ${styles.rev}`} aria-hidden="true">
      <svg viewBox="0 0 40 16">
        <path d="M1 8h36M30 1.5 37 8l-7 6.5" />
      </svg>
    </span>
  );
}

/*
 * Данные даны владельцем: 10–15 заключённых договоров в месяц из органического продвижения — текущий
 * результат; 50 договоров в месяц — следующая ЦЕЛЬ. Проценты выполнения и прочие показатели не выводим.
 */
export function PotolkiBusiness() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(true);
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
    setSeen(false);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }
        observer.disconnect();
        setSeen(true);
        // Когда появление закончилось, снимаем «взведённое» состояние.
        window.setTimeout(() => setArmed(false), 5000);
      },
      { threshold: 0.15 }
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="business" className={styles.section} aria-labelledby="pb-title">
      <div
        ref={rootRef}
        className={`${styles.stage} ${seen ? styles.seen : ""}`}
        data-armed={armed ? "true" : undefined}
      >
        <div className={`${styles.head} ${styles.rev}`}>
          <p className={styles.eyebrow}>
            <b>06</b>
            <i aria-hidden="true" />
            Бизнес-результат
          </p>
          <h2 id="pb-title">
            Позиции —{" "}
            <br />
            ещё не результат.{" "}
            <br />
            <em>
              Результат —{" "}
              <br />
              заключённый договор.
            </em>
          </h2>
          <p className={styles.description}>
            Органический поиск уже приводит клиентов без постоянной закупки
            рекламного трафика.
          </p>
        </div>

        <div className={styles.chain}>
          <div className={`${styles.step} ${styles.s1} ${styles.rev}`}>
            <span className={styles.ico}>
              <Svg d={ICON.search} />
            </span>
            <h3>Поиск</h3>
            <p className={styles.searchBar}>
              <Svg d={ICON.search} />
              натяжные потолки спб
            </p>
          </div>
          <Link />
          <div className={`${styles.step} ${styles.s2} ${styles.rev}`}>
            <span className={styles.ico}>
              <Svg d={ICON.page} />
            </span>
            <h3>Сайт</h3>
            <p className={styles.sub}>
              Релевантная{" "}
              <br />
              страница
            </p>
          </div>
          <Link />
          <div className={`${styles.step} ${styles.s3} ${styles.rev}`}>
            <span className={styles.ico}>
              <Svg d={ICON.message} />
            </span>
            <h3>Обращение</h3>
            <p className={styles.sub}>Расчёт / замер</p>
            <p className={styles.cta}>
              Оставить заявку <span aria-hidden="true">→</span>
            </p>
          </div>
          <Link />
          <div className={`${styles.step} ${styles.deal} ${styles.s4} ${styles.rev}`}>
            <span className={styles.ico}>
              <Svg d={ICON.contract} />
            </span>
            <h3>Договор</h3>
          </div>
        </div>

        <div className={styles.metrics}>
          <div className={`${styles.result} ${styles.rev}`}>
            <p className={styles.big} aria-label="10–15">
              10–15
            </p>
            <div className={styles.rText}>
              <p className={styles.rMain}>заключённых договоров в месяц</p>
              <p className={styles.rSub}>из органического продвижения</p>
            </div>
          </div>

          <div className={`${styles.path} ${styles.rev}`} aria-hidden="true">
            <span className={styles.pLabel}>Сейчас</span>
            <span className={styles.pLine}>
              <i className={styles.now} />
              <i className={styles.dash} />
              <i className={styles.goalDot} />
            </span>
            <span className={styles.pLabel}>Цель</span>
          </div>

          <div className={`${styles.goal} ${styles.rev}`}>
            <p className={styles.gLabel}>Следующая цель</p>
            <p className={styles.gNum}>50</p>
            <p className={styles.gSub}>договоров в месяц</p>
          </div>
        </div>

        <div className={`${styles.final} ${styles.rev}`}>
          <p className={styles.thesis}>
            SEO перестало быть задачей «поднять позиции».
            <em>Теперь задача — масштабировать количество договоров.</em>
          </p>
          <p className={styles.note}>
            Сайт формирует собственный{" "}
            <br />
            канал привлечения — без постоянной{" "}
            <br />
            закупки каждого следующего перехода.
          </p>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./PotolkiFuture.module.css";

// Состояние появления выставляется до первой отрисовки, иначе финал успевает мигнуть.
const useArmingEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

const ICON = {
  doc: "M7 3h8l4 4v14H7zM15 3v4h4M10 12h6M10 16h6",
  bars: "M4 20v-5M9 20v-9M14 20v-13M19 20V4",
} as const;

function Arrow() {
  return (
    <svg viewBox="0 0 40 16" aria-hidden="true">
      <path d="M1 8h36M30 1.5 37 8l-7 6.5" />
    </svg>
  );
}

function Svg({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

/*
 * Ноутбук — готовый asset public/cases/potolki-laptop.avif. Логотип клиента — оригинальный файл
 * public/cases/potolki-logo-dark.svg. Google «G» — официальный знак Google (developers.google.com,
 * страница брендинга Google Identity), сохранён локально: public/cases/google-g.webp, цвета не менялись.
 * Цифры и KPI выше по кейсу здесь не повторяем.
 */
export function PotolkiFuture() {
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
    <section id="future" className={styles.section} aria-labelledby="pf-title">
      <div
        ref={rootRef}
        className={`${styles.stage} ${seen ? styles.seen : ""}`}
        data-armed={armed ? "true" : undefined}
      >
        <div className={`${styles.head} ${styles.rev}`}>
          <p className={styles.eyebrow}>
            <b>07</b>
            <i aria-hidden="true" />
            Проект продолжается
          </p>
          <h2 id="pf-title">
            Сайт уже работает.{" "}
            <br />
            <em>Теперь его масштабируем.</em>
          </h2>
          <p className={styles.description}>
            Развиваем поисковую видимость, расширяем структуру и усиливаем то,
            что уже приводит клиентов.
          </p>
        </div>

        <div className={`${styles.laptop} ${styles.rev}`}>
          <Image
            src="/cases/potolki-laptop.avif"
            alt="Ноутбук с работающим сайтом «Потолки Всем»"
            width={1533}
            height={1026}
            sizes="(max-width: 860px) 92vw, 54vw"
            quality={90}
          />
        </div>

        <div className={`${styles.status} ${styles.rev}`}>
          {/* Оригинальный логотип клиента (тёмная версия для светлого фона) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.logo} src="/cases/potolki-logo-dark.svg" alt="Потолки Всем" width="490" height="143" />
          <p className={styles.pills}>
            <span className={styles.works}>
              <i aria-hidden="true" />
              Работает
            </span>
            <span className={styles.grow}>
              Развиваем <Arrow />
            </span>
          </p>
        </div>

        <article className={`${styles.card} ${styles.c1} ${styles.rev}`}>
          <p className={styles.cTop}>
            <b>01</b>
            <i aria-hidden="true" />
            <span>In progress</span>
          </p>
          <div className={styles.cBody}>
            <span className={styles.cIcon}>
              <Image src="/cases/google-g.webp" alt="" width={200} height={204} />
            </span>
            <div>
              <h3>Google</h3>
              <p>
                Увеличиваем{" "}
                <br />
                поисковую видимость
              </p>
            </div>
            <span className={styles.go}>
              <Arrow />
            </span>
          </div>
        </article>

        <article className={`${styles.card} ${styles.c2} ${styles.rev}`}>
          <p className={styles.cTop}>
            <b>02</b>
            <i aria-hidden="true" />
            <span>In progress</span>
          </p>
          <div className={styles.cBody}>
            <span className={`${styles.cIcon} ${styles.line}`}>
              <Svg d={ICON.doc} />
            </span>
            <div>
              <h3>Новые страницы</h3>
              <p>
                Расширяем{" "}
                <br />
                охват спроса
              </p>
            </div>
            <span className={styles.go}>
              <Arrow />
            </span>
          </div>
        </article>

        <article className={`${styles.card} ${styles.c3} ${styles.rev}`}>
          <p className={styles.cTop}>
            <b>03</b>
            <i aria-hidden="true" />
            <span>In progress</span>
          </p>
          <div className={styles.cBody}>
            <span className={`${styles.cIcon} ${styles.line}`}>
              <Svg d={ICON.bars} />
            </span>
            <div>
              <h3>Конверсия</h3>
              <p>
                Улучшаем путь{" "}
                <br />
                до обращения
              </p>
            </div>
            <span className={styles.go}>
              <Arrow />
            </span>
          </div>
        </article>

        <div className={`${styles.final} ${styles.rev}`}>
          <p className={styles.thesis}>
            Запуск сайта был первым этапом.
            <em>Теперь задача — развивать канал дальше.</em>
          </p>
          <p className={styles.note}>
            У проекта есть прочная основа.{" "}
            <br />
            Продолжаем работать над его развитием.
          </p>
        </div>
      </div>
    </section>
  );
}

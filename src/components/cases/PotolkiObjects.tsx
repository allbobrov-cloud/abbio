"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./PotolkiObjects.module.css";

// Состояние появления выставляется до первой отрисовки, иначе финал успевает мигнуть.
const useArmingEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

function Arrow() {
  return (
    <svg className={styles.arrow} viewBox="0 0 40 16" aria-hidden="true">
      <path d="M1 8h36M30 1.5 37 8l-7 6.5" />
    </svg>
  );
}

/*
 * Все картинки — готовые assets (public/cases/potolki-object.avif, potolki-done.avif,
 * potolki-similar.avif). Цифры и подписи внутри них не дублируем и не меняем.
 */
export function PotolkiObjects() {
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
    <section id="objects" className={styles.section} aria-labelledby="po-title">
      <div
        ref={rootRef}
        className={`${styles.stage} ${seen ? styles.seen : ""}`}
        data-armed={armed ? "true" : undefined}
      >
        <div className={styles.grid}>
          <div className={`${styles.head} ${styles.rev}`}>
            <p className={styles.eyebrow}>
              <b>03</b>
              <i aria-hidden="true" />
              Реальные объекты
            </p>
            <h2 id="po-title">
              Не обещаем{" "}
              <br />
              на словах.{" "}
              <br />
              <em>
                Показываем,{" "}
                <br />
                как сделали.
              </em>
            </h2>
            <p className={styles.description}>
              Каждая работа — отдельная страница с фотографиями, площадью,
              решением, сроком и итоговой стоимостью. Можно найти похожий объект
              и понять порядок бюджета до обращения.
            </p>
            <p className={styles.all}>
              <span>Смотреть все объекты</span>
              <Arrow />
            </p>
          </div>

          <div className={`${styles.photo} ${styles.rev} ${styles.pop}`}>
            <Image
              src="/cases/potolki-object.avif"
              alt="Выполненный объект: кухня 10 м², срок 1 день, стоимость 34 000 ₽"
              width={1536}
              height={1024}
              sizes="(max-width: 860px) 92vw, 54vw"
              quality={90}
            />
          </div>

          <div className={`${styles.done} ${styles.rev}`}>
            <Image
              src="/cases/potolki-done.avif"
              alt="Что сделали: матовый ПВХ, трековый свет, подвесная люстра"
              width={930}
              height={1691}
              sizes="(max-width: 860px) 70vw, 24vw"
            />
          </div>

          <div className={`${styles.simHead} ${styles.rev}`}>
            <h3>Похожая задача?</h3>
            <p>
              Посмотрите другие реальные объекты с похожими параметрами.
            </p>
            <p className={styles.more}>
              <span className={styles.moreBtn}>
                <Arrow />
              </span>
              <span>
                Еще объекты
              </span>
            </p>
          </div>

          <div className={`${styles.sim} ${styles.rev}`}>
            <div className={styles.simScroll}>
              <Image
                src="/cases/potolki-similar.avif"
                alt="Похожие объекты: кухня 9 м² — 27 000 ₽, ванная 7 м² — 36 000 ₽, квартира 48 м² — 78 000 ₽"
                width={2000}
                height={667}
                sizes="(max-width: 860px) 720px, 60vw"
              />
            </div>
          </div>
        </div>

        <div className={`${styles.final} ${styles.rev}`}>
          <span className={styles.finalIcon} aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M4 7h13v11H4zM7 7V5h13v11h-3M4 15l3.5-3.5 3 3 2-2L17 16M9 10.5h.01" />
            </svg>
          </span>
          <p className={styles.thesis}>
            Не абстрактная цена за м².
            <em>Реальный объект с реальной комплектацией.</em>
          </p>
          <p className={styles.note}>
            Фотографии, параметры и стоимость —{" "}
            <br />
            чтобы можно было сравнить решения до обращения.
          </p>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./StroybazaLogistics.module.css";

// Состояние появления выставляется до первой отрисовки, иначе финал успевает мигнуть.
const useArmingEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

const ICON = {
  arrow: "M4 12h16m0 0-5-5m5 5-5 5",
  cube: "M12 3 20 7.5v9L12 21 4 16.5v-9L12 3ZM4 7.5 12 12l8-4.5M12 12v9",
} as const;

function Svg({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

const timeline = [
  { title: "Заказ", text: "Материалы подобраны" },
  { title: "Погрузка", text: "Комплектуем и загружаем" },
  { title: "В пути", text: "Отслеживаем доставку" },
  { title: "Объект", text: "Материалы на месте" },
];

/*
 * 06 · Не только купить. Ещё и доставить. — логистическая сцена: три переданных PNG
 * (заказ / транспорт / объект) свободно на общем фоне, БЕЗ карточек-оберток, с лёгким
 * разнобоем по вертикали (depth) для живости композиции. Все подписи, суммы и типы
 * транспорта уже отрисованы внутри assets — кодом ничего не дублируется.
 */
export function StroybazaLogistics() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(true);
  const [armed, setArmed] = useState(false);

  useArmingEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setArmed(true);
    setSeen(false);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        setSeen(true);
        window.setTimeout(() => setArmed(false), 4800);
      },
      { threshold: 0.15 }
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="stroybaza-logistics" className={styles.section} aria-labelledby="stroybaza-logistics-title">
      <div
        ref={rootRef}
        className={`${styles.stage} ${seen ? styles.seen : ""}`}
        data-armed={armed ? "true" : undefined}
      >
        <div className={styles.headRow}>
          <div>
            <p className={`${styles.eyebrow} ${styles.rev}`}><span aria-hidden="true" />06 · Не только купить. Ещё и доставить.</p>
            <h2 id="stroybaza-logistics-title" className={styles.rev}>
              Материал нужно не только купить.
              <br />
              <em>Его нужно привезти на объект.</em>
            </h2>
          </div>
          <p className={`${styles.description} ${styles.rev}`}>
            Связали заказ с доставкой: объём и состав покупки помогают перейти от корзины к подходящему варианту перевозки.
          </p>
        </div>

        <div className={styles.scene}>
          <div className={`${styles.order} ${styles.revOrder}`}>
            <Image
              src="/cases/stroybaza-logistics-order.webp"
              alt="Заказ собран: газобетон 24,6 м³ и другие материалы на паллетах"
              width={1261}
              height={1247}
              sizes="(max-width: 700px) 78vw, (max-width: 1180px) 32vw, 24vw"
              loading="eager"
            />
          </div>

          <div className={`${styles.connector} ${styles.rev}`} aria-hidden="true"><Svg d={ICON.arrow} /></div>

          <div className={`${styles.truck} ${styles.revTruck}`}>
            <Image
              src="/cases/stroybaza-logistics-truck.webp"
              alt="Подбираем транспорт по объёму и составу заказа: Газель, манипулятор, длинномер — загруженный грузовик"
              width={1536}
              height={1024}
              sizes="(max-width: 700px) 92vw, (max-width: 1180px) 46vw, 38vw"
              loading="eager"
            />
          </div>

          <div className={`${styles.connector} ${styles.rev}`} aria-hidden="true"><Svg d={ICON.arrow} /></div>

          <div className={`${styles.object} ${styles.revObject}`}>
            <Image
              src="/cases/stroybaza-logistics-object.webp"
              alt="Санкт-Петербург · ЛО — доставка на объект: строящийся дом и метка местоположения"
              width={1536}
              height={1024}
              sizes="(max-width: 700px) 80vw, (max-width: 1180px) 34vw, 26vw"
              loading="eager"
            />
          </div>
        </div>

        <ol className={`${styles.timeline} ${styles.rev}`}>
          {timeline.map((step, index) => (
            <li className={styles.tlStep} key={step.title}>
              <span className={`${styles.dot} ${index === 0 ? styles.dotActive : ""}`} aria-hidden="true" />
              <strong>{step.title}</strong>
              <span>{step.text}</span>
            </li>
          ))}
        </ol>

        <p className={`${styles.finalThesis} ${styles.rev}`}>
          <i className={styles.thesisIcon} aria-hidden="true"><Svg d={ICON.cube} /></i>
          <span>
            Покупка заканчивается не в корзине.
            <em>Она заканчивается, когда материалы приехали на объект.</em>
          </span>
        </p>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./VolhonkaSite.module.css";

// Состояние появления выставляется до первой отрисовки, иначе финал успевает мигнуть.
const useArmingEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/*
 * Три экрана интерфейса — единый готовый asset public/cases/volhonka-site-ui.avif
 * (1849 × 851, RGBA). Всё остальное — текст и иконки.
 */
const advantages = [
  {
    title: "Актуальная цена",
    text: "видна до обращения",
    icon: "M3 12V4h8l10 10-8 8L3 12Zm5-5.5h.01",
  },
  {
    title: "Наличие",
    text: "понятно сразу",
    icon: "m12 3 8 4.2v9.6L12 21l-8-4.2V7.2L12 3ZM4 7.2l8 4.3 8-4.3M12 11.5V21",
  },
  {
    title: "Доставка",
    text: "СПб и область",
    icon: "M2 6h11v10H2zM13 9h4l3 3v4h-7M6.5 19a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2ZM16.5 19a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2Z",
  },
  {
    title: "Быстрый заказ",
    text: "без длинного сценария",
    icon: "M13 2 4 14h7l-1 8 9-12h-7l1-8Z",
  },
] as const;

export function VolhonkaSite() {
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
      },
      { threshold: 0.2 }
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="commercial-site" className={styles.section} aria-labelledby="vs-title">
      <div
        ref={rootRef}
        className={`${styles.stage} ${seen ? styles.seen : ""}`}
        data-armed={armed ? "true" : undefined}
      >
        <div className={styles.glow} aria-hidden="true" />

        <div className={`${styles.copy} ${styles.rev}`}>
          <p className={styles.eyebrow}>
            <b>02</b> · Коммерческий сайт
          </p>
          <h2 id="vs-title">
            Сайт должен{" "}
            <br />
            помогать{" "}
            <br />
            <em>покупать металл.</em>
          </h2>
          <p className={styles.description}>
            Каталог построили вокруг реальной задачи клиента: найти нужную
            продукцию, выбрать параметры, увидеть актуальную цену и быстро
            перейти к заказу.
          </p>
        </div>

        <div className={styles.visualScroll} tabIndex={0} aria-label="Интерфейс каталога, можно прокручивать по горизонтали">
        <div className={`${styles.visual} ${styles.rev} ${styles.visualRev}`}>
          <Image
            src="/cases/volhonka-site-ui.avif"
            alt="Путь покупателя в каталоге: раздел «Продукция» с выбранной арматурой, параметры (диаметр 10 мм, класс А500С, длина 6 м) и карточка предложения «Арматура 10 мм А3 А500С», 32 ₽ за метр, в наличии, кнопки «В корзину» и «Купить в 1 клик»"
            fill
            sizes="(max-width: 900px) 130vw, 62vw"
          />
        </div>
        </div>

        <ul className={styles.adv}>
          {advantages.map((a, i) => (
            <li
              key={a.title}
              className={styles.rev}
              style={{ transitionDelay: `${0.45 + i * 0.1}s` }}
            >
              <span className={styles.ic}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d={a.icon} />
                </svg>
              </span>
              <span>
                <b>{a.title}</b>
                {a.text}
              </span>
            </li>
          ))}
        </ul>

        <p className={`${styles.final} ${styles.rev} ${styles.d5}`}>
          <span>Не заставляем клиента разбираться в структуре каталога.</span>
          <em>Ведём от потребности к конкретному предложению.</em>
        </p>
      </div>
    </section>
  );
}

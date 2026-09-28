"use client";

import Image from "next/image";
import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./StroybazaParameters.module.css";

// Состояние появления выставляется до первой отрисовки, иначе финал успевает мигнуть.
const useArmingEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

const stages = [
  {
    num: "01",
    label: "Плотность",
    value: "D400",
    img: "/cases/stroybaza-parameters-d400.webp",
    alt: "Группа газобетонных блоков плотностью D400",
    className: "d400",
  },
  {
    num: "02",
    label: "Размер",
    value: "375×250×625",
    img: "/cases/stroybaza-parameters-size.webp",
    alt: "Три газобетонных блока размером 375 × 250 × 625 мм",
    className: "size",
  },
  {
    num: "03",
    label: "Производитель",
    value: "ЛСР",
    img: "/cases/stroybaza-parameters-lsr.webp",
    alt: "Два газобетонных блока производителя ЛСР",
    className: "lsr",
  },
] as const;

/*
 * 02 · Подбор по параметрам — полный редизайн (старая версия с UI-панелью фильтров и
 * выдачей товаров удалена целиком). Идея: одна горизонтальная цепочка слева направо —
 * весь ассортимент → D400 → размер → ЛСР → 3 подходящие позиции, где количество вариантов
 * визуально уменьшается за счёт убывающего размера изображений. Все ассеты — предоставленные
 * фото реальных блоков (обрезаны по alpha-bbox), без перерисовки и без выдуманных цифр.
 */
export function StroybazaParameters() {
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
        window.setTimeout(() => setArmed(false), 2400);
      },
      { threshold: 0.15 }
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="stroybaza-parameters" className={styles.section} aria-labelledby="stroybaza-parameters-title">
      <div
        ref={rootRef}
        className={`${styles.stage} ${seen ? styles.seen : ""}`}
        data-armed={armed ? "true" : undefined}
      >
        <p className={`${styles.eyebrow} ${styles.rev}`}><span aria-hidden="true" />02 · Подбор по параметрам</p>
        <h2 id="stroybaza-parameters-title" className={styles.rev}>
          Найти нужный
          <br />
          <em>материал проще.</em>
        </h2>
        <p className={`${styles.description} ${styles.rev}`}>
          Фильтры и характеристики помогают сузить большой ассортимент до подходящих позиций.
        </p>

        <div className={styles.chain}>
          <div className={`${styles.item} ${styles.assortment} ${styles.revItem}`} style={{ transitionDelay: armed ? "0.26s" : undefined }}>
            <div className={styles.imgAssortment}>
              <Image src="/cases/stroybaza-parameters-assortment.webp" alt="Большой ассортимент газобетонных блоков разных форм и размеров" width={1645} height={956} sizes="(max-width: 700px) 78vw, 20vw" loading="eager" />
            </div>
            <p className={styles.caption}>Весь ассортимент</p>
          </div>

          <span className={styles.arrow} aria-hidden="true">→</span>

          {stages.map((item, index) => (
            <Fragment key={item.num}>
              <div className={`${styles.item} ${styles[item.className]} ${styles.revItem}`} style={{ transitionDelay: armed ? `${0.36 + index * 0.09}s` : undefined }}>
                <div className={styles.badge}>
                  <p className={styles.badgeNum}>{item.num}</p>
                  <p className={styles.badgeLabel}>{item.label}</p>
                  <p className={styles.badgeValue}>{item.value}</p>
                </div>
                <div className={`${styles.img} ${styles[item.className]}`}>
                  <Image src={item.img} alt={item.alt} width={1536} height={1024} sizes="(max-width: 700px) 70vw, 16vw" loading="eager" />
                </div>
              </div>
              <span className={styles.arrow} aria-hidden="true">→</span>
            </Fragment>
          ))}

          <div className={`${styles.resultCard} ${styles.revResult}`} style={{ transitionDelay: armed ? "0.7s" : undefined }}>
            <div className={styles.result}>
              <Image src="/cases/stroybaza-parameters-result.webp" alt="Подходит: 3 позиции — блок, блок, перемычка" width={1774} height={887} sizes="(max-width: 700px) 84vw, 24vw" loading="eager" />
            </div>
          </div>
        </div>

        <span className={`${styles.divider} ${styles.rev}`} aria-hidden="true" />

        <p className={`${styles.finalThesis} ${styles.rev}`}>
          Чем точнее параметры — <em>тем меньше лишнего выбора.</em>
        </p>
      </div>
    </section>
  );
}

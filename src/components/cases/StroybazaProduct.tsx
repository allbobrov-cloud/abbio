"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./StroybazaProduct.module.css";

// Состояние появления выставляется до первой отрисовки, иначе финал успевает мигнуть.
const useArmingEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

const ICON = {
  cart: "M4 5h2l2.4 11.2A2 2 0 0 0 10.35 18h6.3a2 2 0 0 0 1.95-1.8L20 8H6.2M10 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM18 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z",
} as const;

function Svg({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

const UNIT_PRICE = 7290;

/*
 * 03 · Карточка товара — доработка: убраны три преимущества слева (дублировали смысл уже
 * показанного), товар увеличен и обрезан по alpha-bbox для более крупного и читаемого
 * визуала, purchase panel приближена вплотную к товару (единая правая композиция), верхняя
 * акцентная полоса убрана, финальный тезис перенесён под всю композицию без divider.
 * Характеристики (D400/B2,5/F100/размеры/24 шт./1,4 м³) не дублируются — они внутри готового
 * изображения public/cases/stroybaza-product-block.webp.
 */
export function StroybazaProduct() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(true);
  const [armed, setArmed] = useState(false);
  const [qty, setQty] = useState(1);

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
    <section id="stroybaza-product" className={styles.section} aria-labelledby="stroybaza-product-title">
      <div
        ref={rootRef}
        className={`${styles.stage} ${seen ? styles.seen : ""}`}
        data-armed={armed ? "true" : undefined}
      >
        <div className={styles.content}>
          <div className={styles.copy}>
            <p className={`${styles.eyebrow} ${styles.rev}`}><b>03</b><i aria-hidden="true" />Карточка товара</p>
            <h2 id="stroybaza-product-title" className={styles.rev}>
              Не просто название и цена.
              <em>Всё, что нужно знать о материале.</em>
            </h2>
            <p className={`${styles.description} ${styles.rev}`}>
              Характеристики, фасовка и стоимость — всё, что нужно для выбора материала.
            </p>
          </div>

          <div className={styles.productGroup}>
            <div className={`${styles.visual} ${styles.revImage}`}>
              <Image
                src="/cases/stroybaza-product-block.webp"
                alt="Газобетонный блок D400, класс прочности B2,5, морозостойкость F100, 375 × 250 × 625 мм, 24 шт. на поддоне, 1,4 м³, миниатюры и видео о материале"
                width={1536}
                height={1024}
                sizes="(max-width: 900px) 88vw, 46vw"
                loading="eager"
              />
            </div>

            <div className={`${styles.panelCol} ${styles.revPanel}`}>
              <p className={styles.panelLabel}><i aria-hidden="true" />Товар в каталоге</p>
              <aside className={styles.panel} aria-label="Покупка товара">
                <p className={styles.brand}>ЛСР</p>
                <h3 className={styles.productName}>Блок прямой с захватом ЛСР</h3>
                <p className={styles.productSpec}>D400 · 375 × 250 × 625 мм</p>

                <p className={styles.stock}><i aria-hidden="true" />В наличии</p>

                <p className={styles.price}>
                  <span key={qty} className={styles.priceValue}>{(UNIT_PRICE * qty).toLocaleString("ru-RU")} ₽</span>
                  <span>за {qty} м³</span>
                </p>
                <p className={styles.pallet}>Поддон 1,4 м³ — 10 206 ₽</p>

                <div className={styles.qty} role="group" aria-label="Количество">
                  <button type="button" onClick={() => setQty((v) => Math.max(1, v - 1))} aria-label="Уменьшить количество">−</button>
                  <span>{qty} м³</span>
                  <button type="button" onClick={() => setQty((v) => v + 1)} aria-label="Увеличить количество">+</button>
                </div>

                <button type="button" className={styles.primary}>
                  <Svg d={ICON.cart} />
                  В корзину
                </button>
                <button type="button" className={styles.secondary}>Запросить счёт</button>

                <p className={styles.note}>
                  Стоимость и наличие уточнит менеджер. Доставка рассчитывается отдельно.
                </p>
              </aside>
            </div>
          </div>
        </div>

        <p className={`${styles.finalThesis} ${styles.rev}`}>
          Чем сложнее материал — <em>тем меньше вопросов должно оставаться у покупателя.</em>
        </p>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./StroybazaCalculator.module.css";

// Состояние появления выставляется до первой отрисовки, иначе финал успевает мигнуть.
const useArmingEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

const ICON = {
  cube: "M12 3 20 7.5v9L12 21 4 16.5v-9L12 3ZM4 7.5 12 12l8-4.5M12 12v9",
  roof: "M3 11.5 12 4l9 7.5M5.5 9.5V20h13V9.5M10 20v-5h4v5",
  fence: "M5 20V6l2-2 2 2v14M15 20V6l2-2 2 2v14M3 10h18M3 15h18",
  coins: "M12 3c4.4 0 8 1.34 8 3s-3.6 3-8 3-8-1.34-8-3 3.6-3 8-3ZM4 6v6c0 1.66 3.6 3 8 3s8-1.34 8-3V6M4 12v6c0 1.66 3.6 3 8 3s8-1.34 8-3v-6",
  truck: "M3 7h11v9H3zM14 10h4l3 3v3h-7zM6.5 19a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6ZM17 19a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6Z",
  check: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM8 12.5l2.7 2.7L16 9.8",
  info: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 11v5M12 8h.01",
  chevron: "m6 9 6 6 6-6",
} as const;

function Svg({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

const tasks = [
  { id: "walls", label: "Стены", icon: ICON.cube },
  { id: "roof", label: "Кровля", icon: ICON.roof },
  { id: "fence", label: "Забор", icon: ICON.fence },
] as const;

// Базовый пример из референса владельца: дом 10 × 8 × 3 м, стена 375 мм.
const BASE = { length: 10, width: 8, height: 3, thickness: 375, volume: 24.6, count: 1260, price: 179000 };
const THICKNESS = { min: 100, max: 500, step: 25 };

const dims = [
  { key: "length", label: "Длина", max: 50 },
  { key: "width", label: "Ширина", max: 50 },
  { key: "height", label: "Высота", max: 12 },
] as const;

type DimKey = (typeof dims)[number]["key"];

function toNumber(value: string, fallback: number, max: number) {
  const parsed = Number.parseFloat(value.replace(",", "."));
  return Number.isFinite(parsed) && parsed > 0 ? Math.min(parsed, max) : fallback;
}

const ru = (value: number, digits = 0) =>
  value.toLocaleString("ru-RU", { minimumFractionDigits: digits, maximumFractionDigits: digits });

/*
 * 05 · Расчёт до покупки — три карточки по референсу владельца: 01 Объект (дом + размеры),
 * 02 Расчёт (задача, материал, толщина), 03 Результат (объём, количество, стоимость, доставка).
 * Результат масштабируется пропорционально периметру, высоте и толщине стены от базового примера.
 */
export function StroybazaCalculator() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(true);
  const [armed, setArmed] = useState(false);
  const [thickness, setThickness] = useState(BASE.thickness);
  const [size, setSize] = useState<Record<DimKey, string>>({
    length: String(BASE.length),
    width: String(BASE.width),
    height: String(BASE.height),
  });

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
        window.setTimeout(() => setArmed(false), 4600);
      },
      { threshold: 0.15 }
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  const length = toNumber(size.length, BASE.length, dims[0].max);
  const width = toNumber(size.width, BASE.width, dims[1].max);
  const height = toNumber(size.height, BASE.height, dims[2].max);
  const ratio =
    ((length + width) / (BASE.length + BASE.width)) * (height / BASE.height) * (thickness / BASE.thickness);

  const volume = ru(BASE.volume * ratio, 1);
  const count = ru(Math.round((BASE.count * ratio) / 10) * 10);
  const price = ru(Math.round((BASE.price * ratio) / 1000) * 1000);
  const fill = ((thickness - THICKNESS.min) / (THICKNESS.max - THICKNESS.min)) * 100;

  const results = [
    { icon: ICON.cube, label: "Количество материала", value: `≈ ${count} шт.` },
    { icon: ICON.coins, label: "Ориентир стоимости", value: `≈ ${price} ₽` },
    { icon: ICON.truck, label: "Доставка", value: "от 1 дня" },
  ];

  return (
    <section id="stroybaza-calculator" className={styles.section} aria-labelledby="stroybaza-calculator-title">
      <div
        ref={rootRef}
        className={`${styles.stage} ${seen ? styles.seen : ""}`}
        data-armed={armed ? "true" : undefined}
      >
        <p className={`${styles.eyebrow} ${styles.rev}`}><span aria-hidden="true" />05 · Расчёт до покупки</p>
        <h2 id="stroybaza-calculator-title" className={styles.rev}>
          Сначала понять,
          <br />
          <em>сколько понадобится.</em>
        </h2>

        <div className={`${styles.workspace} ${styles.revWorkspace}`}>
          {/* 01 · Объект */}
          <div className={`${styles.card} ${styles.cardObject}`}>
            <p className={styles.cardNum}>01<i aria-hidden="true" /></p>
            <h3 className={styles.cardTitle}>Объект</h3>
            <p className={styles.cardLead}>Задайте параметры вашего объекта</p>

            <div className={`${styles.houseImg} ${styles.revHouse}`}>
              <Image
                src="/cases/stroybaza-calc-house.webp"
                alt="Дом с указанными размерами: высота 3 м, длина 10 м, ширина 8 м"
                width={1513}
                height={1040}
                sizes="(max-width: 760px) 90vw, (max-width: 1180px) 60vw, 32vw"
                loading="eager"
              />
            </div>

            <div className={styles.dims}>
              {dims.map((dim) => (
                <label key={dim.key} className={styles.dim}>
                  <span>{dim.label}</span>
                  <span className={styles.dimInput}>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={size[dim.key]}
                      onChange={(event) => setSize((prev) => ({ ...prev, [dim.key]: event.target.value }))}
                      aria-label={`${dim.label}, м`}
                    />
                    <i>м</i>
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* 02 · Расчёт */}
          <div className={`${styles.card} ${styles.cardCalc}`}>
            <p className={styles.cardNum}>02<i aria-hidden="true" /></p>
            <h3 className={styles.cardTitle}>Расчёт</h3>
            <p className={styles.cardLead}>Выберите, что нужно рассчитать</p>

            <div className={styles.tasks} role="group" aria-label="Строительная задача">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`${styles.task} ${task.id === "walls" ? styles.taskActive : ""}`}
                  aria-current={task.id === "walls" ? "true" : undefined}
                >
                  <Svg d={task.icon} />
                  {task.label}
                </div>
              ))}
            </div>

            <div className={styles.materialGrid}>
              <div className={styles.field}>
                <span>Материал</span>
                <span className={styles.select}><b>Газобетон D400</b><Svg d={ICON.chevron} /></span>
              </div>
              <div className={styles.field}>
                <span>Размер блока</span>
                <span className={styles.select}><b>375×250×625 мм</b><Svg d={ICON.chevron} /></span>
              </div>
              <div className={`${styles.blockImg} ${styles.revBlock}`}>
                <Image
                  src="/cases/stroybaza-calc-block.webp"
                  alt="Газобетонный блок D400"
                  width={1498}
                  height={1050}
                  sizes="(max-width: 760px) 30vw, 10vw"
                  loading="eager"
                />
              </div>
            </div>

            <div className={styles.slider}>
              <span>Толщина стены</span>
              <div className={styles.sliderRow}>
                <input
                  type="range"
                  min={THICKNESS.min}
                  max={THICKNESS.max}
                  step={THICKNESS.step}
                  value={thickness}
                  onChange={(event) => setThickness(Number(event.target.value))}
                  aria-label="Толщина стены, мм"
                  style={{ "--fill": `${fill}%` } as CSSProperties}
                />
                <span className={styles.sliderValue}><b>{thickness}</b>мм</span>
              </div>
            </div>

            <p className={styles.hint}>Можно изменить параметры, чтобы увидеть, как изменится результат</p>
          </div>

          {/* 03 · Результат */}
          <div className={`${styles.card} ${styles.cardResult} ${styles.revResult}`}>
            <p className={styles.cardNum}>03<i aria-hidden="true" /></p>
            <h3 className={styles.cardTitle}>Результат</h3>
            <p className={styles.cardLead}>Предварительный расчёт по заданным параметрам</p>

            <p className={styles.status}><Svg d={ICON.check} />Расчёт готов</p>

            <p className={styles.figureLabel}>Нужный объём</p>
            <p className={styles.figure} aria-live="polite">
              <span key={volume} className={styles.tick}>≈ {volume} м³</span>
            </p>

            <ul className={styles.results}>
              {results.map((item) => (
                <li key={item.label}>
                  <Svg d={item.icon} />
                  <span>{item.label}</span>
                  <b key={item.value} className={styles.tick}>{item.value}</b>
                </li>
              ))}
            </ul>

            <p className={styles.note}><Svg d={ICON.info} />Точный расчёт подтверждает менеджер.</p>
          </div>
        </div>

        <p className={`${styles.finalThesis} ${styles.rev}`}>
          От размеров объекта — <em>к понятному количеству материала.</em>
        </p>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./StroybazaTasks.module.css";

// Состояние появления выставляется до первой отрисовки, иначе финал успевает мигнуть.
const useArmingEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

const ICON = {
  blocks: "M3 6h7v4H3zM12 6h9v4h-9zM3 12h9v4H3zM14 12h7v4h-7z",
  insulation: "M3 9c2-3 4-3 6 0s4 3 6 0 4-3 6 0M3 15c2-3 4-3 6 0s4 3 6 0 4-3 6 0",
  roof: "M3 12 12 4l9 8M6 10v9h12v-9",
  fittings: "M12 3v4M12 17v4M4.2 7.2l2.8 2.8M17 14l2.8 2.8M3 12h4M17 12h4M4.2 16.8l2.8-2.8M17 10l2.8-2.8",
  more: "M6 12h.01M12 12h.01M18 12h.01",
  panel: "M5 4v16M19 4v16M5 8h14M5 13h14M5 18h14",
  post: "M12 3v14M7 21h10M9 17h6",
  compass: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM14.5 9.5 13 13l-3.5 1.5L11 11l3.5-1.5Z",
} as const;

function Svg({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

const scenes = [
  {
    id: "house",
    num: "01",
    title: "Строю дом",
    subtitle: "От фундамента до кровли — материалы для основных этапов строительства.",
    img: "/cases/stroybaza-tasks-house.webp",
    alt: "Строящийся дом из газобетонных блоков с деревянными стропилами кровли",
    objectPosition: "50% 58%",
    directions: [
      { icon: ICON.blocks, title: "Стены и кладка", text: "Газобетон · Кирпич · Керамические блоки" },
      { icon: ICON.insulation, title: "Утепление", text: "Минеральная вата · XPS" },
      { icon: ICON.roof, title: "Кровля", text: "Профнастил · Металлочерепица · Комплектующие" },
    ],
  },
  {
    id: "roof",
    num: "02",
    title: "Делаю кровлю",
    subtitle: "Материалы для устройства и комплектации кровли.",
    img: "/cases/stroybaza-tasks-roof.webp",
    alt: "Кровля из металлочерепицы с дымоходом на фоне закатного неба",
    objectPosition: "56% 62%",
    directions: [
      { icon: ICON.roof, title: "Кровельное покрытие", text: "Профнастил · Металлочерепица" },
      { icon: ICON.fittings, title: "Комплектующие", text: "Доборные элементы" },
      { icon: ICON.more, title: "Сопутствующие материалы", text: "" },
    ],
  },
  {
    id: "fence",
    num: "03",
    title: "Ставлю забор",
    subtitle: "Материалы для ограждения участка.",
    img: "/cases/stroybaza-tasks-fence.webp",
    alt: "Современный забор из профнастила с каменными столбами",
    objectPosition: "44% 62%",
    directions: [
      { icon: ICON.panel, title: "Ограждение", text: "Профнастил" },
      { icon: ICON.post, title: "Основа", text: "Столбы" },
      { icon: ICON.fittings, title: "Комплектация", text: "Комплектующие" },
    ],
  },
];

/*
 * 04 · От товара — к задаче — фотографическая accordion-gallery, кардинально отличная от
 * плотных UI-блоков 01–03. Меньше интерфейса, больше фотографий: три сцены (дом/кровля/забор)
 * делят один ряд через flex (flex:1 / flex:1.9 у активной), раскрывая список направлений
 * материалов только у активной сцены. Assets — три предоставленных фото, без обрезки и без
 * генерации новых изображений; текст полностью в HTML/CSS, не встроен в картинки.
 */
export function StroybazaTasks() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(true);
  const [armed, setArmed] = useState(false);
  const [active, setActive] = useState(0);

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
        window.setTimeout(() => setArmed(false), 4200);
      },
      { threshold: 0.15 }
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="stroybaza-tasks" className={styles.section} aria-labelledby="stroybaza-tasks-title">
      <div
        ref={rootRef}
        className={`${styles.stage} ${seen ? styles.seen : ""}`}
        data-armed={armed ? "true" : undefined}
      >
        <div className={styles.head}>
          <p className={`${styles.eyebrow} ${styles.rev}`}><span aria-hidden="true" />04 · От товара — к задаче</p>
          <div className={styles.headRow}>
            <h2 id="stroybaza-tasks-title" className={styles.rev}>
              Клиент приходит не за товаром.
              <br />
              <em>Он приходит решить задачу.</em>
            </h2>
            <p className={`${styles.description} ${styles.rev}`}>
              Поэтому сайт ведёт не только через каталог. От строительной задачи можно перейти к материалам, расчёту и комплектации.
            </p>
          </div>
        </div>

        <div className={`${styles.gallery} ${styles.revGallery}`} aria-label="Строительные задачи и материалы для них">
          {scenes.map((scene, index) => {
            const isActive = index === active;
            return (
              <div
                key={scene.id}
                className={`${styles.scene} ${isActive ? styles.active : ""}`}
                onMouseEnter={() => setActive(index)}
              >
                <Image
                  className={styles.photo}
                  src={scene.img}
                  alt={scene.alt}
                  fill
                  sizes="(max-width: 700px) 100vw, (max-width: 1020px) 50vw, 48vw"
                  style={{ objectPosition: scene.objectPosition }}
                />
                <div className={styles.overlay} aria-hidden="true" />

                <button
                  type="button"
                  className={styles.trigger}
                  aria-pressed={isActive}
                  onClick={() => setActive(index)}
                  onFocus={() => setActive(index)}
                >
                  <span className={styles.num}>{scene.num}<i aria-hidden="true" /></span>
                  <span className={styles.title}>{scene.title}</span>
                  <span className={styles.subtitle}>{scene.subtitle}</span>
                </button>

                <div className={styles.details} aria-hidden={!isActive}>
                  <ul className={styles.directions}>
                    {scene.directions.map((direction) => (
                      <li key={direction.title}>
                        <Svg d={direction.icon} />
                        <strong>{direction.title}</strong>
                        {direction.text ? <span>{direction.text}</span> : null}
                      </li>
                    ))}
                  </ul>
                  <button type="button" className={styles.link} tabIndex={isActive ? 0 : -1}>
                    Смотреть материалы <span aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <p className={`${styles.finalThesis} ${styles.rev}`}>
          <Svg d={ICON.compass} />
          <span>
            Не заставлять покупателя разбираться в структуре каталога.
            <em>Начать с того, что он хочет построить.</em>
          </span>
        </p>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./SeoPageAnatomy.module.css";

const sizes = ["40×40×2", "60×40×3", "80×80×4"];

export function SeoPageAnatomy() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className={[styles.anatomy, revealed ? styles.revealed : ""].join(" ")}
      role="img"
      aria-label="Страница каталога устроена так, чтобы отвечать на запрос, помогать выбрать и вести к действию"
    >
      <div className={styles.pageMock} aria-hidden="true">
        <div className={styles.pageChrome}>
          <span>metallobazav.ru/catalog/trubu-profilnye/</span>
        </div>

        <div className={styles.zone} style={{ "--zi": 0 } as React.CSSProperties}>
          <span className={styles.badge}>Отвечает на запрос</span>
          <p className={styles.eyebrow}>Каталог / Профильная труба</p>
          <h3 className={styles.pageTitle}>Профильная труба 09Г2С</h3>
          <p className={styles.pageLead}>Размеры, наличие и способ покупки — сразу на странице, без лишних переходов.</p>
        </div>

        <div className={styles.zone} style={{ "--zi": 1 } as React.CSSProperties}>
          <span className={styles.badge}>Помогает выбрать</span>
          <div className={styles.specs}>
            {sizes.map((s) => <span key={s}>{s}</span>)}
          </div>
          <p className={styles.specHint}>Диаметр, толщина стенки и ГОСТ — характеристики, по которым подбирают трубу под задачу.</p>
        </div>

        <div className={styles.zone} style={{ "--zi": 2 } as React.CSSProperties}>
          <span className={styles.badge}>Ведёт к действию</span>
          <div className={styles.actionRow}>
            <span className={styles.cta}>Получить расчёт <b>→</b></span>
            <span className={styles.actionHint}>Отвечаем в течение рабочего дня</span>
          </div>
        </div>
      </div>
    </div>
  );
}

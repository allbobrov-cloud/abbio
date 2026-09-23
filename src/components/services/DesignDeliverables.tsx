"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./DesignDeliverables.module.css";

const tabs = [
  { id: "screen", label: "Экран", image: "/services/arc-01-devices-v1.webp", alt: "Демо ARC 01: экран каталога товара", objectPosition: "18% center" },
  { id: "adaptive", label: "Адаптив", image: "/services/arc-01-devices-v1.webp", alt: "Демо ARC 01: мобильная версия рядом с десктопной", objectPosition: "88% center" },
  { id: "materials", label: "Материалы", image: "/services/arc-01-direction-v1.webp", alt: "Демо ARC 01: предметная съёмка и палитра для материалов", objectPosition: "center" },
] as const;

const handoff = [
  { label: "Форматы", value: "Макеты и кликабельный прототип для просмотра" },
  { label: "Исходники", value: "Файл Figma: страницы, стили и компоненты" },
  { label: "Состояния", value: "Согласованные ключевые состояния интерфейса" },
];

export function DesignDeliverables() {
  const [active, setActive] = useState(0);
  const tab = tabs[active];

  return (
    <div className={styles.gallery}>
      <p className={styles.demoLabel}>Демонстрационный концепт ARC 01</p>
      <div className={styles.galleryStage}>
        <div className={styles.galleryTabs} role="tablist" aria-label="Переключить материалы">
          {tabs.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active === index}
              aria-controls={`deliverable-panel-${item.id}`}
              id={`deliverable-tab-${item.id}`}
              className={styles.galleryTab}
              onClick={() => setActive(index)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className={styles.galleryFrame} role="tabpanel" id={`deliverable-panel-${tab.id}`} aria-labelledby={`deliverable-tab-${tab.id}`}>
          <Image key={tab.id} src={tab.image} alt={tab.alt} fill sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1100px) 60vw, 760px" style={{ objectFit: "cover", objectPosition: tab.objectPosition }} />
        </div>
      </div>
      <ul className={styles.handoffList}>
        {handoff.map((item) => (
          <li key={item.label}>
            <span>{item.label}</span>
            <p>{item.value}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

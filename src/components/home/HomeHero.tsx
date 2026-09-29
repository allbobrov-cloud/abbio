import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ActionArrow } from "../ActionArrow";
import { caseIndex } from "@/lib/content";
import base from "../Agency.module.css";
import styles from "./HomeHero.module.css";

function ActionArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

// Решение владельца от 24.09: в hero только три направления.
const directions = [
  { slug: "design", name: "Дизайн" },
  { slug: "websites", name: "Сайты" },
  { slug: "marketing", name: "Маркетинг" },
];

// Три колонки стены: у каждой свой порядок кейсов, скорость и направление движения.
const columns = [
  { order: [0, 3, 1, 4, 2, 5], duration: 64, reverse: false },
  { order: [2, 5, 0, 3, 1, 4], duration: 78, reverse: true },
  { order: [4, 1, 5, 2, 3, 0], duration: 70, reverse: false },
];

/*
 * Hero главной: слева заголовок и действия, справа наклонённая в 3D «стена» из обложек
 * реальных кейсов, колонки медленно плывут навстречу друг другу. Стена декоративная
 * (aria-hidden): доступный переход к кейсам — кнопка «Посмотреть работы» и блок кейсов ниже.
 */
export function HomeHero() {
  return (
    <section className={styles.hero} data-force-motion="true" aria-labelledby="hero-title">
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.wallViewport} aria-hidden="true">
        <div className={styles.wall}>
          {columns.map((column, columnIndex) => (
            <div
              key={columnIndex}
              className={`${styles.column} ${column.reverse ? styles.reverse : ""}`}
              style={{ "--d": `${column.duration}s` } as CSSProperties}
            >
              {/* Лента повторена дважды — сдвиг на −50% даёт бесшовный цикл */}
              {[0, 1].map((copy) =>
                column.order.map((caseNumber) => {
                  const item = caseIndex[caseNumber];
                  return (
                    <Link
                      key={`${copy}-${item.slug}`}
                      href={`/cases/${item.slug}`}
                      prefetch={false}
                      tabIndex={-1}
                      className={styles.tile}
                      style={{ "--tint": item.tint } as CSSProperties}
                    >
                      <span className={`${styles.shot} ${item.coverFit === "contain" ? styles.shotContain : ""}`}>
                        <Image src={item.cover} alt="" fill sizes="(max-width: 900px) 40vw, 20vw" priority={copy === 0 && (item.slug === "oss" || item.slug === "bogov")} fetchPriority={copy === 0 && (item.slug === "oss" || item.slug === "bogov") ? "high" : undefined} loading={copy === 0 && (item.slug === "oss" || item.slug === "bogov") ? "eager" : "lazy"} style={{ objectPosition: item.coverPosition }} />
                      </span>
                      <span className={styles.caption}>
                        <b>{item.name}</b>
                        <small>{item.category}</small>
                      </span>
                    </Link>
                  );
                }),
              )}
            </div>
          ))}
        </div>
      </div>

      <div className={`${base.container} ${styles.inner}`}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}><span aria-hidden="true" />Агентство ABBiO · от идеи до запуска</p>
          <h1 id="hero-title">
            <span className={styles.line}>Дизайн, сайты</span>
            <span className={styles.line}>и маркетинг.</span>
            <span className={styles.line}><em>Для бизнеса.</em></span>
          </h1>
          <p className={styles.lead}>Помогаем выглядеть убедительно, привлекать клиентов и работать с обращениями.</p>
          <div className={styles.actions}>
            <a className={styles.primary} href="#contact-dialog" data-contact-dialog>
              Обсудить задачу
              <span className={styles.bubble} aria-hidden="true"><ActionArrowIcon /></span>
            </a>
            <a className={styles.secondary} href="#cases">
              Посмотреть работы
              <span className={styles.count}>{caseIndex.length}</span>
              <span className={styles.down} aria-hidden="true">↓</span>
            </a>
          </div>
          <nav className={styles.directions} aria-label="Направления">
            {directions.map((direction, index) => (
              <Link key={direction.slug} href={`/services/${direction.slug}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {direction.name}
                <ActionArrow />
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}

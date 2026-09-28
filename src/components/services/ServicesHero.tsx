import Link from "next/link";
import type { CSSProperties } from "react";
import { ActionArrow } from "@/components/ActionArrow";
import page from "./ServicesOverviewPage.module.css";
import styles from "./ServicesHero.module.css";

type Direction = { slug: string; number: string; title: string; description: string };

// Узлы по кругу радиусом 35% от центра: сверху и дальше по часовой стрелке.
const ORBIT = [
  { x: 50, y: 15 },
  { x: 83.3, y: 39.2 },
  { x: 70.6, y: 78.3 },
  { x: 29.4, y: 78.3 },
  { x: 16.7, y: 39.2 },
];
const RING = `M ${ORBIT.map(({ x, y }) => `${x} ${y}`).join(" L ")} Z`;

/*
 * Hero страницы «Услуги»: слева заголовок и действия, справа «одна система» —
 * задача клиента в центре, вокруг неё пять направлений, каждое ведёт на свою услугу.
 */
export function ServicesHero({ directions }: { directions: readonly Direction[] }) {
  return (
    <section className={styles.hero} aria-labelledby="services-title">
      <div className={`${page.container} ${styles.inner}`}>
        <nav className={page.breadcrumbs} aria-label="Хлебные крошки">
          <Link href="/">Главная</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Услуги</span>
        </nav>

        <div className={styles.grid}>
          <div className={styles.copy}>
            <p className={page.kicker}>Услуги ABBiO</p>
            <h1 id="services-title">
              Сайты, дизайн и продвижение —{" "}
              <br />
              <em>в одной системе.</em>
            </h1>
            <p className={styles.lead}>
              Работаем над тем, как компания выглядит, объясняет предложение, находится в поиске и получает обращения:
              сайтами, дизайном, маркетингом, SEO и рекламой в Яндекс Директе.
            </p>
            <div className={styles.actions}>
              <Link href="#directions" className={page.primaryAction}>Выбрать направление <ActionArrow /></Link>
              <a href="#contact-dialog" data-contact-dialog className={page.secondaryAction}>Обсудить задачу</a>
            </div>
          </div>

          <nav className={styles.orbit} aria-label="Направления">
            <svg className={styles.lines} viewBox="0 0 100 100" aria-hidden="true">
              <circle className={styles.halo} cx="50" cy="50" r="35" />
              {ORBIT.map(({ x, y }, index) => (
                <line key={index} className={styles.spoke} x1="50" y1="50" x2={x} y2={y} />
              ))}
              <path className={styles.ring} d={RING} />
              <path className={styles.signal} d={RING} pathLength={100} />
            </svg>

            <div className={styles.core} aria-hidden="true">
              <span>В центре</span>
              <strong>Ваша задача</strong>
            </div>

            <ul>
              {directions.map((direction, index) => (
                <li key={direction.slug} style={{ "--x": `${ORBIT[index].x}%`, "--y": `${ORBIT[index].y}%` } as CSSProperties}>
                  <Link href={`/services/${direction.slug}`} className={styles.node}>
                    <span className={styles.num}>{direction.number}</span>
                    <strong>{direction.title}</strong>
                    <small>{direction.description}</small>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}

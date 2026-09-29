import Link from "next/link";
import type { CSSProperties } from "react";
import styles from "./ProcessHero.module.css";

// Условный проект «Корпоративный сайт»: 6 шагов, сейчас — дизайн (как в прежнем демо).
const steps = ["Задача", "Структура", "Прототип", "Дизайн", "Разработка", "Запуск"];
const CURRENT = 3;

// Кольцо в SVG 400×400: центр 200, радиус 150. Первый шаг сверху, дальше по часовой.
const R = 150;
const nodes = steps.map((title, i) => {
  const angle = (-90 + i * 60) * (Math.PI / 180);
  return {
    title,
    x: 200 + R * Math.cos(angle),
    y: 200 + R * Math.sin(angle),
    side: Math.abs(Math.cos(angle)) < 0.01 ? "center" : Math.cos(angle) > 0 ? "right" : "left",
    vertical: Math.sin(angle) < -0.99 ? "top" : Math.sin(angle) > 0.99 ? "bottom" : "middle",
  };
});
const CIRC = 2 * Math.PI * R;
const progress = (CURRENT / steps.length) * CIRC;

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

/*
 * Hero «Как работаем»: слева обещание, справа «орбита проекта» — шесть шагов условного
 * проекта по кругу, пройденная часть светится, в центре только текущий шаг; рядом одна
 * карточка «нужно от вас». Подробности этапов — в секциях ниже.
 */
export function ProcessHero() {
  return (
    <section className={styles.hero} aria-labelledby="process-title">
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.container}>
        <nav className={styles.breadcrumb} aria-label="Хлебные крошки">
          <Link href="/">Главная</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Как работаем</span>
        </nav>

        <div className={styles.stage}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>Как мы работаем</p>
            <h1 id="process-title">
              Понятно, что делаем{" "}
              <em>и что дальше.</em>
            </h1>
            <p className={styles.description}>
              От первой встречи до запуска проект разбит на понятные этапы. На каждом видно, что делаем сейчас, что
              нужно согласовать и что будет дальше.
            </p>
            <div className={styles.actions}>
              <a href="#contact-dialog" data-contact-dialog className={styles.primary}>
                Обсудить задачу <span aria-hidden="true"><Arrow /></span>
              </a>
              <a href="#process" className={styles.secondary}>
                Смотреть этапы <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          <figure className={styles.visual}>
            <div className={styles.orbit} style={{ "--progress": progress, "--circ": CIRC } as CSSProperties}>
              <svg className={styles.ring} viewBox="0 0 400 400" aria-hidden="true">
                <circle className={styles.halo} cx="200" cy="200" r="186" />
                <circle className={styles.track} cx="200" cy="200" r={R} />
                <circle className={styles.arc} cx="200" cy="200" r={R} transform="rotate(-90 200 200)" />
                <g className={styles.spinner}>
                  <circle className={styles.outer} cx="200" cy="200" r="186" />
                  <circle className={styles.comet} cx="200" cy="14" r="3" />
                </g>
              </svg>

              <ol className={styles.steps}>
                {nodes.map((node, i) => (
                  <li
                    key={node.title}
                    data-state={i < CURRENT ? "done" : i === CURRENT ? "now" : "next"}
                    data-side={node.side}
                    data-vertical={node.vertical}
                    style={{ "--x": `${node.x / 4}%`, "--y": `${node.y / 4}%`, "--i": i } as CSSProperties}
                  >
                    <span className={styles.dot} aria-hidden="true" />
                    <span className={styles.label}>
                      <small>{String(i + 1).padStart(2, "0")}</small>
                      {node.title}
                      {i === CURRENT && <span className="sr-only"> — текущий шаг</span>}
                    </span>
                  </li>
                ))}
              </ol>

              <div className={styles.core}>
                <span className={styles.coreStep}>Этап 04 / 06</span>
                <strong>Дизайн</strong>
                <span className={styles.corePill}><i aria-hidden="true" />Ожидает согласования</span>
              </div>
            </div>
            <div className={styles.float}>
              <span className={styles.floatIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
              </span>
              <span>
                <small>Нужно от вас</small>
                Посмотреть главную и оставить комментарии
              </span>
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}

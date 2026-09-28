import Image from "next/image";
import styles from "./StroybazaHero.module.css";

const features = [
  { title: "Каталог", text: "Материалы для разных этапов стройки", icon: <><path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="M3 7v10l9 5 9-5V7M12 12v10"/></> },
  { title: "Расчёт", text: "Количество и стоимость", icon: <><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M8 6h8M8 11h2m4 0h2m-8 4h2m4 0h2m-8 4h2m4 0h2"/></> },
  { title: "Доставка", text: "По Санкт-Петербургу и Ленинградской области", icon: <><path d="M2 6h12v11H2zM14 9h4l4 4v4h-8z"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></> },
];

const journey = [
  { number: "01", title: "Найти", text: "Нужный материал" },
  { number: "02", title: "Подобрать", text: "По параметрам и задаче" },
  { number: "03", title: "Рассчитать", text: "Количество и стоимость" },
  { number: "04", title: "Доставить", text: "Прямо на объект" },
];

export function StroybazaHero() {
  return (
    <section className={styles.hero} aria-labelledby="stroybaza-title">
      <div className={styles.stage}>
        <div className={styles.background} aria-hidden="true">
          <Image src="/cases/stroybaza-house.png" alt="" fill sizes="100vw" priority />
        </div>
        <div className={styles.shade} aria-hidden="true" />

        <div className={styles.content}>
          {/* Оригинальный логотип клиента: тёмный текст заменён белым для тёмного фона Hero (public/cases/stroybaza-logo-dark.svg) */}
          <div className={`${styles.topbar} ${styles.reveal}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className={styles.logo} src="/cases/stroybaza-logo-dark.svg" alt="Стройбаза Волхонка" width="99" height="54" />
          </div>

          <div className={styles.copy}>
            <h1 id="stroybaza-title" className={styles.reveal}>
              Не просто каталог<br />стройматериалов.<br />
              <span>Система для стройки.</span>
            </h1>
            <p className={`${styles.description} ${styles.reveal}`}>
              Собрали материалы, характеристики, расчёты и доставку в одном интерфейсе — от выбора товара до комплектации объекта.
            </p>

            <div className={`${styles.actions} ${styles.reveal}`}>
              <a className={styles.primary} href="https://stroybazav.ru/" target="_blank" rel="noopener noreferrer">Перейти на сайт <span aria-hidden="true">↗</span></a>
              <a className={styles.secondary} href="#stroybaza-catalog">Смотреть кейс <span aria-hidden="true">↓</span></a>
            </div>
          </div>

          <div className={styles.materials}>
            <Image src="/cases/stroybaza-materials.png" alt="Газобетон, кирпич, дерево и металлопрокат; интерфейс поиска, расчёта и доставки" width={1536} height={1024} sizes="(max-width: 900px) 110vw, 50vw" priority />
          </div>

          <ul className={`${styles.features} ${styles.reveal}`} aria-label="Возможности сайта">
            {features.map((feature) => (
              <li key={feature.title}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{feature.icon}</svg>
                <div><strong>{feature.title}</strong><span>{feature.text}</span></div>
              </li>
            ))}
          </ul>

          <div className={`${styles.journeyRow} ${styles.reveal}`}>
            <ol id="stroybaza-journey" className={styles.journey} aria-label="Путь от выбора до доставки">
              {journey.map((step) => (
                <li key={step.number}>
                  <div className={styles.stepTop}>
                    <span className={styles.number}>{step.number}</span>
                    <strong>{step.title}</strong>
                  </div>
                  <span className={styles.stepText}>{step.text}</span>
                  <i className={styles.dot} aria-hidden="true" />
                </li>
              ))}
            </ol>
            <p className={styles.aside}>
              Надёжные материалы
              <br />
              для реальных проектов
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

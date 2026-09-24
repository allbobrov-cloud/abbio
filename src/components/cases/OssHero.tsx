import Image from "next/image";
import Link from "next/link";
import styles from "./OssHero.module.css";

/*
 * Hero кейса «ОборонСпецСплав».
 * Visual справа — готовое изображение, интерфейс не перерисовывается.
 * Цифры (35 направлений, 25–30 тыс. пользователей) переданы владельцем и
 * помечены как требующие уточнения перед публикацией.
 */
const toc = ["Каталог", "Точки входа", "UX / UI", "География", "SEO", "Итог"];

export function OssHero() {
  return (
    <section className={styles.hero} aria-labelledby="oss-title">
      <div className={styles.stage}>
        <div className={styles.glow} aria-hidden="true" />
        <div className={styles.floor} aria-hidden="true" />
        <div className={styles.noise} aria-hidden="true" />

        <nav className={styles.breadcrumbs} aria-label="Хлебные крошки">
          <Link href="/">Главная</Link>
          <span aria-hidden="true">/</span>
          <Link href="/cases">Кейсы</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">ОборонСпецСплав</span>
        </nav>

        <div className={styles.copy}>
          <p className={styles.eyebrow}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className={styles.logo} src="/cases/oss-logo.svg" alt="" width="26" height="40" />
            Кейс · ОборонСпецСплав
          </p>
          <h1 id="oss-title">
            Сложный каталог
            {" "}
            <br />
            превратили
            {" "}
            <br />
            <em>
              в систему
              {" "}
              <br />
              привлечения.
            </em>
          </h1>
          <p className={styles.description}>
            Создали многостраничный сайт для поставщика металлопроката: каталог,
            марки, ГОСТы, регионы и экспертные материалы работают как единая
            система.
          </p>
        </div>

        <div className={styles.factsWrap}>
          <ul className={styles.facts}>
            <li>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m12 3 9 4.5-9 4.5-9-4.5L12 3Z" />
                <path d="m3 12 9 4.5 9-4.5" />
                <path d="m3 16.5 9 4.5 9-4.5" />
              </svg>
              <span>
                <b>С нуля</b>
                Сайт
              </span>
            </li>
            <li>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
                <circle cx="12" cy="10" r="2.4" />
              </svg>
              <span>
                <b>35</b>
                региональных
                {" "}
                <br />
                направлений
              </span>
            </li>
            <li>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 20v-6M10 20V9M16 20V4M21 20H2" />
              </svg>
              <span>
                <b>25–30 тыс.</b>
                пользователей в месяц*
              </span>
            </li>
          </ul>
          <p className={styles.note}>
            * Точные показатели уточняются перед публикацией кейса
          </p>
        </div>

        <ul className={styles.toc} aria-label="Разделы кейса">
          {toc.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className={styles.visual}>
          <Image
            src="/cases/oss-hero-visual.webp"
            alt="Интерфейс сайта ОборонСпецСплав: каталог чёрного металлопроката, карточки арматуры и поиск по марке стали"
            fill
            sizes="(max-width: 1180px) 100vw, 58vw"
            priority
          />
        </div>
      </div>
    </section>
  );
}

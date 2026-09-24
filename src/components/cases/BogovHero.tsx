import Image from "next/image";
import Link from "next/link";
import styles from "./BogovHero.module.css";

/*
 * Hero кейса Bogov Team — цельная layered-обложка.
 * Показатель 94% (91 из 97), дата и выборка взяты из ТЗ владельца (в данных проекта их нет).
 * Изображения desktop/mobile/background — готовые ассеты, не перерисовываются.
 */
const toc = [
  { href: "#structure", label: "Структура" },
  { href: "#design", label: "UX / UI" },
  { href: "#leads", label: "Обращения" },
  { href: "#seo", label: "SEO" },
  { href: "#ads", label: "Яндекс Директ" },
  { href: "#final", label: "Итог" },
];

export function BogovHero() {
  return (
    <section className={styles.hero} aria-labelledby="bogov-title">
      <div className={styles.stage}>
        <div className={styles.bg} aria-hidden="true">
          <Image
            src="/cases/bogov-hero-bg.webp"
            alt=""
            fill
            sizes="(max-width: 760px) 100vw, 90vw"
            priority
          />
        </div>

        <nav className={styles.breadcrumbs} aria-label="Хлебные крошки">
          <Link href="/">Главная</Link>
          <span aria-hidden="true">/</span>
          <Link href="/cases">Кейсы</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Мотошкола Владимира Богова</span>
        </nav>

        <div className={styles.copy}>
          <p className={styles.eyebrow}>Кейс · Bogov Team</p>
          <h1 id="bogov-title">
            Сайт, который стал
            <br />
            <em>каналом</em>
            <br />
            <em>привлечения.</em>
          </h1>
          <p className={styles.description}>
            Спроектировали и разработали сайт с нуля, связали обращения с
            источниками и развили органический поиск.
          </p>
        </div>

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
              <rect x="3" y="5" width="13" height="10" rx="1.5" />
              <path d="M7 19h5" />
              <rect x="15" y="9" width="6" height="11" rx="1.5" />
            </svg>
            <span>
              <b>Адаптив</b>
              Desktop + Mobile
            </span>
          </li>
        </ul>

        <nav className={styles.toc} aria-label="Разделы кейса">
          {toc.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className={styles.visual}>
          {/* Монитор собран в CSS; ассет — содержимое экрана */}
          <div className={styles.monitor}>
            <div className={styles.monitorScreen}>
              <Image
                src="/cases/bogov-hero-desktop.webp"
                alt="Главная страница сайта Мотошколы Владимира Богова, desktop-версия"
                fill
                sizes="(max-width: 760px) 100vw, 48vw"
                priority
              />
            </div>
            <div className={styles.monitorChin} aria-hidden="true" />
            <div className={styles.monitorNeck} aria-hidden="true" />
            <div className={styles.monitorBase} aria-hidden="true" />
            <div className={styles.monitorShadow} aria-hidden="true" />
          </div>

          {/* Смартфон собран в CSS; ассет — содержимое экрана */}
          <div className={styles.phone}>
            <div className={styles.phoneFrame}>
              <div className={styles.phoneScreen}>
                <Image
                  src="/cases/bogov-hero-mobile.webp"
                  alt="Главная страница сайта Мотошколы Владимира Богова, мобильная версия"
                  fill
                  sizes="(max-width: 760px) 60vw, 14vw"
                  priority
                />
              </div>
              <span className={styles.phoneIsland} aria-hidden="true" />
            </div>
          </div>

          <div className={styles.result}>
            <svg className={styles.trace} viewBox="0 0 110 90" aria-hidden="true">
              <path d="M4 84C12 50 44 20 100 14" />
              <path d="m90 6 10 8-11 7" />
            </svg>
            <p className={styles.big}>94%</p>
            <p className={styles.bigLabel}>Запросов в топ-10</p>
            <p className={styles.bigNote}>
              91 из 97 запросов · Яндекс · Санкт-Петербург
              <br />
              09.09.2026
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import styles from "./PotolkiHero.module.css";

/*
 * Hero кейса «Потолки Всем». Фон — public/cases/potolki-hero-bg.avif (1774 × 887),
 * UI-композиция «Реальный объект / Рассчитать стоимость / Подобрать решение» —
 * готовый asset public/cases/potolki-ui.avif (1179 × 1334, прозрачный фон).
 * Логотип клиента — public/cases/potolki-logo.svg (тёмный текст оригинала заменён белым для тёмного фона).
 * SEO-показатели в Hero не выводим, они раскрываются в следующих секциях.
 */
const PRINCIPLES = [
  {
    title: ["Многостраничный", "сайт"],
    text: "под поисковый спрос",
    icon: "m12 3 9 4.5-9 4.5-9-4.5L12 3ZM3 12l9 4.5 9-4.5M3 16.5 12 21l9-4.5",
  },
  {
    title: ["Реальные объекты"],
    text: "с ценой и сроком",
    icon: "M4 8h3l2-3h6l2 3h3v11H4zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z",
  },
  {
    title: ["SEO-продвижение"],
    text: "Санкт-Петербург · Москва",
    icon: "M4 20v-5M9 20v-9M14 20v-13M19 20V4",
  },
] as const;

export function PotolkiHero() {
  return (
    <section className={styles.hero} aria-labelledby="pv-title">
      <div className={styles.stage}>
        <div className={styles.bg} aria-hidden="true">
          <Image
            src="/cases/potolki-hero-bg.avif"
            alt=""
            fill
            sizes="100vw"
            quality={90}
            priority
          />
        </div>
        <div className={styles.shade} aria-hidden="true" />

        <p className={styles.note} aria-hidden="true">
          Продуманный сайт
          <br />
          Больше возможностей
          <br />
          для роста бизнеса
        </p>

        <div className={styles.copy}>
          <p className={`${styles.label} ${styles.r1}`}>
            <b>Кейс</b> · Потолки Всем
          </p>
          <p className={`${styles.client} ${styles.r1}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/cases/potolki-logo.svg" alt="Потолки Всем" width="490" height="143" />
          </p>

          <h1 id="pv-title" className={styles.r2}>
            Не лендинг{" "}
            <br />
            под рекламу.{" "}
            <br />
            <em>Собственный канал</em>{" "}
            <br />
            <em>привлечения.</em>
          </h1>
          <p className={`${styles.description} ${styles.r3}`}>
            Вместо типового лендинга для Директа построили многостраничный сайт
            под органический поиск — с реальными объектами, ценами, подбором
            решений и полезным контентом.
          </p>

          <div className={`${styles.lead} ${styles.r5} ${styles.leadMobile}`}>
            <p className={styles.leadLabel}>
              <i aria-hidden="true" />
              Поисковый спрос
            </p>
            <div className={styles.search} aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM20 20l-4-4" />
              </svg>
              <span>натяжные потолки спб</span>
              <svg viewBox="0 0 40 16">
                <path d="M1 8h36M30 1.5 37 8l-7 6.5" />
              </svg>
            </div>
            <span className={styles.link} aria-hidden="true" />
          </div>

          <div className={`${styles.uiMobile} ${styles.r6}`}>
            <Image
              src="/cases/potolki-ui.avif"
              alt="Карточка реального объекта, расчёт стоимости и подбор решения"
              width={1179}
              height={1334}
              sizes="(max-width: 860px) 88vw, 36vw"
            />
          </div>

          <ul className={`${styles.principles} ${styles.r4}`}>
            {PRINCIPLES.map((p) => (
              <li key={p.title[0]}>
                <span className={styles.icon} aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d={p.icon} />
                  </svg>
                </span>
                <span className={styles.txt}>
                  <b>
                    {p.title[0]}
                    {p.title[1] ? (
                      <>
                        {" "}
                        <br />
                        {p.title[1]}
                      </>
                    ) : null}
                  </b>
                  {p.text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className={`${styles.ui} ${styles.r6}`}>
          <div className={`${styles.lead} ${styles.leadDesk}`}>
            <p className={styles.leadLabel}>
              <i aria-hidden="true" />
              Поисковый спрос
            </p>
            <div className={styles.search} aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM20 20l-4-4" />
              </svg>
              <span>натяжные потолки спб</span>
              <svg viewBox="0 0 40 16">
                <path d="M1 8h36M30 1.5 37 8l-7 6.5" />
              </svg>
            </div>
            <span className={styles.link} aria-hidden="true" />
          </div>
          <Image
            src="/cases/potolki-ui.avif"
            alt="Карточка реального объекта, расчёт стоимости и подбор решения"
            width={1179}
            height={1334}
            sizes="(max-width: 860px) 88vw, 36vw"
            priority
          />
        </div>

        <p className={styles.sign}>
          <i aria-hidden="true" />
          <span className={styles.wordmark} aria-label="ABBiO">
            <span>ABB</span>
            <span className={styles.wordI}>i</span>
            <span>O</span>
          </span>
          <em aria-hidden="true">×</em>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.signLogo} src="/cases/potolki-logo.svg" alt="Потолки Всем" width="490" height="143" />
        </p>
      </div>
    </section>
  );
}

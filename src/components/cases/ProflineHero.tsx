import Image from "next/image";
import styles from "./ProflineHero.module.css";

/*
 * Hero кейса «ПрофЛайн». Визуал (ноутбук, дом, профнастил) — готовый asset
 * public/cases/profline-hero.webp (1672 × 941). Логотип клиента — public/cases/profline-logo.svg
 * (чёрный текст оригинала заменён белым для тёмного фона).
 * Показатели даны владельцем.
 */
const METRICS = [
  {
    key: "pages",
    value: "25 000",
    label: ["страниц уже на сайте"],
    icon: "M8 3h9l3 3v13H8zM8 3v0M5 7v14h11M11 10h6M11 14h6",
  },
  {
    key: "top",
    value: "60%",
    label: ["из 150 отслеживаемых", "запросов — в ТОП-10"],
    icon: "M4 20v-5M9 20v-9M14 20v-13M19 20V4",
  },
] as const;

const DIRECTIONS = [
  { title: "Кровля", text: "для любых объектов", icon: "m3 11 9-7 9 7M5 10v10h14V10M10 20v-6h4v6" },
  { title: "Заборы и ограждения", text: "надёжные решения", icon: "M4 20V8l2-3 2 3v12M10 20V8l2-3 2 3v12M16 20V8l2-3 2 3v12M3 20h18M4 13h16" },
  { title: "Фасадные материалы", text: "эстетика и защита", icon: "M4 4h16v16H4zM4 9h16M4 14h16M10 4v5M15 9v5M10 14v6" },
  { title: "Сэндвич-панели", text: "для строительства", icon: "m3 9 9-5 9 5-9 5-9-5ZM3 13l9 5 9-5M3 17l9 5 9-5" },
] as const;

export function ProflineHero() {
  return (
    <section className={styles.hero} aria-labelledby="pl-title">
      <div className={styles.stage}>
        <div className={styles.bg} aria-hidden="true">
          <Image
            src="/cases/profline-hero.webp"
            alt=""
            fill
            sizes="100vw"
            quality={90}
            priority
          />
        </div>
        <div className={styles.shade} aria-hidden="true" />

        <div className={styles.topbar}>
          <p>
            <b>ABBiO</b>
            <i aria-hidden="true" />
            <span>Кейс · ПрофЛайн</span>
          </p>
          <p className={styles.services}>Сайты · SEO · Аналитика · Развитие</p>
        </div>

        <div className={styles.copy}>
          <p className={styles.ident}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className={styles.logo} src="/cases/profline-logo.svg" alt="ПрофЛайн" width="741" height="152" />
            <i aria-hidden="true" />
            <span>
              Кровельные{" "}
              <br />и фасадные материалы
            </span>
          </p>
          <h1 id="pl-title">
            Из сайта о профнастиле —{" "}
            <br />
            <em>в большой каталог</em>{" "}
            <br />
            материалов.
          </h1>
          <p className={styles.description}>
            Проект начинался как специализированный сайт по профнастилу. Сегодня
            каталог объединяет кровельные и фасадные материалы, сэндвич-панели и
            решения для ограждений — и продолжает расти.
          </p>

          <ul className={styles.metrics}>
            {METRICS.map((m) => (
              <li key={m.key}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d={m.icon} />
                </svg>
                <span>
                  <b>{m.value}</b>
                  {m.label[0]}
                  {m.label[1] ? (
                    <>
                      {" "}
                      <br />
                      {m.label[1]}
                    </>
                  ) : null}
                </span>
              </li>
            ))}
          </ul>

        </div>

        <ul className={styles.dirs} aria-label="Направления проекта">
          {DIRECTIONS.map((d) => (
            <li key={d.title}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d={d.icon} />
              </svg>
              <span>
                <b>{d.title}</b>
                {d.text}
              </span>
            </li>
          ))}
          <li className={styles.more}>
            <i aria-hidden="true" />
            <span>
              Больше{" "}
              <br />
              чем одна категория
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}

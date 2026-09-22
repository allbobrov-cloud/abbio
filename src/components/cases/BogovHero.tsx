import Image from "next/image";
import styles from "./BogovHero.module.css";

/*
 * Hero кейса Bogov Team.
 * Показатели, дата и выборка взяты из ТЗ владельца (в данных проекта их нет),
 * состав работ — только направления, подтверждённые описанием и данными кейса.
 */
const facts = ["Сайт с нуля", "Desktop + Mobile"];
const scope = [
  "Структура",
  "Дизайн",
  "Разработка",
  "Адаптив",
  "Аналитика",
  "SEO",
];

export function BogovHero() {
  return (
    <section className={styles.hero} aria-labelledby="bogov-title">
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>Кейс · Bogov Team</p>
            <h1 id="bogov-title">
              Сайт, который стал
              <br />
              <em>каналом привлечения.</em>
            </h1>
            <p className={styles.description}>
              Спроектировали и разработали сайт с нуля, связали обращения с
              источниками и развили органический поиск.
            </p>
          </div>

          {/* Реальный сайт: desktop сзади, mobile впереди */}
          <div className={styles.visual}>
            <div className={styles.stage}>
              <div className={styles.desktop}>
                <Image
                  src="/cases/bogov-desktop.avif"
                  alt="Главная страница сайта Мотошколы Владимира Богова, desktop"
                  fill
                  sizes="(max-width: 760px) 92vw, 52vw"
                  priority
                />
              </div>
              <div className={styles.mobile}>
                <Image
                  src="/cases/bogov-mobile.avif"
                  alt="Главная страница сайта Мотошколы Владимира Богова, мобильная версия"
                  fill
                  sizes="(max-width: 760px) 40vw, 14vw"
                  priority
                />
              </div>

              {/* Единственный proof-элемент — как часть интерфейса кейса */}
              <div className={styles.proof} aria-label="SEO: 91% в топ-10, 09.09.2026">
                <span>SEO</span>
                <strong>
                  91%<em> в ТОП-10</em>
                </strong>
                <small>09.09.2026</small>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.band}>
          <ul className={styles.facts}>
            {facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
            <li className={styles.key}>
              <b>91%</b>
              <span>запросов в ТОП-10*</span>
            </li>
          </ul>
          <p className={styles.note}>
            *22 отслеживаемых запроса · Яндекс · Санкт-Петербург · 09.09.2026
          </p>
          <p className={styles.scope}>{scope.join(" · ")}</p>
        </div>
      </div>
    </section>
  );
}

import styles from "./BusinessValueSection.module.css";

const benefits = [
  {
    title: "Прозрачная аналитика",
    text: "Видите реальные данные по заявкам, CPL, ROMI\u00a0и\u00a0прибыли в\u00a0режиме реального времени.",
    tone: "blue",
    icon: "analytics"
  },
  {
    title: "Система привлечения",
    text: "Сайт, SEO\u00a0и\u00a0реклама работают согласованно, а\u00a0не разрозненно.",
    tone: "violet",
    icon: "ring"
  },
  {
    title: "Масштабируемость",
    text: "Digital-инфраструктура готова к\u00a0росту бизнеса\u00a0и\u00a0запуску новых направлений.",
    tone: "blue",
    icon: "growth"
  },
  {
    title: "Автоматизация процессов",
    text: "CRM, заявки, аналитика\u00a0и\u00a0задачи связаны между собой.",
    tone: "blue",
    icon: "automation"
  },
  {
    title: "Контроль экономики",
    text: "Маркетинг оценивается через прибыль\u00a0и\u00a0ключевые показатели.",
    tone: "green",
    icon: "economy"
  },
  {
    title: "Управляемый рост",
    text: "Постоянно тестируем гипотезы, улучшаем показатели\u00a0и\u00a0масштабируем результат.",
    tone: "violet",
    icon: "star"
  }
];

export function BusinessValueSection() {
  return (
    <section className={styles.section} aria-labelledby="business-value-title">
      <div className={styles.container}>
        <div className={styles.hero}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>ЧТО ПОЛУЧАЕТ БИЗНЕС</p>
            <h2 id="business-value-title">
              Digital-система,
              <br />а&nbsp;не набор услуг
            </h2>
            <p className={styles.description}>
              Объединяем сайт, рекламу, SEO, аналитику и&nbsp;CRM
              <br />
              в&nbsp;единую систему роста, которая приносит клиентов
              <br />
              и&nbsp;увеличивает прибыль.
            </p>
          </div>

          <BusinessSystemVisual />
        </div>

        <div className={styles.cards}>
          {benefits.map((benefit) => (
            <article
              className={`${styles.card} ${styles[benefit.tone]}`}
              key={benefit.title}
            >
              <div className={styles.iconBox} aria-hidden="true">
                <BenefitIcon name={benefit.icon} />
              </div>
              <div className={styles.cardCopy}>
                <h3>{benefit.title}</h3>
                <span className={styles.rule} aria-hidden="true" />
                <p>{benefit.text}</p>
              </div>
              <span className={styles.cardArrow} aria-hidden="true">
                ↗
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BusinessSystemVisual() {
  return (
    <div className={styles.visual} aria-label="Единая digital-система роста">
      <div className={styles.visualGlow} aria-hidden="true" />
      <div className={styles.board}>
        <svg className={styles.boardLines} viewBox="0 0 640 380" aria-hidden="true">
          <defs>
            <linearGradient id="systemLine" x1="106" y1="118" x2="542" y2="280">
              <stop stopColor="#4F73FF" stopOpacity="0.18" />
              <stop offset="0.5" stopColor="#6C7CFF" stopOpacity="0.92" />
              <stop offset="1" stopColor="#7C5CFF" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          <path className={styles.staticTrace} d="M320 190H204V182H84" />
          <path className={styles.staticTrace} d="M320 190V108H318V60" />
          <path className={styles.staticTrace} d="M320 190H452V84H528" />
          <path className={styles.staticTrace} d="M320 190H474V252H546" />
          <path className={styles.staticTrace} d="M320 190V322" />

          <path className={styles.flowLine} d="M320 190H204V182H84" />
          <path className={styles.flowLineDelayOne} d="M320 190V108H318V60" />
          <path className={styles.flowLineDelayTwo} d="M320 190H452V84H528" />
          <path className={styles.flowLineDelayThree} d="M320 190H474V252H546" />
          <path className={styles.flowLineDelayFour} d="M320 190V322" />
        </svg>

        <div className={`${styles.module} ${styles.moduleAnalytics}`}>
          <MiniIcon name="bars" />
        </div>
        <div className={`${styles.module} ${styles.moduleUsers}`}>
          <MiniIcon name="users" />
        </div>
        <div className={`${styles.module} ${styles.moduleTarget}`}>
          <MiniIcon name="target" />
        </div>
        <div className={`${styles.module} ${styles.moduleChart}`}>
          <MiniIcon name="pie" />
        </div>
        <div className={`${styles.module} ${styles.moduleGear}`}>
          <MiniIcon name="gear" />
        </div>

        <div className={styles.core}>
          <div className={styles.coreCube} />
        </div>
      </div>
    </div>
  );
}

function BenefitIcon({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none">
      {name === "analytics" && (
        <>
          <path d="M8 29H32" />
          <path d="M10 27L17 19L23 23L31 12" />
          <path d="M9 10H31V30H9V10Z" />
        </>
      )}
      {name === "ring" && (
        <>
          <circle cx="20" cy="20" r="12" />
          <circle cx="20" cy="20" r="5" />
        </>
      )}
      {name === "growth" && (
        <>
          <path d="M8 30L17 21L23 25L32 12" />
          <path d="M24 12H32V20" />
        </>
      )}
      {name === "automation" && (
        <>
          <circle cx="20" cy="20" r="6" />
          <path d="M20 6V10" />
          <path d="M20 30V34" />
          <path d="M6 20H10" />
          <path d="M30 20H34" />
          <path d="M10.1 10.1L12.9 12.9" />
          <path d="M27.1 27.1L29.9 29.9" />
          <path d="M29.9 10.1L27.1 12.9" />
          <path d="M12.9 27.1L10.1 29.9" />
        </>
      )}
      {name === "economy" && (
        <>
          <path d="M20 7V20H33" />
          <path d="M31.6 24.4A13 13 0 1 1 20 7" />
          <path d="M33 20A13 13 0 0 0 20 7" />
        </>
      )}
      {name === "star" && (
        <>
          <path d="M20 6L23.5 16.4L34 20L23.5 23.6L20 34L16.5 23.6L6 20L16.5 16.4L20 6Z" />
          <path d="M29.5 8.5L31 7" />
          <path d="M9 33L10.5 31.5" />
        </>
      )}
    </svg>
  );
}

function MiniIcon({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 34 34" fill="none" aria-hidden="true">
      {name === "bars" && (
        <>
          <path d="M8 24V16" />
          <path d="M16 24V10" />
          <path d="M24 24V14" />
        </>
      )}
      {name === "users" && (
        <>
          <circle cx="13" cy="14" r="4" />
          <circle cx="23" cy="13" r="3" />
          <path d="M6 26C7.7 21.8 11 20 15 20C19 20 22.3 21.8 24 26" />
          <path d="M21 20C24.2 20.3 26.7 22 28 25" />
        </>
      )}
      {name === "target" && (
        <>
          <circle cx="17" cy="17" r="10" />
          <circle cx="17" cy="17" r="5" />
          <path d="M17 17L27 7" />
          <path d="M24 7H27V10" />
        </>
      )}
      {name === "pie" && (
        <>
          <path d="M17 7A10 10 0 1 1 7 17H17V7Z" />
          <path d="M20 7.5A10 10 0 0 1 27 14H20V7.5Z" />
        </>
      )}
      {name === "gear" && (
        <>
          <circle cx="17" cy="17" r="4" />
          <path d="M17 6V10" />
          <path d="M17 24V28" />
          <path d="M6 17H10" />
          <path d="M24 17H28" />
          <path d="M9.2 9.2L12 12" />
          <path d="M22 22L24.8 24.8" />
          <path d="M24.8 9.2L22 12" />
          <path d="M12 22L9.2 24.8" />
        </>
      )}
    </svg>
  );
}

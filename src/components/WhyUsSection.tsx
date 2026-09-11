import type { CSSProperties } from "react";
import styles from "./WhyUsSection.module.css";

type Accent = "violet" | "blue" | "cyan";
type WhyIcon = "target" | "chart" | "users" | "shield" | "brain" | "orbit";

const reasons: Array<{
  title: string;
  text: string;
  icon: WhyIcon;
  accent: Accent;
}> = [
  {
    title: "Системный подход",
    text: "Строим единую систему маркетинга, где каждый инструмент усиливает общий результат.",
    icon: "target",
    accent: "violet"
  },
  {
    title: "Прозрачность\u00a0и\u00a0честность",
    text: "Доступ к\u00a0аналитике\u00a0и\u00a0отчётности — в\u00a0реальном времени. Без приукрашивания цифр.",
    icon: "chart",
    accent: "blue"
  },
  {
    title: "Команда экспертов",
    text: "Специалисты с\u00a0разным опытом\u00a0и\u00a0экспертизой работают над вашим проектом.",
    icon: "users",
    accent: "violet"
  },
  {
    title: "Ответственность за результат",
    text: "Фокус на\u00a0бизнес-целях\u00a0и\u00a0KPI. Работаем на\u00a0рост, а\u00a0не на\u00a0отчёты.",
    icon: "shield",
    accent: "cyan"
  },
  {
    title: "Аналитика\u00a0и\u00a0решения",
    text: "Принимаем решения на\u00a0основе данных, гипотез\u00a0и\u00a0постоянного тестирования.",
    icon: "brain",
    accent: "violet"
  },
  {
    title: "Долгосрочное партнёрство",
    text: "Строим отношения на\u00a0доверии\u00a0и\u00a0общем видении развития вашего бизнеса.",
    icon: "orbit",
    accent: "cyan"
  }
];

const metrics = [
  {
    value: "90+",
    label: "клиентов\u00a0с\u00a0нами более 1\u00a0года"
  },
  {
    value: "80%",
    label: "проектов приходят по рекомендациям"
  },
  {
    value: "100%",
    label: "вовлечённость в\u00a0ваш бизнес\u00a0и\u00a0результат"
  }
];

export function WhyUsSection() {
  return (
    <section className={styles.section} aria-labelledby="why-us-title">
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>ПОЧЕМУ С НАМИ РАБОТАЮТ</p>
            <h2 id="why-us-title">
              Мы строим системы,
              <br />а&nbsp;не просто запускаем рекламу
            </h2>
            <p className={styles.lead}>
              Берём на&nbsp;себя маркетинг целиком&nbsp;— от&nbsp;стратегии
              до&nbsp;аналитики. Погружаемся в&nbsp;бизнес, предлагаем решения
              и&nbsp;доводим их&nbsp;до&nbsp;роста.
            </p>
          </div>

          <div className={styles.visualWrap} aria-label="Системный digital-подход">
            <div className={styles.visualSystem} aria-hidden="true">
              <span className={styles.systemOrbit} />
              <span className={styles.systemOrbitSecond} />
              <span className={styles.systemOrbitThird} />
              <span className={styles.systemCore}>
                <span />
              </span>
              <span className={`${styles.systemNode} ${styles.nodeOne}`}>
                <WhyUsIcon name="target" />
              </span>
              <span className={`${styles.systemNode} ${styles.nodeTwo}`}>
                <WhyUsIcon name="chart" />
              </span>
              <span className={`${styles.systemNode} ${styles.nodeThree}`}>
                <WhyUsIcon name="shield" />
              </span>
              <span className={`${styles.systemNode} ${styles.nodeFour}`}>
                <WhyUsIcon name="orbit" />
              </span>
              <span className={`${styles.systemNode} ${styles.nodeFive}`}>
                <WhyUsIcon name="users" />
              </span>
              <span className={`${styles.systemNode} ${styles.nodeSix}`}>
                <WhyUsIcon name="brain" />
              </span>
              <span className={`${styles.systemNode} ${styles.nodeGhostOne}`}>
                <WhyUsIcon name="chart" />
              </span>
              <span className={`${styles.systemNode} ${styles.nodeGhostTwo}`}>
                <WhyUsIcon name="target" />
              </span>
              <span className={styles.systemLineOne} />
              <span className={styles.systemLineTwo} />
              <span className={styles.systemLineThree} />
            </div>
          </div>
        </div>

        <div className={styles.cards}>
          {reasons.map((reason, index) => (
            <article
              className={`${styles.card} ${styles[reason.accent]}`}
              key={reason.title}
              style={{ "--delay": `${index * 90}ms` } as CSSProperties}
            >
              <span className={styles.iconBox} aria-hidden="true">
                <WhyUsIcon name={reason.icon} />
              </span>
              <h3>{reason.title}</h3>
              <p>{reason.text}</p>
            </article>
          ))}
        </div>

        <div className={styles.banner}>
          <p className={styles.bannerText}>
            Мы не&nbsp;следуем шаблонам.
            <br />
            Мы создаём систему роста
            <br />
            под ваш бизнес.
          </p>
          <div className={styles.metrics}>
            {metrics.map((metric) => (
              <div className={styles.metric} key={metric.value}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyUsIcon({ name }: { name: WhyIcon }) {
  return (
    <svg viewBox="0 0 40 40" fill="none">
      {name === "target" && (
        <>
          <circle cx="20" cy="20" r="12" />
          <circle cx="20" cy="20" r="5" />
          <path d="M20 20L30 10" />
          <path d="M27 10H30V13" />
        </>
      )}
      {name === "chart" && (
        <>
          <path d="M8 31V22" />
          <path d="M16 31V15" />
          <path d="M24 31V19" />
          <path d="M7 15L15 10L22 14L32 7" />
          <path d="M27 7H32V12" />
        </>
      )}
      {name === "users" && (
        <>
          <circle cx="15" cy="16" r="5" />
          <circle cx="27" cy="15" r="4" />
          <path d="M7 32C9 26.8 13 24.5 18 24.5C23 24.5 27 26.8 29 32" />
          <path d="M25 24.5C28.8 25 31.8 27.2 33 31" />
        </>
      )}
      {name === "shield" && (
        <>
          <path d="M20 6L31 10V18C31 25 26.8 30.3 20 34C13.2 30.3 9 25 9 18V10L20 6Z" />
          <path d="M14 20L18 24L26 15" />
        </>
      )}
      {name === "brain" && (
        <>
          <path d="M16 9C11.8 9 9 12 9 16C6.8 17 6 19 6 21.5C6 25 8.7 28 12.5 28H16V9Z" />
          <path d="M24 9C28.2 9 31 12 31 16C33.2 17 34 19 34 21.5C34 25 31.3 28 27.5 28H24V9Z" />
          <path d="M16 14H12" />
          <path d="M16 21H11" />
          <path d="M24 14H28" />
          <path d="M24 21H29" />
          <path d="M20 9V31" />
        </>
      )}
      {name === "orbit" && (
        <>
          <circle cx="20" cy="20" r="5" />
          <path d="M8 22C10.5 13.5 18 8 27 9" />
          <path d="M32 18C29.8 27 21.8 32.5 13 31" />
          <circle cx="28" cy="9" r="2.5" />
          <circle cx="12" cy="31" r="2.5" />
        </>
      )}
    </svg>
  );
}

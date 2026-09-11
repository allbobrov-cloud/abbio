import type { CSSProperties } from "react";
import styles from "./TechnologiesSection.module.css";

type TechIcon = "monitor" | "target" | "chart" | "gear" | "users" | "search";

const metrics: Array<{
  value: string;
  label: string;
  icon: TechIcon;
}> = [
  {
    value: "50+",
    label: "инструментов в\u00a0работе",
    icon: "gear"
  },
  {
    value: "100+",
    label: "интеграций настроено",
    icon: "users"
  },
  {
    value: "99.9%",
    label: "стабильность системы",
    icon: "target"
  }
];

const modules: Array<{
  title: string;
  points: string[];
  icon: TechIcon;
  tone: "blue" | "violet" | "cyan";
  position: { x: string; y: string };
}> = [
  {
    title: "САЙТ",
    points: [
      "Разработка на\u00a0Next.js",
      "UX / UI дизайн",
      "SEO-оптимизация",
      "Высокая скорость"
    ],
    icon: "monitor",
    tone: "cyan",
    position: { x: "120px", y: "40px" }
  },
  {
    title: "ТРАФИК",
    points: [
      "Яндекс Директ",
      "Google Ads",
      "Таргетированная реклама",
      "Ретаргетинг"
    ],
    icon: "target",
    tone: "violet",
    position: { x: "calc(100% - 280px)", y: "40px" }
  },
  {
    title: "АНАЛИТИКА",
    points: [
      "Сквозная аналитика",
      "Дашборды",
      "ROI\u00a0и\u00a0метрики",
      "A/B тестирование"
    ],
    icon: "chart",
    tone: "cyan",
    position: { x: "calc(100% - 250px)", y: "300px" }
  },
  {
    title: "АВТОМАТИЗАЦИЯ",
    points: [
      "Автоматизация процессов",
      "Интеграции\u00a0и\u00a0API",
      "Telegram-уведомления",
      "AI-инструменты"
    ],
    icon: "gear",
    tone: "cyan",
    position: { x: "calc(100% - 300px)", y: "530px" }
  },
  {
    title: "CRM\u00a0И\u00a0ПРОДАЖИ",
    points: [
      "CRM-системы",
      "Воронки продаж",
      "Автоматизация заявок",
      "Контроль менеджеров"
    ],
    icon: "users",
    tone: "blue",
    position: { x: "74px", y: "530px" }
  },
  {
    title: "РАЗВИТИЕ",
    points: [
      "Стратегия роста",
      "Масштабирование",
      "Оптимизация затрат",
      "Постоянное улучшение"
    ],
    icon: "search",
    tone: "violet",
    position: { x: "34px", y: "300px" }
  }
];

const particles = Array.from({ length: 48 }, (_, index) => ({
  id: index,
  x: 4 + ((index * 31) % 92),
  y: 8 + ((index * 47) % 82),
  size: 1 + (index % 3),
  duration: 3.6 + (index % 8) * 0.62,
  delay: (index % 13) * -0.39
}));

export function TechnologiesSection() {
  return (
    <section
      className={styles.section}
      id="technologies"
      aria-labelledby="technologies-title"
    >
      <div className={styles.container}>
        <div className={styles.particles} aria-hidden="true">
          {particles.map((particle) => (
            <span
              key={particle.id}
              style={
                {
                  "--x": `${particle.x}%`,
                  "--y": `${particle.y}%`,
                  "--s": `${particle.size}px`,
                  "--d": `${particle.duration}s`,
                  "--delay": `${particle.delay}s`
                } as CSSProperties
              }
            />
          ))}
        </div>

        <div className={styles.layout}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>ТЕХНОЛОГИИ И ИНСТРУМЕНТЫ</p>
            <h2 id="technologies-title">
              Используем лучшие
              <br />
              технологии для
              <br />
              <span>роста вашего бизнеса</span>
            </h2>
            <p className={styles.description}>
              Собираем и&nbsp;соединяем инструменты
              <br />
              в&nbsp;единую digital-систему, где каждый
              <br />
              элемент работает на&nbsp;результат.
            </p>

            <div className={styles.metrics} aria-label="Показатели технологий">
              {metrics.map((metric, index) => (
                <TechMetricItem key={metric.value} metric={metric} index={index} />
              ))}
            </div>
          </div>

          <TechCoreDiagram />
        </div>
      </div>
    </section>
  );
}

function TechMetricItem({
  metric,
  index
}: {
  metric: (typeof metrics)[number];
  index: number;
}) {
  return (
    <div
      className={styles.metric}
      style={{ "--delay": `${index * 120}ms` } as CSSProperties}
    >
      <span className={styles.metricIcon} aria-hidden="true">
        <TechIconShape name={metric.icon} />
      </span>
      <span>
        <strong>{metric.value}</strong>
        {metric.label}
      </span>
    </div>
  );
}

function TechCoreDiagram() {
  return (
    <div className={styles.diagram} aria-label="Digital Core схема инструментов">
      <span className={styles.diagramGlow} aria-hidden="true" />
      <TechConnectionLines />
      <div className={styles.orbits} aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className={styles.core}>
        <span className={styles.coreRing} aria-hidden="true" />
        <strong>
          DIGITAL
          <br />
          CORE
        </strong>
        <small>
          ВАШ БИЗНЕС
          <br />
          КАК СИСТЕМА
        </small>
      </div>

      <div className={styles.modules}>
        {modules.map((module, index) => (
          <TechModuleCard key={module.title} index={index} module={module} />
        ))}
      </div>
    </div>
  );
}

function TechModuleCard({
  module,
  index
}: {
  module: (typeof modules)[number];
  index: number;
}) {
  return (
    <article
      className={`${styles.module} ${styles[module.tone]}`}
      style={
        {
          "--x": module.position.x,
          "--y": module.position.y,
          "--delay": `${index * 95}ms`
        } as CSSProperties
      }
    >
      <span className={styles.moduleIcon} aria-hidden="true">
        <TechIconShape name={module.icon} />
      </span>
      <h3>{module.title}</h3>
      <ul>
        {module.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </article>
  );
}

function TechConnectionLines() {
  return (
    <svg
      className={styles.lines}
      viewBox="0 0 820 720"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="techLine" x1="0" x2="1" y1="0" y2="0">
          <stop stopColor="#2fd8ff" stopOpacity="0.9" />
          <stop offset="0.52" stopColor="#6c7cff" stopOpacity="0.95" />
          <stop offset="1" stopColor="#a86cff" stopOpacity="0.9" />
        </linearGradient>
        <filter id="techGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g className={styles.lineGroup}>
        <path d="M122 74 C122 172 244 204 346 304" />
        <path d="M542 74 C542 178 518 226 474 304" />
        <path d="M572 334 C540 334 536 356 520 360" />
        <path d="M522 564 C522 496 500 452 476 418" />
        <path d="M76 564 C148 534 260 488 344 418" />
        <path d="M36 334 H300 C326 334 334 348 346 360" />
      </g>
      <g className={styles.lineDots}>
        <circle cx="122" cy="74" r="5" />
        <circle cx="542" cy="74" r="5" />
        <circle cx="572" cy="334" r="5" />
        <circle cx="522" cy="564" r="5" />
        <circle cx="76" cy="564" r="5" />
        <circle cx="36" cy="334" r="5" />
      </g>
    </svg>
  );
}

function TechIconShape({ name }: { name: TechIcon }) {
  return (
    <svg viewBox="0 0 40 40" fill="none">
      {name === "monitor" && (
        <>
          <rect x="9" y="10" width="22" height="16" rx="2" />
          <path d="M20 26V31" />
          <path d="M14 31H26" />
        </>
      )}
      {name === "target" && (
        <>
          <circle cx="20" cy="20" r="12" />
          <circle cx="20" cy="20" r="5" />
          <path d="M28 12L33 7" />
          <path d="M29 7H33V11" />
        </>
      )}
      {name === "chart" && (
        <>
          <path d="M9 30H32" />
          <path d="M12 27V19" />
          <path d="M20 27V13" />
          <path d="M28 27V9" />
          <path d="M10 14L17 20L24 13L31 17" />
        </>
      )}
      {name === "gear" && (
        <>
          <circle cx="20" cy="20" r="5" />
          <path d="M20 7V11" />
          <path d="M20 29V33" />
          <path d="M7 20H11" />
          <path d="M29 20H33" />
          <path d="M10.8 10.8L13.6 13.6" />
          <path d="M26.4 26.4L29.2 29.2" />
          <path d="M29.2 10.8L26.4 13.6" />
          <path d="M13.6 26.4L10.8 29.2" />
        </>
      )}
      {name === "users" && (
        <>
          <circle cx="15" cy="15" r="4" />
          <circle cx="25" cy="15" r="4" />
          <path d="M8 30C8 24 12 21 17 21" />
          <path d="M32 30C32 24 28 21 23 21" />
          <path d="M14 30H26" />
        </>
      )}
      {name === "search" && (
        <>
          <circle cx="18" cy="18" r="9" />
          <path d="M25 25L32 32" />
        </>
      )}
    </svg>
  );
}

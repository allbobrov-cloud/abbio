import styles from "./ProcessSection.module.css";

type ProcessColor = "blue" | "violet" | "indigo" | "cyan" | "teal";

const steps: Array<{
  number: string;
  title: string;
  color: ProcessColor;
  icon: "search" | "target" | "code" | "ring" | "chart";
  points: string[];
  result: string;
}> = [
  {
    number: "01",
    title: "Аналитика бизнеса",
    color: "blue",
    icon: "search",
    points: [
      "Исследуем рынок",
      "Анализируем воронку",
      "Проводим аудит каналов",
      "Находим точки роста"
    ],
    result: "Ситуация\u00a0и\u00a0потенциал"
  },
  {
    number: "02",
    title: "Стратегия\u00a0и\u00a0структура",
    color: "violet",
    icon: "target",
    points: [
      "Определяем цели\u00a0и\u00a0KPI",
      "Формируем стратегию",
      "Проектируем систему",
      "Продумываем путь клиента"
    ],
    result: "Стратегия\u00a0и\u00a0\nплан"
  },
  {
    number: "03",
    title: "Разработка digital-системы",
    color: "indigo",
    icon: "code",
    points: [
      "Проектируем UX",
      "Разрабатываем сайт",
      "Настраиваем аналитику\u00a0и\u00a0CRM",
      "Тестируем систему"
    ],
    result: "Система готова к\u00a0работе"
  },
  {
    number: "04",
    title: "Запуск\u00a0и\u00a0интеграции",
    color: "cyan",
    icon: "ring",
    points: [
      "Подключаем сервисы",
      "Настраиваем аналитику",
      "Интегрируем CRM",
      "Проводим запуск"
    ],
    result: "Запуск\u00a0и\u00a0интеграции"
  },
  {
    number: "05",
    title: "Аналитика\u00a0и\u00a0рост",
    color: "teal",
    icon: "chart",
    points: [
      "Анализируем показатели",
      "Оптимизируем каналы",
      "Масштабируем связки",
      "Улучшаем результаты"
    ],
    result: "Рост под контролем"
  }
];

const benefits: Array<{
  title: string;
  text: string;
  icon: "eye" | "shield" | "bars" | "star";
}> = [
  {
    title: "Прозрачность",
    text: "Видите процесс\u00a0и\u00a0понимаете, за\u00a0что платите",
    icon: "eye"
  },
  {
    title: "Контроль",
    text: "Вы на\u00a0каждом этапе знаете, что происходит\u00a0и\u00a0зачем",
    icon: "shield"
  },
  {
    title: "Измеримость",
    text: "Каждый шаг имеет метрики\u00a0и\u00a0влияет на\u00a0результат",
    icon: "bars"
  },
  {
    title: "Результат",
    text: "Мы отвечаем за\u00a0показатели\u00a0и\u00a0рост вашего бизнеса",
    icon: "star"
  }
];

const particles = Array.from({ length: 128 }, (_, index) => {
  const xSeed = Math.sin(index * 12.9898) * 43758.5453;
  const ySeed = Math.sin((index + 17) * 78.233) * 24634.6345;
  const sizeSeed = Math.sin((index + 31) * 19.19) * 9842.219;

  return {
    id: index,
    x: -10 + (Math.abs(xSeed) % 120),
    y: 0 + (Math.abs(ySeed) % 90),
    size: 1 + (Math.abs(sizeSeed) % 2.4),
    opacity: 0.14 + (Math.abs(xSeed + ySeed) % 0.46),
    duration: 3.8 + (index % 11) * 0.57,
    delay: (index % 23) * -0.31
  };
});

export function ProcessSection() {
  return (
    <section
      className={styles.section}
      id="process"
      aria-labelledby="process-title"
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <p className={styles.eyebrow}>ПРОЦЕСС РАБОТЫ</p>
            <h2 id="process-title">
              Как строится
              <br />
              digital-система
            </h2>
            <p className={styles.lead}>
              Мы выстраиваем не&nbsp;просто сайты и&nbsp;рекламу.
              <br />
              Мы создаём digital-инфраструктуру для роста вашего бизнеса.
            </p>
          </div>
          <p className={styles.headerNote}>
            Системный подход, аналитика
            <br />
            и&nbsp;технологии — основа нашего
            <br />
            процесса и&nbsp;вашего результата.
          </p>
        </div>

        <div className={styles.flow} aria-label="Этапы процесса">
          <ProcessWave />
          <div className={styles.mobileLine} aria-hidden="true" />
          <div className={styles.steps}>
            {steps.map((step, index) => (
              <ProcessStep key={step.number} index={index} step={step} />
            ))}
          </div>
        </div>

        <ProcessBenefits />
      </div>
    </section>
  );
}

function ProcessWave() {
  const wavePath =
    "M-80 110 C-30 92 50 128 100 110 C150 92 250 92 300 110 C350 128 450 128 500 110 C550 92 650 92 700 110 C750 128 850 128 900 110 C950 92 1030 128 1080 110";

  return (
    <div className={styles.wave} aria-hidden="true">
      <svg
        className={styles.waveSvg}
        viewBox="0 0 1000 180"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="processLine" x1="0" x2="1" y1="0" y2="0">
            <animateTransform
              attributeName="gradientTransform"
              dur="18s"
              from="-0.18 0"
              repeatCount="indefinite"
              to="0.18 0"
              type="translate"
            />
            <stop offset="0%" stopColor="#3f6cff" />
            <stop offset="18%" stopColor="#597cff" />
            <stop offset="34%" stopColor="#a95cff" />
            <stop offset="54%" stopColor="#6684ff" />
            <stop offset="72%" stopColor="#16cdf4" />
            <stop offset="100%" stopColor="#21e1d2" />
          </linearGradient>
          <filter id="processGlow" x="-20%" y="-100%" width="140%" height="300%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          className={styles.waveBase}
          d={wavePath}
        />
        <path
          className={styles.waveGlow}
          d={wavePath}
        />
      </svg>
      <div className={styles.particles}>
        {particles.map((particle) => (
          <span
            key={particle.id}
            style={
              {
                "--x": `${particle.x}%`,
                "--y": `${particle.y}%`,
                "--s": `${particle.size}px`,
                "--o": particle.opacity,
                "--d": `${particle.duration}s`,
                "--delay": `${particle.delay}s`
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}

function ProcessStep({
  step,
  index
}: {
  step: (typeof steps)[number];
  index: number;
}) {
  return (
    <article
      className={`${styles.step} ${styles[step.color]}`}
      style={{ "--i": index } as React.CSSProperties}
    >
      <div className={styles.nodeArea}>
        <span className={styles.stepNumber}>{step.number}</span>
        <span className={styles.node}>
          <span />
        </span>
        <span className={styles.connector} />
      </div>

      <div className={styles.card}>
        <span className={styles.iconBox} aria-hidden="true">
          <StepIcon name={step.icon} />
        </span>
        <h3>{step.title}</h3>
        <ul>
          {step.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <p className={styles.result}>
          <StepIcon name={step.icon === "target" ? "flag" : step.icon} />
          <span>{step.result}</span>
        </p>
      </div>
    </article>
  );
}

function ProcessBenefits() {
  return (
    <div className={styles.benefits}>
      <div className={styles.benefitsIntro}>
        <h3>
          Что вы получаете
          <br />
          на&nbsp;каждом этапе
        </h3>
        <p>
          Прозрачный процесс, измеримые
          <br />
          результаты и&nbsp;полный контроль.
        </p>
      </div>
      <div className={styles.benefitList}>
        {benefits.map((benefit) => (
          <article key={benefit.title} className={styles.benefit}>
            <span className={styles.benefitIcon} aria-hidden="true">
              <BenefitIcon name={benefit.icon} />
            </span>
            <div>
              <h4>{benefit.title}</h4>
              <p>{benefit.text}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function StepIcon({
  name
}: {
  name: "search" | "target" | "code" | "ring" | "chart" | "flag";
}) {
  return (
    <svg viewBox="0 0 32 32" fill="none">
      {name === "search" && (
        <>
          <circle cx="14" cy="14" r="7" />
          <path d="M19.5 19.5L26 26" />
          <path d="M14 10V14L17 16" />
        </>
      )}
      {name === "target" && (
        <>
          <circle cx="16" cy="16" r="10" />
          <circle cx="16" cy="16" r="5" />
          <path d="M21 11L27 5" />
          <path d="M23 5H27V9" />
        </>
      )}
      {name === "code" && (
        <>
          <path d="M12 10L6 16L12 22" />
          <path d="M20 10L26 16L20 22" />
          <path d="M18 7L14 25" />
        </>
      )}
      {name === "ring" && (
        <>
          <circle cx="16" cy="16" r="10" />
          <circle cx="16" cy="16" r="5" />
        </>
      )}
      {name === "chart" && (
        <>
          <path d="M6 25V18" />
          <path d="M13 25V14" />
          <path d="M20 25V10" />
          <path d="M5 13L12 8L18 11L26 4" />
          <path d="M21 4H26V9" />
        </>
      )}
      {name === "flag" && (
        <>
          <path d="M8 27V7" />
          <path d="M9 8C13 5 17 11 22 8V19C17 22 13 16 9 19" />
        </>
      )}
    </svg>
  );
}

function BenefitIcon({ name }: { name: "eye" | "shield" | "bars" | "star" }) {
  return (
    <svg viewBox="0 0 32 32" fill="none">
      {name === "eye" && (
        <>
          <path d="M4 16C7.2 10.8 11.1 8.5 16 8.5C20.9 8.5 24.8 10.8 28 16C24.8 21.2 20.9 23.5 16 23.5C11.1 23.5 7.2 21.2 4 16Z" />
          <circle cx="16" cy="16" r="4" />
        </>
      )}
      {name === "shield" && (
        <>
          <path d="M16 4L26 8V15C26 21 22.2 25.4 16 28C9.8 25.4 6 21 6 15V8L16 4Z" />
          <path d="M11 16L15 20L22 12" />
        </>
      )}
      {name === "bars" && (
        <>
          <path d="M7 25V17" />
          <path d="M15 25V10" />
          <path d="M23 25V14" />
          <path d="M6 12L13 8L18 11L26 5" />
        </>
      )}
      {name === "star" && (
        <path d="M16 4L19.7 11.7L28 12.9L22 18.8L23.4 27L16 23L8.6 27L10 18.8L4 12.9L12.3 11.7L16 4Z" />
      )}
    </svg>
  );
}

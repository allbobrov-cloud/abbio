import type { CSSProperties, ReactNode } from "react";
import { CountUp } from "./CountUp";
import styles from "./ResultsSection.module.css";

type InsightIcon = "target" | "chart" | "growth";

const metrics = [
  {
    value: 50,
    suffix: "+",
    label: (
      <>
        реализованных
        <br />
        digital-проектов
      </>
    )
  },
  {
    value: 68,
    suffix: "+",
    label: (
      <>
        компаний,
        <br />
        с&nbsp;которыми
        <br />
        мы&nbsp;работаем системно
      </>
    )
  }
];

const insights: Array<{
  title: string;
  text: ReactNode;
  icon: InsightIcon;
}> = [
  {
    title: "Системный подход",
    text: (
      <>
        вместо хаотичного
        <br />
        маркетинга
      </>
    ),
    icon: "target"
  },
  {
    title: "Прозрачная аналитика",
    text: (
      <>
        и&nbsp;контроль каждого
        <br />
        этапа
      </>
    ),
    icon: "chart"
  },
  {
    title: "Рост через данные",
    text: (
      <>
        а&nbsp;не через догадки
      </>
    ),
    icon: "growth"
  }
];

const flowGeometry = {
  start: { x: 25.8, y: 50 },
  iconCenters: [
    { x: 56, y: 16 },
    { x: 56, y: 50 },
    { x: 56, y: 84 }
  ]
};

const particles = Array.from({ length: 54 }, (_, index) => ({
  id: index,
  x: 3 + ((index * 37) % 94),
  y: 6 + ((index * 29) % 84),
  size: 1 + (index % 3),
  duration: 3.6 + (index % 9) * 0.58,
  delay: (index % 17) * -0.34
}));

export function ResultsSection() {
  return (
    <section className={styles.section} aria-labelledby="results-title">
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
          <div className={styles.left}>
            <p className={styles.eyebrow}>РЕЗУЛЬТАТЫ В ЦИФРАХ</p>
            <h2 id="results-title">
              Системный подход
              <br />
              <span>Измеримый результат</span>
            </h2>

            <div className={styles.metrics}>
              {metrics.map((metric, index) => (
        <ResultMetric key={`${metric.value}${metric.suffix}`} metric={metric} index={index} />
              ))}
            </div>
          </div>

          <div className={styles.flow}>
            <DataFlowLines />
            <div className={styles.core} aria-hidden="true">
              <span />
            </div>
            <div className={styles.insights}>
              {insights.map((insight, index) => (
                <ResultInsight
                  key={insight.title}
                  center={flowGeometry.iconCenters[index]}
                  insight={insight}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResultMetric({
  metric,
  index
}: {
  metric: (typeof metrics)[number];
  index: number;
}) {
  return (
    <div
      className={styles.metric}
      style={{ "--delay": `${index * 140}ms` } as CSSProperties}
    >
      <strong>
        <CountUp end={metric.value} suffix={metric.suffix} />
      </strong>
      <span>{metric.label}</span>
    </div>
  );
}

function ResultInsight({
  center,
  insight,
  index
}: {
  center: (typeof flowGeometry.iconCenters)[number];
  insight: (typeof insights)[number];
  index: number;
}) {
  return (
    <article
      className={styles.insight}
      style={
        {
          "--delay": `${index * 130}ms`,
          "--icon-x": center.x,
          "--icon-y": center.y
        } as CSSProperties
      }
    >
      <span className={styles.iconBox} aria-hidden="true">
        <InsightIcon name={insight.icon} />
      </span>
      <div>
        <h3>{insight.title}</h3>
        <p>{insight.text}</p>
      </div>
    </article>
  );
}

function DataFlowLines() {
  const { start, iconCenters } = flowGeometry;
  const paths = iconCenters.map((center) => {
    const curveLift = (center.y - start.y) * 0.34;
    return [
      `M ${start.x} ${start.y}`,
      `C ${start.x + 9} ${start.y + curveLift}`,
      `${center.x - 16} ${center.y}`,
      `${center.x} ${center.y}`
    ].join(" ");
  });

  return (
    <svg
      className={styles.lines}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="resultsLine" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#6C7CFF" stopOpacity="0.16" />
          <stop offset="52%" stopColor="#806CFF" stopOpacity="0.74" />
          <stop offset="100%" stopColor="#8F72FF" stopOpacity="0.52" />
        </linearGradient>
        <filter id="resultsGlow" x="-20%" y="-80%" width="140%" height="260%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g className={styles.orbits}>
        <ellipse cx={start.x} cy={start.y} rx="18" ry="22" />
        <ellipse cx={start.x} cy={start.y} rx="27" ry="32" />
        <ellipse cx={start.x} cy={start.y} rx="35" ry="42" />
      </g>
      <g className={styles.paths}>
        {paths.map((path) => (
          <path d={path} key={path} />
        ))}
        <path
          className={styles.middlePath}
          d={`M ${iconCenters[1].x} ${iconCenters[1].y} C ${iconCenters[1].x - 9} ${iconCenters[1].y}, ${start.x + 10} ${start.y}, ${start.x} ${start.y}`}
        />
      </g>
    </svg>
  );
}

function InsightIcon({ name }: { name: InsightIcon }) {
  return (
    <svg viewBox="0 0 36 36" fill="none">
      {name === "target" && (
        <>
          <circle cx="18" cy="18" r="10" />
          <circle cx="18" cy="18" r="4.5" />
          <path d="M18 18L28 8" />
          <path d="M25 8H28V11" />
        </>
      )}
      {name === "chart" && (
        <>
          <path d="M8 28V20" />
          <path d="M16 28V13" />
          <path d="M24 28V17" />
          <path d="M7 14L15 9L21 13L29 7" />
          <path d="M24 7H29V12" />
        </>
      )}
      {name === "growth" && (
        <>
          <path d="M7 28H29" />
          <path d="M9 25L16 18L21 21L29 10" />
          <path d="M24 10H29V15" />
          <circle cx="16" cy="18" r="2" />
          <circle cx="21" cy="21" r="2" />
        </>
      )}
    </svg>
  );
}

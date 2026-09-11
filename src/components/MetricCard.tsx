import { AnimatedChart } from "./AnimatedChart";
import styles from "./HeroDashboard.module.css";

type MetricCardProps = {
  title: string;
  value: string;
  delta: string;
  tone: "blue" | "green";
};

export function MetricCard({ title, value, delta, tone }: MetricCardProps) {
  return (
    <article className={`${styles.metricCard} ${styles[tone]}`}>
      <p>{title}</p>
      <div>
        <strong>{value}</strong>
        <span>{delta}</span>
      </div>
      <AnimatedChart variant="sparkline" tone={tone} />
    </article>
  );
}

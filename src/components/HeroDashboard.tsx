import { AnimatedChart } from "./AnimatedChart";
import { MetricCard } from "./MetricCard";
import { ProcessFlow } from "./ProcessFlow";
import styles from "./HeroDashboard.module.css";

export function HeroDashboard() {
  return (
    <div className={styles.visual} aria-label="Digital-система роста бизнеса">
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.dashboard}>
        <div className={styles.sideCards}>
          <MetricCard
            title="Новые заявки"
            value="1 250"
            delta="+32%"
            tone="blue"
          />
          <MetricCard
            title="Стоимость лида"
            value="780 ₽"
            delta="−18%"
            tone="green"
          />
        </div>

        <div className={styles.mainCard}>
          <div className={styles.cardHeader}>
            <div>
              <p>Рост выручки</p>
              <div className={styles.revenue}>
                <strong>12,4 млн ₽</strong>
                <span>+46%</span>
              </div>
            </div>
            <button className={styles.period} type="button">
              За 6 месяцев
              <span aria-hidden="true">⌄</span>
            </button>
          </div>
          <AnimatedChart variant="large" />
        </div>
      </div>
      <ProcessFlow />
    </div>
  );
}

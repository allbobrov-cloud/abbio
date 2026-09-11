import { HeroDashboard } from "./HeroDashboard";
import styles from "./HeroSection.module.css";

const metrics = [
  {
    value: "10+ лет",
    label: "опыта\u00a0в digital-маркетинге"
  },
  {
    value: "125+",
    label: "реализованных проектов"
  },
  {
    value: "ROMI",
    label: "под контролем"
  },
  {
    value: "Прозрачность",
    label: "и честная аналитика"
  }
];

export function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.noise} aria-hidden="true" />
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>СИСТЕМНЫЙ МАРКЕТИНГ</p>
          <h1>Строим систему роста для бизнеса</h1>
          <p className={styles.subtitle}>
            Комплексный digital-подход, который помогает привлекать клиентов,
            видеть экономику маркетинга&nbsp;и&nbsp;масштабировать продажи.
          </p>

          <div className={styles.buttons} aria-label="Основные действия">
            <a className={styles.primaryButton} href="#contacts" data-contact-dialog>
              <span>Обсудить проект</span>
              <span aria-hidden="true">↗</span>
            </a>
            <a className={styles.secondaryButton} href="#cases">
              <span>Смотреть кейсы</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <HeroDashboard />

        <dl className={styles.metrics}>
          {metrics.map((metric) => (
            <div className={styles.metric} key={metric.value}>
              <dt>{metric.value}</dt>
              <dd>{metric.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

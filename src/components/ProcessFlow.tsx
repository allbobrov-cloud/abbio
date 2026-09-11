import styles from "./HeroDashboard.module.css";

const steps = [
  "Аналитика\u00a0и\u00a0стратегия",
  "Привлечение клиентов",
  "Конверсия\u00a0и\u00a0продажи",
  "Масштабирование"
];

export function ProcessFlow() {
  return (
    <div className={styles.processFlow} aria-label="Процесс роста">
      {steps.map((step, index) => (
        <div
          className={`${styles.processStep} ${index === 0 ? styles.activeStep : ""}`}
          key={step}
        >
          <span className={styles.stepIcon} aria-hidden="true">
            {index + 1}
          </span>
          <span>{step}</span>
        </div>
      ))}
    </div>
  );
}

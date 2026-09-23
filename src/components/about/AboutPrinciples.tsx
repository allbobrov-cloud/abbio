import Link from "next/link";
import styles from "./AboutPrinciples.module.css";

const principles = [
  "Сначала понять",
  "Показать до финала",
  "Объяснить решение",
  "Проверить результат",
];

export function AboutPrinciples() {
  return (
    <section
      id="principles"
      className={styles.section}
      aria-labelledby="principles-title"
    >
      <div className={styles.container}>
        <p className={styles.eyebrow}>Принципы</p>
        <h2 id="principles-title">Не магия. Нормальная работа.</h2>
        <ul className={styles.list}>
          {principles.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <Link href="/process" className={styles.link}>
          Как устроена работа
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}

import { partnerSplit } from "@/lib/np/content";
import { NpIcon } from "./NpIcon";
import styles from "./NpRoles.module.css";

/* Кто что делает: наша часть приводит заявку, партнёр превращает её в договор. */
export function NpRoles() {
  return (
    <div className={styles.flow}>
      <div className={styles.side}>
        <p className={styles.who}>Мы</p>
        <p className={styles.role}>Сайт, продвижение и развитие</p>
        <ul>{partnerSplit.ours.map((item) => <li key={item}><NpIcon name="check" />{item}</li>)}</ul>
      </div>

      <div className={styles.hub} aria-hidden="true">
        <span className={styles.line} />
        <span className={styles.lead}><NpIcon name="phone" /><strong>Заявка</strong><small>напрямую вам</small></span>
        <span className={styles.line} />
      </div>

      <div className={`${styles.side} ${styles.sideYou}`}>
        <p className={styles.who}>Вы</p>
        <p className={styles.role}>Клиент, замер, договор и монтаж</p>
        <ul>{partnerSplit.yours.map((item) => <li key={item}><NpIcon name="check" />{item}</li>)}</ul>
      </div>
    </div>
  );
}

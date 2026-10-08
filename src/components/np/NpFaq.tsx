import { NpIcon } from "./NpIcon";
import styles from "./NpFaq.module.css";

export function NpFaq({ items, columns = false }: { items: readonly { q: string; a: string }[]; columns?: boolean }) {
  return (
    <div className={`${styles.list} ${columns ? styles.columns : ""}`}>
      {items.map((item) => (
        <details key={item.q} className={styles.item}>
          <summary>
            <span>{item.q}</span>
            <NpIcon name="plus" className={styles.icon} />
          </summary>
          <p>{item.a}</p>
        </details>
      ))}
    </div>
  );
}

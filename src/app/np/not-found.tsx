import Link from "next/link";
import styles from "@/components/np/np.module.css";

export default function NotFound() {
  return (
    <main id="main">
      <section className={styles.section} style={{ paddingTop: 200, minHeight: "70vh" }}>
        <div className={styles.container} style={{ display: "grid", gap: 22, justifyItems: "start" }}>
          <h1 className={styles.h1}>Страница не найдена</h1>
          <p className={styles.lead}>Возможно, ссылка устарела. Начните с обзора форматов сотрудничества.</p>
          <Link href="/" className={styles.button}>К обзору</Link>
        </div>
      </section>
    </main>
  );
}

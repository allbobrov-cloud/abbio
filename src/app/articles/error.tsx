"use client";
import styles from "@/components/articles/Articles.module.css";
export default function ArticlesError({ reset }: { reset: () => void }) {
  return <main id="main" className={styles.page}><div className={styles.container}><section className={styles.empty}><p className={styles.category}>Статьи / ABBiO</p><h1>Не удалось загрузить материалы.</h1><p>Попробуйте открыть раздел ещё раз.</p><button type="button" onClick={reset}>Повторить</button></section></div></main>;
}

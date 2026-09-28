import styles from "./ServicesFinalCta.module.css";

/* Финальный призыв страницы «Услуги»: спокойная тёмная панель без фото — свечение из угла,
   тонкие кольца и градиентная рамка; внимание на заголовке и кнопке. */
export function ServicesFinalCta() {
  return (
    <section className={styles.section} aria-labelledby="start-title">
      <div className={styles.container}>
        <div className={styles.panel}>
          <span className={styles.rings} aria-hidden="true"><i /><i /><i /></span>

          <div className={styles.copy}>
            <p className={styles.eyebrow}>Обсудить задачу</p>
            <h2 id="start-title">
              Расскажите,{" "}
              <em>что хотите сделать.</em>
            </h2>
          </div>

          <div className={styles.side}>
            <p>Необязательно выбирать услугу заранее. Начнём с вашей задачи и определим подходящий объём работ.</p>
            <a href="#contact-dialog" data-contact-dialog className={styles.cta}>
              Обсудить задачу
              <span className={styles.bubble} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M8 7h9v9" /></svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

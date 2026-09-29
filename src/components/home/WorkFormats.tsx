import type { CSSProperties } from "react";
import styles from "./WorkFormats.module.css";

/*
 * «Одна задача. Или работа вдолгую.»: два формата с разной схемой.
 * Проект — путь с финишем, развитие — повторяющийся цикл. Кнопки открывают общий диалог обращения.
 */
export function WorkFormats() {
  return (
    <section className={styles.section} aria-labelledby="formats-title">
      <div className={styles.container}>
        <header className={styles.head}>
          <div>
            <p className={styles.eyebrow}>Масштаб выбираем вместе</p>
            <h2 id="formats-title">
              Одна задача.{" "}
              <br />
              <em>Или работа вдолгую.</em>
            </h2>
          </div>
          <p className={styles.lead}>Не обязательно заказывать всё сразу. Отталкиваемся от приоритетов и ресурсов.</p>
        </header>

        <div className={styles.grid}>
          <article className={styles.card} style={{ "--c": "#b7a0ef", "--c-soft": "#d6c3ff" } as CSSProperties}>
            <div className={styles.cardHead}>
              <span className={styles.chip}>Проект</span>
              <span className={styles.kind}>Разовая задача</span>
            </div>

            <div className={styles.path} aria-hidden="true">
              <span className={styles.pathLine} />
              <span className={styles.node}><i />Старт</span>
              <span className={styles.node}><i />Этапы</span>
              <span className={`${styles.node} ${styles.finish}`}>
                <i>
                  <svg viewBox="0 0 24 24"><path d="m6 12.5 4 4 8-9" /></svg>
                </i>
                Запуск
              </span>
            </div>

            <h3>Сделать и запустить</h3>
            <p>Когда есть конкретная задача: разработать сайт, обновить дизайн, подключить CRM или автоматизировать процесс.</p>
            <ul>
              <li>Понятный состав работ</li>
              <li>Согласованные этапы</li>
              <li>Передача результата</li>
            </ul>
            <a href="#contact-dialog" data-contact-dialog className={styles.cta}>
              Обсудить проект
              <span aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d="M7 17 17 7M8 7h9v9" /></svg>
              </span>
            </a>
          </article>

          <article className={styles.card} style={{ "--c": "#7c9bff", "--c-soft": "#bccbff" } as CSSProperties}>
            <div className={styles.cardHead}>
              <span className={styles.chip}>Развитие</span>
              <span className={styles.kind}>Постоянная работа</span>
            </div>

            <div className={`${styles.path} ${styles.loopPath}`} aria-hidden="true">
              <svg className={styles.back} viewBox="0 0 100 30" preserveAspectRatio="none">
                <path d="M100 30C100 4 0 4 0 30" />
              </svg>
              <span className={styles.pathLine} />
              <span className={styles.node}><i />Приоритеты</span>
              <span className={styles.node}><i />Изменения</span>
              <span className={styles.node}><i />Проверка</span>
              <span className={styles.node}><i />Данные</span>
            </div>

            <h3>Улучшать и развивать</h3>
            <p>Когда нужно регулярно работать над сайтом, поисковым продвижением, контентом и качеством обращений.</p>
            <ul>
              <li>Приоритеты на следующий этап</li>
              <li>Проверка изменений</li>
              <li>Обсуждение данных и результатов</li>
            </ul>
            <a href="#contact-dialog" data-contact-dialog className={styles.cta}>
              Обсудить развитие
              <span aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d="M7 17 17 7M8 7h9v9" /></svg>
              </span>
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}

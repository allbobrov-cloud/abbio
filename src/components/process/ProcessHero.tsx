import Link from "next/link";
import { ActionArrow } from "@/components/ActionArrow";
import { ProcessProjectState } from "./ProcessProjectState";
import styles from "./ProcessHero.module.css";

export function ProcessHero() {
  return (
    <section className={styles.hero} aria-labelledby="process-title">
      <div className={styles.container}>
        <nav className={styles.breadcrumb} aria-label="Хлебные крошки">
          <Link href="/">Главная</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Как работаем</span>
        </nav>

        <div className={styles.stage}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>Как мы работаем</p>
            <h1 id="process-title">Понятно, что делаем и что дальше.</h1>
            <p className={styles.description}>
              От первой встречи до запуска проект разбит на понятные этапы. На
              каждом видно, что делаем сейчас, что нужно согласовать и что будет
              дальше.
            </p>
            <a
              href="#contact-dialog"
              data-contact-dialog
              className={styles.action}
            >
              Обсудить задачу <ActionArrow />
            </a>
          </div>

          <div className={styles.visual}>
            <ProcessProjectState />
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import type { CSSProperties } from "react";
import styles from "./HomeReports.module.css";

const reportDemoUrl = "https://docs.google.com/spreadsheets/d/1_t_nzlVjj-NE8Lvdqqsz3XC_L0DNfjz0K1nLGFqu1Tk/edit?gid=185043878#gid=185043878";

// Разделы отчёта — те же, что названы в тексте блока.
const sections = [
  { label: "Лиды и обращения", icon: "M4 19V9m6 10V5m6 14v-7m4 7H2" },
  { label: "Расходы по каналам", icon: "M12 3v18M17 7H9.5a3 3 0 0 0 0 6h5a3 3 0 0 1 0 6H6" },
  { label: "Источники", icon: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 3v9l7 4" },
  { label: "Статус работ", icon: "M9 11l3 3 8-8M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9" },
];

function Icon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

/*
 * «Вся картина проекта — в одном отчёте»: тёмная сцена ABBiO, демо-отчёт в наклонённом окне
 * со свечением и плавающими метками разделов. Данные в отчёте условные — подпись это говорит.
 */
export function HomeReports() {
  return (
    <section className={styles.section} aria-labelledby="reports-title">
      <div className={styles.container}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Отчётность для руководителя</p>
          <h2 id="reports-title">
            Вся картина проекта&nbsp;—{" "}
            <em>в одном отчёте для руководителя.</em>
          </h2>
          <p className={styles.lead}>
            Показываем не только итоги: в отчёте можно посмотреть количество лидов и обращений, расходы по каналам,
            источники и статус работ.
          </p>

          <a className={styles.cta} href={reportDemoUrl} target="_blank" rel="noopener noreferrer">
            Открыть демо-отчёт
            <span className={styles.bubble} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M8 7h9v9" /></svg>
            </span>
            <span className="sr-only"> (Google Sheets, откроется в новой вкладке)</span>
          </a>
          <p className={styles.note}>Демо в Google Sheets · условные данные</p>
        </div>

        <a className={styles.stage} href={reportDemoUrl} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true">
          <span className={styles.glow} />
          <span className={styles.window}>
            <span className={styles.bar}><i /><i /><i /><b>Демо — отчёт маркетинга</b></span>
            <span className={styles.shot}>
              <Image src="/home/report-demo-preview.avif" alt="" width={1440} height={1000} sizes="(max-width: 900px) 90vw, 50vw" />
            </span>
          </span>
          {sections.map((section, index) => (
            <span key={section.label} className={styles.tag} style={{ "--n": index } as CSSProperties}>
              <span className={styles.sectionIcon}><Icon d={section.icon} /></span>
              {section.label}
            </span>
          ))}
        </a>
      </div>
    </section>
  );
}

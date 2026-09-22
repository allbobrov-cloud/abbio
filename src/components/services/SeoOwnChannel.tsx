"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./SeoOwnChannel.module.css";

const pages = [
  { id: "catalog", title: "Каталог: профильная труба", queries: ["профильная труба купить", "профильная труба 09г2с"], lead: true },
  { id: "guide", title: "Материалы: как выбрать трубу", queries: ["как выбрать профильную трубу"], lead: false },
  { id: "service", title: "Услуги: расчёт и доставка", queries: ["расчёт металлопроката", "доставка металлопроката"], lead: false },
];

export function SeoOwnChannel() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className={[styles.contrast, revealed ? styles.revealed : ""].join(" ")}
      role="img"
      aria-label="Платное привлечение — короткая цепочка реклама-клик-заявка, работающая пока идёт оплата. Собственный поисковый канал — растущая структура страниц и запросов, которая продолжает приводить обращения из поиска наравне с рекламой"
    >
      <div className={styles.paidFlow} aria-hidden="true">
        <span className={styles.label}>Платное привлечение</span>
        <div className={styles.flowRow}>
          <span>Реклама</span><i /><span>Клик</span><i /><span>Заявка</span>
        </div>
        <p className={styles.note}>Работает, пока идёт оплата за клик.</p>
      </div>

      <div className={styles.organicChannel} aria-hidden="true">
        <span className={styles.label}>Собственный поисковый канал</span>
        <div className={styles.organicRoot}>Сайт</div>
        <div className={styles.organicConnector} aria-hidden="true">
          <i className={styles.connectorBar} />
          <i className={styles.connectorStemCenter} />
          <i className={styles.connectorStemSide} />
          <i className={styles.connectorStemSide} />
        </div>
        <div className={styles.organicPages}>
          {pages.map((page, index) => (
            <div className={styles.organicPage} style={{ "--pi": index } as React.CSSProperties} key={page.id}>
              <strong>{page.title}</strong>
              <div className={styles.organicQueries}>
                {page.queries.map((q, qi) => (
                  <span className={styles.queryTag} key={q}>
                    {q}
                    {page.lead && qi === 0 && <i className={styles.leadPing} aria-hidden="true" />}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className={styles.note}>Каждая новая страница — новая точка входа из поиска. Требует постоянной работы, но не отключается вместе с рекламным бюджетом.</p>
      </div>
    </div>
  );
}

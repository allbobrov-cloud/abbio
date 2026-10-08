"use client";

import { useState } from "react";
import { tariffStages } from "@/lib/np/content";
import styles from "./NpTariffs.module.css";

const rub = new Intl.NumberFormat("ru-RU");

/*
 * Тарифная лестница с переключателем: показывает, что цена поднимается
 * только при достижении согласованных показателей. Конкретные KPI не утверждены —
 * в интерфейсе они названы обобщённо.
 */
export function NpTariffs() {
  const [reached, setReached] = useState(true);
  const base = tariffStages[0].price;
  const max = Math.max(...tariffStages.map((stage) => stage.price));

  return (
    <div className={styles.wrap} data-reached={reached || undefined}>
      <div className={styles.toggleRow}>
        <span className={styles.toggleLabel} id="np-kpi-label">Показатели:</span>
        <div className={styles.toggle} role="radiogroup" aria-labelledby="np-kpi-label">
          <button type="button" role="radio" aria-checked={reached} onClick={() => setReached(true)}>достигнуты</button>
          <button type="button" role="radio" aria-checked={!reached} onClick={() => setReached(false)}>не достигнуты</button>
        </div>
      </div>

      <ol className={styles.stairs} aria-label="Ступени подписки регионального партнёрства">
        {tariffStages.map((stage, index) => {
          const price = reached || index === 0 ? stage.price : base;
          const height = 34 + ((price - base) / (max - base)) * 66;
          return (
            <li key={stage.months} className={styles.stage} style={{ "--h": `${height}%` } as React.CSSProperties}>
              <div className={styles.column}>
                <p className={styles.price}>
                  {index > 0 && reached && <span className={styles.upTo}>до </span>}
                  <span className={styles.amount}>{rub.format(price)}</span>
                  <span className={styles.rub}> ₽</span>
                </p>
                <div className={styles.bar}>
                  {index > 0 && (
                    <span className={styles.gate} title={reached ? "Показатели достигнуты" : "Показатели не достигнуты"}>
                      {reached
                        ? <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.2 4.2L19 7" /></svg>
                        : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 11V8a5 5 0 0 1 10 0v3M6 11h12v9H6z" /></svg>}
                    </span>
                  )}
                </div>
              </div>
              <p className={styles.months}>{stage.months} мес.</p>
            </li>
          );
        })}
      </ol>

      <p className={styles.caption} aria-live="polite">
        {reached
          ? "Показатели выполнены — подписка переходит на следующую ступень, но не выше 30 000 ₽ в месяц."
          : "Показатели не выполнены — стоимость остаётся 15 000 ₽ в месяц, сколько бы месяцев ни прошло."}
      </p>
    </div>
  );
}

import Image from "next/image";
import { npRegionsLive, npTrackedQueries } from "@/lib/np/content";
import { NpIcon } from "./NpIcon";
import styles from "./NpProof.module.css";

/*
 * Доказательства: только подтверждённые показатели Potolki-vsem.ru с источником и датой.
 * Позиции — Topvisor на 02.09.2026; договоры — данные проекта, октябрь 2026.
 */
const positions = [
  { city: "Санкт-Петербург", top: 98, total: 107 },
  { city: "Москва", top: 67, total: 117 },
];

export function NpProof() {
  return (
    <div className={styles.grid}>
      <figure className={styles.photo}>
        <Image src="/cases/potolki-choice-bg.avif" alt="Гостиная с натяжным потолком и световыми линиями" fill sizes="(min-width: 960px) 50vw, 92vw" />
        <figcaption className={styles.photoCaption}>
          <span className={styles.live}><i aria-hidden="true" />Сайт работает</span>
          <strong>Potolki-vsem.ru</strong>
          <span>3 города · {npTrackedQueries.total} отслеживаемых запроса</span>
        </figcaption>
      </figure>

      <div className={styles.stats}>
        {positions.map((item) => (
          <div key={item.city} className={styles.stat}>
            <div className={styles.statHead}>
              <strong>{item.top}<span> из {item.total}</span></strong>
              <span>запросов в ТОП-10 Яндекса · {item.city}</span>
            </div>
            <div className={styles.meter} role="img" aria-label={`${item.top} из ${item.total} запросов в ТОП-10`}>
              <span style={{ width: `${Math.round((item.top / item.total) * 100)}%` }} />
            </div>
            <small>Topvisor, 02.09.2026</small>
          </div>
        ))}
        <div className={`${styles.stat} ${styles.statAccent}`}>
          <div className={styles.statHead}>
            <strong>10–15</strong>
            <span>договоров в месяц из органического поиска</span>
          </div>
          <small>Данные проекта, октябрь 2026</small>
        </div>
      </div>

      <ul className={styles.cities}>
        {npRegionsLive.map((region) => (
          <li key={region.host}>
            <a href={region.url} target="_blank" rel="noopener">
              <span className={styles.cityName}>{region.city}</span>
              <span className={styles.cityHost}>{region.host}</span>
              <NpIcon name="external" className={styles.cityIcon} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

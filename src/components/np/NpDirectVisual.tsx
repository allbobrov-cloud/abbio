import Image from "next/image";
import { NpIcon } from "./NpIcon";
import styles from "./NpDirectVisual.module.css";

/*
 * Иллюстрация формата «Яндекс Директ»: поисковое объявление и баннер РСЯ.
 * Это пример оформления, а не реальная кампания — подписано в интерфейсе.
 */
export function NpDirectVisual() {
  return (
    <div className={styles.scene} role="img" aria-label="Пример рекламы: объявление в поиске Яндекса и баннер в Рекламной сети Яндекса">
      <div className={styles.search}>
        <div className={styles.query}><NpIcon name="search" /><span>натяжные потолки в вашем городе</span></div>
        <div className={styles.ad}>
          <span className={styles.adMark}>Реклама</span>
          <p className={styles.adUrl}>potolki-vsem.ru › ваш-город</p>
          <p className={styles.adTitle}>Натяжные потолки — расчёт стоимости онлайн</p>
          <p className={styles.adText}>Реальные объекты в вашем городе. Подбор фактуры и освещения.</p>
          <div className={styles.adLinks}><span>Цены</span><span>Наши работы</span><span>Замер</span></div>
        </div>
        <div className={styles.organic} aria-hidden="true"><i /><i /><i /></div>
      </div>
      <div className={styles.banner}>
        <div className={styles.bannerPhoto}>
          <Image src="/cases/potolki-object.avif" alt="" fill sizes="240px" />
        </div>
        <div className={styles.bannerBody}>
          <span className={styles.adMark}>Реклама · РСЯ</span>
          <p>Потолок со световыми линиями</p>
          <span className={styles.bannerCta}>Рассчитать</span>
        </div>
      </div>
      <span className={styles.note}>Пример объявления</span>
    </div>
  );
}

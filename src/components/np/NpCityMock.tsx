import Image from "next/image";
import { NpIcon } from "./NpIcon";
import styles from "./NpCityMock.module.css";

/*
 * Иллюстрация: как выглядит раздел города для партнёра. Данные условные
 * (город, телефон, компания) — в интерфейсе подписано «Пример раздела города».
 */
const photos = ["/cases/potolki-object.avif", "/cases/potolki-choice-bg.avif", "/cases/potolki-hero-bg.avif"];

export function NpCityMock() {
  return (
    <div className={styles.scene} role="img" aria-label="Пример раздела города на Potolki-vsem.ru: контакты партнёра, его работы и отзывы, заявка приходит на телефон партнёра">
      <div className={styles.browser}>
        <div className={styles.chrome}>
          <span className={styles.dots} aria-hidden="true"><i /><i /><i /></span>
          <span className={styles.url}>ваш-город.potolki-vsem.ru</span>
        </div>
        <div className={styles.page}>
          <div className={styles.top}>
            {/* eslint-disable-next-line @next/next/no-img-element -- SVG-логотип клиента */}
            <img src="/cases/potolki-logo.svg" alt="" width={86} height={25} />
            <span className={styles.city}><NpIcon name="pin" />Ваш город</span>
          </div>
          <p className={styles.title}>Натяжные потолки в&nbsp;вашем городе</p>
          <div className={styles.partner}>
            <span className={styles.partnerLabel}>Исполнитель</span>
            <strong>Ваша компания</strong>
            <span className={styles.phone}><NpIcon name="phone" />Ваш телефон и мессенджеры</span>
          </div>
          <div className={styles.photos}>
            {photos.map((src) => (
              <span key={src} className={styles.photo}><Image src={src} alt="" fill sizes="120px" /></span>
            ))}
          </div>
          <div className={styles.meta}>
            <span>Ваши работы</span>
            <span>Отзывы клиентов</span>
            <span>Цены и условия</span>
          </div>
        </div>
      </div>
      <div className={styles.toast}>
        <span className={styles.toastIcon}><NpIcon name="phone" /></span>
        <span><strong>Новая заявка</strong><small>приходит на ваш телефон</small></span>
      </div>
      <span className={styles.note}>Пример раздела города</span>
    </div>
  );
}

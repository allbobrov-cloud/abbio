import { NpIcon, type NpIconName } from "./NpIcon";
import { NpRequestButton } from "./NpBlocks";
import styles from "./NpDirectPartner.module.css";

/*
 * Яндекс Директ для партнёра (решение владельца 08.10.2026): настройка и ведение бесплатно,
 * рекламный бюджет — партнёра, заявки идут партнёру. Результат не гарантируется.
 */
const flow: { icon: NpIconName; title: string; text: string; ours?: boolean }[] = [
  { icon: "chart", title: "Ваш бюджет", text: "Вы пополняете рекламный кабинет" },
  { icon: "search", title: "Реклама в Яндексе", text: "Поиск и РСЯ — настраиваем и ведём мы", ours: true },
  { icon: "phone", title: "Заявки вам", text: "Звонки и заявки — на ваши контакты" },
  { icon: "check", title: "Ваши договоры", text: "Замер, договор и монтаж — ваши" },
];

export function NpDirectPartner() {
  return (
    <article className={styles.card} id="direct" aria-labelledby="np-direct">
      <div className={styles.head}>
        <div className={styles.copy}>
          <h3 className={styles.title} id="np-direct">Не ждите SEO — <em>получайте заявки через Яндекс Директ</em></h3>
          <p className={styles.text}>Пока SEO набирает позиции, запускаем рекламу на страницы вашего города. Вы платите только рекламный бюджет — за свои же заявки.</p>
        </div>
        <div className={styles.zero}>
          <strong>0 ₽</strong>
          <span>настройка и ведение рекламы для партнёров</span>
        </div>
      </div>

      <ol className={styles.flow} aria-label="Как работают деньги в рекламе">
        {flow.map((step) => (
          <li key={step.title} data-ours={step.ours || undefined}>
            <span className={styles.icon}><NpIcon name={step.icon} /></span>
            <strong>{step.title}</strong>
            <span>{step.text}</span>
          </li>
        ))}
      </ol>

      <div className={styles.foot}>
        <p>Количество заявок зависит от бюджета и спроса в городе и не гарантируется.</p>
        <NpRequestButton service="direct" />
      </div>
    </article>
  );
}

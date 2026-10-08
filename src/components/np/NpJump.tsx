import { NpIcon, type NpIconName } from "./NpIcon";
import styles from "./NpJump.module.css";

/* Три услуги страницы «Сайт и реклама» — крупные карточки-переходы к своим разделам. */
const items: { href: string; icon: NpIconName; title: string; text: string; pay: string }[] = [
  { href: "#sajt", icon: "layout", title: "Готовый сайт", text: "Ваш сайт на основе Potolki-vsem.ru — под вашим брендом и на вашем домене.", pay: "150 000 ₽ разово" },
  { href: "#seo", icon: "chart", title: "SEO-продвижение", text: "Продвигаем ваш сайт по запросам вашего города.", pay: "50 000 ₽ в месяц" },
  { href: "#direct", icon: "search", title: "Яндекс Директ", text: "Реклама в поиске и РСЯ, когда заявки нужны сейчас.", pay: "30 000 ₽ в месяц + бюджет" },
];

export function NpJump() {
  return (
    <nav className={styles.grid} aria-label="Услуги на странице">
      {items.map((item) => (
        <a key={item.href} href={item.href} className={styles.card}>
          <span className={styles.icon}><NpIcon name={item.icon} /></span>
          <strong>{item.title}</strong>
          <span className={styles.text}>{item.text}</span>
          <span className={styles.foot}>
            <span>{item.pay}</span>
            <NpIcon name="arrow" className={styles.arrow} />
          </span>
        </a>
      ))}
    </nav>
  );
}

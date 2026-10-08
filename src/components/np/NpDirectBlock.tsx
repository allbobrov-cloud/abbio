import Link from "next/link";
import { NpDirectVisual } from "./NpDirectVisual";
import { NpIcon, type NpIconName } from "./NpIcon";
import { NpRequestButton } from "./NpBlocks";
import styles from "./NpSeoBlock.module.css";
import own from "./NpDirectBlock.module.css";

/* Яндекс Директ для любого клиента. Для партнёров настройка и ведение бесплатны (решение владельца 08.10.2026). */
const groups: { icon: NpIconName; title: string; text: string }[] = [
  { icon: "layout", title: "Структура кампаний", text: "Поиск и Рекламная сеть Яндекса под ваши услуги и ваш город." },
  { icon: "search", title: "Посадочные страницы", text: "Каждое объявление ведёт на подходящую страницу вашего сайта." },
  { icon: "chart", title: "Цели и отчёт", text: "Звонки и заявки как цели. Отчёт по расходам и обращениям." },
];

export function NpDirectBlock() {
  return (
    <section className={`${styles.section} ${own.section}`} id="direct" aria-labelledby="np-direct">
      <div className={own.visual}><NpDirectVisual /></div>

      <div className={styles.copy}>
        <h2 className={styles.title} id="np-direct">Яндекс <em>Директ</em></h2>
        <p className={styles.kicker}>Поиск и РСЯ · когда заявки нужны сейчас</p>
        <p className={styles.text}>Пока SEO набирает позиции, реклама приводит обращения уже сейчас. Настраиваем кампании так, чтобы человек попадал на страницу именно с той услугой, которую искал.</p>
        <div className={styles.groups}>
          {groups.map((group) => (
            <div key={group.title} className={styles.group}>
              <span className={styles.groupIcon}><NpIcon name={group.icon} /></span>
              <strong>{group.title}</strong>
              <span>{group.text}</span>
            </div>
          ))}
        </div>
        <ul className={styles.terms}>
          <li><NpIcon name="check" />Рекламный бюджет оплачиваете вы, отдельно от наших услуг.</li>
          <li><NpIcon name="check" /><span>Настройка и ведение — 30 000 ₽ в месяц, только за нашу работу. <Link href="/partnerstvo#direct" className={own.link}>Партнёрам — бесплатно</Link>.</span></li>
          <li><NpIcon name="check" />Количество заявок и окупаемость рекламы не гарантируются.</li>
        </ul>
        <p className={styles.price}><strong>30 000 ₽</strong><span>в месяц за настройку и ведение · бюджет отдельно</span></p>
        <NpRequestButton service="direct" />
      </div>
    </section>
  );
}

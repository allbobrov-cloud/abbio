import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import styles from "./IndustryFocus.module.css";

const cases = [
  {
    slug: "profline",
    name: "ПрофЛайн",
    category: "Кровельные и фасадные материалы",
    services: ["Сайт", "SEO", "Аналитика"],
    image: "/cases/profline-hero.webp",
    fit: "cover",
    tint: "#e4222d",
  },
  {
    slug: "volhonka",
    name: "Металлобаза Волхонка",
    category: "Металлопрокат · Санкт-Петербург",
    services: ["Сайт", "CRM", "SEO"],
    image: "/cases/volhonka-hero-visual.avif",
    fit: "contain",
    tint: "#f0be40",
  },
] as const;

/*
 * «Помогаем продавать металлопрокат и стройматериалы»: слева — что учитываем в отрасли
 * (у каждого пункта мини-схема сути), справа — отраслевые кейсы с подсветкой цветом клиента.
 */
export function IndustryFocus() {
  return (
    <section className={styles.section} aria-labelledby="industry-title">
      <div className={styles.container}>
        <header className={styles.head}>
          <div>
            <p className={styles.eyebrow}>Металлопрокат и стройматериалы</p>
            <h2 id="industry-title">
              Помогаем продавать{" "}
              <br />
              <em>металлопрокат и стройматериалы.</em>
            </h2>
          </div>
          <p className={styles.lead}>
            Собираем сайты и маркетинг для поставщиков: чтобы покупатель нашёл нужную позицию, запросил расчёт и не потерялся до ответа отдела продаж.
          </p>
        </header>

        <div className={styles.grid}>
          <div className={styles.points}>
            <p className={styles.label}>Что учитываем в этой сфере</p>
            <ol>
              <li>
                <span className={styles.icon} aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M4 6h16M7 12h10M10 18h4" /></svg>
                </span>
                <div className={styles.text}>
                  <b>01</b>
                  <h3>Логику большого ассортимента</h3>
                  <p>Марка, размер, толщина, профиль и наличие — чтобы найти товар, а не изучать каталог.</p>
                </div>
                <div className={styles.filters} aria-hidden="true">
                  <span>Марка</span>
                  <span>Размер</span>
                  <span>Толщина</span>
                  <span>Профиль</span>
                  <span className={styles.on}>В наличии</span>
                </div>
              </li>
              <li>
                <span className={styles.icon} aria-hidden="true">
                  <svg viewBox="0 0 24 24"><rect x="5" y="3" width="14" height="18" rx="2.5" /><path d="M8.5 7.5h7M8.5 12h.01M12 12h.01M15.5 12h.01M8.5 16h.01M12 16h.01M15.5 16h.01" /></svg>
                </span>
                <div className={styles.text}>
                  <b>02</b>
                  <h3>Путь от выбора к расчёту</h3>
                  <p>Покупателю не приходится гадать, как уточнить цену или получить условия.</p>
                </div>
                <div className={styles.flow} aria-hidden="true">
                  <span>Выбор</span>
                  <i />
                  <span>Расчёт</span>
                  <i />
                  <span className={styles.on}>Условия</span>
                </div>
              </li>
              <li>
                <span className={styles.icon} aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H11l-4.5 4v-4A2.5 2.5 0 0 1 4 13.5v-7Z" /><path d="M8.5 8.5h7M8.5 12h4" /></svg>
                </span>
                <div className={styles.text}>
                  <b>03</b>
                  <h3>Работу отдела продаж</h3>
                  <p>В заявке сохраняется суть запроса, чтобы менеджер мог продолжить разговор.</p>
                </div>
                <div className={styles.ticket} aria-hidden="true">
                  <span>Заявка</span>
                  <em>суть запроса</em>
                  <i />
                  <span className={styles.on}>Менеджер</span>
                </div>
              </li>
            </ol>
          </div>

          <div className={styles.cases}>
            <p className={styles.label}>Отраслевые кейсы</p>
            {cases.map((item) => (
              <Link
                key={item.slug}
                href={`/cases/${item.slug}`}
                className={styles.case}
                data-fit={item.fit}
                style={{ "--tint": item.tint } as CSSProperties}
                aria-label={`Кейс «${item.name}»`}
              >
                <span className={styles.cover}>
                  <Image src={item.image} alt="" fill sizes="(max-width: 760px) 100vw, 40vw" />
                </span>
                <span className={styles.caseBody}>
                  <small>{item.category}</small>
                  <strong>{item.name}</strong>
                  <span className={styles.services}>
                    {item.services.map((service) => <span key={service}>{service}</span>)}
                  </span>
                  <span className={styles.more}>
                    Смотреть кейс
                    <i aria-hidden="true">
                      <svg viewBox="0 0 24 24"><path d="M7 17 17 7M8 7h9v9" /></svg>
                    </i>
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

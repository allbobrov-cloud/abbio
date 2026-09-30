import Link from "next/link";
import styles from "./not-found.module.css";

const routes = [
  { label: "Услуги", description: "Дизайн, сайты и маркетинг", href: "/services" },
  { label: "Кейсы", description: "Наши проекты в деталях", href: "/cases" },
  { label: "Статьи", description: "Идеи и полезные материалы", href: "/articles" },
];

export default function NotFound() {
  return (
    <main id="main" className={styles.page}>
      <section className={styles.inner} aria-labelledby="not-found-title">
        <div className={styles.hero}>
          <div className={styles.message}>
            <p className={styles.status}><span aria-hidden="true">↳</span> Ошибка 404</p>
            <h1 id="not-found-title">Страница<br /><em>не найдена.</em></h1>
            <p className={styles.description}>Проверьте адрес или начните с главной.<br className={styles.desktopBreak} /> Всё, что мы делаем, — там.</p>
            <Link className={styles.homeLink} href="/"><span>Вернуться на главную</span><span aria-hidden="true">↗</span></Link>
          </div>

          <div className={styles.art} aria-hidden="true">
            <div className={styles.backSheet} />
            <div className={styles.sheet}>
              <div className={styles.sheetHeader}><span>ABBiO</span><span>СТРАНИЦА НЕ НАЙДЕНА</span></div>
              <div className={styles.code}>4<span>0</span>4</div>
              <div className={styles.sheetFooter}><span>Дизайн. Сайты.<br />Маркетинг.</span><span className={styles.star}>✳</span></div>
            </div>
            <svg className={styles.cursor} viewBox="0 0 100 116" fill="none"><path d="M7 5L88 66L53 71L35 105L7 5Z" fill="#f3effa" stroke="#05070d" strokeWidth="7" strokeLinejoin="round" /></svg>
            <div className={styles.artCaption}><span /> Выход всегда есть</div>
          </div>
        </div>

        <nav className={styles.routes} aria-label="Другие разделы сайта">
          <div className={styles.routesIntro}>Или сразу<br /><span>к делу.</span></div>
          {routes.map((route) => (
            <Link key={route.href} href={route.href}>
              <span className={styles.routeTitle}>{route.label}<span aria-hidden="true">↗</span></span>
              <span className={styles.routeDescription}>{route.description}</span>
            </Link>
          ))}
        </nav>
      </section>
    </main>
  );
}

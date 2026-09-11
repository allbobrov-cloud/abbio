import styles from "./Header.module.css";

const navItems = ["Услуги", "Кейсы", "Процесс", "О нас", "Блог", "Контакты"];

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a className={styles.brand} href="#" aria-label="3ANT.">
          <span className={styles.logo}>3ANT</span>
          <span className={styles.descriptor}>
            Системный маркетинг для бизнеса
          </span>
        </a>

        <nav className={styles.nav} aria-label="Основная навигация">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase().replaceAll(" ", "-")}`}>
              {item}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <a className={styles.cta} href="#contacts" data-contact-dialog>
            <span>Обсудить проект</span>
            <span aria-hidden="true">↗</span>
          </a>
          <button className={styles.menuButton} type="button" aria-label="Открыть меню">
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}

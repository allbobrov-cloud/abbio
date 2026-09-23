import Link from "next/link";
import styles from "@/components/Agency.module.css";
export const metadata = { title: "Статьи", description: "Будущие материалы ABBiO о сайтах, поисковом продвижении, аналитике и работе с заявками." };
export default function Page() {
  return (
    <main id="main">
      <div className={styles.pageHero}>
        <div className={styles.container}>
          <nav className={styles.breadcrumb} aria-label="Хлебные крошки">
            <Link href="/">Главная</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Статьи</span>
          </nav>
          <span className={styles.comingSoon}>Скоро первые публикации</span>
          <h1>Материалы ещё готовятся.</h1>
          <p className={styles.pageDescription}>
            Начнём с выбора структуры сайта, подготовки к SEO и учёта заявок.
            А пока можно посмотреть, с какими задачами мы уже работаем.
          </p>
          <Link className={styles.textLink} href="/cases">
            Посмотреть кейсы <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import styles from "@/components/Agency.module.css";
export default function NotFound() { return <main id="main"><PageIntro title="Кажется, вы свернули не туда." label="404" description="Такой страницы нет. Вернитесь на главную или посмотрите наши проекты." /><div className={`${styles.container} ${styles.detailSection} ${styles.notFoundActions}`}><Link className={styles.button} href="/">На главную <span aria-hidden="true">↗</span></Link><Link className={styles.textLink} href="/cases">Посмотреть кейсы <span aria-hidden="true">↗</span></Link></div></main>; }

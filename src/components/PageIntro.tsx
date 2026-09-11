import Link from "next/link";
import styles from "./Agency.module.css";
export function PageIntro({ title, description, parent, label }: { title: string; description?: string; parent?: { href: string; title: string }; label?: string }) {
  return <div className={styles.pageHero}><div className={styles.container}><nav className={styles.breadcrumb} aria-label="Хлебные крошки"><Link href="/">Главная</Link><span aria-hidden="true">/</span>{parent && <><Link href={parent.href}>{parent.title}</Link><span aria-hidden="true">/</span></>}<span aria-current="page">{label || title}</span></nav><h1>{title}</h1>{description && <p className={styles.pageDescription}>{description}</p>}</div></div>;
}

import Image from "next/image";
import Link from "next/link";
import { cases } from "@/lib/content";
import { ActionArrow } from "@/components/ActionArrow";
import styles from "./CasePortfolio.module.css";

type Props = { title: string; description: string; slugs: string[]; featuredSlug: string };

export function CasePortfolio({ title, description, slugs, featuredSlug }: Props) {
  const items = slugs.map((slug) => cases.find((item) => item.slug === slug)).filter(Boolean);
  return <section className={styles.section} aria-labelledby="portfolio-title"><div className={styles.container}>
    <header className={styles.heading}><p>Кейсы ABB</p><h2 id="portfolio-title">{title}</h2><div><span>{description}</span></div></header>
    <ul className={styles.grid}>{items.map((item) => item && <li key={item.slug} className={item.slug === featuredSlug ? styles.featured : ""}><Link href={`/cases/${item.slug}`} className={styles.card} aria-label={`Открыть кейс: ${item.name}`}><Image src={item.image} alt={`Превью проекта: ${item.name}`} fill sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1080px) 50vw, 700px" /><div className={styles.shade} /><div className={styles.copy}><p>{item.category}</p><h3>{item.name}</h3><span>{item.title}</span><b>Открыть кейс <ActionArrow /></b></div></Link></li>)}</ul>
  </div></section>;
}

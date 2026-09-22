import Image from "next/image";
import Link from "next/link";
import { cases } from "@/lib/content";
import { ActionArrow } from "@/components/ActionArrow";
import styles from "./CasePortfolio.module.css";

type Props = {
  title: string;
  description: string;
  slugs: string[];
  featuredSlug: string;
  eyebrow?: string;
  ctaLabel?: string;
  showServices?: boolean;
};

export function CasePortfolio({ title, description, slugs, featuredSlug, eyebrow = "Кейсы ABB.IO", ctaLabel = "Открыть кейс", showServices = false }: Props) {
  const items = slugs.map((slug) => cases.find((item) => item.slug === slug)).filter(Boolean);
  return <section className={styles.section} aria-labelledby="portfolio-title"><div className={styles.container}>
    <header className={styles.heading}><p>{eyebrow}</p><h2 id="portfolio-title">{title}</h2><div><span>{description}</span></div></header>
    <ul className={styles.grid}>{items.map((item) => item && <li key={item.slug} className={item.slug === featuredSlug ? styles.featured : ""}><Link href={`/cases/${item.slug}`} className={styles.card} aria-label={`${ctaLabel}: ${item.name}${showServices ? `. В проекте: ${item.tags.join(", ")}.` : ""}`}><Image src={item.image} alt={`Превью проекта: ${item.name}`} fill loading="eager" sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1080px) 50vw, 700px" /><div className={styles.shade} /><div className={styles.copy}><p>{item.category}</p><h3>{item.name}</h3><span>{item.title}</span>{showServices && <div className={styles.services}><small>В проекте</small><ul>{item.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul></div>}<b>{ctaLabel} <ActionArrow /></b></div></Link></li>)}</ul>
  </div></section>;
}

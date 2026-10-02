import Image from "next/image";
import Link from "next/link";
import { ActionArrow } from "@/components/ActionArrow";
import { ARTICLE_CATEGORIES, type ArticleSummary } from "@/lib/articles/types";
import styles from "./Articles.module.css";
export function articleDate(value: string | null) { return value ? new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Moscow" }).format(new Date(value)) : ""; }
export function ArticleCard({ article, featured = false, related = false }: { article: ArticleSummary; featured?: boolean; related?: boolean }) {
  return <Link href={`/articles/${article.slug}`} className={`${styles.card} ${featured ? styles.featured : ""}`} data-article-event={related ? "article_related_click" : undefined}>
    <span className={styles.cardCover}>{article.coverImage && <Image src={article.coverImage} alt={article.coverAlt} fill sizes={featured ? "(max-width:760px) 92vw, 60vw" : "(max-width:760px) 92vw, (max-width:1100px) 45vw, 30vw"} priority={featured} />}</span>
    <span className={styles.cardBody}><span className={styles.category}>{ARTICLE_CATEGORIES[article.category]}{featured && <span className={styles.featuredLabel}>В фокусе</span>}</span>
      <span className={styles.cardTitle}>{article.title}</span><span className={styles.excerpt}>{article.excerpt}</span>
      <span className={styles.cardMeta}><time dateTime={article.publishedAt ?? undefined}>{articleDate(article.publishedAt)}</time><span>·</span><span>{article.readingTime} мин чтения</span></span>
      <span className={styles.cardAction}>Читать статью <ActionArrow /></span>
    </span>
  </Link>;
}

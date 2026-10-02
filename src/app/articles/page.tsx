import Link from "next/link";
import type { Metadata } from "next";
import { cache } from "react";
import { listPublished } from "@/lib/articles/repository";
import { ARTICLE_CATEGORIES, type ArticleCategory } from "@/lib/articles/types";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { ArticleFilters } from "@/components/articles/ArticleFilters";
import { BreadcrumbJsonLd } from "@/components/StructuredData";
import styles from "@/components/articles/Articles.module.css";
import { socialMetadata } from "@/lib/seo";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
type Props = { searchParams: Promise<{ category?: string; page?: string }> };
const readList = cache(listPublished);
function selection(params: { category?: string; page?: string }) {
  const category = params.category && Object.hasOwn(ARTICLE_CATEGORIES, params.category) ? params.category as ArticleCategory : undefined;
  const page = params.page && /^\d{1,5}$/.test(params.page) ? Math.max(1, Number(params.page)) : 1;
  return { category, page };
}
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams; const { category, page } = selection(params); const { total } = await readList(category, page);
  const title = page > 1 ? `Статьи о digital на практике — страница ${page}` : "Статьи о сайтах, маркетинге и аналитике";
  const description = "Сайты, спрос, реклама, обращения и данные. Практика ABBiO для владельцев и руководителей бизнеса.";
  return { title, description, alternates: { canonical: !category && page > 1 ? `/articles?page=${page}` : "/articles" },
    robots: { index: total > 0 && !params.category && page <= Math.ceil(total / 12), follow: true }, ...socialMetadata(`${title} | ABBiO`, description) };
}
export default async function ArticlesPage({ searchParams }: Props) {
  const { category, page } = selection(await searchParams); const { items, total } = await readList(category, page);
  const featured = page === 1 && items[0]?.featured ? items[0] : null;
  const rest = featured ? items.slice(1) : items; const pages = Math.ceil(total / 12);
  const href = (n: number) => `/articles?${new URLSearchParams({ ...(category ? { category } : {}), page: String(n) })}`;
  return <main id="main" className={styles.page}><BreadcrumbJsonLd items={[{ name: "Главная", path: "/" }, { name: "Статьи", path: "/articles" }]} />
    <div className={styles.container}><header className={styles.hero}><div><p className={styles.eyebrow}>Статьи / ABBiO</p><h1>Пишем о том,<br />как digital работает<br /><em>на практике.</em></h1></div><p className={styles.heroLead}>Сайты, спрос, реклама, обращения и данные.<br />Без теории ради теории.</p></header>
      <ArticleFilters category={category} />
      {items.length ? <section aria-label="Публикации" className={styles.publications}>{featured && <ArticleCard article={featured} featured />}<div className={styles.grid}>{rest.map(item => <ArticleCard key={item.id} article={item} />)}</div></section>
        : <section className={styles.empty}><span className={styles.emptyMark} aria-hidden="true">↗</span><div><h2>{page > 1 ? "На этой странице нет материалов." : category ? "В этой теме пока нет публикаций." : "Первый материал — впереди."}</h2><p>{category ? "Посмотрите материалы в других категориях." : "Готовим разборы решений, процессов и проектов. А пока практику можно посмотреть в кейсах."}</p><Link href={category || page > 1 ? "/articles" : "/cases"}>{category || page > 1 ? "Все статьи" : "Посмотреть кейсы"} →</Link></div></section>}
      {pages > 1 && <nav className={styles.pagination} aria-label="Страницы публикаций">{page > 1 && <Link href={href(page - 1)}>← Назад</Link>}<span>Страница {page} из {pages}</span>{page < pages && <Link href={href(page + 1)}>Дальше →</Link>}</nav>}
    </div></main>;
}

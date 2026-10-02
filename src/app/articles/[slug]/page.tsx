import { cache } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPublished, relatedPublished, articleImageSizes } from "@/lib/articles/repository";
import { analyseMarkdown } from "@/lib/articles/markdown";
import { ARTICLE_CATEGORIES } from "@/lib/articles/types";
import { absoluteUrl } from "@/lib/seo";
import { caseIndex, services } from "@/lib/content";
import { BreadcrumbJsonLd, ArticleJsonLd } from "@/components/StructuredData";
import { ArticleReader } from "@/components/articles/ArticleReader";
import { ArticleCard, articleDate } from "@/components/articles/ArticleCard";
import { ArticleAnalytics } from "@/components/articles/ArticleAnalytics";
import { CaseCard } from "@/components/cases/CaseCard";
import styles from "@/components/articles/Articles.module.css";
import { articleSeo, articleServiceLinks, articleCoverAlt } from "@/lib/articles/seo";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
const readArticle = cache(getPublished);
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const value = await readArticle((await params).slug);
  if (!value) return { title: "Статья не найдена", robots: { index: false, follow: false } };
  const seo = articleSeo(value);
  const image = value.ogImage ?? value.coverImage!; const url = absoluteUrl(`/articles/${value.slug}`);
  const dimensions = (await articleImageSizes([image]))[image];
  return { title: { absolute: seo.title }, description: seo.description, authors: [{ name: value.author }],
    alternates: { canonical: url }, robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
    openGraph: { type: "article", locale: "ru_RU", siteName: "ABBiO", url, title: seo.ogTitle, description: seo.ogDescription,
      publishedTime: value.publishedAt!, modifiedTime: value.updatedAt, authors: [value.author], section: seo.section, tags: value.tags,
      images: [{ url: absoluteUrl(image), alt: articleCoverAlt(value), type: "image/webp", ...dimensions }] },
    twitter: { card: "summary_large_image", title: seo.ogTitle, description: seo.ogDescription, images: [{ url: absoluteUrl(image), alt: articleCoverAlt(value) }] } };
}
export default async function ArticlePage({ params }: Props) {
  const value = await readArticle((await params).slug); if (!value) notFound();
  const analysis = analyseMarkdown(value.content);
  const [related, images] = await Promise.all([relatedPublished(value), articleImageSizes([...analysis.images, value.coverImage!])]);
  const relatedServices = services.filter(s => articleServiceLinks(value.category, value.relatedServices).includes(s.slug));
  const relatedCases = caseIndex.filter(c => value.relatedCases.includes(c.slug));
  const toc = <ol>{analysis.toc.map((item, index) => <li key={item.id}><a href={`#${item.id}`}><span>{String(index + 1).padStart(2, "0")}</span>{item.title}</a></li>)}</ol>;
  const cover = images[value.coverImage!];
  return <main id="main" className={styles.page}><ArticleAnalytics slug={value.slug} category={value.category} /><ArticleJsonLd article={value} />
    <BreadcrumbJsonLd items={[{ name: "Главная", path: "/" }, { name: "Статьи", path: "/articles" }, { name: value.title, path: `/articles/${value.slug}` }]} />
    <div className={styles.container}><Link className={styles.back} href="/articles">← Все статьи</Link>
      <header className={styles.articleHero}><p className={styles.category}>{ARTICLE_CATEGORIES[value.category]}</p><h1>{value.title}</h1><p className={styles.lead}>{value.description}</p>
        <div className={styles.articleMeta}><time dateTime={value.publishedAt!}>{articleDate(value.publishedAt)}</time><span>·</span><span>{value.readingTime} мин чтения</span><span>·</span><span>{value.author}</span></div>
        {new Date(value.updatedAt).getTime() - new Date(value.publishedAt!).getTime() > 86400000 && <p className={styles.updated}>Обновлено {articleDate(value.updatedAt)}</p>}
      </header>
      {cover && <div className={styles.articleCover}><Image src={value.coverImage!} alt={articleCoverAlt(value)} width={cover.width} height={cover.height} sizes="(max-width:760px) 92vw, 1200px" priority /></div>}
      <div className={styles.readingLayout}>{analysis.toc.length > 1 && <aside className={styles.toc}><div className={styles.desktopToc}><p>В этой статье</p>{toc}</div><details className={styles.mobileToc}><summary>В этой статье</summary>{toc}</details></aside>}
        <article className={styles.readingBody}><ArticleReader content={value.content} images={images} />
          {value.tags.length > 0 && <ul className={styles.tags} aria-label="Темы статьи">{value.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>}
          {relatedServices.length > 0 && <section className={styles.relatedServices}><p className={styles.eyebrow}>По теме</p><h2>От материала — к работе.</h2>{relatedServices.map(service => <Link key={service.slug} href={`/services/${service.slug}`} data-article-event="article_service_click">{service.title}<span aria-hidden="true">↗</span></Link>)}</section>}
        </article></div>
      {relatedCases.length > 0 && <section className={styles.relatedSection}><p className={styles.eyebrow}>Проекты ABBiO</p><h2>Посмотреть на практике.</h2><div className={styles.caseGrid}>{relatedCases.map((item, index) => <div key={item.slug} data-article-event="article_case_click"><CaseCard item={item} index={index} sizes="(max-width:760px) 92vw, 33vw" /></div>)}</div></section>}
      {related.length > 0 && <section className={styles.relatedSection}><p className={styles.eyebrow}>Продолжить чтение</p><h2>Ещё по теме.</h2><div className={styles.grid}>{related.map(item => <ArticleCard key={item.id} article={item} related />)}</div></section>}
    </div></main>;
}

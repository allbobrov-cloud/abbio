import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { allPublished } from "@/lib/articles/repository";
import { defaultAuthor } from "@/lib/articles/author";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { BreadcrumbJsonLd, PersonJsonLd } from "@/components/StructuredData";
import { socialMetadata } from "@/lib/seo";
import styles from "@/components/articles/Articles.module.css";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const title = `${defaultAuthor.name} — автор статей ABBiO`;
const description = `${defaultAuthor.name}, ${defaultAuthor.role.toLowerCase()} в агентстве ABBiO. Статьи о сайтах, SEO, рекламе, обращениях и CRM.`;

export const metadata: Metadata = {
  title: { absolute: `${title} | ABBiO` },
  description,
  alternates: { canonical: defaultAuthor.path },
  ...socialMetadata(title, description),
};

/* Страница автора: имя, роль, фото и все его статьи. Биография — по согласованию с владельцем. */
export default async function AuthorPage() {
  const articles = await allPublished();
  const author = defaultAuthor;
  return <main id="main" className={styles.page}>
    <PersonJsonLd author={author} />
    <BreadcrumbJsonLd items={[{ name: "Главная", path: "/" }, { name: "Статьи", path: "/articles" }, { name: author.name, path: author.path }]} />
    <div className={styles.container}>
      <Link className={styles.back} href="/articles">← Все статьи</Link>
      <header className={styles.hero}>
        <div className={styles.authorHead}>
          <Image src={author.image} alt={author.name} width={120} height={120} priority />
          <div><p className={styles.eyebrow}>Автор</p><h1>{author.name}</h1><p className={styles.heroLead}>{author.role} · ABBiO</p></div>
        </div>
      </header>
      {articles.length > 0 && <section aria-label="Статьи автора" className={styles.publications}><div className={styles.grid}>{articles.map((item) => <ArticleCard key={item.id} article={item} />)}</div></section>}
    </div>
  </main>;
}

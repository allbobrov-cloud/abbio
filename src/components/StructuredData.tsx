import { absoluteUrl } from "@/lib/seo";
import type { Article } from "@/lib/articles/types";
import { articleSeo } from "@/lib/articles/seo";

export function ArticleJsonLd({ article }: { article: Article }) {
  const seo = articleSeo(article);
  const url = absoluteUrl(`/articles/${article.slug}`);
  return <JsonLd data={{ "@context": "https://schema.org", "@type": "BlogPosting", "@id": `${url}#article`, url, headline: article.title,
    description: seo.description, image: absoluteUrl(article.ogImage ?? article.coverImage!),
    inLanguage: "ru-RU", isAccessibleForFree: true, articleSection: seo.section, ...(article.tags.length ? { keywords: article.tags.join(", ") } : {}),
    datePublished: article.publishedAt, dateModified: article.updatedAt,
    author: { "@type": article.author === "ABBiO" ? "Organization" : "Person", name: article.author, ...(article.author === "ABBiO" ? { url: absoluteUrl("/") } : {}) },
    publisher: { "@type": "Organization", name: "ABBiO", url: absoluteUrl("/") },
    mainEntityOfPage: { "@type": "WebPage", "@id": url } }} />;
}

type Breadcrumb = { name: string; path: string };

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function OrganizationJsonLd() {
  return <JsonLd data={{ "@context": "https://schema.org", "@type": "Organization", name: "ABBiO", url: absoluteUrl("/") }} />;
}

export function BreadcrumbJsonLd({ items }: { items: Breadcrumb[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: absoluteUrl(item.path),
        })),
      }}
    />
  );
}

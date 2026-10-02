import { absoluteUrl } from "@/lib/seo";
import type { Article } from "@/lib/articles/types";

export function ArticleJsonLd({ article }: { article: Article }) {
  return <JsonLd data={{ "@context": "https://schema.org", "@type": "BlogPosting", headline: article.title,
    description: article.description, image: absoluteUrl(article.ogImage ?? article.coverImage!),
    datePublished: article.publishedAt, dateModified: article.updatedAt,
    author: { "@type": article.author === "ABBiO" ? "Organization" : "Person", name: article.author, url: absoluteUrl("/") },
    publisher: { "@type": "Organization", name: "ABBiO", url: absoluteUrl("/") },
    mainEntityOfPage: absoluteUrl(`/articles/${article.slug}`) }} />;
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

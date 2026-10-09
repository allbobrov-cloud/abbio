import { absoluteUrl } from "@/lib/seo";
import type { Article } from "@/lib/articles/types";
import { articleSeo } from "@/lib/articles/seo";
import { articleQuestions, articleWordCount } from "@/lib/articles/markdown";
import { articleAuthor, authorJsonLd, type ArticleAuthor } from "@/lib/articles/author";
import { operator } from "@/lib/legal";

const organizationRef = () => ({ "@type": "Organization", "@id": `${absoluteUrl("/")}#organization`, name: "ABBiO", url: absoluteUrl("/"),
  logo: { "@type": "ImageObject", url: absoluteUrl("/icon.svg") } });

export function ArticleJsonLd({ article }: { article: Article }) {
  const seo = articleSeo(article);
  const url = absoluteUrl(`/articles/${article.slug}`);
  const words = articleWordCount(article.content);
  return <JsonLd data={{ "@context": "https://schema.org", "@type": "BlogPosting", "@id": `${url}#article`, url, headline: article.title,
    description: seo.description, image: absoluteUrl(article.ogImage ?? article.coverImage!),
    inLanguage: "ru-RU", isAccessibleForFree: true, articleSection: seo.section, ...(article.tags.length ? { keywords: article.tags.join(", ") } : {}),
    about: { "@type": "Thing", name: seo.section }, wordCount: words, timeRequired: `PT${article.readingTime}M`,
    datePublished: article.publishedAt, dateModified: article.updatedAt,
    author: authorJsonLd(articleAuthor(article.author)),
    publisher: organizationRef(),
    // Блоки, которые голосовые ассистенты могут зачитать как короткий ответ.
    speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "[data-article-lead]"] },
    // Машиночитаемая версия текста для ИИ-ассистентов.
    encoding: { "@type": "MediaObject", encodingFormat: "text/markdown", contentUrl: `${url}.md` },
    mainEntityOfPage: { "@type": "WebPage", "@id": url } }} />;
}

/* FAQPage из вопросов-подзаголовков статьи (см. articleQuestions). */
export function ArticleFaqJsonLd({ article }: { article: Article }) {
  const items = articleQuestions(article.content);
  if (items.length < 2) return null;
  return <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", "@id": `${absoluteUrl(`/articles/${article.slug}`)}#faq`,
    mainEntity: items.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) }} />;
}

export function PersonJsonLd({ author }: { author: ArticleAuthor }) {
  return <JsonLd data={{ "@context": "https://schema.org", "@type": "ProfilePage", mainEntity: authorJsonLd(author) }} />;
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
  return <JsonLd data={{ "@context": "https://schema.org", ...organizationRef(), email: operator.email,
    contactPoint: { "@type": "ContactPoint", contactType: "sales", email: operator.email, availableLanguage: "ru" } }} />;
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

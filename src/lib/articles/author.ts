import { absoluteUrl } from "@/lib/seo";
export const defaultAuthor = {
  slug: "abbio", name: "ABBiO", role: "Редакция агентства", image: "/icon.svg", path: "/articles",
};
export type ArticleAuthor = typeof defaultAuthor;
export function articleAuthor(name: string | null | undefined): ArticleAuthor {
  void name;
  return defaultAuthor;
}
export function authorJsonLd(author: ArticleAuthor) {
  return { "@type": "Organization", "@id": `${absoluteUrl("/")}#organization`, name: author.name, url: absoluteUrl("/") };
}

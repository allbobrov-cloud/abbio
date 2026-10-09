import { team } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

/*
 * Автор статей на сайте (решение владельца 09.10.2026): материалы публикуются от имени
 * Боброва Александра. Make по-прежнему присылает author: "ABBiO" — подменяем при выводе,
 * данные статей в БД не меняются.
 */
const person = team.find((item) => item.name === "Бобров Александр")!;

export const defaultAuthor = {
  slug: "aleksandr-bobrov",
  name: "Александр Бобров",
  role: person.role,
  image: person.image,
  path: "/articles/avtor/aleksandr-bobrov",
};

export type ArticleAuthor = typeof defaultAuthor;

export function articleAuthor(name: string | null | undefined): ArticleAuthor {
  // Отдельных авторов пока нет: любые статьи ABBiO подписаны основным автором.
  void name;
  return defaultAuthor;
}

export function authorJsonLd(author: ArticleAuthor) {
  return {
    "@type": "Person",
    "@id": `${absoluteUrl(author.path)}#person`,
    name: author.name,
    jobTitle: author.role,
    image: absoluteUrl(author.image),
    url: absoluteUrl(author.path),
    worksFor: { "@type": "Organization", "@id": `${absoluteUrl("/")}#organization`, name: "ABBiO", url: absoluteUrl("/") },
  };
}

import { revalidatePath } from "next/cache";

/* Сбрасывает кэш всех публичных страниц статей после изменения через API. */
export function revalidateArticles() {
  revalidatePath("/articles/[slug]", "page");
  revalidatePath("/articles");
}

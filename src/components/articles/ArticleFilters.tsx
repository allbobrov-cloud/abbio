"use client";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { ARTICLE_CATEGORIES, type ArticleCategory } from "@/lib/articles/types";
import styles from "./Articles.module.css";
export function ArticleFilters({ category }: { category?: ArticleCategory }) {
  const router = useRouter(); const [pending, startTransition] = useTransition();
  const choices = [["", "Все"], ...Object.entries(ARTICLE_CATEGORIES)];
  return <nav className={styles.filters} aria-label="Категории статей" aria-busy={pending}>{choices.map(([id, label]) =>
    <button key={id} type="button" aria-pressed={(category ?? "") === id} disabled={pending} onClick={() => startTransition(() => router.push(id ? `/articles?category=${id}` : "/articles", { scroll: false }))}>{label}</button>)}</nav>;
}

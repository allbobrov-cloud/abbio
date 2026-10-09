"use client";

import { useState } from "react";
import type { TocItem } from "@/lib/articles/types";
import styles from "./Articles.module.css";

/*
 * Одно оглавление на всех экранах: на десктопе список всегда открыт,
 * на телефоне сворачивается кнопкой. Раньше было два одинаковых списка в HTML.
 */
export function ArticleToc({ items }: { items: TocItem[] }) {
  const [open, setOpen] = useState(false);
  return (
    <nav className={styles.toc} aria-label="Содержание статьи" data-open={open || undefined}>
      <p className={styles.tocTitle}>В этой статье</p>
      <button type="button" className={styles.tocToggle} aria-expanded={open} aria-controls="article-toc" onClick={() => setOpen(!open)}>
        В этой статье
      </button>
      <ol id="article-toc">
        {items.map((item, index) => (
          <li key={item.id}>
            <a href={`#${item.id}`} onClick={() => setOpen(false)}><span>{String(index + 1).padStart(2, "0")}</span>{item.title}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

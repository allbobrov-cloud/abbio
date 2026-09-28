import Link from "next/link";
import type { CSSProperties } from "react";
import { ActionArrow } from "@/components/ActionArrow";
import { caseIndex } from "@/lib/content";
import { CaseCard, type CaseItem } from "./CaseCard";
import styles from "./CasesBlock.module.css";

type CaseSlug = CaseItem["slug"];

type Props = {
  /** Какие кейсы показать и в каком порядке. По умолчанию — первые три по списку /cases. */
  slugs?: readonly CaseSlug[];
  /** Не показывать этот кейс (на странице самого кейса). */
  exclude?: CaseSlug;
  eyebrow?: string;
  title?: string;
  description?: string;
  titleId?: string;
  /** id секции — для якорных ссылок вроде «Посмотреть работы ↓». */
  id?: string;
};

/*
 * Универсальный блок «Кейсы» для любой страницы: 3 карточки в ряд (на планшете и телефоне —
 * горизонтальная лента со свайпом) и переход ко всем кейсам. Карточка та же, что на /cases.
 */
export function CasesBlock({
  slugs,
  exclude,
  eyebrow = "Кейсы",
  title = "Что сделали и как это работает.",
  description = "Задача → решение → что получилось. Откройте кейс, чтобы посмотреть подробности.",
  titleId = "cases-block-title",
  id,
}: Props) {
  const pool = slugs
    ? slugs.map((slug) => caseIndex.find((item) => item.slug === slug)).filter((item): item is CaseItem => Boolean(item))
    : caseIndex;
  const items = pool.filter((item) => item.slug !== exclude).slice(0, slugs ? pool.length : 3);

  const allLink = (className: string) => (
    <Link href="/cases" className={className}>
      <span className={styles.allLabel}>Все кейсы <span className={styles.count}>{caseIndex.length}</span></span>
      <ActionArrow />
    </Link>
  );

  return (
    <section id={id} className={styles.section} aria-labelledby={titleId}>
      <div className={styles.container}>
        <header className={styles.head}>
          <div>
            <p className={styles.eyebrow}>{eyebrow}</p>
            <h2 id={titleId}>{title}</h2>
          </div>
          <div className={styles.aside}>
            <p>{description}</p>
            {allLink(styles.all)}
          </div>
        </header>

        <ul className={styles.list}>
          {items.map((item, index) => (
            <li key={item.slug} style={{ "--tint": item.tint } as CSSProperties}>
              <CaseCard item={item} index={index} sizes="(max-width: 760px) 84vw, (max-width: 1100px) 60vw, 33vw" />
            </li>
          ))}
        </ul>

        {allLink(`${styles.all} ${styles.allBottom}`)}
      </div>
    </section>
  );
}

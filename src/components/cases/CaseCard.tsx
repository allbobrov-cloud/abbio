import Image from "next/image";
import Link from "next/link";
import { ActionArrow } from "@/components/ActionArrow";
import type { caseIndex } from "@/lib/content";
import styles from "./CaseCard.module.css";

export type CaseItem = (typeof caseIndex)[number];

type Props = {
  item: CaseItem;
  index: number;
  sizes: string;
  priority?: boolean;
};

/* Карточка кейса: обложка на подложке цвета клиента (--tint задаёт родитель), отрасль, название,
   заголовок кейса и направления. Высота обложки — через --cover-h у родителя. */
export function CaseCard({ item, index, sizes, priority = false }: Props) {
  return (
    <Link href={`/cases/${item.slug}`} className={styles.card} aria-label={`Кейс «${item.name}»: ${item.title}`}>
      <span className={`${styles.cover} ${item.coverFit === "contain" ? styles.coverContain : ""}`}>
        <Image src={item.cover} alt="" fill sizes={sizes} style={{ objectPosition: item.coverPosition }} priority={priority} />
        {"overlay" in item && (
          <span className={styles.overlay}>
            <Image src={item.overlay} alt="" fill sizes="(max-width: 760px) 40vw, 18vw" />
          </span>
        )}
      </span>

      <span className={styles.body}>
        <span className={styles.meta}>
          <span className={styles.num}>{String(index + 1).padStart(2, "0")}</span>
          <span>{item.category}</span>
        </span>
        <span className={styles.name}>{item.name}</span>
        <span className={styles.title}>{item.title}</span>
        <span className={styles.foot}>
          <span className={styles.services}>
            {item.services.map((service) => <span key={service}>{service}</span>)}
          </span>
          <span className={styles.cta}>Смотреть кейс <ActionArrow /></span>
        </span>
      </span>
    </Link>
  );
}

import styles from "./CaseSiteLink.module.css";

type Props = {
  /** Адрес сайта клиента — только подтверждённые адреса из материалов проекта. */
  href: string;
  /** Якорь первого раздела кейса. */
  caseHref: string;
  /** Цвет основной кнопки: лавандовый ABBiO или фирменный красный клиента. */
  tone?: "lav" | "red";
  className?: string;
};

/* Кнопки в hero кейса по образцу Стройбазы Волхонка: «Перейти на сайт» и «Смотреть кейс». */
export function CaseSiteLink({ href, caseHref, tone = "lav", className }: Props) {
  return (
    <div className={`${styles.actions} ${className ?? ""}`} data-tone={tone}>
      <a className={styles.primary} href={href} target="_blank" rel="noopener noreferrer">
        Перейти на сайт <span aria-hidden="true">↗</span>
      </a>
      <a className={styles.secondary} href={caseHref}>
        Смотреть кейс <span aria-hidden="true">↓</span>
      </a>
    </div>
  );
}

import Image from "next/image";
import type { ReactNode } from "react";
import { operator } from "@/lib/legal";
import { npFaqFor, npServices, type NpServiceKey } from "@/lib/np/content";
import { NpFaq } from "./NpFaq";
import { NpIcon } from "./NpIcon";
import { NpRequestForm } from "./NpRequestForm";
import styles from "./np.module.css";
import final from "./NpFinal.module.css";

/* Кнопка, открывающая окно заявки с нужной услугой и городом. */
export function NpRequestButton({
  service = "partnership",
  city,
  variant = "primary",
  small = false,
  children,
}: {
  service?: NpServiceKey;
  city?: string;
  variant?: "primary" | "ghost";
  small?: boolean;
  children?: ReactNode;
}) {
  return (
    <button type="button" className={`${variant === "ghost" ? styles.buttonGhost : styles.button} ${small ? styles.buttonSmall : ""}`} data-np-request data-service={service} data-city={city}>
      {children ?? npServices[service].cta}
    </button>
  );
}

/* Первый экран: фото объекта, световые линии потолка, крупный заголовок. */
export function NpHero({
  title,
  lead,
  actions,
  image = "/cases/potolki-hero-bg.avif",
  compact = false,
  aside,
  children,
}: {
  title: ReactNode;
  lead: ReactNode;
  actions?: ReactNode;
  image?: string | null;
  compact?: boolean;
  aside?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className={`${styles.hero} ${compact ? styles.heroCompact : ""}`}>
      {image ? (
        <div className={styles.heroBg} aria-hidden="true">
          <Image src={image} alt="" fill priority sizes="100vw" />
        </div>
      ) : <div className={styles.heroGlow} aria-hidden="true" />}
      <div className={styles.lights} aria-hidden="true"><span /></div>
      <div className={styles.container}>
        <div className={aside ? styles.heroSplit : undefined}>
          <div className={styles.heroInner}>
            <h1 className={styles.h1}>{title}</h1>
            <p className={styles.lead}>{lead}</p>
            {actions && <div className={styles.actions}>{actions}</div>}
          </div>
          {aside}
        </div>
        {children}
      </div>
    </section>
  );
}

export function NpCheckList({ items }: { items: readonly string[] }) {
  return (
    <ul className={styles.checkList}>
      {items.map((item) => (
        <li key={item}><NpIcon name="check" /><span>{item}</span></li>
      ))}
    </ul>
  );
}

/* Что будет после заявки — для города (партнёрство) и для сайта/рекламы. */
export const finalSteps = {
  city: [
    { title: "Уточним задачу", text: "Город, услуги, как сейчас приходят клиенты." },
    { title: "Проверим город", text: "Статус и спрос в поиске." },
    { title: "Предложим формат", text: "Условия и стоимость под вашу задачу." },
  ],
  site: [
    { title: "Посмотрим ваш сайт", text: "Или обсудим, каким должен быть новый." },
    { title: "Подберём решение", text: "Готовый сайт, SEO, Директ — или их сочетание." },
    { title: "Пришлём предложение", text: "Состав работ, сроки и стоимость." },
  ],
} as const;

/* Финал страницы: вопросы на всю ширину, затем акцентная панель заявки. */
export function NpFinal({
  faq,
  service = "partnership",
  title = "Обсудим ваш город",
  steps = finalSteps.city,
}: {
  faq: "hub" | "partner" | "site";
  service?: NpServiceKey;
  title?: string;
  steps?: readonly { title: string; text: string }[];
}) {
  return (
    <>
      <section className={styles.section} aria-labelledby="np-faq" style={{ paddingTop: 0 }}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2} id="np-faq">Вопросы <em>и ответы</em></h2>
          </div>
          <NpFaq items={npFaqFor(faq)} columns />
        </div>
      </section>

      <section className={final.section} id="zayavka" aria-labelledby="np-final">
        <div className={styles.container}>
          <div className={final.panel}>
            <div className={final.copy}>
              <h2 className={styles.h2} id="np-final">{title}</h2>
              <p className={styles.lead}>Оставьте контакты — свяжемся по указанному номеру.</p>
              <ol className={final.next}>
                {steps.map((step) => <li key={step.title}><strong>{step.title}</strong><span>{step.text}</span></li>)}
              </ol>
              <p className={styles.small} style={{ margin: 0 }}>Удобнее письмом — <a href={`mailto:${operator.email}`} className={final.mail}>{operator.email}</a></p>
            </div>
            <div className={final.formCard}>
              <NpRequestForm service={service} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

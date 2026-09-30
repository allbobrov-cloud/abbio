import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { services } from "@/lib/content";
import { DirectionsSpotlight } from "../services/DirectionsSpotlight";
import { MobileFocus } from "./MobileFocus";
import styles from "./HomeServices.module.css";

type Slug = (typeof services)[number]["slug"];

const accents: Record<Slug, string> = {
  design: "#c39bff",
  websites: "#58b8e6",
  marketing: "#9a6dec",
  seo: "#6f9be0",
  "yandex-direct": "#f2b64c",
};

/* Линейные эмблемы направлений — крупно в углу карточки, разгораются при наведении */
const art: Record<Slug, ReactNode> = {
  design: (
    <>
      <text x="14" y="78" className={styles.type}>Aa</text>
      <circle cx="92" cy="30" r="12" /><circle cx="108" cy="54" r="12" /><circle cx="84" cy="70" r="12" />
    </>
  ),
  websites: (
    <>
      <rect x="10" y="16" width="100" height="72" rx="8" />
      <path d="M10 32h100" /><circle cx="20" cy="24" r="2" /><circle cx="28" cy="24" r="2" /><circle cx="36" cy="24" r="2" />
      <path d="M22 48h44M22 58h30" /><rect x="22" y="68" width="30" height="10" rx="5" />
    </>
  ),
  marketing: (
    <>
      <circle cx="24" cy="30" r="8" /><circle cx="24" cy="74" r="8" /><circle cx="96" cy="52" r="12" />
      <path d="M32 30c26 0 30 22 52 22M32 74c26 0 30-22 52-22" /><circle cx="60" cy="52" r="5" />
    </>
  ),
  seo: (
    <>
      <circle cx="46" cy="44" r="24" /><path d="m64 62 22 22" />
      <path d="M32 52l9-8 8 5 12-14" /><path d="M86 30h22M86 42h16M86 54h20" />
    </>
  ),
  "yandex-direct": (
    <>
      <circle cx="58" cy="52" r="34" /><circle cx="58" cy="52" r="20" /><circle cx="58" cy="52" r="6" />
      <path d="m78 32 22-18M92 14h8v8" />
    </>
  ),
};

/*
 * «Пять направлений»: бенто-сетка (2 широкие + 3), у каждого направления свой акцент,
 * линейная эмблема и подсветка за курсором. На телефоне — стопка: карточки наезжают друг на друга,
 * верхняя «оживает» как при наведении (MobileFocus). Тексты — из `services`.
 */
export function HomeServices() {
  return (
    <section id="services" className={styles.section} aria-labelledby="services-title">
      <div className={styles.container}>
        <header className={styles.head}>
          <div>
            <p className={styles.eyebrow}>Пять направлений</p>
            <h2 id="services-title">
              Что нужно{" "}
              <br />
              <em>вашему бизнесу?</em>
            </h2>
          </div>
          <p className={styles.lead}>Подключимся к отдельной задаче или пройдём весь путь вместе.</p>
        </header>

        <DirectionsSpotlight targetId="services" />
        <MobileFocus targetId="services" items="article" mode="stack" />
        <div className={styles.grid}>
          {services.map((service, index) => (
            <article key={service.slug} className={styles.cell} style={{ "--accent": accents[service.slug], "--i": index } as CSSProperties}>
              <Link href={`/services/${service.slug}`} className={styles.card}>
                <svg className={styles.art} viewBox="0 0 120 104" aria-hidden="true">{art[service.slug]}</svg>
                <span className={styles.num}>{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.problem}</p>
                <span className={styles.foot}>
                  <span className={styles.tags}>
                    {service.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </span>
                  <span className={styles.arrow} aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M8 7h9v9" /></svg>
                  </span>
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

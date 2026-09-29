import Link from "next/link";
import { caseIndex, services } from "@/lib/content";
import { operator } from "@/lib/legal";
import { FooterContactForm } from "./FooterContactForm";
import { FooterFrame } from "./FooterFrame";
import { CookieSettingsButton } from "./CookieSettingsButton";
import styles from "./SiteFooter.module.css";

const company = [
  { href: "/services", label: "Все услуги" },
  { href: "/cases", label: "Все кейсы" },
  { href: "/process", label: "Как работаем" },
  { href: "/articles", label: "Статьи" },
];

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

/*
 * Футер сайта: панель «Есть задача?» с формой (скрывается там, где у страницы своя форма —
 * логика в FooterFrame), навигация по услугам, кейсам и разделам, нижняя строка и
 * крупный вордмарк ABBiO как подпись. Телефон не указан до подтверждения владельцем.
 */
export function SiteFooter() {
  return (
    <FooterFrame
      className={styles.footer}
      compactClassName={styles.compact}
      containerClassName={styles.container}
      contact={
        <div className={styles.contact}>
          <div className={styles.contactCopy}>
            <p className={styles.eyebrow}>Начнём с разговора</p>
            <h2>
              Есть задача?{" "}
              <br />
              <em>Давайте обсудим.</em>
            </h2>
            <p className={styles.contactLead}>Сейчас форма только проверяет поля и не отправляет заявку. Чтобы обсудить задачу, напишите на <a href={`mailto:${operator.email}`}>{operator.email}</a>.</p>
            <ul className={styles.promises}>
              <li>Без обязательств</li>
              <li>Разберём задачу</li>
              <li>Предложим первый шаг</li>
            </ul>
          </div>
          <div className={styles.form}>
            <FooterContactForm />
          </div>
        </div>
      }
    >
      <div className={styles.nav}>
        <div className={styles.brandCol}>
          <Link href="/" className={styles.logo} aria-label="ABBiO — на главную">
            ABB<span>i</span>O
          </Link>
          <p>Независимое агентство. Дизайн, сайты и маркетинг — от идеи до обращений.</p>
          <a href="#contact-dialog" data-contact-dialog className={styles.cta}>
            Обсудить задачу <span><Arrow /></span>
          </a>
        </div>

        <nav className={styles.col} aria-label="Услуги">
          <p>Услуги</p>
          <ul>
            {services.map((service) => (
              <li key={service.slug}><Link href={`/services/${service.slug}`}>{service.title}</Link></li>
            ))}
          </ul>
        </nav>

        <nav className={styles.col} aria-label="Кейсы">
          <p>Кейсы</p>
          <ul>
            {caseIndex.map((item) => (
              <li key={item.slug}><Link href={`/cases/${item.slug}`}>{item.name}</Link></li>
            ))}
          </ul>
        </nav>

        <nav className={styles.col} aria-label="Агентство">
          <p>Агентство</p>
          <ul>
            {company.map((item) => (
              <li key={item.href}><Link href={item.href}>{item.label}</Link></li>
            ))}
          </ul>
        </nav>
      </div>

      <div className={styles.bar}>
        <span>© {new Date().getFullYear()} ABBiO</span>
        <span className={styles.requisites}>{operator.name} · ИНН {operator.inn} · ОГРНИП {operator.ogrnip}</span>
        <a className={styles.policy} href={`mailto:${operator.email}`}>{operator.email}</a>
        <Link className={styles.policy} href="/privacy">Политика обработки персональных данных</Link>
        <CookieSettingsButton className={styles.cookieSettings} />
        <a className={styles.top} href="#main">
          Наверх <span aria-hidden="true">↑</span>
        </a>
      </div>

      <div className={styles.signature} aria-hidden="true">ABB<span>i</span>O</div>
    </FooterFrame>
  );
}

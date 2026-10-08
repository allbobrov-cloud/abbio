import Link from "next/link";
import { CookieSettingsButton } from "@/components/CookieSettingsButton";
import { operator } from "@/lib/legal";
import { NP_TITLE, npNav, npRegionsLive } from "@/lib/np/content";
import { NpRequestButton } from "./NpBlocks";
import { NpIcon } from "./NpIcon";
import styles from "./NpFooter.module.css";

const services = [
  { href: "/partnerstvo", label: "Региональное партнёрство", note: "от 15 000 ₽/мес" },
  { href: "/sajt-i-seo#sajt", label: "Готовый сайт", note: "150 000 ₽" },
  { href: "/sajt-i-seo#seo", label: "SEO-продвижение", note: "50 000 ₽/мес" },
  { href: "/sajt-i-seo#direct", label: "Яндекс Директ", note: "30 000 ₽/мес" },
];

export function NpFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <Link href="/" className={styles.brand} aria-label={`${NP_TITLE} — обзор`}>
              {/* eslint-disable-next-line @next/next/no-img-element -- SVG-логотип клиента */}
              <img src="/cases/potolki-logo.svg" alt="" width={110} height={32} />
              <span className={styles.x} aria-hidden="true">×</span>
              <span className={styles.wordmark} aria-hidden="true">ABB<i>i</i>O</span>
            </Link>
            <p className={styles.about}>Сайт, продвижение и заявки из поиска для компаний по натяжным потолкам.</p>
            <NpRequestButton small />
          </div>

          <nav className={styles.col} aria-label="Разделы">
            <p className={styles.colTitle}>Разделы</p>
            <ul>{npNav.map((item) => <li key={item.href}><Link href={item.href}>{item.label}</Link></li>)}</ul>
          </nav>

          <nav className={styles.col} aria-label="Услуги">
            <p className={styles.colTitle}>Услуги</p>
            <ul>
              {services.map((item) => (
                <li key={item.href}><Link href={item.href}>{item.label}<span className={styles.note}>{item.note}</span></Link></li>
              ))}
            </ul>
          </nav>

          <div className={styles.col}>
            <p className={styles.colTitle}>Проект работает</p>
            <ul>
              {npRegionsLive.map((region) => (
                <li key={region.host}>
                  <a href={region.url} target="_blank" rel="noopener" className={styles.city}>
                    <i aria-hidden="true" />{region.city}<NpIcon name="external" className={styles.ext} />
                  </a>
                </li>
              ))}
            </ul>
            <a href={`mailto:${operator.email}`} className={styles.mail}>{operator.email}</a>
          </div>
        </div>
      </div>

      <div className={styles.giant} aria-hidden="true">
        <span className={styles.beam} />
        <span className={styles.giantText}>Потолки Всем</span>
      </div>

      <div className={styles.inner}>
        <div className={styles.bottom}>
          <span>© 2026 {operator.name} · ИНН {operator.inn} · ОГРНИП {operator.ogrnip}</span>
          <span className={styles.links}>
            <a href="https://abbio.ru/privacy">Политика конфиденциальности</a>
            <CookieSettingsButton className={styles.cookie} />
            <a href="https://abbio.ru/">Проект агентства ABBiO</a>
          </span>
        </div>
      </div>
    </footer>
  );
}

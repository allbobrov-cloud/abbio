"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NP_TITLE, npNav } from "@/lib/np/content";
import { NpRequestButton } from "./NpBlocks";
import styles from "./np.module.css";

// На np.abbio.ru адрес в браузере без /np, а внутренний маршрут — с ним: приводим к одному виду.
function visiblePath(pathname: string) {
  const path = pathname.replace(/^\/np(?=\/|$)/, "") || "/";
  return path.length > 1 ? path.replace(/\/$/, "") : path;
}

export function NpHeader() {
  const current = visiblePath(usePathname());
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.bar}>
          <Link href="/" className={styles.brand} aria-label={`${NP_TITLE} — обзор`}>
            {/* eslint-disable-next-line @next/next/no-img-element -- SVG-логотип клиента, оптимизация не нужна */}
            <img src="/cases/potolki-logo.svg" alt="" width={103} height={30} />
            <span className={styles.brandX} aria-hidden="true">×</span>
            <span className={styles.wordmark} aria-hidden="true">ABB<i>i</i>O</span>
          </Link>
          <nav className={styles.nav} aria-label="Разделы">
            {npNav.map((item) => (
              <Link key={item.href} href={item.href} className={styles.navLink} aria-current={current === item.href ? "page" : undefined}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className={styles.barCta}>
            <NpRequestButton small />
          </div>
        </div>
      </div>
    </header>
  );
}

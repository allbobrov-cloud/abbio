"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  OPTIONAL_SERVICES,
  OPEN_COOKIE_SETTINGS,
  readCookieChoice,
  saveCookieChoice,
} from "@/lib/cookieConsent";
import styles from "./CookieBanner.module.css";

const hasOptionalServices = Boolean(OPTIONAL_SERVICES.analytics || OPTIONAL_SERVICES.advertising);

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [advertising, setAdvertising] = useState(false);

  useEffect(() => {
    const reveal = window.setTimeout(() => setVisible(readCookieChoice() === null), 0);
    const openSettings = () => {
      const saved = readCookieChoice();
      setAnalytics(saved?.analytics ?? false);
      setAdvertising(saved?.advertising ?? false);
      setShowSettings(hasOptionalServices);
      setVisible(true);
    };
    window.addEventListener(OPEN_COOKIE_SETTINGS, openSettings);
    return () => {
      window.clearTimeout(reveal);
      window.removeEventListener(OPEN_COOKIE_SETTINGS, openSettings);
    };
  }, []);

  function choose(nextAnalytics: boolean, nextAdvertising: boolean) {
    const wasEnabled = readCookieChoice()?.analytics === true;
    saveCookieChoice({ analytics: nextAnalytics, advertising: nextAdvertising });
    // If storage is blocked, the banner may reappear after a reload.
    setVisible(false);
    setShowSettings(false);
    if (wasEnabled && !nextAnalytics) window.location.reload();
  }

  if (!visible) return null;

  return (
    <section className={`${styles.banner}${hasOptionalServices ? ` ${styles.withOptions}` : ""}`} aria-labelledby="cookie-banner-title" aria-describedby="cookie-banner-description">
      <div className={styles.content}>
        <div className={styles.copy}>
          <h2 id="cookie-banner-title">О cookies</h2>
          {hasOptionalServices ? (
            <p id="cookie-banner-description">Яндекс Метрика помогает понять, как пользуются сайтом. Включим её только с вашего согласия. <Link href="/privacy">Подробнее</Link></p>
          ) : (
            <p id="cookie-banner-description">Аналитики и рекламных cookies пока нет. В браузере сохраняется только ваш выбор. <Link href="/privacy">Подробнее</Link></p>
          )}
        </div>

        {hasOptionalServices && showSettings && (
          <div className={styles.settings}>
            <p>Необходимые технологии <span>Всегда активны</span></p>
            {OPTIONAL_SERVICES.analytics && (
              <label><input type="checkbox" checked={analytics} onChange={(event) => setAnalytics(event.target.checked)} /> <span><strong>{OPTIONAL_SERVICES.analytics.label}</strong><small>{OPTIONAL_SERVICES.analytics.description}</small></span></label>
            )}
            {OPTIONAL_SERVICES.advertising && (
              <label><input type="checkbox" checked={advertising} onChange={(event) => setAdvertising(event.target.checked)} /> <span><strong>{OPTIONAL_SERVICES.advertising.label}</strong><small>{OPTIONAL_SERVICES.advertising.description}</small></span></label>
            )}
          </div>
        )}

        <div className={styles.actions}>
          {hasOptionalServices ? (
            <>
              <button type="button" className={styles.secondary} onClick={() => choose(false, false)}>Отклонить необязательные</button>
              {showSettings ? (
                <button type="button" className={styles.primary} onClick={() => choose(analytics, advertising)}>Сохранить выбор</button>
              ) : (
                <button type="button" className={styles.secondary} onClick={() => setShowSettings(true)}>Настроить</button>
              )}
              <button type="button" className={styles.primary} onClick={() => choose(true, true)}>Разрешить аналитику</button>
            </>
          ) : (
            <button type="button" className={styles.primary} onClick={() => choose(false, false)}>Понятно</button>
          )}
        </div>
      </div>
    </section>
  );
}

"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { COOKIE_CHOICE_CHANGED, hasCookieConsent } from "@/lib/cookieConsent";

const COUNTER_ID = 113202070;
const SCRIPT_ID = "abbio-yandex-metrika";
const DISABLE_KEY = `disableYaCounter${COUNTER_ID}`;

type Metrika = ((id: number, method: string, ...args: unknown[]) => void) & {
  a?: unknown[][];
  l?: number;
};

type MetrikaWindow = Window & {
  ym?: Metrika;
  abbioMetrikaInitialized?: boolean;
  [DISABLE_KEY]?: boolean;
};

function enableMetrika() {
  const browser = window as MetrikaWindow;
  browser[DISABLE_KEY] = false;

  if (browser.abbioMetrikaInitialized) {
    browser.ym?.(COUNTER_ID, "hit", window.location.href);
    return;
  }

  if (!browser.ym) {
    const queue: Metrika = ((...args: Parameters<Metrika>) => {
      (queue.a ||= []).push(args);
    }) as Metrika;
    queue.l = Date.now();
    browser.ym = queue;
  }

  browser.ym(COUNTER_ID, "init", {
    ssr: true,
    webvisor: true,
    clickmap: true,
    ecommerce: "dataLayer",
    referrer: document.referrer,
    url: window.location.href,
    accurateTrackBounce: true,
  });
  browser.abbioMetrikaInitialized = true;

  if (!document.getElementById(SCRIPT_ID)) {
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.async = true;
    script.src = `https://mc.yandex.ru/metrika/tag.js?id=${COUNTER_ID}`;
    document.head.appendChild(script);
  }
}

export function YandexMetrika() {
  const pathname = usePathname();
  const lastPath = useRef(pathname);

  useEffect(() => {
    const syncConsent = () => {
      const allowed = hasCookieConsent("analytics");
      (window as MetrikaWindow)[DISABLE_KEY] = !allowed;
      if (allowed) enableMetrika();
    };
    syncConsent();
    window.addEventListener(COOKIE_CHOICE_CHANGED, syncConsent);
    return () => window.removeEventListener(COOKIE_CHOICE_CHANGED, syncConsent);
  }, []);

  useEffect(() => {
    if (pathname === lastPath.current) return;
    lastPath.current = pathname;
    if (hasCookieConsent("analytics")) {
      (window as MetrikaWindow).ym?.(COUNTER_ID, "hit", window.location.href);
    }
  }, [pathname]);

  return null;
}

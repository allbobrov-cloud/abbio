"use client";

import { OPEN_COOKIE_SETTINGS } from "@/lib/cookieConsent";

export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS))}>
      Настройки cookies
    </button>
  );
}

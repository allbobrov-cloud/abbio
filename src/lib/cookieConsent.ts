export type OptionalCategory = "analytics" | "advertising";
type ServiceDetails = { label: string; description: string };

export type CookieChoice = {
  version: string;
  savedAt: number;
  analytics: boolean;
  advertising: boolean;
};

const STORAGE_KEY = "abbio-cookie-choice";
const CHOICE_LIFETIME = 180 * 24 * 60 * 60 * 1000;

// Change this version and add exact providers/purposes below before enabling a category.
// An acknowledgement of today's notice must never authorize future trackers.
export const CONSENT_VERSION = "2026-09-30-yandex-metrika";
export const OPTIONAL_SERVICES: Record<OptionalCategory, ServiceDetails | null> = {
  analytics: { label: "Аналитика Яндекс Метрики", description: "Помогает понять посещаемость и использование сайта. Включает Вебвизор и cookies Яндекса." },
  advertising: null,
};

export const COOKIE_CHOICE_CHANGED = "abbio:cookie-choice-changed";
export const OPEN_COOKIE_SETTINGS = "abbio:open-cookie-settings";

export function readCookieChoice(): CookieChoice | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const choice: unknown = JSON.parse(raw);
    if (
      !choice ||
      typeof choice !== "object" ||
      !("version" in choice) || choice.version !== CONSENT_VERSION ||
      !("savedAt" in choice) || typeof choice.savedAt !== "number" ||
      choice.savedAt > Date.now() || Date.now() - choice.savedAt > CHOICE_LIFETIME ||
      !("analytics" in choice) || typeof choice.analytics !== "boolean" ||
      !("advertising" in choice) || typeof choice.advertising !== "boolean"
    ) return null;
    return choice as CookieChoice;
  } catch {
    return null;
  }
}

export function saveCookieChoice(options: Pick<CookieChoice, OptionalCategory>) {
  if (typeof window === "undefined") return;

  const choice: CookieChoice = {
    version: CONSENT_VERSION,
    savedAt: Date.now(),
    analytics: Boolean(OPTIONAL_SERVICES.analytics) && options.analytics,
    advertising: Boolean(OPTIONAL_SERVICES.advertising) && options.advertising,
  };

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(choice));
  } catch {
    // Browsers can disable storage. Keep optional services off in that case.
    return;
  }
  window.dispatchEvent(new CustomEvent(COOKIE_CHOICE_CHANGED, { detail: choice }));
}

export function hasCookieConsent(category: OptionalCategory): boolean {
  return Boolean(OPTIONAL_SERVICES[category]) && readCookieChoice()?.[category] === true;
}

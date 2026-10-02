"use client";
import { useEffect, useRef } from "react";
import { hasCookieConsent, COOKIE_CHOICE_CHANGED } from "@/lib/cookieConsent";
export function ArticleAnalytics({ slug, category }: { slug: string; category: string }) {
  const opened = useRef(false);
  useEffect(() => {
    opened.current = false;
    const send = (event: string) => {
      if (!hasCookieConsent("analytics")) return false;
      const browser = window as Window & { ym?: (id: number, method: string, target: string, params: Record<string, string>) => void };
      if (!browser.ym) return false;
      browser.ym(113202070, "reachGoal", event, { article_slug: slug, article_category: category });
      return true;
    };
    const open = () => { if (!opened.current) opened.current = send("article_open"); };
    const click = (event: MouseEvent) => { const target = event.target; if (!(target instanceof Element)) return;
      const name = target.closest<HTMLElement>("[data-article-event]")?.dataset.articleEvent;
      if (name && ["article_cta_click", "article_service_click", "article_case_click", "article_related_click"].includes(name)) send(name); };
    let timer = window.setTimeout(open, 0);
    const consentChanged = () => { window.clearTimeout(timer); timer = window.setTimeout(open, 0); };
    window.addEventListener(COOKIE_CHOICE_CHANGED, consentChanged); document.addEventListener("click", click);
    return () => { window.clearTimeout(timer); window.removeEventListener(COOKIE_CHOICE_CHANGED, consentChanged); document.removeEventListener("click", click); };
  }, [slug, category]);
  return null;
}

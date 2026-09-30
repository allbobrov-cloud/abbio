"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/*
 * Мягкое появление блоков при прокрутке на всех страницах, кроме кейсов.
 * Работает через Web Animations API, поэтому не перебивает собственные CSS-анимации и transition блоков.
 * Первый экран (hero) не трогаем — у него своя анимация входа.
 * Скрываем только то, что целиком ниже экрана: без JS и при возврате назад всё остаётся видимым.
 */

const EASE = "cubic-bezier(.22, 1, .36, 1)";
const CARD_TAGS = new Set(["LI", "ARTICLE", "A"]);

function isDecor(el: Element) {
  if (el.getAttribute("aria-hidden") === "true") return true;
  const s = getComputedStyle(el);
  return s.position === "absolute" || s.position === "fixed" || s.display === "none";
}

/* Спускаемся от секции к контейнеру с содержимым, пропуская декоративные слои. */
function contentRoot(section: Element) {
  let node: Element = section;
  for (let depth = 0; depth < 3; depth++) {
    const kids = [...node.children].filter((k) => !isDecor(k));
    if (kids.length !== 1) break;
    node = kids[0];
  }
  return node;
}

/* Внутри горизонтальной ленты или декоративной иллюстрации карточки не дробим. */
function inScrollerOrDecor(el: Element, stop: Element) {
  for (let node: Element | null = el; node && node !== stop.parentElement; node = node.parentElement) {
    if (node.getAttribute("aria-hidden") === "true") return true;
    if (/(auto|scroll)/.test(getComputedStyle(node).overflowX)) return true;
  }
  return false;
}

/* Группа карточек: 2–12 заметных детей, и все — li / article / a. Ленты, табы и мелкие элементы не дробим. */
function cardGroups(block: Element) {
  const groups: Element[] = [];
  const walk = (el: Element, depth: number) => {
    if (depth > 4) return;
    const kids = [...el.children];
    const isGroup =
      kids.length >= 2 &&
      kids.length <= 12 &&
      kids.every((k) => CARD_TAGS.has(k.tagName)) &&
      !el.closest('[role="tablist"]') &&
      kids.every((k) => {
        const r = k.getBoundingClientRect();
        return r.width >= 96 && r.height >= 36;
      }) &&
      !inScrollerOrDecor(el, block);
    if (isGroup) {
      groups.push(el);
      return;
    }
    kids.forEach((k) => walk(k, depth + 1));
  };
  walk(block, 0);
  return groups;
}

export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/cases")) return;
    const main = document.querySelector("main");
    if (!main || !("IntersectionObserver" in window) || !Element.prototype.animate) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 760px)").matches;
    const shift = reduce ? 0 : mobile ? 18 : 28;
    const duration = reduce ? 500 : mobile ? 700 : 850;

    type Kind = "block" | "head" | "card";
    const kinds = new Map<Element, Kind>();

    const sections = [...main.querySelectorAll("section")].filter((s) => !s.parentElement?.closest("section"));
    sections.slice(1).forEach((section) => {
      const root = contentRoot(section);
      const blocks = [...root.children].filter((k) => !isDecor(k));
      blocks.forEach((block, index) => {
        const groups = cardGroups(block);
        if (index === 0 && block.querySelector("h2") && !groups.length) {
          kinds.set(block, "head");
          return;
        }
        if (groups.length) {
          groups.forEach((g) => [...g.children].forEach((card) => kinds.set(card, "card")));
          return;
        }
        kinds.set(block, "block");
      });
    });

    const viewport = window.innerHeight;
    const pending = [...kinds.keys()].filter((el) => el.getBoundingClientRect().top >= viewport);
    pending.forEach((el) => el.setAttribute("data-reveal", "pending"));

    const play = (el: Element, delay: number) => {
      el.removeAttribute("data-reveal");
      const kind = kinds.get(el);
      const from: Keyframe = { opacity: 0, translate: `0 ${kind === "card" ? shift * 0.8 : shift}px` };
      if (kind === "card" && !reduce) from.scale = "0.985";
      el.animate([from, { opacity: 1, translate: "0 0", scale: "1" }], { duration, delay, easing: EASE, fill: "backwards" });

      if (kind !== "head" || reduce) return;
      // Заголовок выезжает из-под маски, линия у надзаголовка прорисовывается
      const h2 = el.querySelector("h2");
      h2?.animate(
        [
          { clipPath: "inset(0 0 100% 0)", translate: "0 0.3em" },
          { clipPath: "inset(0 0 -20% 0)", translate: "0 0" },
        ],
        { duration: duration + 150, delay: delay + 80, easing: EASE, fill: "backwards" },
      );
      const eyebrow = el.querySelector('[class*="eyebrow"], [class*="kicker"]');
      eyebrow?.animate([{ transform: "scaleX(0)", transformOrigin: "left center" }, { transform: "scaleX(1)", transformOrigin: "left center" }], {
        duration: 700,
        delay: delay + 60,
        easing: EASE,
        fill: "backwards",
        pseudoElement: "::before",
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left);
        visible.forEach((entry, i) => {
          observer.unobserve(entry.target);
          play(entry.target, Math.min(i, 4) * (mobile ? 70 : 90));
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );
    pending.forEach((el) => observer.observe(el));

    // Страховка: элемент уже на уровне экрана, но наблюдатель его не видит (обрезан лентой) — показываем.
    let sweepTimer = 0;
    const sweep = () => {
      window.clearTimeout(sweepTimer);
      sweepTimer = window.setTimeout(() => {
        pending.forEach((el) => {
          if (el.getAttribute("data-reveal") === "pending" && el.getBoundingClientRect().top < window.innerHeight * 0.92) {
            observer.unobserve(el);
            play(el, 0);
          }
        });
      }, 600);
    };
    window.addEventListener("scroll", sweep, { passive: true });

    return () => {
      window.removeEventListener("scroll", sweep);
      window.clearTimeout(sweepTimer);
      observer.disconnect();
      pending.forEach((el) => el.removeAttribute("data-reveal"));
    };
  }, [pathname]);

  return null;
}

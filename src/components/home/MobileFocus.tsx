"use client";

import { useEffect } from "react";

type Props = {
  /** id секции, внутри которой ищем элементы */
  targetId: string;
  /** Селектор элементов (карточек) внутри секции */
  items: string;
  /**
   * stack — карточки-стопка при вертикальной прокрутке: --cover (0…1) у закрытых карточек
   * и data-focus у верхней; carousel — горизонтальная лента: data-focus у карточки в центре.
   */
  mode: "stack" | "carousel";
  /** Индикаторы-точки (для carousel): получают data-focus вместе с карточкой того же индекса */
  dots?: string;
};

/*
 * На телефоне нет наведения — «hover-эффекты» включаем по прокрутке и свайпу.
 * Сам ничего не рисует: ставит data-focus и CSS-переменные, стили — в модуле блока.
 * Работает только до 760px; на десктопе остаётся обычное наведение.
 */
export function MobileFocus({ targetId, items, mode, dots }: Props) {
  useEffect(() => {
    const root = document.getElementById(targetId);
    const query = window.matchMedia("(max-width: 760px)");
    if (!root) return;

    let cleanup = () => {};

    const setup = () => {
      cleanup();
      const els = [...root.querySelectorAll<HTMLElement>(items)];
      const dotEls = dots ? [...root.querySelectorAll<HTMLElement>(dots)] : [];
      const clear = () => {
        els.forEach((el) => {
          el.removeAttribute("data-focus");
          el.style.removeProperty("--cover");
        });
        dotEls.forEach((el) => el.removeAttribute("data-focus"));
      };
      if (!query.matches || !els.length) {
        clear();
        cleanup = () => {};
        return;
      }

      const focus = (index: number) => {
        els.forEach((el, i) => el.toggleAttribute("data-focus", i === index));
        dotEls.forEach((el, i) => el.toggleAttribute("data-focus", i === index));
      };

      if (mode === "stack") {
        let frame = 0;
        const update = () => {
          frame = 0;
          const rects = els.map((el) => el.getBoundingClientRect());
          let active = -1;
          rects.forEach((rect, i) => {
            const next = rects[i + 1];
            const cover = next ? Math.min(1, Math.max(0, 1 - (next.top - rect.top) / rect.height)) : 0;
            els[i].style.setProperty("--cover", cover.toFixed(3));
            if (rect.top < window.innerHeight * 0.45 && rect.bottom > 0) active = i;
          });
          focus(active);
        };
        const onScroll = () => {
          if (!frame) frame = requestAnimationFrame(update);
        };
        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        cleanup = () => {
          window.removeEventListener("scroll", onScroll);
          window.removeEventListener("resize", onScroll);
          cancelAnimationFrame(frame);
          clear();
        };
        return;
      }

      // carousel: карточка, которая больше всего видна в ленте
      const scroller = els[0].parentElement;
      const ratios = new Map<Element, number>();
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => ratios.set(e.target, e.intersectionRatio));
          let best = 0;
          let bestRatio = -1;
          els.forEach((el, i) => {
            const r = ratios.get(el) ?? 0;
            if (r > bestRatio + 0.01) {
              best = i;
              bestRatio = r;
            }
          });
          focus(best);
        },
        { root: scroller, threshold: [0, 0.25, 0.5, 0.75, 1] },
      );
      els.forEach((el) => observer.observe(el));
      focus(0);
      cleanup = () => {
        observer.disconnect();
        clear();
      };
    };

    setup();
    query.addEventListener("change", setup);
    return () => {
      query.removeEventListener("change", setup);
      cleanup();
    };
  }, [targetId, items, mode, dots]);

  return null;
}

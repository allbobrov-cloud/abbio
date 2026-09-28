"use client";

import { useEffect } from "react";

/* Передаёт карточкам направлений положение курсора (--mx/--my) для подсветки при наведении.
   Сам ничего не рисует; работает только с мышью/тачпадом. */
export function DirectionsSpotlight({ targetId }: { targetId: string }) {
  useEffect(() => {
    const root = document.getElementById(targetId);
    if (!root || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const onMove = (event: PointerEvent) => {
      const card = (event.target as Element | null)?.closest("article");
      if (!card || !root.contains(card)) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      card.style.setProperty("--my", `${event.clientY - rect.top}px`);
    };

    root.addEventListener("pointermove", onMove);
    return () => root.removeEventListener("pointermove", onMove);
  }, [targetId]);

  return null;
}

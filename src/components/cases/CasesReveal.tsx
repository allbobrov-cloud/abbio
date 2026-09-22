"use client";

import { useEffect, useLayoutEffect } from "react";

const useArmingEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/*
 * Однократное появление кадров и текста кейсов при входе в экран.
 * Базовое состояние — финальное: без JS или при reduced motion ничего не скрывается.
 */
export function CasesReveal({ targetId }: { targetId: string }) {
  useArmingEffect(() => {
    const root = document.getElementById(targetId);
    if (!root) {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    root.setAttribute("data-armed", "true");
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-in", "true");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    items.forEach((item) => observer.observe(item));

    return () => {
      observer.disconnect();
      root.removeAttribute("data-armed");
    };
  }, [targetId]);

  return null;
}

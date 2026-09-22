"use client";

import Image from "next/image";
import Link from "next/link";
import { ActionArrow } from "@/components/ActionArrow";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./BogovFinal.module.css";

// Состояние появления выставляется до первой отрисовки, иначе финал успевает мигнуть.
const useArmingEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/* Пять результатов кейса — короткие отсылки к уже показанным блокам, без повтора деталей. */
const points = [
  { key: "site", n: "01", verb: "С нуля", label: "Сайт", x: 170, y: 22 },
  { key: "mobile", n: "02", verb: "Адаптировали", label: "Desktop + Mobile", x: 60, y: 300 },
  { key: "leads", n: "03", verb: "Связали", label: "Обращения + источники", x: 790, y: 175 },
  { key: "seo", n: "04", verb: "Развили", label: "SEO", x: 690, y: 22 },
  { key: "ads", n: "05", verb: "Усилили", label: "Рекламу", x: 560, y: 392 },
] as const;

const SITE = { x: 310, y: 66, w: 380 };
const SITE_BOTTOM = Math.round(SITE.y + (SITE.w * 654) / 1363);
const SITE_CENTER_X = SITE.x + SITE.w / 2;
const MOBILE = { x: 246, y: SITE_BOTTOM - 42, w: 116 };

function anchor(point: (typeof points)[number]) {
  const cx = point.x + 60;
  const cy = point.y + 10;
  const tx = point.x < SITE.x ? SITE.x : point.x > SITE.x + SITE.w ? SITE.x + SITE.w : SITE_CENTER_X;
  const ty = point.y < SITE.y ? SITE.y : point.y > SITE_BOTTOM ? SITE_BOTTOM : (SITE.y + SITE_BOTTOM) / 2;
  return `M ${cx} ${cy} Q ${(cx + tx) / 2} ${(cy + ty) / 2} ${tx} ${ty}`;
}

/* 0 сайт · 1 desktop+mobile · 2 обращения · 3 seo · 4 реклама · 5 система целиком · 6 итог */
const FINAL = 6;
const SEQUENCE = [
  { phase: 0, at: 0 },
  { phase: 1, at: 450 },
  { phase: 2, at: 850 },
  { phase: 3, at: 1250 },
  { phase: 4, at: 1650 },
  { phase: 5, at: 2050 },
  { phase: 6, at: 2500 },
];

function Stage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(FINAL);
  const [armed, setArmed] = useState(false);

  useArmingEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    setArmed(true);
    setPhase(-1);

    let timers: number[] = [];
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }
        observer.disconnect();
        timers = SEQUENCE.map((item) =>
          window.setTimeout(() => setPhase(item.phase), item.at)
        );
      },
      { threshold: 0.2 }
    );
    observer.observe(root);
    return () => {
      observer.disconnect();
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  const on = (from: number) => (phase >= from ? styles.isIn : "");

  return (
    <div
      ref={rootRef}
      className={styles.stage}
      data-armed={armed ? "true" : undefined}
    >
      <svg className={styles.lines} viewBox="0 0 1000 470" aria-hidden="true">
        {points.map((point, index) => (
          <path
            key={point.key}
            className={`${styles.link} ${styles.draw} ${on(index + 1)}`}
            pathLength={1}
            d={anchor(point)}
          />
        ))}
      </svg>

      <div
        className={`${styles.site} ${styles.rev} ${on(0)}`}
        style={{ left: `${(SITE.x / 1000) * 100}%`, top: `${(SITE.y / 470) * 100}%`, width: `${(SITE.w / 1000) * 100}%` }}
      >
        <Image
          src="/cases/bogov-desktop.avif"
          alt="Сайт bogov-team.ru"
          fill
          sizes="(max-width: 760px) 92vw, 40vw"
        />
      </div>
      <div
        className={`${styles.mobile} ${styles.rev} ${on(1)}`}
        style={{ left: `${(MOBILE.x / 1000) * 100}%`, top: `${(MOBILE.y / 470) * 100}%`, width: `${(MOBILE.w / 1000) * 100}%` }}
      >
        <Image
          src="/cases/bogov-mobile.avif"
          alt="Мобильная версия сайта bogov-team.ru"
          fill
          sizes="14vw"
        />
      </div>

      {points.map((point, index) => (
        <span
          key={point.key}
          className={`${styles.point} ${styles.rev} ${on(index + 1)}`}
          style={{ left: `${(point.x / 1000) * 100}%`, top: `${(point.y / 470) * 100}%` }}
        >
          <i>{point.n}</i>
          <b>{point.verb}</b>
          {point.label}
        </span>
      ))}
    </div>
  );
}

export function BogovFinal({
  next,
  service,
}: {
  next: { slug: string; name: string };
  service: string;
}) {
  return (
    <section id="final" className={styles.section} aria-labelledby="final-title">
      <div className={styles.container}>
        <header className={styles.head}>
          <p className={styles.eyebrow}>Итог</p>
          <h2
            id="final-title"
            aria-label="Сайт перестал быть просто страницей мотошколы."
          >
            Сайт перестал быть
            <br />
            <em>просто страницей мотошколы.</em>
          </h2>
        </header>

        <Stage />

        <p className={styles.statement}>
          Он стал частью системы привлечения и обработки обращений.
        </p>

        <div className={styles.actions}>
          <a
            className={styles.cta}
            href="#contact-dialog"
            data-contact-dialog
          >
            Обсудить похожую задачу <ActionArrow />
          </a>
          <div className={styles.links}>
            <Link href={`/cases/${next.slug}`}>
              Следующий проект: {next.name}
              <span aria-hidden="true">→</span>
            </Link>
            <Link href={`/services/${service}`}>
              Подробнее об услуге<span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

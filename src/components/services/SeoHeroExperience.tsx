"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./SeoHeroExperience.module.css";

const QUERY = "профильная труба 09г2с купить спб";

const results = [
  {
    title: "Профильная труба — купить в Санкт-Петербурге",
    domain: "metallobazav.ru",
    snippet: "Размеры, наличие и цены на профильную трубу 09Г2С.",
    match: true,
  },
  {
    title: "Профильная труба 09Г2С",
    domain: "example.ru",
    snippet: "Технические характеристики и сортамент.",
    match: false,
  },
  {
    title: "Металлопрокат в Санкт-Петербурге",
    domain: "example.ru",
    snippet: "Каталог металлопроката с доставкой по городу.",
    match: false,
  },
] as const;

const sizes = ["40×40×2", "60×40×3", "80×80×4"] as const;

type Stage = "typing" | "serp" | "match" | "page" | "cta" | "lead";
const STAGE_ORDER: Stage[] = ["typing", "serp", "match", "page", "cta", "lead"];
const stageIndex = (s: Stage) => STAGE_ORDER.indexOf(s);

export function SeoHeroExperience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState<Stage>("typing");
  const [typedLength, setTypedLength] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || started) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }
        setStarted(true);
        observer.disconnect();

        if (reduceMotion) {
          setTypedLength(QUERY.length);
          setStage("lead");
          return;
        }

        let i = 0;
        const typeInterval = setInterval(() => {
          i += 1;
          setTypedLength(Math.min(i, QUERY.length));
          if (i >= QUERY.length) {
            clearInterval(typeInterval);
          }
        }, 24);

        const timers = [
          setTimeout(() => setStage("serp"), 950),
          setTimeout(() => setStage("match"), 1350),
          setTimeout(() => setStage("page"), 1750),
          setTimeout(() => setStage("cta"), 2150),
          setTimeout(() => setStage("lead"), 2500),
        ];

        return () => {
          clearInterval(typeInterval);
          timers.forEach(clearTimeout);
        };
      },
      { threshold: 0.35 }
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [started]);

  const reached = (s: Stage) => stageIndex(stage) >= stageIndex(s);
  const showSerp = stage === "serp" || stage === "match";
  const showPage = reached("page");

  return (
    <div
      ref={rootRef}
      className={styles.stageRoot}
      role="img"
      aria-label="Поисковый запрос «профильная труба 09г2с купить спб» приводит к релевантной странице каталога и превращается в обращение с сохранённым источником"
    >
      <div className={styles.searchBarWrap} aria-hidden="true">
        <p className={styles.eyebrowSmall}>01 / Запрос</p>
        <div className={styles.searchBar}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="6.5" />
            <path d="M20 20l-4.3-4.3" />
          </svg>
          <span>{QUERY.slice(0, typedLength)}<i className={styles.caret} /></span>
        </div>
      </div>

      <div className={styles.resultStage} aria-hidden="true">
        <div className={[styles.serp, showSerp ? styles.serpVisible : ""].join(" ")}>
          {results.map((r, index) => (
            <div
              key={r.domain + index}
              className={[styles.serpItem, r.match ? styles.serpItemMatch : ""].join(" ")}
            >
              {r.match && reached("match") && <span className={styles.matchLabel}>Отвечает запросу</span>}
              <strong>{r.title}</strong>
              <cite>{r.domain}</cite>
              <p>{r.snippet}</p>
            </div>
          ))}
        </div>

        <div className={[styles.pagePreview, showPage ? styles.pageVisible : ""].join(" ")}>
          <div className={styles.pageChrome}>
            <span>metallobazav.ru</span>
          </div>
          <p className={styles.pageEyebrow}>Каталог / Профильная труба</p>
          <strong className={styles.pageTitle}>Профильная труба 09Г2С</strong>
          <p className={styles.pageLead}>Размеры и наличие</p>
          <div className={styles.pageSizes}>
            {sizes.map((s) => <span key={s}>{s}</span>)}
          </div>
          <div className={[styles.pageCta, reached("cta") ? styles.pageCtaActive : ""].join(" ")}>
            Получить расчёт <b>→</b>
          </div>
        </div>
      </div>

      <div className={[styles.leadCard, reached("lead") ? styles.leadVisible : ""].join(" ")} aria-hidden="true">
        <div className={styles.leadTop}>
          <span>Новое обращение</span>
        </div>
        <strong>Профильная труба 09Г2С</strong>
        <dl>
          <div><dt>Источник</dt><dd>Органический поиск</dd></div>
          <div><dt>Запрос</dt><dd>«{QUERY}»</dd></div>
        </dl>
        <span className={styles.leadStatus}><i />Новая</span>
      </div>
    </div>
  );
}

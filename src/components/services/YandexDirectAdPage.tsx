"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./YandexDirectAdPage.module.css";

const QUERY = "женское пальто купить спб";
const BRAND = "FORMA";

type Stage = "query" | "ad" | "match" | "cta" | "signal" | "url" | "image" | "annotations";
const STAGE_ORDER: Stage[] = ["query", "ad", "match", "cta", "signal", "url", "image", "annotations"];
const stageIndex = (s: Stage) => STAGE_ORDER.indexOf(s);

export function YandexDirectAdPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState<Stage>("query");
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
          setStage("annotations");
          return;
        }

        const timers = [
          setTimeout(() => setStage("ad"), 300),
          setTimeout(() => setStage("match"), 600),
          setTimeout(() => setStage("cta"), 900),
          setTimeout(() => setStage("signal"), 1100),
          setTimeout(() => setStage("url"), 1400),
          setTimeout(() => setStage("image"), 1600),
          setTimeout(() => setStage("annotations"), 1900),
        ];
        return () => timers.forEach(clearTimeout);
      },
      { threshold: 0.3 }
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [started]);

  const reached = (s: Stage) => stageIndex(stage) >= stageIndex(s);

  return (
    <div
      ref={rootRef}
      className={styles.composition}
      role="img"
      aria-label={`Демонстрация соответствия: запрос «${QUERY}» продолжается в рекламном объявлении ${BRAND} «Женские пальто — новая коллекция» и ведёт на страницу /women/coats с тем же предложением`}
    >
      <div className={styles.leftCol}>
        <div className={[styles.queryBlock, reached("query") ? styles.revealed : ""].join(" ")} aria-hidden="true">
          <p className={styles.microLabel}>01 / Запрос</p>
          <div className={styles.searchBar}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5" />
              <path d="M20 20l-4.3-4.3" />
            </svg>
            <span>женское <em className={reached("match") ? styles.matched : ""}>пальто</em> купить спб</span>
          </div>
          <div className={styles.intentRow}>
            <span><b>Намерение</b> Купить</span>
            <span><b>Гео</b> Санкт-Петербург</span>
          </div>
        </div>

        <p className={[styles.annotation, reached("ad") ? styles.revealed : ""].join(" ")} aria-hidden="true">
          <b>01</b>Запрос совпадает
        </p>

        <div className={[styles.adBlock, reached("ad") ? styles.revealed : ""].join(" ")} aria-hidden="true">
          <p className={styles.microLabel}>02 / Объявление</p>
          <div className={styles.adCard}>
            <p className={styles.adLabel}>Реклама</p>
            <p className={styles.adBrand}>{BRAND}</p>
            <strong className={styles.adHeadline}>Женские <em className={reached("match") ? styles.matched : ""}>пальто</em> — новая коллекция</strong>
            <p className={styles.adCopy}>Прямой крой · размеры XS–XL</p>
            <p className={styles.adCopy}>Доставка по Санкт-Петербургу</p>
            <span className={[styles.adCta, reached("cta") ? styles.ctaActive : ""].join(" ")}>
              Смотреть коллекцию <b aria-hidden="true">→</b>
            </span>
          </div>
        </div>

        <p className={[styles.annotation, reached("annotations") ? styles.revealed : ""].join(" ")} aria-hidden="true">
          <b>02</b>Объявление отвечает на потребность
        </p>
      </div>

      <div className={styles.centerCol} aria-hidden="true">
        <svg className={styles.trajectory} viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            className={[styles.trajectoryPath, reached("signal") ? styles.trajectoryPathActive : ""].join(" ")}
            d="M4,20 C 40,20 40,80 96,80"
            vectorEffect="non-scaling-stroke"
          />
          <circle
            className={[styles.signal, reached("signal") ? styles.signalActive : ""].join(" ")}
            cx="96"
            cy="80"
            r="1.7"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <div className={styles.centerCopy}>
          <p className={styles.microLabel}>03 / Переход</p>
          <p className={[styles.statement, reached("signal") ? styles.revealed : ""].join(" ")}>После клика — именно то, что обещали.</p>
          <span className={[styles.urlTag, reached("url") ? styles.revealed : ""].join(" ")}>/women/coats</span>
        </div>
      </div>

      <div className={styles.rightCol}>
        <div className={styles.imageWrap}>
          <div className={styles.imageGlow} aria-hidden="true" />
          <div className={[styles.imageFrame, reached("image") ? styles.revealed : ""].join(" ")}>
            <Image
              src="/services/yandex-direct-forma-coats-landing-v1.webp"
              alt="Демонстрационная страница категории женских пальто вымышленного бренда FORMA"
              fill
              style={{ objectFit: "contain" }}
              sizes="(max-width: 900px) calc(100vw - 64px), 620px"
            />
          </div>
        </div>
        <p className={[styles.annotation, styles.annotationOutside, reached("annotations") ? styles.revealed : ""].join(" ")} aria-hidden="true">
          <b>04</b>Следующий шаг понятен
        </p>
      </div>
    </div>
  );
}

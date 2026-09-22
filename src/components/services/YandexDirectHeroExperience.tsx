"use client";

import { useEffect, useRef, useState } from "react";
import { FashionCategoryPreview } from "./FashionCategoryPreview";
import styles from "./YandexDirectHeroExperience.module.css";

const QUERY = "женское пальто купить спб";
const BRAND = "FORMA";

type Stage = "typing" | "ad" | "match" | "page" | "product" | "order" | "attribution";
const STAGE_ORDER: Stage[] = ["typing", "ad", "match", "page", "product", "order", "attribution"];
const stageIndex = (s: Stage) => STAGE_ORDER.indexOf(s);

export function YandexDirectHeroExperience() {
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
          setStage("attribution");
          return;
        }

        let i = 0;
        const typeInterval = setInterval(() => {
          i += 1;
          setTypedLength(Math.min(i, QUERY.length));
          if (i >= QUERY.length) {
            clearInterval(typeInterval);
          }
        }, 22);

        const timers = [
          setTimeout(() => setStage("ad"), 800),
          setTimeout(() => setStage("match"), 1100),
          setTimeout(() => setStage("page"), 1500),
          setTimeout(() => setStage("product"), 1800),
          setTimeout(() => setStage("order"), 2100),
          setTimeout(() => setStage("attribution"), 2350),
        ];

        return () => {
          clearInterval(typeInterval);
          timers.forEach(clearTimeout);
        };
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
      className={styles.stageRoot}
      role="img"
      aria-label={`Демонстрация: запрос «${QUERY}» приводит к рекламному объявлению ${BRAND}, объявление ведёт на страницу женских пальто, покупатель выбирает товар и оформляет заказ с сохранённым источником «Яндекс Директ» и кампанией «Женские пальто»`}
    >
      <svg className={styles.trajectory} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path
          className={styles.trajectoryPath}
          d="M22 30 C 40 30, 34 58, 52 60 S 66 34, 82 26"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
        <circle
          className={[styles.trajectorySignal, reached("match") && !reached("page") ? styles.trajectorySignalActive : ""].join(" ")}
          r="1.6"
          vectorEffect="non-scaling-stroke"
        >
          <animateMotion dur="0.9s" begin="indefinite" fill="freeze" path="M22 30 C 40 30, 34 58, 52 60 S 66 34, 82 26" />
        </circle>
      </svg>

      <div className={styles.leftCol}>
        <div className={styles.searchWrap} aria-hidden="true">
          <p className={styles.microLabel}>Спрос</p>
          <div className={styles.searchBar}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5" />
              <path d="M20 20l-4.3-4.3" />
            </svg>
            <span>{QUERY.slice(0, typedLength)}<i className={styles.caret} /></span>
          </div>
          <div className={styles.intentRow}>
            <span><b>Намерение</b> Купить</span>
            <span><b>География</b> Санкт-Петербург</span>
          </div>
        </div>

        <div className={[styles.adCard, reached("ad") ? styles.adVisible : "", reached("match") ? styles.adMatched : ""].join(" ")} aria-hidden="true">
          <p className={styles.adLabel}>Реклама</p>
          <p className={styles.adBrand}>{BRAND}</p>
          <strong className={styles.adHeadline}>Женские <em>пальто</em> — новая коллекция</strong>
          <p className={styles.adCopy}>Прямой крой · базовые цвета · размеры XS–XL</p>
          <p className={styles.adCopy}>Доставка по Санкт-Петербургу</p>
          <div className={styles.adQuickLinks}>
            <span>Пальто</span><span>Тренчи</span><span>Новинки</span>
          </div>
          <span className={styles.adCta}>Смотреть коллекцию <b aria-hidden="true">→</b></span>
        </div>

        <p className={[styles.annotationLine, reached("match") ? styles.annotationVisible : ""].join(" ")} aria-hidden="true">
          Запрос <b aria-hidden="true">→</b> объявление <b aria-hidden="true">→</b> нужная страница
        </p>
      </div>

      <div className={styles.rightCol}>
        <div className={[styles.pageWrap, reached("page") ? styles.pageVisible : ""].join(" ")}>
          <FashionCategoryPreview
            brand={BRAND}
            title="Женские пальто"
            eyebrow="Новая коллекция"
            filters={["Все", "Прямой крой", "Оверсайз", "Демисезонные"]}
            products={[
              { name: "Line 01", variant: "straight", sizes: "XS–XL", swatches: 3 },
              { name: "Form 02", variant: "oversize", sizes: "XS–XL", swatches: 3 },
              { name: "Soft 03", variant: "structured", sizes: "XS–XL", swatches: 3 },
            ]}
            ctaLabel="Выбрать пальто"
            ctaActive={reached("product")}
          />
        </div>

        <div className={[styles.orderCard, reached("order") ? styles.orderVisible : ""].join(" ")} aria-hidden="true">
          <div className={styles.orderTop}><span>Новый заказ</span></div>
          <strong>Пальто Form 02</strong>
          <p className={styles.orderSize}>Размер <b>M</b></p>
          <dl className={[styles.orderMeta, reached("attribution") ? styles.orderMetaVisible : ""].join(" ")}>
            <div><dt>Источник</dt><dd>Яндекс Директ</dd></div>
            <div><dt>Кампания</dt><dd>Женские пальто</dd></div>
            <div><dt>Запрос</dt><dd>«{QUERY}»</dd></div>
          </dl>
          <span className={styles.orderStatus}><i />Новый</span>
        </div>
      </div>
    </div>
  );
}

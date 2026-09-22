"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./ServicesOverviewPage.module.css";

const HERO_ROUTE_PATH =
  "M18,14 C45,8 65,18 71,29 C55,45 25,55 17,77 C35,90 65,88 83,81";

function useAnimatedCount(target: number, active: boolean, duration = 1200) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) {
      return;
    }

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, duration, target]);

  return value;
}

function TrafficNumber({ value, active }: { value: number; active: boolean }) {
  const count = useAnimatedCount(value, active);
  return <>{count.toLocaleString("ru-RU")}</>;
}

export function ServicesHeroVisual() {
  const rootRef = useRef<HTMLDivElement>(null);
  const trafficRef = useRef<HTMLDivElement>(null);
  const [countersActive, setCountersActive] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!canHover) {
      return;
    }

    let frame = 0;

    const handleMove = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        root.style.setProperty("--hero-px", px.toFixed(3));
        root.style.setProperty("--hero-py", py.toFixed(3));
      });
    };

    const handleLeave = () => {
      cancelAnimationFrame(frame);
      root.style.setProperty("--hero-px", "0");
      root.style.setProperty("--hero-py", "0");
    };

    root.addEventListener("pointermove", handleMove);
    root.addEventListener("pointerleave", handleLeave);
    return () => {
      root.removeEventListener("pointermove", handleMove);
      root.removeEventListener("pointerleave", handleLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const node = trafficRef.current;
    if (!node) {
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setCountersActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className={styles.heroComposition}
      role="img"
      aria-label="Дизайн-система превращается в сайт, к нему приходит спрос из SEO и рекламы, а результат фиксируется как новая заявка"
    >
      <svg className={styles.heroRoute} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path className={styles.heroRouteBase} d={HERO_ROUTE_PATH} />
        <path className={styles.heroRouteSignal} d={HERO_ROUTE_PATH} />
      </svg>

      <div className={styles.heroCompositionInner} aria-hidden="true">
        <div className={styles.heroDesignPanel}>
          <div className={styles.heroUiLabel}><span>01 / Design</span><i /></div>
          <div className={styles.heroDesignTitle}>Design system</div>
          <div className={styles.heroTypeSample}>
            <strong>Aa</strong>
            <span>Inter<br /><small>Typography / 01</small></span>
          </div>
          <div className={styles.heroDesignTools}>
            <div className={styles.heroSwatches}><i /><i /><i /></div>
            <span className={styles.heroMiniButton}>Button <b>→</b></span>
          </div>
          <div className={styles.heroGridSample}><i /><i /><i /><i /><i /><i /></div>
        </div>

        <div className={styles.heroBrowser}>
          <div className={styles.heroBrowserBar}>
            <div><i /><i /><i /></div>
            <span>abb.io / project</span>
            <b>02 / Web</b>
          </div>
          <div className={styles.heroBrowserPage}>
            <div className={styles.heroBrowserNav}><strong>ABB<span>.IO</span></strong><i /><i /><i /></div>
            <p>Сайт, который<br />помогает выбрать.</p>
            <small>Понятное предложение и следующий шаг.</small>
            <span className={styles.heroBrowserButton}>Обсудить задачу <b>→</b></span>
            <div className={styles.heroBrowserBlocks}><i /><i /><i /></div>
          </div>
        </div>

        <div className={styles.heroTraffic} ref={trafficRef}>
          <div className={styles.heroUiLabel}><span>03 / Acquisition</span><i /></div>
          <div className={styles.heroSource}>
            <span><small>Поиск</small>SEO</span>
            <strong><TrafficNumber value={1240} active={countersActive} /> <small>переходов</small></strong>
          </div>
          <div className={styles.heroSource}>
            <span><small>Реклама</small>Директ</span>
            <strong><TrafficNumber value={680} active={countersActive} /> <small>переходов</small></strong>
          </div>
        </div>

        <div className={styles.heroLead}>
          <div className={styles.heroUiLabel}><span>04 / Lead</span><i /></div>
          <p>Новая заявка</p>
          <strong>Анна</strong>
          <span>Корпоративный сайт</span>
          <dl>
            <div><dt>Источник</dt><dd>SEO</dd></div>
            <div><dt>Статус</dt><dd><i /> В работе</dd></div>
          </dl>
        </div>
      </div>
    </div>
  );
}

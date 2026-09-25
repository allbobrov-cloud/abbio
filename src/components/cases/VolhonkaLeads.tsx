"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./VolhonkaLeads.module.css";

// Состояние появления выставляется до первой отрисовки, иначе финал успевает мигнуть.
const useArmingEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

function Arrow({ tone }: { tone: 1 | 2 | 3 }) {
  return (
    <span className={`${styles.arrow} ${styles[`t${tone}`]}`} aria-hidden="true">
      <i />
      <svg viewBox="0 0 14 14">
        <path d="M2 1.5 11 7l-9 5.5" />
      </svg>
    </span>
  );
}

export function VolhonkaLeads() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(true);
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
    setSeen(false);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }
        observer.disconnect();
        setSeen(true);
      },
      { threshold: 0.2 }
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="leads" className={styles.section} aria-labelledby="vleads-title">
      <div
        ref={rootRef}
        className={`${styles.stage} ${seen ? styles.seen : ""}`}
        data-armed={armed ? "true" : undefined}
      >
        <div className={styles.glow} aria-hidden="true" />

        <div className={`${styles.copy} ${styles.rev}`}>
          <p className={styles.eyebrow}>
            <b>05</b> · Трафик → обращения
          </p>
          <h2 id="vleads-title">
            Видимость превращается{" "}
            <br />
            в <em>обращения.</em>
          </h2>
          <p className={styles.description}>
            От поискового запроса до обращения — выстроили понятный путь клиента
            и связали его с аналитикой.
          </p>
        </div>

        <ol className={styles.chain}>
          {/* 1. Поиск */}
          <li className={`${styles.step} ${styles.s1} ${styles.rev}`} style={{ transitionDelay: "0.35s" }}>
            <div className={`${styles.box} ${styles.search}`}>
              {/* Официальный логотип Яндекса (yastatic.net/q/logoaas), сохранён локально */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className={styles.yandex} src="/cases/yandex-logo.svg" alt="Яндекс" width="91" height="37" />
              <div className={styles.field}>
                <span>профильная труба 09г2с</span>
                <span className={styles.fbtn}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="10.5" cy="10.5" r="6.5" />
                    <path d="m15.5 15.5 5 5" />
                  </svg>
                </span>
              </div>
            </div>
            <h3>Поиск</h3>
            <p>Находит Металлобазу Волхонка <br />по целевому запросу.</p>
          </li>
          <Arrow tone={1} />

          {/* 2. Страница */}
          <li className={`${styles.step} ${styles.s2} ${styles.rev}`} style={{ transitionDelay: "0.6s" }}>
            <div className={`${styles.box} ${styles.page}`}>
              <div className={styles.url} aria-hidden="true">
                <svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
                metallobazav.ru/truba-profilnaya-09g2s
              </div>
              <div className={styles.pageBody}>
                <span className={styles.photo}>
                  <Image
                    src="/cases/volhonka-leads-pipe.avif"
                    alt="Профильная труба"
                    fill
                    sizes="(max-width: 900px) 90vw, 500px"
                  />
                </span>
                <span className={styles.pageText}>
                  <b>Труба профильная 09Г2С</b>
                  <i /><i />
                  <em>Запросить предложение</em>
                </span>
              </div>
            </div>
            <h3>Страница</h3>
            <p>Попадает сразу <br />на нужное предложение.</p>
          </li>
          <Arrow tone={2} />

          {/* 3. Действие */}
          <li className={`${styles.step} ${styles.s3} ${styles.rev}`} style={{ transitionDelay: "0.85s" }}>
            <div className={`${styles.box} ${styles.action}`}>
              <span className={styles.cta}>Запросить предложение</span>
              <span className={styles.alt}>
                <span>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z" />
                  </svg>
                  Позвонить
                </span>
                <span>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M4 5h16v11H9l-5 4V5Z" />
                  </svg>
                  Написать
                </span>
              </span>
            </div>
            <h3>Действие</h3>
            <p>Выбирает удобный <br />способ связаться.</p>
          </li>
          <Arrow tone={3} />

          {/* 4. Обращение */}
          <li className={`${styles.step} ${styles.s4} ${styles.rev}`} style={{ transitionDelay: "1.1s" }}>
            <div className={`${styles.box} ${styles.lead}`}>
              <span className={styles.user}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="9" r="3.6" />
                  <path d="M5 20c.8-3.6 3.6-5.4 7-5.4s6.2 1.8 7 5.4" />
                </svg>
              </span>
              <span className={styles.leadText}>
                <b>Новое обращение</b>
                Клиент заинтересован <br />в предложении.
              </span>
            </div>
            <h3>Обращение</h3>
            <p>Источник и действие сохраняются <br />вместе с обращением.</p>
          </li>
        </ol>

        <p className={`${styles.final} ${styles.rev} ${styles.d5}`}>
          <span>Важно не только привести трафик.</span>
          <em>Важно понимать, что приводит обращения.</em>
        </p>
      </div>
    </section>
  );
}

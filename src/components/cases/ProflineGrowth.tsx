"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./ProflineGrowth.module.css";

// Состояние появления выставляется до первой отрисовки, иначе финал успевает мигнуть.
const useArmingEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/* «Было → Стало» собрано HTML/CSS; фото — отдельные файлы public/cases/profline-cat-*.webp (1536 × 1024). */
const NOW = [
  { key: "tile", title: ["Металлочерепица"], src: "/cases/profline-cat-tile.webp", alt: "Металлочерепица на крыше" },
  { key: "roofing", title: ["Кровельные", "материалы"], src: "/cases/profline-cat-roofing.webp", alt: "Кровельные материалы: фальцевая кровля и доборные элементы" },
  { key: "sandwich", title: ["Сэндвич-панели"], src: "/cases/profline-cat-sandwich.webp", alt: "Сэндвич-панели с минераловатным утеплителем" },
  { key: "facade", title: ["Фасадные материалы"], src: "/cases/profline-cat-facade.webp", alt: "Фасад из металлических панелей" },
  { key: "fence", title: ["Заборы и ограждения"], src: "/cases/profline-cat-fence.webp", alt: "Забор из металлических панелей" },
] as const;
const points = [
  { text: ["Больше возможностей", "для клиентов"], icon: "m12 3 8 4.2v9.6L12 21l-8-4.2V7.2L12 3ZM4 7.2l8 4.3 8-4.3M12 11.5V21" },
  { text: ["Широкий ассортимент", "в одном месте"], icon: "m12 3 9 4.5-9 4.5-9-4.5L12 3ZM3 12l9 4.5 9-4.5M3 16.5 12 21l9-4.5" },
  { text: ["Единая архитектура", "и удобное управление"], icon: "M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM19.4 13a7.6 7.6 0 0 0 0-2l2-1.5-2-3.5-2.3 1a7.5 7.5 0 0 0-1.7-1L15 3.5h-4l-.4 2.5a7.5 7.5 0 0 0-1.7 1l-2.3-1-2 3.5 2 1.5a7.6 7.6 0 0 0 0 2l-2 1.5 2 3.5 2.3-1a7.5 7.5 0 0 0 1.7 1l.4 2.5h4l.4-2.5a7.5 7.5 0 0 0 1.7-1l2.3 1 2-3.5-2-1.5Z" },
  { text: ["Готовая основа", "для дальнейшего роста"], icon: "M5 20v-6M11 20V9M17 20V4M3 20h18" },
] as const;

export function ProflineGrowth() {
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
        // Когда появление закончилось, снимаем «взведённое» состояние: задержки входа не мешают hover.
        window.setTimeout(() => setArmed(false), 6500);
      },
      { threshold: 0.2 }
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="profline-case" className={styles.section} aria-labelledby="plg-title">
      <div
        ref={rootRef}
        className={`${styles.stage} ${seen ? styles.seen : ""}`}
        data-armed={armed ? "true" : undefined}
      >
        <div className={`${styles.copy} ${styles.rev}`}>
          <p className={styles.eyebrow}>
            <b>01</b> · Проект вырос
          </p>
          <h2 id="plg-title">
            Начинали с профнастила.{" "}
            <br />
            <em>
              Получился каталог{" "}
              <br />
              материалов.
            </em>
          </h2>
          <p className={styles.text}>
            Первоначальная задача — создать специализированный сайт по
            профнастилу. Но по мере развития проекта стало понятно, что ту же
            архитектуру можно использовать для гораздо большего ассортимента.
          </p>
          <p className={styles.text}>
            Сайт начали последовательно расширять новыми направлениями — от
            металлочерепицы и кровельных материалов до фасадов, сэндвич-панелей
            и ограждений.
          </p>
        </div>

        <div className={`${styles.visual} ${styles.rev} ${styles.visualRev}`}>
          <article className={styles.was}>
            <p className={styles.tagWas}>Было</p>
            <div className={styles.wasPhoto}>
              <Image
                src="/cases/profline-cat-profnastil.webp"
                alt="Профнастил"
                fill
                quality={80}
                sizes="(max-width: 900px) 60vw, 20vw"
              />
            </div>
            <div className={styles.wasText}>
              <b>Профнастил</b>
              <span>одна категория</span>
            </div>
          </article>

          <span className={styles.arrow} aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M3 12h17M14 6l6 6-6 6" />
            </svg>
          </span>

          <div className={styles.now}>
            <p className={styles.tagNow}>Стало</p>
            <ul className={styles.grid}>
              {NOW.map((c) => (
                <li key={c.key} className={styles[c.key]}>
                  <div className={styles.photo}>
                    <Image
                      src={c.src}
                      alt={c.alt}
                      fill
                      quality={80}
                      sizes="(max-width: 900px) 46vw, 24vw"
                    />
                  </div>
                  <p>
                    {c.title[0]}
                    {c.title[1] ? (
                      <>
                        {" "}
                        <br />
                        {c.title[1]}
                      </>
                    ) : null}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className={`${styles.thesis} ${styles.rev} ${styles.d4}`}>
          Архитектуру не пришлось переделывать —{" "}
          <br />
          мы просто продолжили её масштабировать.
        </p>

        <ul className={styles.points}>
          {points.map((p, i) => (
            <li
              key={p.icon}
              className={styles.rev}
              style={armed ? { transitionDelay: `${0.5 + i * 0.1}s` } : undefined}
            >
              <span className={styles.ic}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d={p.icon} />
                </svg>
              </span>
              <span>
                {p.text[0]}{" "}
                <br />
                {p.text[1]}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

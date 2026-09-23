"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./BogovHero.module.css";

/*
 * Hero кейса Bogov Team.
 * Показатели, дата и выборка взяты из ТЗ владельца (в данных проекта их нет),
 * состав работ — только направления, подтверждённые описанием и данными кейса.
 */
const facts = ["Сайт с нуля", "Desktop + Mobile"];
const scope = [
  "Структура",
  "Дизайн",
  "Разработка",
  "Адаптив",
  "Аналитика",
  "SEO",
];

const toc = [
  { href: "#structure", label: "Структура" },
  { href: "#design", label: "UX / UI" },
  { href: "#leads", label: "Обращения" },
  { href: "#seo", label: "SEO" },
  { href: "#ads", label: "Яндекс Директ" },
  { href: "#final", label: "Итог" },
];

function ZoomDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !open || dialog.open) return;
    dialog.showModal();
  }, [open]);

  const close = () => {
    dialogRef.current?.close();
    setOpen(false);
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={styles.zoomButton}
        onClick={() => setOpen(true)}
      >
        Увеличить скриншот
      </button>
      <dialog
        ref={dialogRef}
        className={styles.zoomDialog}
        aria-label="Главная страница сайта Мотошколы Владимира Богова в полном размере"
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onClose={() => {
          setOpen(false);
          triggerRef.current?.focus();
        }}
      >
        <button
          type="button"
          className={styles.zoomClose}
          aria-label="Закрыть увеличенный скриншот"
          onClick={close}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>
        <div className={styles.zoomImage}>
          <Image
            src="/cases/bogov-desktop.avif"
            alt="Главная страница сайта Мотошколы Владимира Богова, desktop, полный размер"
            fill
            sizes="92vw"
          />
        </div>
      </dialog>
    </>
  );
}

export function BogovHero() {
  return (
    <section className={styles.hero} aria-labelledby="bogov-title">
      <div className={styles.container}>
        <nav className={styles.breadcrumbs} aria-label="Хлебные крошки">
          <Link href="/">Главная</Link>
          <span aria-hidden="true">/</span>
          <Link href="/cases">Кейсы</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Мотошкола Владимира Богова</span>
        </nav>
        <div className={styles.grid}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>Кейс · Bogov Team</p>
            <h1 id="bogov-title">
              Сайт, который стал
              <br />
              <em>каналом привлечения.</em>
            </h1>
            <p className={styles.description}>
              Спроектировали и разработали сайт с нуля, связали обращения с
              источниками и развили органический поиск.
            </p>
          </div>

          {/* Реальный сайт: desktop сзади, mobile впереди */}
          <div className={styles.visual}>
            <div className={styles.stage}>
              <div className={styles.desktop}>
                <Image
                  src="/cases/bogov-desktop.avif"
                  alt="Главная страница сайта Мотошколы Владимира Богова, desktop"
                  fill
                  sizes="(max-width: 760px) 92vw, 52vw"
                  priority
                />
              </div>
              {/* Ассет — снимок телефона с системными панелями; показываем только экран */}
              <div className={styles.mobile}>
                <div className={styles.mobileInner}>
                  <Image
                    src="/cases/bogov-mobile.avif"
                    alt="Главная страница сайта Мотошколы Владимира Богова, мобильная версия"
                    fill
                    sizes="(max-width: 760px) 40vw, 14vw"
                    priority
                  />
                </div>
              </div>

              <ZoomDialog />
            </div>
          </div>
        </div>

        <div className={styles.band}>
          <ul className={styles.facts}>
            {facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
            <li className={styles.key}>
              <b>91%</b>
              <span>запросов в ТОП-10*</span>
            </li>
          </ul>
          <p className={styles.note}>
            *22 отслеживаемых запроса · Яндекс · Санкт-Петербург · 09.09.2026
          </p>
          <p className={styles.scope}>{scope.join(" · ")}</p>
        </div>

        <nav className={styles.toc} aria-label="Разделы кейса">
          {toc.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./ProflineNext.module.css";

// Состояние появления выставляется до первой отрисовки, иначе финал успевает мигнуть.
const useArmingEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

const ICON = {
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM20 20l-4-4",
  heart: "M12 20.5s-8-4.9-8-11A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 2.5c0 6.1-8 11-8 11Z",
  cart: "M3 4h2.5l2 11h10l2-8H7M9.5 20h.01M17 20h.01",
  filter: "M3 5h18l-7 8v6l-4 2v-8L3 5Z",
  box: "m12 3 8 4.2v9.6L12 21l-8-4.2V7.2L12 3ZM4 7.2l8 4.3 8-4.3M12 11.5V21",
  plus: "M12 5v14M5 12h14",
} as const;

const NAV = ["Каталог", "Кровля", "Фасады", "Ограждения", "Сэндвич-панели"] as const;
const SIDE = [
  "Кровля",
  "Фасады",
  "Заборы",
  "Сэндвич-панели",
  "Кровельные материалы",
  "Комплектующие",
] as const;
const SIDE_ACTIVE = "Фасады";
const CHIPS = ["Категория", "Фильтры", "Контент"] as const;

const SCENARIOS = [
  { title: "Подбор по параметрам", icon: "M4 7h9M17 7h3M4 17h3M11 17h9M15 4v6M9 14v6" },
  { title: "Готовые решения", icon: "M7 3h8l4 4v14H7zM15 3v4h4M10 12h6M10 16h6" },
  { title: "Комплектация объектов", icon: ICON.box },
  { title: "Сравнение товаров", icon: "M8 4v16M16 4v16M4 8h8M12 16h8" },
] as const;

function Icon({ d, className }: { d: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

export function ProflineNext() {
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
    <section id="next" className={styles.section} aria-labelledby="pln-title">
      <div
        ref={rootRef}
        className={`${styles.stage} ${seen ? styles.seen : ""}`}
        data-armed={armed ? "true" : undefined}
      >
        <div className={styles.main}>
          <div className={styles.copy}>
            <p className={`${styles.eyebrow} ${styles.up}`}>
              <b>06</b> · Проект продолжается
            </p>
            <h2 id="pln-title" className={`${styles.title} ${styles.up}`}>
              Мы его ещё
              <em>не закончили.</em>
            </h2>
            <p className={`${styles.description} ${styles.up}`}>
              ПрофЛайн продолжает развиваться: добавляются новые направления,
              дорабатывается каталог, расширяется структура и появляются новые
              сценарии для покупателей.
            </p>
            <p className={`${styles.note} ${styles.up}`}>
              Больше возможностей
              <br />
              для клиентов.
              <br />
              Больше решений
              <br />
              для бизнеса.
            </p>
          </div>

          <div className={styles.visual}>
            <div className={`${styles.layer} ${styles.layerB} ${styles.rev}`} aria-hidden="true" />
            <div className={`${styles.layer} ${styles.layerA} ${styles.rev}`} aria-hidden="true" />

            <div className={`${styles.canvas} ${styles.rev}`}>
              {/* Навигация: логотип, разделы, поиск / избранное / корзина */}
              <div className={styles.nav} aria-hidden="true">
                <img className={styles.brand} src="/cases/profline-logo-dark.svg" alt="" width="741" height="152" />
                <span className={styles.links}>
                  {NAV.map((n, i) => (
                    <span key={n} className={i === 0 ? styles.linkOn : undefined}>
                      {n}
                    </span>
                  ))}
                </span>
                <span className={styles.tools}>
                  <Icon d={ICON.search} />
                  <Icon d={ICON.heart} />
                  <Icon d={ICON.cart} />
                </span>
              </div>

              {/* Боковое меню: готово + статус работы */}
              <div className={styles.side} aria-hidden="true">
                <b>Каталог</b>
                {SIDE.map((s) => (
                  <span key={s} className={s === SIDE_ACTIVE ? styles.sideOn : undefined}>
                    {s}
                  </span>
                ))}
                <div className={styles.status}>
                  <em>
                    <i />
                    Дорабатывается
                  </em>
                  <span className={styles.statusTrack}>
                    <i />
                  </span>
                </div>
              </div>

              {/* Хлебные крошки, счётчик, фильтр */}
              <div className={styles.crumbs} aria-hidden="true">
                <span>
                  Каталог <s>/</s> <b>Фасады</b>
                </span>
                <span className={styles.count}>
                  <Icon d={ICON.filter} />
                  12 товаров
                </span>
              </div>

              {/* В РАБОТЕ: новая категория, контент заполнен частично */}
              <div className={styles.cat} aria-hidden="true">
                <span className={styles.catLabel}>
                  <i />
                  Новое направление
                </span>
                <strong>Фасадные материалы</strong>
                <span className={styles.catSub}>Профлист · панели · комплектующие</span>
                <span className={styles.cta}>Смотреть →</span>
                <span className={styles.panels}>
                  <Image
                    src="/cases/profline-facade-panels.avif"
                    alt=""
                    fill
                    sizes="(max-width: 860px) 40vw, 14vw"
                  />
                </span>
              </div>

              {/* ГОТОВО: готовая карточка товара */}
              <div className={styles.prod} aria-hidden="true">
                <span className={styles.prodBadge}>New</span>
                <span className={styles.prodPic}>
                  <Image
                    src="/cases/profline-insulation.avif"
                    alt=""
                    fill
                    sizes="(max-width: 860px) 40vw, 12vw"
                  />
                </span>
                <span className={styles.prodLine} />
                <span className={`${styles.prodLine} ${styles.short}`} />
              </div>

              {/* СЛЕДУЮЩЕЕ: категория ещё создаётся */}
              <div className={styles.next} aria-hidden="true">
                <span className={styles.plusSm}>
                  <Icon d={ICON.plus} />
                </span>
                <strong>Новая категория</strong>
                <span>готовим раздел</span>
              </div>

              {/* Центр: логотип поменьше, IN PROGRESS и легенда состояний */}
              <img className={styles.logo} src="/cases/profline-logo-dark.svg" alt="ПрофЛайн" width="741" height="152" />
              <p className={styles.progress}>In progress</p>
              <p className={styles.legend} aria-hidden="true">
                <span>
                  <i className={styles.lgOk} />
                  Работает
                </span>
                <span>
                  <i className={styles.lgWork} />
                  Развиваем
                </span>
                <span>
                  <i className={styles.lgNext} />
                  Следующий этап
                </span>
              </p>

              {/* Новый раздел: ещё не достроен */}
              <div className={styles.fresh}>
                <div className={styles.freshTop}>
                  <span className={styles.plus} aria-hidden="true">
                    <Icon d={ICON.plus} />
                  </span>
                  <span className={styles.freshText}>
                    <span className={styles.badgeSm}>New</span>
                    <strong>+ новый раздел</strong>
                  </span>
                </div>
                <span className={styles.chips} aria-hidden="true">
                  {CHIPS.map((c) => (
                    <span key={c}>{c}</span>
                  ))}
                </span>
                <span className={styles.caption}>структура формируется</span>
              </div>
            </div>

            <div className={`${styles.marker} ${styles.m1} ${styles.rev}`}>
              <span className={styles.badge}>New</span>
              <strong>+ новые категории</strong>
              <span className={styles.go} aria-hidden="true">→</span>
            </div>
            <div className={`${styles.marker} ${styles.m2} ${styles.rev}`}>
              <span className={styles.iconBox} aria-hidden="true">
                <Icon d={ICON.box} />
              </span>
              <span className={styles.m2Text}>
                <span className={styles.badge}>New</span>
                <strong>+ новые товары</strong>
                <small>ассортимент расширяется</small>
              </span>
            </div>
            <div className={`${styles.marker} ${styles.m4} ${styles.rev}`}>
              <div className={styles.m4Head}>
                <span className={styles.badge}>New</span>
                <strong>+ новые сценарии</strong>
              </div>
              <ul className={styles.list}>
                {SCENARIOS.map((s) => (
                  <li key={s.title}>
                    <Icon d={s.icon} />
                    {s.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

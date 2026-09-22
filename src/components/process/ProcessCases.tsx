"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";
import { ActionArrow } from "@/components/ActionArrow";
import { cases } from "@/lib/content";
import styles from "./ProcessCases.module.css";

type Direction = { title: string; note: string };

/*
 * Маршрут строится только из подтверждённого состава проектов
 * (те же формулировки, что в блоке «Что сделано» на главной и в тексте кейса).
 * Хронология работ в данных не указана, поэтому порядок не показывается:
 * направления сгруппированы по составу, без «сначала / потом».
 */
const routes: Record<
  string,
  { main: Direction[]; promotion?: Direction[]; result: string }
> = {
  bogov: {
    main: [
      { title: "Структура", note: "Курсы школы" },
      { title: "Дизайн", note: "Характер мотоспорта" },
      { title: "Адаптив", note: "Запись с телефона" },
    ],
    result:
      "Сайт школы: курсы в понятной структуре, характерный дизайн, запись с телефона.",
  },
  oss: {
    main: [
      { title: "Каталог", note: "Структура ассортимента" },
      { title: "Поиск", note: "Подбор продукции" },
    ],
    promotion: [{ title: "SEO", note: "Страницы категорий и товаров" }],
    result:
      "Каталог с поиском продукции и точками обращения к менеджерам, основа для продвижения.",
  },
  volhonka: {
    main: [
      { title: "Сайт", note: "Каталог и выбор металлопроката" },
      { title: "CRM", note: "Учёт обращений из разных каналов" },
    ],
    promotion: [{ title: "SEO", note: "Поиск поставщика" }],
    result:
      "Каталог, онлайн-заявки и CRM объединены, обращения не теряются.",
  },
};

const items = cases.filter((item) => routes[item.slug]);

export function ProcessCases() {
  const [active, setActive] = useState(0);
  const baseId = useId();

  return (
    <section
      id="projects"
      className={styles.section}
      aria-labelledby={`${baseId}-title`}
    >
      <div className={styles.container}>
        <header className={styles.head}>
          <div>
            <p className={styles.eyebrow}>Проекты</p>
            <h2
              id={`${baseId}-title`}
              aria-label="Один подход. Разные задачи."
            >
              Один подход.
              <br />
              <em>Разные задачи.</em>
            </h2>
          </div>
          <p className={styles.description}>
            Процесс понятный, но маршрут зависит от задачи:{" "}
            <br />
            у каждого проекта свой состав работ.
          </p>
        </header>

        <div className={styles.explorer}>
          {items.map((item, index) => {
            const isActive = index === active;
            const route = routes[item.slug];
            const buttonId = `${baseId}-${item.slug}-tab`;
            const panelId = `${baseId}-${item.slug}-panel`;

            return [
              <button
                key={`${item.slug}-button`}
                type="button"
                id={buttonId}
                className={`${styles.tab} ${isActive ? styles.tabActive : ""}`}
                style={{ gridColumn: index + 1 }}
                aria-expanded={isActive}
                aria-controls={panelId}
                onClick={() => setActive(index)}
              >
                <span className={styles.tabNumber}>0{index + 1}</span>
                <span className={styles.tabName}>{item.name}</span>
                <span className={styles.tabMeta}>{item.category}</span>
              </button>,
              <div
                key={`${item.slug}-panel`}
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className={styles.panel}
                hidden={!isActive}
              >
                {isActive && (
                  <div className={styles.panelBody} key={item.slug}>
                    <div className={styles.info}>
                      <ol className={styles.route}>
                        <li className={styles.start}>
                          <p className={styles.label}>Задача</p>
                          <p className={styles.task}>{item.task}</p>
                        </li>

                        <li className={styles.group}>
                          <p className={styles.label}>В проекте</p>
                          <ul className={styles.directions}>
                            {route.main.map((direction) => (
                              <li key={direction.title}>
                                <strong>{direction.title}</strong>
                                <span>{direction.note}</span>
                              </li>
                            ))}
                          </ul>
                        </li>

                        {route.promotion && (
                          <li className={`${styles.group} ${styles.groupExtra}`}>
                            <p className={styles.label}>Продвижение</p>
                            <ul className={styles.directions}>
                              {route.promotion.map((direction) => (
                                <li key={direction.title}>
                                  <strong>{direction.title}</strong>
                                  <span>{direction.note}</span>
                                </li>
                              ))}
                            </ul>
                          </li>
                        )}

                        <li className={styles.end}>
                          <p className={styles.label}>Результат</p>
                          <p className={styles.result}>{route.result}</p>
                        </li>
                      </ol>

                      <Link
                        href={`/cases/${item.slug}`}
                        className={styles.cta}
                        aria-label={`Смотреть кейс: ${item.name}`}
                      >
                        Смотреть кейс <ActionArrow />
                      </Link>
                    </div>

                    <figure className={styles.shot}>
                      <div className={styles.shotFrame}>
                        <Image
                          src={item.image}
                          alt={`Главная страница сайта: ${item.name}`}
                          fill
                          sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1080px) 92vw, 760px"
                        />
                      </div>
                      <div className={styles.phone}>
                        <Image
                          src={item.mobile}
                          alt={`Мобильная версия сайта: ${item.name}`}
                          fill
                          sizes="112px"
                        />
                      </div>
                      <figcaption>Главная страница сайта</figcaption>
                    </figure>
                  </div>
                )}
              </div>,
            ];
          })}
        </div>
      </div>
    </section>
  );
}

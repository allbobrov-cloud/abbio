"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { situations, taskVisuals } from "@/lib/home-tasks";
import { ScenarioVisual } from "./ScenarioVisual";
import styles from "./HomeTasks.module.css";

// Подписи ситуаций и заголовки сцен — как в прежней версии блока.
const hints = ["От идеи к первому запуску", "Найти барьеры на пути клиента", "Выбрать каналы привлечения", "Связать обращения и команду"];
const scenes = ["Собираем новый проект", "Находим, где теряются сделки", "Работаем со спросом", "Организуем работу с заявками"];

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

function CrmVisual() {
  return (
    <div className={styles.crm} aria-hidden="true">
      <div className={styles.crmHead}><span>CRM / СЦЕНАРИЙ</span><b>ПРИМЕР</b></div>
      <div className={styles.crmGrid}>
        <div><strong>03</strong><small>канала входа</small></div>
        <div><strong>01</strong><small>маршрут заявки</small></div>
        <div><strong>→</strong><small>следующий шаг</small></div>
      </div>
      <div className={styles.crmLine}>
        <span>Форма</span><i /><span>CRM</span><i /><span>Ответственный</span>
      </div>
    </div>
  );
}

/*
 * «Узнаёте свою ситуацию?»: слева четыре ситуации, справа сцена с решением. Все четыре сцены лежат
 * в одной grid-ячейке — высота блока не прыгает при переключении. Тексты и визуалы прежние
 * (данные в lib/home-tasks.ts); визуалы уложены в общую рамку и приведены к палитре сайта.
 */
export function HomeTasks() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const stage = useRef<HTMLDivElement>(null);

  const select = (index: number) => {
    const next = (index + situations.length) % situations.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const moves: Record<string, number> = { ArrowDown: index + 1, ArrowRight: index + 1, ArrowUp: index - 1, ArrowLeft: index - 1, Home: 0, End: situations.length - 1 };
    if (!(event.key in moves)) return;
    event.preventDefault();
    select(moves[event.key]);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || !stage.current) return;
    const rect = stage.current.getBoundingClientRect();
    stage.current.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    stage.current.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  return (
    <section className={styles.section} id="tasks" aria-labelledby="tasks-title">
      <div className={styles.container}>
        <header className={styles.head}>
          <div>
            <p className={styles.eyebrow}>С чего начать</p>
            <h2 id="tasks-title">
              Узнаёте{" "}
              <br />
              <em>свою ситуацию?</em>
            </h2>
          </div>
          <p className={styles.intro}>
            Не обязательно знать, какая услуга нужна.
            <br />
            Начнём с того, что хочется изменить.
          </p>
        </header>

        <div className={styles.layout}>
          <div className={styles.tabs} role="tablist" aria-label="Выберите задачу бизнеса" aria-orientation="vertical">
            {situations.map((item, index) => (
              <button
                key={item.code}
                ref={(node) => { tabs.current[index] = node; }}
                type="button"
                role="tab"
                id={`task-tab-${index}`}
                aria-selected={index === active}
                aria-controls="task-panel"
                tabIndex={index === active ? 0 : -1}
                className={styles.tab}
                onClick={() => setActive(index)}
                onKeyDown={(event) => onKeyDown(event, index)}
              >
                <span className={styles.tabNum}>{String(index + 1).padStart(2, "0")}</span>
                <span className={styles.tabText}>
                  <strong>{item.label}</strong>
                  <small>{hints[index]}</small>
                </span>
                <span className={styles.tabMark} aria-hidden="true" />
              </button>
            ))}
          </div>

          <div ref={stage} className={styles.stage} role="tabpanel" id="task-panel" aria-labelledby={`task-tab-${active}`} onPointerMove={onPointerMove}>
            {situations.map((item, index) => {
              const on = index === active;
              return (
                <div key={item.code} data-n={String(index + 1).padStart(2, "0")} className={`${styles.scene} ${on ? styles.sceneOn : ""}`} aria-hidden={!on} inert={!on}>
                  <div className={styles.meta}>
                    <span>{scenes[index]}</span>
                    <span aria-hidden="true">{String(index + 1).padStart(2, "0")} / 04</span>
                  </div>

                  <h3>{item.heading}</h3>
                  <p className={styles.text}>{item.text}</p>

                  <div className={`${styles.visual} ${index === 1 ? styles.visualAudit : ""}`} aria-hidden="true">
                    {index === 1 ? (
                      <ScenarioVisual kind="audit" animate={on} expanded className={styles.auditScene} />
                    ) : index === 3 ? (
                      <CrmVisual />
                    ) : (
                      <Image src={index === 0 ? taskVisuals.launch : taskVisuals.reach} alt="" fill sizes="(max-width: 760px) 95vw, 58vw" />
                    )}
                  </div>

                  <p className={styles.result}>{item.result}</p>

                  <div className={styles.actions}>
                    <a href="#contact-dialog" data-contact-dialog className={styles.primary}>
                      Обсудить такую задачу
                      <span aria-hidden="true"><Arrow /></span>
                    </a>
                    <Link href={`/services/${item.serviceSlug}`} className={styles.secondary}>
                      Смотреть услугу
                      <span aria-hidden="true"><Arrow /></span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

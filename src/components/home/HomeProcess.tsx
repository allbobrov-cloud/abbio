"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";
import { steps } from "@/lib/content";
import styles from "./HomeProcess.module.css";

const icons = [
  "M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14Zm9 16-4.35-4.35",
  "M4 7h16M4 12h10M4 17h7m9-2-3 3-2-2",
  "M4 20h4L19 9l-4-4L4 16v4Zm9-13 4 4",
  "M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2m-3-3 4 4m-4-4 3.5-6.5A10 10 0 0 1 20 4c0 3-1.5 6.5-4.5 8.5L9 16",
];

// «Делаем» — этап, на котором идёт основная работа: выбран по умолчанию и выделен янтарным.
const IN_WORK = 2;

/*
 * «На связи. На каждом этапе.»: четыре этапа на общей линии. По умолчанию выбран «Делаем»;
 * наведение подсвечивает этап под курсором, клик — закрепляет выбор.
 */
export function HomeProcess() {
  const [selected, setSelected] = useState(IN_WORK);
  const [hovered, setHovered] = useState<number | null>(null);
  const active = hovered ?? selected;

  return (
    <section
      id="process"
      className={styles.section}
      aria-labelledby="process-title"
      style={{ "--active": active, "--count": steps.length } as CSSProperties}
    >
      <div className={styles.container}>
        <header className={styles.head}>
          <div>
            <p className={styles.eyebrow}>Как работаем</p>
            <h2 id="process-title">
              На связи.{" "}
              <br />
              <em>На каждом этапе.</em>
            </h2>
          </div>
          <Link className={styles.more} href="/process">
            Подробнее о работе
            <span aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M8 7h9v9" /></svg>
            </span>
          </Link>
        </header>

        <div className={styles.track} onPointerLeave={() => setHovered(null)}>
          <div className={styles.rail} aria-hidden="true">
            <span className={styles.railFill} />
            <span className={styles.signal} />
          </div>

          <ol className={styles.steps}>
            {steps.map((step, index) => {
              const state = index === active ? "active" : index < active ? "done" : "next";
              return (
                <li key={step.title} data-state={state} data-in-work={index === IN_WORK ? "true" : undefined}>
                  <span className={styles.node} aria-hidden="true" />
                  <button
                    type="button"
                    className={styles.step}
                    aria-pressed={index === selected}
                    onClick={() => setSelected(index)}
                    onPointerEnter={(event) => event.pointerType === "mouse" && setHovered(index)}
                  >
                    <span className={styles.num} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    <span className={styles.icon} aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={icons[index]} /></svg>
                    </span>
                    <span className={styles.label}>{index === IN_WORK ? "Этап 3 · в работе" : `Этап ${index + 1}`}</span>
                    <strong>{step.title}</strong>
                    <span className={styles.text}>{step.text}</span>
                    <span className={styles.live} aria-hidden="true"><i />На связи</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

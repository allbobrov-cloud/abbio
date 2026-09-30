import Link from "next/link";
import type { CSSProperties } from "react";
import { ActionArrow } from "@/components/ActionArrow";
import { caseIndex } from "@/lib/content";
import { CaseCard } from "./CaseCard";
import { QuestMark } from "@/components/QuestLayer";
import styles from "./CasesIndex.module.css";

const num = (index: number) => String(index + 1).padStart(2, "0");

/*
 * Страница /cases: hero с оглавлением всех проектов + бенто-сетка карточек.
 * Обложки — главные визуалы из hero самих кейсов на подложке цвета клиента.
 * Тексты карточек взяты со страниц кейсов (см. caseIndex в lib/content).
 */
export function CasesIndex() {
  return (
    <>
      <section className={styles.hero} aria-labelledby="cases-title">
        <div className={styles.container}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>
              Кейсы <span>{caseIndex.length} проектов</span>
            </p>
            <h1 id="cases-title">
              Не портфолио.{" "}
              <br />
              <em>Что сделали и как это работает.</em>
            </h1>
            <p className={styles.lead}>Задача → решение → что получилось. <QuestMark id="cases" label="Исследовать деталь списка проектов" /></p>
          </div>

          <nav className={styles.toc} aria-label="Все кейсы">
            <ol>
              {caseIndex.map((item, index) => (
                <li key={item.slug} style={{ "--tint": item.tint } as CSSProperties}>
                  <Link href={`/cases/${item.slug}`}>
                    <span className={styles.tocNum}>{num(index)}</span>
                    <span className={styles.tocName}>{item.name}</span>
                    <span className={styles.tocCat}>{item.category}</span>
                    <ActionArrow className={styles.tocArrow} />
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>

      <section className={styles.gridSection} aria-labelledby="cases-list-title">
        <div className={styles.container}>
          <h2 className="sr-only" id="cases-list-title">Проекты агентства</h2>
          <ul className={styles.bento}>
            {caseIndex.map((item, index) => (
              <li key={item.slug} className={styles.cell} style={{ "--tint": item.tint } as CSSProperties}>
                <CaseCard item={item} index={index} sizes="(max-width: 760px) 92vw, (max-width: 1100px) 50vw, 58vw" />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

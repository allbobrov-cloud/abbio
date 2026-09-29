"use client";

import Image from "next/image";
import { useState } from "react";
import base from "../Agency.module.css";
import styles from "./HomeExperience.module.css";






const journey = [
  { title: "Привлечь", subtitle: "SEO · реклама · контент", heading: "Встречаем клиента там, где он ищет.", text: "Подбираем поисковые запросы, рекламные сообщения и материалы под задачу человека, а не просто ведём трафик на главную.", result: "Релевантный переход на нужную страницу", symbol: "attract" },
  { title: "Заинтересовать", subtitle: "Дизайн · сайт · предложение", heading: "Помогаем разобраться и сделать следующий шаг.", text: "На странице понятно, что вы предлагаете, кому это подходит и как обратиться. Дизайн, содержание и удобство работают вместе.", result: "Понятный путь от вопроса до обращения", symbol: "interest" },
  { title: "Обработать", subtitle: "CRM · интеграции · автоматизация", heading: "Заявка не должна оставаться просто письмом.", text: "Передаём обращение в CRM вместе с источником. Настраиваем ответственного, задачу и уведомление — чтобы команда могла продолжить разговор.", result: "Обращение с источником и ответственным", symbol: "process" },
  { title: "Разобраться", subtitle: "Аналитика · обратная связь", heading: "Смотрим, что происходит дальше.", text: "Сопоставляем источники, обращения и этапы продаж. Находим места, где теряется интерес, и выбираем следующие изменения на основе данных.", result: "Основания для решений, а не цифры ради отчёта", symbol: "insight" }
];

export function ClientJourney() {
  const [selected, setSelected] = useState(3);
  const [pointer, setPointer] = useState(true);
  const stage = journey[selected];
  const selectStage = (index: number) => {
    setPointer(true);
    setSelected(index);
  };

  return (
    <section className={`${base.section} ${styles.journey}`} id="client-journey" aria-labelledby="journey-title"><div className={base.container}>
      <div className={`${base.sectionHead} ${styles.journeyHead}`}><div><p className={base.eyebrow}>Путь после первого интереса</p><h2 id="journey-title" aria-label="Важно не только привлечь. Важно довести до продажи.">Важно не только привлечь.<br /><em>Важно довести до продажи.</em></h2></div><p className={`${base.sectionIntro} ${styles.journeyIntro}`}>Соединяем каналы, страницы и работу команды, чтобы интерес не терялся по пути.</p></div>
      <div className={styles.journeyRoute} data-motion={pointer}>
        <div className={styles.journeyStages} data-stage={selected} role="group" aria-label="Этапы пути клиента">{journey.map((item, index) => <button key={item.title} type="button" aria-pressed={selected === index} aria-controls="journey-detail" onClick={() => selectStage(index)}><span className={styles.stageNode} aria-hidden="true"><JourneyIcon name={item.symbol} /></span><span className={styles.stageIndex}>0{index + 1}</span><strong>{item.title}</strong><small>{item.subtitle}</small></button>)}</div>
        <div className={styles.journeyDetail} id="journey-detail" aria-live="polite" data-scenario={selected}><div className={styles.journeyNarrative}><p className={styles.detailLabel}>Этап 0{selected + 1} / 04</p><h3>{selected === 0 ? <>Встречаем клиента<br /><span>там, где он ищет.</span></> : selected === 1 ? <>Помогаем<br />разобраться и сделать<br /><span>следующий шаг.</span></> : selected === 2 ? <>Заявка не должна<br /><span>потеряться</span> после сайта.</> : <>Смотрим, что<br />происходит <span>дальше.</span></>}</h3><p>{stage.text}</p><strong className={styles.journeyResult}>{stage.result}</strong></div><div className={styles.journeyVisual} key={selected}>{selected === 0 ? <Image className={styles.journeyAttractArtwork} src="/home/attract-journey.png" alt="" width={1656} height={950} sizes="(max-width: 760px) 90vw, 50vw" /> : selected === 1 ? <Image className={styles.journeyInterestArtwork} src="/home/interest-journey.png" alt="" width={1628} height={966} sizes="(max-width: 760px) 90vw, 50vw" /> : selected === 2 ? <Image className={styles.journeyProcessArtwork} src="/home/process-journey.png" alt="Обращения из формы, звонка и чата попадают в CRM; затем создаётся задача и команда получает уведомление." width={1750} height={899} sizes="(max-width: 760px) 90vw, 50vw" /> : <Image className={styles.journeyInsightArtwork} src="/home/insight-journey.png" alt="Источники обращений связаны с аналитикой, которая помогает понять, что работает, найти точки роста и принять решения." width={1774} height={887} sizes="(max-width: 760px) 90vw, 50vw" />}</div></div>
      </div>
    </div></section>
  );
}

function JourneyIcon({ name }: { name: string }) {
  const common = { viewBox: "0 0 24 24", fill: "none", "aria-hidden": true as const };
  if (name === "attract") return <svg {...common}><circle cx="12" cy="12" r="6.5" /><circle cx="12" cy="12" r="2.25" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3" /></svg>;
  if (name === "interest") return <svg {...common}><path d="m4 4 7.8 16 2.2-6.2L20 11 4 4Z" /><path d="m16.5 4.5 1.5-1.5M20 7h2M19 3v2" /></svg>;
  if (name === "process") return <svg {...common}><path d="M5 8h12.5l-2.8-2.8M19 16H6.5l2.8 2.8" /><path d="M18 8v3M6 16v-3" /><circle cx="5" cy="8" r="1" /><circle cx="19" cy="16" r="1" /></svg>;
  return <svg {...common}><path d="M4 19V5M4 19h16M7.5 15.5l4-4 3 2.5 5-6" /><circle cx="19.5" cy="8" r="1.5" /></svg>;
}

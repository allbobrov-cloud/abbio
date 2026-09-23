"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ScenarioVisual } from "./ScenarioVisual";
import { ActionArrow } from "../ActionArrow";
import base from "../Agency.module.css";
import styles from "./HomeExperience.module.css";

const directions = [
  { slug: "design", name: "Дизайн", title: "Впечатление, за которым есть смысл.", text: "Помогаем объяснить продукт и сделать бренд узнаваемым.", image: "/home/design-board-v1.avif", project: "Дизайн-доска / AI-концепция", label: "От идеи к макету", output: "Характер вашего бренда", icon: "◈", caseSlug: null },
  { slug: "websites", name: "Сайты", title: "Удобно выбрать. Легко обратиться.", text: "Продумываем путь посетителя — от первого экрана до заявки.", image: "/cases/volhonka-desktop.avif", project: "Металлобаза Волхонка", label: "Сценарий клиента", output: "От интереса к заявке", icon: "▤", caseSlug: "volhonka" },
  { slug: "marketing", name: "Маркетинг", title: "Привлечение — только начало.", text: "Соединяем продвижение с аналитикой и работой с обращениями.", image: "/home/marketing-report-v1.avif", project: "Пример отчёта / условные данные", label: "Каналы · обращения · расходы", output: "Решения на основе данных", icon: "▥", caseSlug: null },
  { slug: "seo", name: "SEO", title: "Поиск — тоже канал обращений.", text: "Развиваем сайт под реальный спрос и связываем страницы с целевыми действиями.", image: "/services/seo-final-search-channel-v2.webp", project: "Пример структуры спроса", label: "Спрос · структура · измерение", output: "Страницы под конкретные запросы", icon: "◎", caseSlug: null },
  { slug: "yandex-direct", name: "Яндекс Директ", title: "Быстрый запуск потока обращений.", text: "Связываем объявления, посадочные страницы и понятный отчёт.", image: "/services/yandex-direct-campaign-structure-v2.webp", project: "Пример структуры кампании", label: "Реклама · CRM · отчётность", output: "Обращения с понятным источником", icon: "⇄", caseSlug: null }
];

function useVisible() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .15 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

export function HomeHero() {
  const [selected, setSelected] = useState(1);
  const [pointer, setPointer] = useState(true);
  const direction = directions[selected];

  const selectDirection = (index: number) => {
    // Motion in the hero is intentionally always on. Do not infer the input
    // device from `event.detail`: keyboard and touch activations may report 0.
    setPointer(true);
    setSelected(index);
  };

  return (
    <section className={styles.hero} data-force-motion="true" aria-labelledby="hero-title">
      <div className={styles.heroGridTexture} aria-hidden="true" />
      <div className={base.container}>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={base.eyebrow}><span className={base.dot} /> Агентство ABBiO / от идеи до запуска</p>
            <h1 id="hero-title" aria-label="Дизайн, сайты и маркетинг. Для бизнеса.">Дизайн, сайты<br />и маркетинг.<br /><em>Для бизнеса.</em></h1>
            <p className={styles.lead}>Помогаем выглядеть убедительно, привлекать клиентов и работать с обращениями.</p>
            <div className={styles.actions}>
              <a className={base.button} href="#contact-dialog" data-contact-dialog>Обсудить задачу <ActionArrow /></a>
              <a className={base.textLink} href="#cases">Посмотреть работы <span aria-hidden="true">↓</span></a>
            </div>
          </div>
          <div className={styles.workspace} data-motion={pointer}>
            <div className={styles.orbital} aria-hidden="true"><span><i /></span><span><i /></span><span><i /></span></div>
            <div className={styles.previewStack}>
              <span className={styles.backPlate} aria-hidden="true" />
              {direction.caseSlug ? (
                <Link href={`/cases/${direction.caseSlug}`} className={styles.previewWindow} aria-label={`Смотреть кейс: ${direction.project}`}>
                  <div className={styles.browserBar}><span aria-hidden="true">● ● ●</span><span>{direction.project}</span></div>
                  <div className={styles.previewImages}><Image key={direction.name} src={direction.image} alt={`Пример работы: сайт ${direction.project}`} width={1536} height={1024} className={styles.previewImage} data-active="true" loading="eager" sizes="(max-width: 760px) 90vw, 48vw" /></div>
                </Link>
              ) : (
                <div className={styles.previewWindow}>
                  <div className={styles.browserBar}><span aria-hidden="true">● ● ●</span><span>{direction.project}</span></div>
                  <div className={styles.previewImages}><Image key={direction.name} src={direction.image} alt={direction.project} width={1536} height={1024} className={styles.previewImage} data-active="true" loading="lazy" sizes="(max-width: 760px) 90vw, 48vw" /></div>
                </div>
              )}
              <div className={styles.floatingNote} aria-hidden="true"><span className={styles.noteIcon}>{direction.icon}</span><div><small>{direction.label}</small><strong>{direction.output}</strong></div></div>
            </div>
            <div className={styles.directionButtons} role="group" aria-label="Направления агентства">{directions.map((item, index) => <button key={item.name} type="button" aria-pressed={selected === index} aria-controls="direction-summary" onClick={() => selectDirection(index)}><span>0{index + 1}</span>{item.name}<span aria-hidden="true">{selected === index ? "−" : "+"}</span></button>)}</div>
            <div className={styles.directionSummary} id="direction-summary" aria-live="polite"><strong>{direction.title}</strong><p>{direction.text}</p><Link href={`/services/${direction.slug}`} className={base.textLink}>Подробнее об услуге <ActionArrow /></Link></div>
          </div>
        </div>
      </div>
    </section>
  );
}

const situations = [
  { label: "Запускаю новый проект", heading: "Дать идее форму. Подготовить к запуску.", text: "Поможем сформулировать предложение, показать продукт и подготовить первые точки контакта с клиентами.", steps: ["Предложение и структура", "Дизайн и сайт", "Подготовка продвижения"], result: "Понятная точка старта для нового бизнеса или направления.", code: "START", serviceSlug: "design" },
  { label: "Сайт есть, обращений мало", heading: "Разобраться, где теряются новые сделки.", text: "Проверим путь от первого визита до обращения: предложение, страницы, мобильную версию и источники трафика. Найдём, что мешает довести интерес до сделки.", steps: ["Найти точки потери", "Усилить предложение", "Довести до сделки"], result: "Понятно, что изменить, чтобы сайт приводил больше новых сделок.", code: "WEBSITE", serviceSlug: "websites" },
  { label: "Нужны новые клиенты", heading: "Помочь клиентам найти ваше предложение.", text: "Подбираем страницы и каналы под спрос: SEO, контент и рекламу. Настраиваем учёт источников, чтобы оценивать обращения.", steps: ["Спрос и задачи аудитории", "SEO, контент и реклама", "Аналитика обращений"], result: "Продвижение, которое можно оценивать по понятным данным.", code: "MARKETING", serviceSlug: "seo" },
  { label: "Заявки теряются, много рутины", heading: "Навести порядок после первого обращения.", text: "Связываем формы, звонки и сообщения с CRM. Настраиваем ответственных, уведомления и автоматические действия.", steps: ["Карта текущего процесса", "CRM и интеграции", "Задачи и уведомления"], result: "Видно, откуда пришло обращение и кто работает с ним дальше.", code: "OPERATIONS", serviceSlug: "marketing" }
];

export function TaskExplorer() {
  const [selected, setSelected] = useState(0);
  const { ref } = useVisible();
  const situation = situations[selected];
  return (
    <section className={`${base.section} ${styles.tasks}`} id="tasks" aria-labelledby="tasks-title">
      <div className={`${base.container} ${styles.tasksInner}`}>
        <div className={`${base.sectionHead} ${styles.tasksHead}`}><div><p className={base.eyebrow}>С чего начать</p><h2 id="tasks-title" aria-label="Узнаёте свою ситуацию?">Узнаёте<br /><em>свою ситуацию?</em></h2></div><p className={`${base.sectionIntro} ${styles.tasksIntro}`}>Не обязательно знать, какая услуга нужна.<br /> Начнём с того, что хочется изменить.</p></div>
        <div className={styles.taskLayout} ref={ref}>
          <div className={styles.taskChoices} role="group" aria-label="Выберите задачу бизнеса">{situations.map((item, index) => <button type="button" key={item.code} aria-pressed={selected === index} aria-controls="task-answer" onClick={() => setSelected(index)}><span>0{index + 1}</span><strong>{item.label}<small>{["От идеи к первому запуску", "Найти барьеры на пути клиента", "Выбрать каналы привлечения", "Связать обращения и команду"][index]}</small></strong><span className={styles.choiceMark} aria-hidden="true">{selected === index ? "−" : "+"}</span></button>)}</div>
          <div className={styles.taskAnswer} id="task-answer" aria-live="polite" data-scenario={selected}>
            <div className={styles.answerMeta}><span>{["Собираем новый проект", "Находим, где теряются сделки", "Работаем со спросом", "Организуем работу с заявками"][selected]}</span><span aria-hidden="true">0{selected + 1} / 04</span></div>
            <div className={styles.answerContent}>
              <h3>{situation.heading}</h3>
              <p>{situation.text}</p>
              <ul className={styles.taskSteps}>{situation.steps.map(step => <li key={step}><span aria-hidden="true">✓</span>{step}</li>)}</ul>
              <p className={styles.taskResult}>{situation.result}</p>
            </div>
            <div className={styles.taskActions}>
              <a href="#contact-dialog" data-contact-dialog className={base.textLink}>Обсудить такую задачу <ActionArrow /></a>
              <Link href={`/services/${situation.serviceSlug}`} className={base.textLink}>Смотреть услугу <ActionArrow /></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const journey = [
  { title: "Привлечь", subtitle: "SEO · реклама · контент", heading: "Встречаем клиента там, где он ищет.", text: "Подбираем поисковые запросы, рекламные сообщения и материалы под задачу человека, а не просто ведём трафик на главную.", result: "Релевантный переход на нужную страницу", symbol: "attract" },
  { title: "Заинтересовать", subtitle: "Дизайн · сайт · предложение", heading: "Помогаем разобраться и сделать следующий шаг.", text: "На странице понятно, что вы предлагаете, кому это подходит и как обратиться. Дизайн, содержание и удобство работают вместе.", result: "Понятный путь от вопроса до обращения", symbol: "interest" },
  { title: "Обработать", subtitle: "CRM · интеграции · автоматизация", heading: "Заявка не должна оставаться просто письмом.", text: "Передаём обращение в CRM вместе с источником. Настраиваем ответственного, задачу и уведомление — чтобы команда могла продолжить разговор.", result: "Обращение с источником и ответственным", symbol: "process" },
  { title: "Разобраться", subtitle: "Аналитика · обратная связь", heading: "Смотрим, что происходит дальше.", text: "Сопоставляем источники, обращения и этапы продаж. Находим места, где теряется интерес, и выбираем следующие изменения на основе данных.", result: "Основания для решений, а не цифры ради отчёта", symbol: "insight" }
];

export function ClientJourney() {
  const [selected, setSelected] = useState(2);
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
        <div className={styles.journeyDetail} id="journey-detail" aria-live="polite" data-scenario={selected}><div className={styles.journeyNarrative}><p className={styles.detailLabel}>Этап 0{selected + 1} / 04</p><h3>{stage.heading}</h3><p>{stage.text}</p><strong className={styles.journeyResult}>{stage.result}</strong></div><div className={styles.journeyVisual} key={selected}><ScenarioVisual kind={(["reach", "audit", "crm", "report"] as const)[selected]} animate={pointer} /></div></div>
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

export function WorkFormats() {
  return (
    <section className={`${base.section} ${styles.formats}`} aria-labelledby="formats-title"><div className={base.container}>
      <div className={base.sectionHead}><div><p className={base.eyebrow}>Масштаб выбираем вместе</p><h2 id="formats-title" aria-label="Одна задача. Или работа вдолгую.">Одна задача.<br /><em>Или работа вдолгую.</em></h2></div><p className={base.sectionIntro}>Не обязательно заказывать всё сразу.<br /> Отталкиваемся от приоритетов и ресурсов.</p></div>
      <p className={styles.mobileSwipeHint} id="formats-scroll-hint">Листайте варианты <span aria-hidden="true">→</span></p>
      <div className={styles.formatGrid} role="region" aria-label="Форматы работы" aria-describedby="formats-scroll-hint" tabIndex={0}>
        <article className={styles.formatCard}><div className={styles.formatArt} aria-hidden="true"><span /><span /><span /></div><span className={styles.formatLabel}>Проект</span><h3>Сделать и запустить</h3><p>Когда есть конкретная задача: разработать сайт, обновить дизайн, подключить CRM или автоматизировать процесс.</p><ul><li>Понятный состав работ</li><li>Согласованные этапы</li><li>Передача результата</li></ul><a href="#contact-dialog" data-contact-dialog className={base.textLink}>Обсудить проект <ActionArrow /></a></article>
        <article className={`${styles.formatCard} ${styles.longTerm}`}><div className={styles.formatArt} aria-hidden="true"><span /><span /><span /></div><span className={styles.formatLabel}>Развитие</span><h3>Улучшать и развивать</h3><p>Когда нужно регулярно работать над сайтом, поисковым продвижением, контентом и качеством обращений.</p><ul><li>Приоритеты на следующий этап</li><li>Проверка изменений</li><li>Обсуждение данных и результатов</li></ul><a href="#contact-dialog" data-contact-dialog className={base.textLink}>Обсудить развитие <ActionArrow /></a></article>
      </div>
    </div></section>
  );
}

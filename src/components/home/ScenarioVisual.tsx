import styles from "./ScenarioVisual.module.css";

/** Explanatory interface sketches, not client analytics or working form controls. */
export function ScenarioVisual({ kind, animate = true, className, expanded = false }: { kind: "launch" | "audit" | "reach" | "crm" | "report"; animate?: boolean; className?: string; expanded?: boolean }) {
  return <div className={`${styles.scene} ${styles[kind]}${className ? ` ${className}` : ""}`} data-motion={animate} data-expanded={expanded || undefined} aria-hidden="true">
    {kind === "launch" && <>
      <div className={styles.blueprint}><small>01 / ИДЕЯ</small><i /><i /><i /><span>Предложение<br />и структура</span></div>
      <div className={styles.artboard}><small>02 / ВОПЛОЩЕНИЕ</small><div className={styles.artHeading}>Ваш следующий<br /><em>большой шаг.</em></div><div className={styles.artTiles}><span /><span /><span /></div><b>Познакомиться с продуктом</b></div>
      <div className={styles.ready}><span>✓</span> Готово к запуску</div><span className={styles.cursor}>↖ <b>Дизайнер</b></span>
    </>}
    {kind === "audit" && <>
      <div className={styles.auditPage}><small>СТРАНИЦА ПОД ЛУПОЙ</small><strong>Понятно ли,<br />почему выбрать вас?</strong><i /><i /><span>Оставить заявку</span><b className={styles.target}>◎</b></div>
      <div className={styles.findings}>
        <small className={styles.findingsLabel}>ПРОВЕРЯЕМ ПО ПОРЯДКУ</small>
        <span><b>01</b><span><strong>Ясное предложение</strong><em>Понятно, что вы предлагаете и кому это нужно.</em></span></span>
        <span><b>02</b><span><strong>Удобство на телефоне</strong><em>Ключевые действия доступны без лишнего поиска.</em></span></span>
        <span><b>03</b><span><strong>Заметный следующий шаг</strong><em>Обратиться можно в момент, когда возник интерес.</em></span></span>
      </div>
      <div className={styles.auditFlow}><small>ПУТЬ ДО ОБРАЩЕНИЯ</small><span>Визит</span><i /><span>Понятная страница</span><i /><strong>Следующий шаг</strong></div>
    </>}
    {kind === "reach" && <>
      <div className={styles.search}><span>⌕</span> Клиент ищет ваш продукт<i /></div>
      <div className={styles.channels}><span><b>SEO</b><small>В нужный момент</small></span><span><b>Контент</b><small>Ответ на вопрос</small></span><span><b>Реклама</b><small>Точное предложение</small></span></div>
      <div className={styles.destination}><span /> Страница под запрос <b>Обращение</b></div>
    </>}
    {kind === "crm" && <>
      <div className={styles.inbox}><span>Форма</span><span>Звонок</span><span>Чат</span></div>
      <div className={styles.kanban}><div><small>НОВОЕ</small><div className={styles.leadCard}><i /> Запрос на расчёт<dl><dt>Источник</dt><dd>Сайт</dd><dt>Ответственный</dt><dd>Менеджер</dd></dl></div></div><div><small>В РАБОТЕ</small><div className={styles.nextCard}><span>✓</span> Задача создана<small>Связаться с клиентом</small></div></div></div>
    </>}
    {kind === "report" && <>
      <div className={styles.reportHead}><span>КАНАЛ → ОБРАЩЕНИЕ → ПРОДАЖА</span><b>Анализ</b></div>
      <div className={styles.reportBody}><div className={styles.bars}><i /><i /><i /><i /><i /><i /></div><div className={styles.reportQuestions}><span>Откуда приходят?</span><span>Где останавливаются?</span><strong>Что изменить дальше?</strong></div></div>
      <small className={styles.reportNote}>Схема анализа, не показатели клиента</small>
    </>}
  </div>;
}

export function ActionArrow() {
  return <span className={styles.arrow} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M6 18 18 6M6 6h12v12" /><path d="M6 18 18 6M6 6h12v12" /></svg></span>;
}

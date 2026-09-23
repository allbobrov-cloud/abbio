"use client";

import Image from "next/image";
import styles from "./DesignFlow.module.css";

const palette = [
  ["Cobalt", "#1649ed"], ["Orange", "#f45132"], ["Lime", "#d8fa69"],
  ["White", "#f4f5f7"], ["Graphite", "#171b24"],
] as const;

function Product({ angle = false, className = "" }: { angle?: boolean; className?: string }) {
  return <Image className={`${styles.product} ${className}`} src={`/services/arc-01-${angle ? "angle" : "hero"}-v1.webp`} alt={angle ? "Демо ARC 01: дополнительный ракурс графитовой колонки" : "Демо ARC 01: графитовая портативная колонка"} width={768} height={768} sizes="(max-width: 760px) 260px, (max-width: 1100px) 280px, 220px" />;
}

function Colors({ names = false }: { names?: boolean }) {
  return <ul className={names ? styles.palette : styles.colors} aria-label="Палитра демо-продукта">{palette.map(([name, color]) => <li key={name}><span style={{ backgroundColor: color }} aria-hidden="true" /><small className={names ? undefined : "sr-only"}>{name}</small></li>)}</ul>;
}

function StepHeading({ number, name, title }: { number: string; name: string; title: string }) {
  return <header className={styles.stepHeading}><span>{number}</span><p>{name}</p><h3>{title}</h3></header>;
}

function Actions() {
  return <div className={styles.actions}><button type="button" aria-label="Купить ARC 01 — демонстрация">Купить</button><button type="button" aria-label="Подробнее об ARC 01 — демонстрация">Подробнее</button></div>;
}

export function DesignFlow() {


  return <div className={styles.panel} aria-label="Демо-проект ARC 01: пять этапов дизайна">
    <div className={styles.panelBar}><span>ARC 01 <span aria-hidden="true">/</span> от брифа до запуска</span><strong>Демонстрационный концепт</strong><span className={styles.swipeHint}>5 этапов · листайте ↔</span></div>
    <ol className={styles.steps}>
      <li className={styles.step}>
        <StepHeading number="01" name="Идея" title="Что важно объяснить" />
        <div className={`${styles.surface} ${styles.brief}`}>
          <div className={styles.windowTitle}><b>Бриф: ARC 01</b><span>01 / 05</span></div>
          <dl className={styles.briefFields}>
            <div><dt>Продукт</dt><dd>Портативная акустика</dd></div>
            <div><dt>Аудитория</dt><dd>Дом и работа</dd></div>
            <div><dt>Главная мысль</dt><dd>Чистый звук без лишнего</dd></div>
          </dl>
          <div className={styles.keyMessage}><small>Ключевое сообщение</small><b>Большой звук.<br />В компактной форме.</b></div>
          <Product />
          <p className={styles.briefFoot}>Один продукт. Одна ясная идея.</p>
        </div>
      </li>
      <li className={styles.step}>
        <StepHeading number="02" name="Принцип" title="Характер, ритм, композиция" />
        <div className={`${styles.surface} ${styles.editor}`} tabIndex={0} aria-label="Артборд ARC 01: заголовок, продукт и варианты кадра">
          <div className={styles.windowTitle}><b>ARC 01 / Hero</b><span>Design</span></div>
          <div className={styles.artboard}>
            <span className={styles.artboardLabel}>Портативная акустика</span>
            <b className={styles.artboardName}>ARC 01</b>
            <p>Чистый звук.<br />Компактная форма.</p>
            <div className={styles.selection}><Product angle /><i /><i /><i /><i /></div>
            <span className={styles.cursor} aria-hidden="true">↖ <b>Дизайнер</b></span>
          </div>
          <div className={styles.crops}><div><Product /><span>Главный ракурс</span></div><div><Product angle /><span>Деталь и фактура</span></div></div>
          <p className={styles.editorFoot}><i aria-hidden="true" /> Фокус на продукте</p>
        </div>
      </li>
      <li className={styles.step}>
        <StepHeading number="03" name="Язык" title="Aa / цвет / сетка" />
        <div className={`${styles.surface} ${styles.kit}`}>
          <div className={styles.windowTitle}><b>UI kit</b><span>ARC 01</span></div>
          <div className={styles.typeScale}><b>Aa</b><dl><div><dt>H1</dt><dd>Bold / 56</dd></div><div><dt>H2</dt><dd>Medium / 32</dd></div><div><dt>Body</dt><dd>Regular / 16</dd></div></dl></div>
          <p className={styles.kitLabel}>Цвета</p><Colors names />
          <div className={styles.gridLabel}><b>Сетка</b><span>8px</span></div><div className={styles.gridPreview} aria-label="Модульная сетка с шагом 8 пикселей"><i /><i /><i /><i /><i /><i /></div>
          <p className={styles.kitLabel}>Компоненты</p><Actions />
          <div className={styles.productRow}><Product angle /><div><b>ARC 01</b><span>Портативная акустика</span><strong>24 900 ₽</strong></div></div>
          <div className={styles.kitStates}><span>Состояния</span><div><b>Активно</b><i /><em>В корзине</em></div><div><b>Выбрано</b><i /><em>Доставка завтра</em></div></div>
        </div>
      </li>
      <li className={`${styles.step} ${styles.layoutStep}`}>
        <StepHeading number="04" name="Макет" title="Страница и сценарий" />
        <div className={`${styles.surface} ${styles.layout}`}>
          <div className={styles.windowTitle}><b>Страница товара</b><span>Desktop + mobile</span></div>
          <div className={styles.devicePair}>
            <div className={styles.desktopPage}>
              <div className={styles.shopNav}><b>ARC</b><span>Акустика</span></div>
              <h4>ARC 01</h4><p>Чистый звук.<br />Компактная форма.</p><Product />
              <ul className={styles.specs}><li>Портативный формат</li><li>Тканевая отделка</li><li>Управление на корпусе</li></ul>
              <Colors /><strong className={styles.price}>24 900 ₽</strong><Actions />
            </div>
            <div className={styles.phone} aria-label="Мобильная версия демо-страницы товара">
              <span className={styles.phoneSpeaker} aria-hidden="true" /><b>ARC 01</b><Product /><p>Чистый звук.<br />С собой.</p><strong>24 900 ₽</strong><button type="button" className={styles.mockButton} aria-label="Купить ARC 01 — демонстрация">Купить</button>
            </div>
          </div>
          <ol className={styles.userFlow} aria-label="Сценарий покупки"><li>Каталог</li><li>Товар</li><li>Корзина</li></ol>
          <div className={styles.layoutSupport}><span>Помогаем выбрать</span><div><i>✓</i><b>В наличии</b></div><div><i>↗</i><b>Доставка от 1 дня</b></div><div><i>⌁</i><b>Гарантия 2 года</b></div></div>
        </div>
      </li>
      <li className={styles.step}>
        <StepHeading number="05" name="Применение" title="Сайт, презентация, коммуникации" />
        <div className={`${styles.surface} ${styles.outputs}`}>
          <div className={styles.windowTitle}><b>Одна идея</b><span>3 носителя</span></div>
          <div className={styles.siteOutput}><span>Сайт / Hero</span><div><b>ARC 01</b><p>Чистый звук.<br />Компактная форма.</p><strong>24 900 ₽</strong></div><Product angle /></div>
          <div className={styles.slideOutput}><span>Презентация / 01</span><b>Звук в вашем ритме.</b><Product /><div><strong>ARC 01</strong><span>24 900 ₽</span></div></div>
          <div className={styles.posterOutput}><div><span>Коммуникации</span><b>ARC 01</b><p>Больше музыки.<br />Меньше лишнего.</p><strong>24 900 ₽</strong></div><Product angle /></div>
        </div>
      </li>
    </ol>
  </div>;
}

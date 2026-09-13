import Image from "next/image";
import styles from "./DesignDeliverables.module.css";

const colors = ["#f2ede4", "#c9b79e", "#947c62", "#743d36", "#292724"];

export function DesignDeliverables() {
  return (
    <ol className={styles.grid} aria-label="Материалы демо-концепта NORD FORM">
      <li className={`${styles.card} ${styles.concept}`}>
        <CardHeader number="01" title="Визуальная концепция" description="Зафиксированное направление: характер, композиция, цвет и принцип подачи." />
        <div className={styles.conceptBoard} aria-label="Concept board NORD FORM">
          <div className={styles.conceptCopy}>
            <span>NORD FORM / direction</span>
            <b>Тёплая фактура.<br />Спокойный силуэт.</b>
            <small>Фокус: вещи и материал в центре решения</small>
          </div>
          <Image src="/services/nord-form-direction-v2.webp" alt="Демо NORD FORM: визуальное направление женского магазина с пальто, фактурами и палитрой" fill sizes="(max-width: 760px) 320px, (max-width: 1100px) 35vw, 420px" style={{ objectFit: "cover", objectPosition: "right center", mixBlendMode: "normal" }} />
          <div className={styles.materials} aria-label="Материалы и цвета концепции"><i /><i /><i /></div>
        </div>
      </li>

      <li className={`${styles.card} ${styles.layouts}`}>
        <CardHeader number="02" title="Согласованные макеты" description="Страницы и ключевые состояния, собранные в единую логику интерфейса." />
        <div className={styles.artboards} aria-label="Набор макетов NORD FORM">
          <div className={styles.artboard}>
            <span>01 / каталог</span><b>NORD<br />FORM</b><i />
          </div>
          <div className={`${styles.artboard} ${styles.productBoard}`}>
            <Image src="/services/nord-form-devices-v2.webp" alt="Демо NORD FORM: desktop-макет женского магазина на мониторе и mobile-макет на телефоне" fill sizes="130px" style={{ objectFit: "cover", mixBlendMode: "normal" }} />
          </div>
          <div className={`${styles.artboard} ${styles.cartBoard}`}>
            <span>03 / корзина</span><b>Ваш выбор</b><i /><em>готово</em>
          </div>
        </div>
        <div className={styles.cardStatus}><span>desktop</span><span>mobile</span><b>согласовано</b></div>
      </li>

      <li className={`${styles.card} ${styles.identity}`}>
        <CardHeader number="03" title="Элементы фирменного стиля" description="Знак, типографика, палитра и правила применения — если это входит в задачу." />
        <div className={styles.identityKit}>
          <b>NORD<span> FORM</span></b>
          <div className={styles.typeRules}><strong>Aa</strong><span>H1 / Bold</span><span>Body / Regular</span></div>
          <div className={styles.swatches} aria-label="Палитра NORD FORM">{colors.map((color) => <i key={color} style={{ background: color }} />)}</div>
          <small>Спокойный editorial тон<br />+ чистая типографика</small>
          <div className={styles.identityApplications} aria-label="Примеры применения фирменного стиля">
            <span><i aria-hidden="true" />Lookbook</span>
            <span><i aria-hidden="true" />Каталог</span>
          </div>
        </div>
      </li>

      <li className={`${styles.card} ${styles.web}`}>
        <CardHeader number="04" title="Веб-дизайн и адаптивы" description="Макеты для согласованных экранов и сценариев использования." />
        <div className={styles.responsiveSet} aria-label="Desktop и mobile макеты NORD FORM">
          <div className={styles.desktopMock}>
            <div><b>NORD FORM</b><span>женская одежда</span></div><h4>Пальто Runa</h4><p>Тёплая фактура. Свободный силуэт.</p>
            <Image className={styles.desktopCampaignImage} src="/services/nord-form-lookbook-v2.webp" alt="Демо экран женского магазина NORD FORM" fill sizes="(max-width: 760px) 235px, 280px" />
            <strong>14 900 ₽</strong><span className={styles.mockCta}>В корзину</span>
          </div>
          <div className={styles.mobileMock}>
            <b>NORD FORM</b><Image className={styles.mobileCampaignImage} src="/services/nord-form-still-life-v2.webp" alt="" fill sizes="90px" /><span>9 900 ₽</span><i>В корзину</i>
          </div>
        </div>
      </li>

      <li className={`${styles.card} ${styles.slides}`}>
        <CardHeader number="05" title="Презентационные материалы" description="Материалы, которые помогают понятно представить продукт, услугу или идею." />
        <div className={styles.slideStack} aria-label="Презентация NORD FORM">
          <div className={styles.coverSlide}><span>NORD FORM / 01</span><b>Новая<br />коллекция.</b><Image className={styles.slideCampaignImage} src="/services/nord-form-lookbook-v2.webp" alt="Демо NORD FORM на обложке презентации" fill sizes="145px" /></div>
          <div className={styles.featureSlide}><span>02</span><b>Вещи<br />на каждый день</b><i /></div>
          <div className={styles.orangeSlide}><span>03 / сценарий</span><b>Гардероб<br />в деталях</b></div>
        </div>
      </li>

      <li className={`${styles.card} ${styles.files}`}>
        <CardHeader number="06" title="Подготовленные исходники" description="Структурированные файлы и согласованный состав передачи для дальнейшей работы команды." />
        <div className={styles.handoff} aria-label="Структура демо-файла NORD FORM в Figma">
          <div className={styles.figmaBar}><span>Figma</span><b>NORD FORM / e-commerce</b><i>Готово</i></div>
          <div className={styles.figmaWorkspace}>
            <div className={styles.figmaPages}><b>Страницы</b><span>Каталог</span><span>Товар</span><span>Корзина</span><em>Стили и компоненты</em></div>
            <div className={styles.figmaCanvas} aria-hidden="true">
              <div className={styles.figmaDesktop}><small>CATALOGUE</small><strong>NORD<br />FORM</strong><i /><span>Коллекция</span></div>
              <div className={styles.figmaProduct}><small>PRODUCT</small><i /><b>Пальто Runa</b><span>14 900 ₽</span></div>
              <div className={styles.figmaMobile}><small>MOBILE</small><i /><span>В корзину</span></div>
            </div>
          </div>
        </div>
        <div className={styles.handoffContents} aria-label="Состав передаваемого демо-файла">
          <span>каталог</span><span>товар</span><span>корзина</span><span>стили</span>
        </div>
        <div className={styles.handoffStatus}><span>структурировано</span><b>готово к передаче</b></div>
      </li>
    </ol>
  );
}

function CardHeader({ number, title, description }: { number: string; title: string; description: string }) {
  return <header className={styles.cardHeader}><span>{number}</span><h3>{title}</h3><p>{description}</p></header>;
}

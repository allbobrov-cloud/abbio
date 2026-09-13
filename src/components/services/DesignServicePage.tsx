import Image from "next/image";
import Link from "next/link";
import { ActionArrow } from "@/components/ActionArrow";
import styles from "./DesignServicePage.module.css";
import { DesignFlow } from "./DesignFlow";
import { DesignDeliverables } from "./DesignDeliverables";
import { CasePortfolio } from "./CasePortfolio";

const situations = [
  {
    label: "Запуск",
    title: "Новый бренд, продукт или направление",
    description: "Запускается новый бренд, продукт или направление.",
    artwork: "/services/design-situation-launch-v1.png",
  },
  {
    label: "Язык",
    title: "Визуальный язык потерял цельность",
    description: "Визуальный язык устарел или стал несобранным.",
  },
  {
    label: "Система",
    title: "Страницы не складываются в один опыт",
    description: "Сайт выглядит непоследовательно от страницы к странице.",
  },
  {
    label: "Ясность",
    title: "Предложение не считывается сразу",
    description: "Предложение сложно понять с первого взгляда.",
  },
  {
    label: "Подача",
    title: "Продукт нужно представить убедительнее",
    description: "Нужна убедительная презентация продукта или компании.",
    artwork: "/services/design-situation-presentation-v3.png",
  },
];

const workRows = [
  {
    task: "Нужно ясно объяснить продукт",
    principle: "Выделяем главное в предложении и выстраиваем визуальную иерархию.",
    application: "Визуальная концепция и ключевые точки контакта.",
    result: "Направление, с которым проще обсуждать решение.",
  },
  {
    task: "Нужен узнаваемый характер",
    principle: "Собираем правила цвета, типографики и композиции вокруг задачи.",
    application: "Айдентика и её элементы, если они входят в задачу.",
    result: "Согласованный визуальный язык.",
  },
  {
    task: "Страницы выглядят разрозненно",
    principle: "Определяем ритм, компоненты и последовательность действия пользователя.",
    application: "Веб-дизайн, макеты страниц и адаптивные состояния.",
    result: "Связанные макеты для разных экранов.",
  },
  {
    task: "Продукт нужно представить убедительнее",
    principle: "Собираем содержание вокруг вопросов аудитории и логики рассказа.",
    application: "Пользовательские сценарии и презентационные материалы.",
    result: "Материалы для понятного представления продукта.",
  },
];

function DesignHeroVisual() {
  return (
    <div className={styles.heroVisual} aria-hidden="true">
      <Image
        src="/services/design-hero-volterra-perspective-v9.png"
        alt=""
        fill
        priority
        sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1080px) 42vw, 610px"
      />
    </div>
  );
}

export function DesignServicePage() {
  return (
    <main id="main" className={styles.page}>
      <section className={styles.hero} aria-labelledby="design-title">
        <div className={styles.container}>
          <nav className={styles.breadcrumbs} aria-label="Хлебные крошки">
            <Link href="/">Главная</Link>
            <span aria-hidden="true">/</span>
            <Link href="/services">Услуги</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Дизайн</span>
          </nav>

          <div className={styles.heroStage}>
            <div className={styles.heroCopy}>
              <h1 id="design-title">
                <span>Дизайн, который</span>{" "}
                <span>помогает объяснить</span>{" "}
                <span>продукт.</span>
              </h1>
              <div className={styles.heroMedia}>
                <DesignHeroVisual />
                <p className={styles.heroDescription}>Формируем визуальный язык, собираем макеты и готовим точки контакта, чтобы предложение читалось ясно и последовательно.</p>
              </div>
              <div className={styles.heroActions}>
                <a href="#contact-dialog" data-contact-dialog className={styles.primaryAction}>Обсудить задачу <ActionArrow /></a>
                <Link href="#design-situations" className={styles.contextLink}>Посмотреть ситуации</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.designPreview} aria-labelledby="preview-title">
        <div className={styles.container}>
          <div className={styles.previewHeading}>
            <div>
              <p className={styles.sectionIndex}>01 / Визуальный принцип</p>
              <h2 id="preview-title">Идея становится макетом и точкой контакта.</h2>
            </div>
            <p>Сначала определяем, что должно быть понятно человеку. Затем собираем визуальный принцип и применяем его в нужных материалах.</p>
          </div>
          <div className={styles.heroBoard}>
            <Image src="/services/design-fashion-catalog-v1.png" alt="" fill priority sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1280px) calc(100vw - 96px), 1280px" />
          </div>
        </div>
      </section>

      <section className={styles.situations} id="design-situations" aria-labelledby="situations-title">
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <p className={styles.sectionIndex}>02 / Ситуации</p>
            <h2 id="situations-title">Когда дизайну нужно собрать разрозненное в понятное целое.</h2>
          </div>
          <ol className={styles.situationList}>
            {situations.map((item, index) => (
              <li key={item.title}>
                <div className={styles.situationMeta}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{item.label}</p>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                {item.artwork && <div className={styles.situationArtwork} aria-hidden="true"><Image src={item.artwork} alt="" fill sizes="(max-width: 760px) calc(100vw - 32px), (max-width: 1080px) 40vw, 520px" /></div>}
                <i aria-hidden="true" />
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.work} id="design-work" aria-labelledby="work-title">
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <p className={styles.sectionIndex}>03 / Работа ABB.IO</p>
            <h2 id="work-title">Визуальное решение связываем с задачей, а не с набором приёмов.</h2>
          </div>
          <p className={styles.workHint}>4 задачи · листайте</p>
          <div className={styles.workTable} role="list">
            {workRows.map((row, index) => (
              <article className={styles.workRow} key={row.task} role="listitem">
                <header className={styles.workTask}>
                  <span className={styles.workNumber}>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{row.task}</h3>
                </header>
                <div className={styles.workPath}>
                  <div className={styles.workStep}>
                    <p>Визуальный принцип</p>
                    <span>{row.principle}</span>
                  </div>
                  <div className={styles.workStep}>
                    <p>Применение</p>
                    <span>{row.application}</span>
                  </div>
                  <div className={`${styles.workStep} ${styles.workOutcome}`}>
                    <p>На выходе</p>
                    <strong>{row.result}</strong>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.startSection} id="design-contact-cta" aria-labelledby="start-title">
        <div className={styles.container}>
          <div className={styles.startPanel}>
            <Image className={styles.startArtwork} src="/services/design-contact-workspace-v1.png" alt="" fill sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1280px) calc(100vw - 96px), 1280px" />
            <div className={styles.startLead}>
              <p className={styles.sectionIndex}>Связаться с ABB.IO</p>
              <h2 id="start-title">Готовы обсудить дизайн-задачу?</h2>
              <p className={styles.startDescription}>Напишите нам о продукте, задаче и материалах. В ответ уточним детали и предложим следующий шаг.</p>
            </div>
            <div className={styles.startCopy}>
              <a href="#contact-dialog" data-contact-dialog className={styles.finalAction}>Обсудить задачу <ActionArrow /></a>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.flowSection} aria-labelledby="flow-title">
        <div className={styles.container}>
          <div className={styles.flowHeader}>
            <p className={styles.sectionIndex}>04 / Развитие идеи</p>
            <h2 id="flow-title">От замысла к материалу, который можно применять.</h2>
            <p>Каждый слой уточняет следующий: сначала смысл, затем визуальный принцип и только после этого конкретный носитель.</p>
          </div>
          <DesignFlow />
        </div>
      </section>

      <section className={styles.deliverables} aria-labelledby="deliverables-title">
        <div className={styles.container}>
          <div className={styles.deliverableLead}>
            <p className={styles.sectionIndex}>05 / Передача результата</p>
            <h2 id="deliverables-title">Что получает команда после дизайн-задачи.</h2>
            <p>Передаём материалы, с которыми можно продолжать работу: развивать продукт, собирать новые страницы и поддерживать единый визуальный язык.</p>
          </div>
          <DesignDeliverables />
        </div>
      </section>

      <CasePortfolio title="Три проекта — три разные задачи." description="Откройте кейс, чтобы посмотреть задачу, решение и материалы проекта." slugs={["bogov", "oss", "volhonka"]} featuredSlug="bogov" />

    </main>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ActionArrow } from "@/components/ActionArrow";
import styles from "./DesignServicePage.module.css";
import { DesignFlow } from "./DesignFlow";
import { DesignDeliverables } from "./DesignDeliverables";
import { DesignSituationExplorer } from "./DesignSituationExplorer";
import { CasePortfolio } from "./CasePortfolio";

function DesignHeroVisual() {
  return (
    <div className={styles.heroVisual} aria-hidden="true">
      <Image
        src="/services/arc-01-pedestal-v1.webp"
        alt=""
        fill
        priority
        sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1080px) 42vw, 610px"
      />
      <p>Демонстрационный концепт ARC 01</p>
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
            <Image src="/services/arc-01-figma-layout-v1.webp" alt="" fill priority sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1280px) calc(100vw - 96px), 1280px" />
            <p>Демонстрационный концепт ARC 01</p>
          </div>
        </div>
      </section>

      <DesignSituationExplorer />

      <section className={styles.startSection} id="design-contact-cta" aria-labelledby="start-title">
        <div className={styles.container}>
          <div className={styles.startPanel}>
            <Image className={styles.startArtwork} src="/services/design-contact-workspace-v1.png" alt="" fill sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1280px) calc(100vw - 96px), 1280px" />
            <div className={styles.startLead}>
              <p className={styles.sectionIndex}>Связаться с ABBiO</p>
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
            <p className={styles.sectionIndex}>03 / Развитие идеи</p>
            <h2 id="flow-title">От замысла к материалу, который можно применять.</h2>
            <p>Каждый слой уточняет следующий: сначала смысл, затем визуальный принцип и только после этого конкретный носитель.</p>
          </div>
          <DesignFlow />
        </div>
      </section>

      <section className={styles.deliverables} aria-labelledby="deliverables-title">
        <div className={styles.container}>
          <div className={styles.deliverableLead}>
            <p className={styles.sectionIndex}>04 / Передача результата</p>
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

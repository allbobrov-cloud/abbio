import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ActionArrow } from "@/components/ActionArrow";
import { SeoHeroExperience } from "./SeoHeroExperience";
import { SeoDemandSpace } from "./SeoDemandSpace";
import { SeoHealthScan } from "./SeoHealthScan";
import { SeoPageAnatomy } from "./SeoPageAnatomy";
import { SeoQueryJourney } from "./SeoQueryJourney";
import { SeoOwnChannel } from "./SeoOwnChannel";
import styles from "./SeoServicePage.module.css";
import heroStyles from "./SeoHeroBlend.module.css";
import heroLayoutStyles from "./SeoHeroLayout.module.css";
import developmentCycleStyles from "./SeoDevelopmentCycle.module.css";
import finalVisualStyles from "./SeoFinalVisual.module.css";

type SectionLeadProps = {
  index: string;
  title: ReactNode;
  description: string;
  id: string;
};

function SectionLead({ index, title, description, id }: SectionLeadProps) {
  return (
    <header className={styles.sectionLead}>
      <p className={styles.sectionIndex}>{index}</p>
      <h2 id={id}>{title}</h2>
      <p className={styles.sectionDescription}>{description}</p>
    </header>
  );
}

export function SeoServicePage() {
  return (
    <main id="main" className={styles.page}>
      <section className={`${styles.hero} ${heroStyles.hero}`} aria-labelledby="seo-title">
        <div className={`${styles.container} ${heroStyles.container}`}>
          <nav className={styles.breadcrumbs} aria-label="Хлебные крошки">
            <Link href="/">Главная</Link><span aria-hidden="true">/</span>
            <Link href="/services">Услуги</Link><span aria-hidden="true">/</span>
            <span aria-current="page">SEO-продвижение</span>
          </nav>
          <div className={heroLayoutStyles.stage}>
            <div className={`${styles.heroCopy} ${heroLayoutStyles.copy}`}>
              <p className={styles.kicker}>SEO · Структура · Контент · Аналитика</p>
              <h1 id="seo-title">Клиенты уже ищут.<br />Помогаем им найти вас.</h1>
            </div>
            <div className={heroLayoutStyles.visual} aria-hidden="true">
              <SeoHeroExperience />
            </div>
            <div className={heroLayoutStyles.details}>
              <p className={styles.heroDescription}>Развиваем сайт под реальный поисковый спрос: создаём нужные страницы, улучшаем их и связываем органический трафик с обращениями.</p>
              <a href="#contact-dialog" data-contact-dialog className={styles.primaryAction}>Обсудить SEO <ActionArrow /></a>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="demand-title">
        <div className={styles.container}>
          <SectionLead index="01 / Поисковый спрос" id="demand-title" title={<>SEO начинается не с позиций.<br />Оно начинается со спроса.</>} description="Сначала изучаем, что и как ищут потенциальные клиенты. Разные запросы отражают разные задачи — купить, выбрать, сравнить или разобраться." />
          <SeoDemandSpace />
        </div>
      </section>

      <section className={styles.section} aria-labelledby="technical-title">
        <div className={styles.container}>
          <SectionLead index="02 / Техническая основа" id="technical-title" title="Убираем то, что мешает поиску видеть сайт." description="Проверяем индексацию, адреса страниц, дубли, метаданные, внутренние ссылки, мобильную версию, скорость загрузки, robots.txt и sitemap.xml. Найденные ограничения устраняем, а не просто фиксируем в отчёте." />
          <SeoHealthScan />
        </div>
      </section>

      <section className={`${styles.section} ${styles.contentSection}`} aria-labelledby="content-title">
        <div className={styles.container}>
          <SectionLead index="03 / Страницы и материалы" id="content-title" title="Не пишем тексты для робота." description="Каждая страница строится вокруг реального вопроса: сразу отвечает на запрос, помогает выбрать нужный вариант и ведёт к понятному действию — без текста, написанного только ради ключевых слов." />
          <SeoPageAnatomy />
        </div>
      </section>

      <section className={styles.finalSection} aria-labelledby="seo-contact-title">
        <div className={styles.container}>
          <div className={styles.finalPanel}>
            <p className={styles.sectionIndex}>Связаться с ABBiO</p>
            <h2 id="seo-contact-title">Начнём развивать собственный поисковый канал.</h2>
            <p>Изучим текущий сайт, приоритетные направления и доступные данные, чтобы определить первый этап SEO-продвижения.</p>
            <a href="#contact-dialog" data-contact-dialog className={styles.finalAction}>Обсудить SEO <ActionArrow /></a>
            <div className={`${styles.finalVisual} ${finalVisualStyles.finalVisual}`} aria-hidden="true">
              <Image
                src="/services/seo-final-search-channel-v2.webp"
                alt=""
                fill
                sizes="(max-width: 760px) calc(100vw - 80px), 620px"
              />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="measurement-title">
        <div className={styles.container}>
          <SectionLead index="04 / Измерение" id="measurement-title" title="Позиция — ещё не результат." description="Смотрим не на позицию саму по себе, а на весь путь одного запроса: от поиска до обращения. Если доступны нужные данные, доводим этот путь до статуса в CRM." />
          <SeoQueryJourney />
        </div>
      </section>

      <section className={`${styles.section} ${styles.developmentSection}`} aria-labelledby="development-title">
        <div className={styles.container}>
          <SectionLead index="05 / Развитие" id="development-title" title="SEO — это постоянное развитие сайта." description="Следим за спросом и состоянием страниц, обновляем материалы, проверяем изменения и определяем следующие приоритеты." />
          <div className={`${styles.developmentLoop} ${developmentCycleStyles.developmentLoop}`}>
            <ol>
              <li><span>01</span><strong>Наблюдаем за спросом</strong></li>
              <li><span>02</span><strong>Обновляем страницы</strong></li>
              <li><span>03</span><strong>Проверяем изменения</strong></li>
              <li><span>04</span><strong>Выбираем приоритет</strong></li>
            </ol>
            <div className={`${styles.loopMark} ${developmentCycleStyles.loopMark}`} aria-hidden="true">
              <Image
                src="/services/seo-development-cycle-core-v1.png"
                alt=""
                fill
                sizes="(max-width: 760px) 128px, 168px"
              />
              <span>SEO</span>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.resultSection}`} aria-labelledby="result-title">
        <div className={styles.container}>
          <SectionLead index="06 / Результат" id="result-title" title="Сайт начинает работать как собственный канал привлечения." description="Постепенно сайт начинает приводить обращения из поиска — наравне с рекламой, а не вместо неё. Скорость и объём результата зависят от спроса, конкуренции, состояния сайта и выполненных работ." />
          <SeoOwnChannel />
        </div>
      </section>

      <section className={`${styles.section} ${styles.caseSection}`} aria-labelledby="cases-title">
        <div className={styles.container}>
          <SectionLead index="07 / Кейс" id="cases-title" title="Реальный результат: Мотошкола Владимира Богова." description="Развили структуру и страницы под поисковый спрос. Ниже — фактические позиции по отслеживаемым запросам, а не прогноз." />
          <Link href="/cases/bogov" className={styles.seoCaseCard}>
            <div className={styles.seoCaseStat}>
              <strong>91%</strong>
              <span>запросов в ТОП-10</span>
            </div>
            <dl className={styles.seoCaseMeta}>
              <div><dt>Выборка</dt><dd>22 отслеживаемых запроса</dd></div>
              <div><dt>Регион</dt><dd>Санкт-Петербург, Яндекс</dd></div>
              <div><dt>Дата</dt><dd>09.09.2026</dd></div>
            </dl>
            <span className={styles.seoCaseLink}>Смотреть кейс <ActionArrow /></span>
          </Link>
          <div className={styles.seoOtherCases}>
            <p>Другие проекты</p>
            <Link href="/cases/oss">ОборонСпецСплав <span aria-hidden="true">↗</span></Link>
            <Link href="/cases/volhonka">Металлобаза Волхонка <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>
    </main>
  );
}

import Link from "next/link";
import { ActionArrow } from "@/components/ActionArrow";
import styles from "./SeoServicePage.module.css";

const technicalChecks = [
  "Индексация",
  "Адреса страниц",
  "Дубли",
  "Метаданные",
  "Внутренние ссылки",
  "Мобильная версия",
  "Скорость загрузки",
];

const scope = [
  "Анализ поискового спроса",
  "Структура запросов и страниц",
  "Технический SEO-аудит",
  "Задания на доработку сайта",
  "Создание и обновление материалов",
  "Настройка измерения",
  "Понятная отчётность",
];

type SectionLeadProps = {
  index: string;
  title: string;
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

function SearchRoute() {
  const steps = ["Поисковый спрос", "Подходящая страница", "Переход", "Целевое действие", "CRM", "Отчёт"];
  return (
    <div className={styles.searchRoute} aria-label="Путь от поискового спроса до отчёта">
      <div className={styles.searchBar}><span aria-hidden="true" />Что ищет человек?</div>
      <ol>
        {steps.map((step, index) => (
          <li key={step}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{step}</strong>
          </li>
        ))}
      </ol>
      <p>Органический путь</p>
    </div>
  );
}

export function SeoServicePage() {
  return (
    <main id="main" className={styles.page}>
      <section className={styles.hero} aria-labelledby="seo-title">
        <div className={styles.container}>
          <nav className={styles.breadcrumbs} aria-label="Хлебные крошки">
            <Link href="/">Главная</Link><span aria-hidden="true">/</span>
            <Link href="/services">Услуги</Link><span aria-hidden="true">/</span>
            <span aria-current="page">SEO-продвижение</span>
          </nav>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.kicker}>SEO-продвижение</p>
              <h1 id="seo-title">Органический поиск становится самостоятельным источником обращений.</h1>
              <p className={styles.heroDescription}>Развиваем сайт под реальный спрос, чтобы люди находили компанию самостоятельно, а бизнес меньше зависел от платной рекламы.</p>
              <a href="#contact-dialog" data-contact-dialog className={styles.primaryAction}>Обсудить SEO <ActionArrow /></a>
            </div>
            <SearchRoute />
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="demand-title">
        <div className={styles.container}>
          <SectionLead index="01 / Поисковый спрос" id="demand-title" title="Начинаем не с позиций, а с того, что ищут люди." description="Собираем и группируем запросы, отделяем полезный для компании спрос и определяем, какие страницы должны на него отвечать." />
          <div className={styles.demandMap} aria-label="Пример группировки поискового спроса">
            <div className={styles.demandCore}><span>Спрос</span><strong>Задача человека</strong><small>контекст · намерение · выбор</small></div>
            <div className={styles.queryGroup}><span>Услуга</span><p>Что нужно сделать</p><i /></div>
            <div className={styles.queryGroup}><span>Категория</span><p>Что человек выбирает</p><i /></div>
            <div className={styles.queryGroup}><span>Вопрос</span><p>Что мешает решению</p><i /></div>
            <div className={styles.queryGroup}><span>Сравнение</span><p>По каким критериям выбирают</p><i /></div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.structureSection}`} aria-labelledby="structure-title">
        <div className={styles.container}>
          <SectionLead index="02 / Структура сайта" id="structure-title" title="Под важный запрос должна быть подходящая страница." description="Определяем, какие разделы, услуги, категории и материалы нужно создать или переработать, чтобы человек сразу попадал в нужный контекст." />
          <div className={styles.siteTree} aria-label="Схема структуры сайта">
            <div className={styles.treeRoot}><small>Сайт</small><strong>Главная</strong></div>
            <div className={styles.treeBranch}>
              <article><span>01</span><strong>Услуги</strong><p>Запрос с конкретной задачей</p></article>
              <article><span>02</span><strong>Категории</strong><p>Выбор внутри ассортимента</p></article>
              <article><span>03</span><strong>Материалы</strong><p>Вопросы и критерии выбора</p></article>
            </div>
            <p className={styles.treeCaption}>Каждая ветка отвечает своему типу спроса.</p>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="technical-title">
        <div className={styles.container}>
          <SectionLead index="03 / Техническая основа" id="technical-title" title="Поисковые системы должны находить и понимать страницы." description="Проверяем индексацию, адреса страниц, дубли, метаданные, внутренние ссылки, мобильную версию и скорость загрузки. Состав технических работ определяем после изучения сайта." />
          <div className={styles.auditPanel}>
            <header><div><i /><i /><i /></div><span>Технический контур сайта</span><small>проверка</small></header>
            <ul>
              {technicalChecks.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong><em>изучаем</em></li>)}
            </ul>
            <div className={styles.auditSignal} aria-hidden="true"><i /><i /><i /><i /><i /></div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.contentSection}`} aria-labelledby="content-title">
        <div className={styles.container}>
          <SectionLead index="04 / Страницы и материалы" id="content-title" title="Контент отвечает на вопрос и помогает сделать выбор." description="Прорабатываем структуру и содержание страниц вокруг реальных вопросов, услуг, ассортимента и критериев выбора — без текстов, написанных только ради ключевых слов." />
          <div className={styles.contentWorkbench}>
            <div className={styles.searchQuestion}><span>Запрос</span><strong>Как выбрать подходящее решение?</strong><p>У человека есть задача, контекст и критерии.</p></div>
            <article className={styles.pageOutline}>
              <header><span>Подходящая страница</span><i /></header>
              <h3>Ответ в первом экране</h3>
              <div className={styles.outlineRows}><i /><i /><i /></div>
              <div className={styles.choicePoints}><span>Условия</span><span>Варианты</span><span>Действие</span></div>
            </article>
            <p className={styles.workbenchCaption}>Вопрос определяет структуру страницы, а структура помогает принять решение.</p>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="measurement-title">
        <div className={styles.container}>
          <SectionLead index="05 / Измерение" id="measurement-title" title="Смотрим не только на позиции, но и на действия после перехода." description="Связываем поисковые запросы и страницы с целевыми действиями. Если доступны необходимые данные, передаём обращения в CRM и оцениваем их дальнейшее движение." />
          <div className={styles.measurementFlow} aria-label="Схема измерения пути из поиска">
            <ol>
              <li><span>01</span><strong>Запрос</strong><small>намерение</small></li>
              <li><span>02</span><strong>Страница</strong><small>контекст</small></li>
              <li><span>03</span><strong>Действие</strong><small>обращение</small></li>
              <li><span>04</span><strong>CRM</strong><small>движение</small></li>
            </ol>
            <div className={styles.reportCard}><span>Отчёт</span><strong>Видим путь, а не отдельную цифру.</strong><div aria-hidden="true"><i /><i /><i /><i /></div></div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.developmentSection}`} aria-labelledby="development-title">
        <div className={styles.container}>
          <SectionLead index="06 / Развитие" id="development-title" title="SEO — это постоянное развитие сайта." description="Следим за спросом и состоянием страниц, обновляем материалы, проверяем изменения и определяем следующие приоритеты." />
          <div className={styles.developmentLoop}>
            <ol>
              <li><span>01</span><strong>Наблюдаем за спросом</strong></li>
              <li><span>02</span><strong>Обновляем страницы</strong></li>
              <li><span>03</span><strong>Проверяем изменения</strong></li>
              <li><span>04</span><strong>Выбираем приоритет</strong></li>
            </ol>
            <div className={styles.loopMark} aria-hidden="true"><span>SEO</span></div>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="scope-title">
        <div className={styles.container}>
          <SectionLead index="07 / Состав работ" id="scope-title" title="Что может входить в SEO-продвижение." description="Точный состав, последовательность и периодичность работ определяем после изучения сайта, ниши и текущих данных." />
          <ol className={styles.scopeList}>
            {scope.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong><i aria-hidden="true" /></li>)}
          </ol>
        </div>
      </section>

      <section className={`${styles.section} ${styles.resultSection}`} aria-labelledby="result-title">
        <div className={styles.container}>
          <SectionLead index="08 / Результат" id="result-title" title="Собственный канал обращений вместо постоянной зависимости от рекламы." description="Результат SEO-продвижения — сайт, способный привлекать целевой спрос из поиска без оплаты за каждый переход. Скорость и объём результата зависят от спроса, конкуренции, состояния сайта и выполненных работ." />
          <div className={styles.channelPanel}>
            <div className={styles.channelSource}><span>Органический поиск</span><strong>Спрос существует независимо от рекламной кампании.</strong></div>
            <div className={styles.channelLine} aria-hidden="true"><i /><i /><i /></div>
            <div className={styles.channelDestination}><span>Сайт компании</span><strong>Собственная система страниц и материалов.</strong><small>Развивается со временем</small></div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.casesSection}`} aria-labelledby="seo-cases-title">
        <div className={styles.container}>
          <SectionLead index="Проекты ABB.IO" id="seo-cases-title" title="Проекты, где SEO связано со структурой сайта." description="Показываем контекст работы без вымышленных показателей и обещаний результата." />
          <div className={styles.caseLinks}>
            <Link href="/cases/oss"><span>Промышленность / B2B</span><h3>ОборонСпецСплав</h3><p>Каталог специального металлопроката: страницы категорий и товаров помогают отвечать на конкретный спрос.</p><b>Открыть кейс <ActionArrow /></b></Link>
            <Link href="/cases/volhonka"><span>Металлопрокат / B2B</span><h3>Металлобаза Волхонка</h3><p>Каталог, поисковое продвижение и работа с обращениями объединены в одном маршруте.</p><b>Открыть кейс <ActionArrow /></b></Link>
          </div>
        </div>
      </section>

      <section className={styles.finalSection} aria-labelledby="seo-contact-title">
        <div className={styles.container}>
          <div className={styles.finalPanel}>
            <p className={styles.sectionIndex}>Связаться с ABB.IO</p>
            <h2 id="seo-contact-title">Начнём развивать собственный поисковый канал.</h2>
            <p>Изучим текущий сайт, приоритетные направления и доступные данные, чтобы определить первый этап SEO-продвижения.</p>
            <a href="#contact-dialog" data-contact-dialog className={styles.finalAction}>Обсудить SEO <ActionArrow /></a>
            <div className={styles.finalVisual} aria-hidden="true"><i /><i /><i /><i /><span>search → site → action</span></div>
          </div>
        </div>
      </section>
    </main>
  );
}

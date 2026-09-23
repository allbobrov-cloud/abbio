import Image from "next/image";
import Link from "next/link";
import { ActionArrow } from "@/components/ActionArrow";
import { CasePortfolio } from "./CasePortfolio";
import { WebsitesCrmSection } from "./WebsitesCrmSection";
import { WebsitesTechnologySelector } from "./WebsitesTechnologySelector";
import styles from "./WebsitesServicePage.module.css";

const formats = [
  {
    number: "01",
    title: "Лендинг",
    kind: "landing",
    when: "Одно предложение, услуга или запуск — без нужды в большой структуре.",
    scenario: "Посетитель читает страницу целиком и приходит к одной заявке.",
    includes: "Оффер, аргументы и форма — состав блоков под конкретную задачу.",
    caseSlug: null,
  },
  {
    number: "02",
    title: "Корпоративный сайт",
    kind: "corporate",
    when: "Несколько направлений, услуг или аудиторий, которым нужна общая структура.",
    scenario: "Посетитель выбирает нужный раздел и уже там ищет, как обратиться.",
    includes: "Структура разделов, страницы направлений, точки обращения.",
    caseSlug: "bogov",
  },
  {
    number: "03",
    title: "Каталог",
    kind: "catalog",
    when: "Большой ассортимент, который нужно фильтровать и сравнивать.",
    scenario: "Посетитель ищет позицию по параметрам и отправляет предметный запрос.",
    includes: "Каталог, карточки товара, поиск и фильтры, заявка менеджеру.",
    caseSlug: "oss",
  },
] as const;

const caseNames: Record<string, string> = {
  bogov: "Мотошкола Владимира Богова",
  oss: "ОборонСпецСплав",
  volhonka: "Металлобаза Волхонка",
};

const creationStages = [
  {
    number: "01",
    title: "Бизнес, продукт, аудитория",
    text: "Разбираемся, что продаёт компания, кому и как принимает обращения.",
    visual: "/services/websites-creation-discovery-v1.png",
  },
  {
    number: "02",
    title: "Структура и содержание",
    text: "Определяем страницы, разделы и материалы, которые помогают выбрать.",
    visual: "/services/websites-creation-structure-v1.png",
  },
  {
    number: "03",
    title: "Сценарии и прототип",
    text: "Собираем путь по сайту и проверяем логику до визуального решения.",
    visual: "/services/websites-creation-prototype-v1.png",
  },
  {
    number: "04",
    title: "Дизайн",
    text: "Показываем главное, выстраиваем иерархию и точки действия.",
    visual: "/services/websites-creation-design-v1.png",
  },
  {
    number: "05",
    title: "Desktop и mobile",
    text: "Разрабатываем сайт и его адаптивные состояния для разных экранов.",
    visual: "/services/websites-creation-responsive-v1.png",
  },
  {
    number: "06",
    title: "Тестирование и запуск",
    text: "Проверяем основные сценарии, подключаем согласованные интеграции и запускаем.",
    visual: "/services/websites-creation-launch-v1.png",
  },
] as const;

const formatVisuals = {
  landing: "/services/websites-format-landing-photo-studio-v1.png",
  corporate: "/services/websites-format-corporate-refinery-v1.png",
  catalog: "/services/websites-format-catalog-smartphones-v1.png",
} as const;

function FormatVisual({ kind }: { kind: (typeof formats)[number]["kind"] }) {
  return (
    <div className={styles.formatImage} aria-hidden="true">
      <Image
        src={formatVisuals[kind]}
        alt=""
        fill
        loading="eager"
        sizes="(max-width: 760px) calc(100vw - 88px), (max-width: 1080px) 29vw, 380px"
      />
    </div>
  );
}

function SectionHeader({
  label,
  title,
  lead,
  titleId,
  light = false,
}: {
  label: string;
  title: string;
  lead: string;
  titleId: string;
  light?: boolean;
}) {
  return (
    <div
      className={[styles.sectionHeader, light ? styles.sectionHeaderLight : ""]
        .filter(Boolean)
        .join(" ")}
    >
      <p className={styles.sectionIndex}>{label}</p>
      <h2 id={titleId}>{title}</h2>
      <p className={styles.sectionLead}>{lead}</p>
    </div>
  );
}

export function WebsitesServicePage() {
  return (
    <main id="main" className={styles.page}>
      <section className={styles.hero} aria-labelledby="websites-title">
        <div className={styles.container}>
          <nav className={styles.breadcrumbs} aria-label="Хлебные крошки">
            <Link href="/">Главная</Link>
            <span aria-hidden="true">/</span>
            <Link href="/services">Услуги</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Сайты</span>
          </nav>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.kicker}>Разработка сайтов для бизнеса</p>
              <h1 id="websites-title">Сайты, которые приводят заявки.</h1>
              <div className={styles.heroMedia}>
                <div className={styles.heroVisual} aria-hidden="true">
                  <Image
                    src="/services/websites-hero-sales-workflow-v2.png"
                    alt=""
                    fill
                    priority
                    quality={100}
                    sizes="(max-width: 760px) calc(100vw - 24px), 100vw"
                  />
                </div>
                <p className={styles.heroLead}>
                  Проектируем и разрабатываем сайты под задачу бизнеса: объясняем
                  предложение, ведём посетителя к целевому действию, передаём
                  обращение в CRM и помогаем отделу продаж довести его до
                  следующего этапа сделки.
                </p>
              </div>
              <div className={styles.heroActions}>
                <a
                  href="#contact-dialog"
                  data-contact-dialog
                  className={styles.primaryAction}
                >
                  Обсудить новый сайт <ActionArrow />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.salesArgument} aria-labelledby="sales-title">
        <div className={styles.container}>
          <SectionHeader
            label="01 / Сайт и продажи"
            title="Сайт должен вести к продаже, а не просто рассказывать о компании."
            lead="Посетитель приходит с вопросом: подходит ли ему ваш продукт, что выбрать и как сделать следующий шаг. Если сайт не отвечает на эти вопросы быстро, интерес заканчивается до обращения."
            titleId="sales-title"
          />
          <div className={styles.salesScene}>
            <div className={styles.salesCopy}>
              <p>
                Чтобы посетитель дошёл до заявки, на сайте должны работать три
                простые вещи.
              </p>
              <span>Путь до обращения</span>
            </div>
            <ol className={styles.salesSteps}>
              <li>
                <span>01</span>
                <div>
                  <h3>Понятно, что вы предлагаете</h3>
                  <p>Главное предложение и условия видны без долгого поиска.</p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <h3>Легко выбрать нужное</h3>
                  <p>
                    Структура, категории и содержание помогают сориентироваться.
                  </p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <h3>Просто обратиться</h3>
                  <p>Следующий шаг заметен там, где он нужен посетителю.</p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      <section className={styles.formats} aria-labelledby="formats-title">
        <div className={styles.container}>
          <SectionHeader
            label="02 / Форматы сайтов"
            title="Выбираем формат сайта под задачу и объём содержания."
            lead="Лендинг подходит для одного предложения, корпоративный сайт — для нескольких направлений, каталог — для большого ассортимента и предметного выбора."
            titleId="formats-title"
          />
          <div className={styles.formatGrid}>
            {formats.map((format) => (
              <article
                className={[styles.formatCard, styles[format.kind]].join(" ")}
                key={format.kind}
              >
                <span className={styles.formatNumber}>{format.number}</span>
                <FormatVisual kind={format.kind} />
                <div className={styles.formatContent}>
                  <h3>{format.title}</h3>
                  <dl className={styles.formatFields}>
                    <div>
                      <dt>Когда подходит</dt>
                      <dd>{format.when}</dd>
                    </div>
                    <div>
                      <dt>Основной сценарий</dt>
                      <dd>{format.scenario}</dd>
                    </div>
                    <div>
                      <dt>Что входит в обсуждение</dt>
                      <dd>{format.includes}</dd>
                    </div>
                  </dl>
                  <div className={styles.formatActions}>
                    <a href="#contact-dialog" data-contact-dialog className={styles.formatCta}>
                      Обсудить {format.title.toLowerCase()} <ActionArrow />
                    </a>
                    {format.caseSlug && (
                      <Link href={`/cases/${format.caseSlug}`} className={styles.formatCaseLink}>
                        Пример: {caseNames[format.caseSlug]} <span aria-hidden="true">↗</span>
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className={styles.formatsNote}>
            Формат и состав страниц определяем после разбора задачи, материалов
            и пути посетителя.
          </p>
        </div>
      </section>

      <section
        className={styles.creationSection}
        id="sales-route"
        aria-labelledby="creation-title"
      >
        <div className={styles.container}>
          <SectionHeader
            label="03 / Создание сайта"
            title="От задачи бизнеса — к работающему сайту."
            lead="Собираем сайт вокруг продукта, структуры и будущей работы команды: от первого разбора до тестирования и запуска."
            titleId="creation-title"
          />
          <ol className={styles.creationRoute}>
            {creationStages.map((item, index) => (
              <li key={item.number}>
                <div className={styles.creationPreview} aria-hidden="true">
                  <Image
                    src={item.visual}
                    alt=""
                    fill
                    loading="eager"
                    sizes="(max-width: 760px) calc((100vw - 60px) / 2), (max-width: 1080px) 15vw, 200px"
                  />
                  <span>{item.number}</span>
                </div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
                {index < creationStages.length - 1 && (
                  <b className={styles.creationConnector} aria-hidden="true" />
                )}
              </li>
            ))}
          </ol>
          <p className={styles.creationCaption}>
            Каждый этап уточняет следующий: так структура, дизайн и разработка
            работают как один сайт.
          </p>
        </div>
      </section>

      <section className={styles.technology} aria-labelledby="technology-title">
        <div className={styles.container}>
          <SectionHeader
            label="04 / Технология"
            title="Сначала задача и ограничения — платформа раскрывается по выбору."
            lead="Технология не занимает самостоятельного места в решении. Выбираем её после разбора управления контентом, каталога и нужных интеграций — под конкретную задачу ниже."
            titleId="technology-title"
          />
          <WebsitesTechnologySelector />
          <p className={styles.techNote}>
            Не подбираем платформу ради названия. Подбираем решение под задачу
            сайта.
          </p>
        </div>
      </section>

      <WebsitesCrmSection />

      <section className={styles.handoff} aria-labelledby="handoff-title">
        <div className={styles.container}>
          <SectionHeader
            label="06 / Передача результата"
            title="Сайт становится рабочим активом компании."
            lead="Он принимает трафик, помогает посетителю выбрать и собирает обращения в CRM. Передаём его команде вместе с понятным составом: что входит в поставку, что проверено перед запуском и что подключается отдельно."
            titleId="handoff-title"
          />
          <div className={styles.handoffPanel}>
            <div className={styles.handoffVisual} aria-hidden="true">
              <Image
                src="/services/websites-post-launch-handoff-v2.png"
                alt=""
                fill
                sizes="(max-width: 760px) calc(100vw - 44px), (max-width: 1080px) 42vw, 560px"
              />
            </div>
            <div className={styles.handoffGroups}>
              <div className={styles.handoffGroup}>
                <h3>Что получаете</h3>
                <ul>
                  <li>Структура и адаптивные страницы под сценарии выбора</li>
                  <li>Точки обращения: формы, почта, звонки, чат</li>
                  <li>Доступы, компоненты и материалы для развития</li>
                </ul>
              </div>
              <div className={styles.handoffGroup}>
                <h3>Что проверяем перед запуском</h3>
                <ul>
                  <li>Сценарии на всех страницах и адаптивные состояния</li>
                  <li>Подключённые интеграции и передачу обращений в CRM</li>
                  <li>Скорость, корректность форм и мобильную версию</li>
                </ul>
              </div>
              <div className={styles.handoffGroup}>
                <h3>Что развивается отдельно</h3>
                <ul>
                  <li>
                    SEO-продвижение — техническая база заложена, спрос и рост
                    видимости в разделе{" "}
                    <Link href="/services/seo" className={styles.seoLink}>
                      «SEO» <ActionArrow />
                    </Link>
                  </li>
                  <li>Поддержка и доработки после запуска — по согласованию</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.designBridge} aria-labelledby="design-title">
        <div className={styles.container}>
          <SectionHeader
            label="07 / Дизайн и выбор"
            title="Дизайн помогает понять предложение и сделать выбор."
            lead="Выстраиваем иерархию, показываем главное и помогаем посетителю перейти от первого экрана к нужному действию."
            titleId="design-title"
          />
          <Link
            href="/services/design"
            className={styles.designPortal}
            aria-label="Перейти в раздел «Дизайн»"
          >
            <div className={styles.designPortalVisual} aria-hidden="true">
              <Image
                src="/services/design-hero-volterra-wide-v7.png"
                alt=""
                fill
                loading="eager"
                sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1280px) calc(100vw - 96px), 1280px"
              />
            </div>
            <div className={styles.designPortalAction}>
              <div className={styles.designPortalCopy}>
                <p>Нужен самостоятельный дизайн-этап?</p>
                <span className={styles.designPortalCta}>
                  Перейти к дизайну <ActionArrow />
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <CasePortfolio
        title="Три проекта — три разные задачи."
        description="Откройте кейс, чтобы посмотреть задачу, решение и материалы проекта."
        slugs={["oss", "bogov", "volhonka"]}
        featuredSlug="oss"
      />
    </main>
  );
}

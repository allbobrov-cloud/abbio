import Image from "next/image";
import Link from "next/link";
import { ActionArrow } from "@/components/ActionArrow";
import { CasePortfolio } from "./CasePortfolio";
import styles from "./WebsitesServicePage.module.css";

const formats = [
  {
    number: "01",
    title: "Лендинг",
    text: "Для одного предложения, услуги или запуска. Помогает последовательно объяснить ценность и привести посетителя к заявке.",
    kind: "landing",
  },
  {
    number: "02",
    title: "Корпоративный сайт",
    text: "Для компании с несколькими направлениями, услугами или аудиториями. Собирает информацию в понятную структуру и ведёт к нужному разделу или обращению.",
    kind: "corporate",
  },
  {
    number: "03",
    title: "Каталог",
    text: "Для сложного ассортимента. Помогает найти категорию или товар, разобраться в характеристиках и отправить предметный запрос менеджеру.",
    kind: "catalog",
  },
] as const;

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

const crmVisuals = {
  contactPoints: "/services/websites-crm-contact-points-v1.png",
  requestContext: "/services/websites-crm-request-context-v1.png",
  workspace: "/services/websites-crm-workspace-v1.png",
} as const;

const platformLogos = {
  react: "/services/websites-platform-react.svg",
  bitrix: "/services/websites-platform-1c-bitrix.svg",
  wordpress: "/services/websites-platform-wordpress.png",
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

function CrmBackground({ src }: { src: (typeof crmVisuals)[keyof typeof crmVisuals] }) {
  return (
    <div className={styles.crmVisual} aria-hidden="true">
      <Image
        src={src}
        alt=""
        fill
        sizes="(max-width: 760px) calc(100vw - 88px), 30vw"
      />
    </div>
  );
}

function PlatformLogo({ platform }: { platform: keyof typeof platformLogos }) {
  return <Image src={platformLogos[platform]} alt="" width={68} height={68} />;
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
                <i aria-hidden="true" />
              </li>
              <li>
                <span>02</span>
                <div>
                  <h3>Легко выбрать нужное</h3>
                  <p>
                    Структура, категории и содержание помогают сориентироваться.
                  </p>
                </div>
                <i aria-hidden="true" />
              </li>
              <li>
                <span>03</span>
                <div>
                  <h3>Просто обратиться</h3>
                  <p>Следующий шаг заметен там, где он нужен посетителю.</p>
                </div>
                <i aria-hidden="true" />
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
                  <p>{format.text}</p>
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
            title="Подбираем технологию под бизнес, содержание и дальнейшее развитие."
            lead="Платформа должна помогать сайту решать задачу сегодня и не мешать его развитию завтра. Выбираем её после разбора структуры, ассортимента, ролей команды и нужных интеграций."
            titleId="technology-title"
          />
          <div className={styles.techMap}>
            <div className={styles.techCore}>
              <span>Что должен уметь сайт</span>
              <strong>Работать сегодня и развиваться дальше.</strong>
            </div>
            <article>
              <div className={styles.techIcon} aria-hidden="true">
                <PlatformLogo platform="react" />
              </div>
              <h3>React / Next.js</h3>
              <p>
                Для индивидуальной логики, высокой скорости работы и
                интерфейсов, которые развиваются вместе с бизнесом.
              </p>
            </article>
            <article>
              <div className={styles.techIcon} aria-hidden="true">
                <PlatformLogo platform="bitrix" />
              </div>
              <h3>1С-Битрикс</h3>
              <p>
                Когда сайт должен учитывать существующую среду бизнеса, сложный
                каталог или согласованные интеграции.
              </p>
            </article>
            <article>
              <div className={styles.techIcon} aria-hidden="true">
                <PlatformLogo platform="wordpress" />
              </div>
              <h3>WordPress</h3>
              <p>
                Когда команде важно самостоятельно работать с согласованным
                содержанием сайта и развивать разделы без сложного технического
                процесса.
              </p>
            </article>
          </div>
          <p className={styles.techNote}>
            Не подбираем платформу ради названия. Подбираем решение под задачу
            сайта.
          </p>
        </div>
      </section>

      <section className={styles.crmSection} aria-labelledby="crm-title">
        <div className={styles.container}>
          <SectionHeader
            label="05 / Интеграция сайта"
            title="Соединяем все точки обращения с CRM."
            lead="Формы, почту, звонки и чат подключаем к согласованной воронке, чтобы обращения попадали в рабочую среду команды вместе с источником и содержанием запроса. Состав интеграции фиксируется в проекте."
            titleId="crm-title"
          />
          <div
            className={styles.crmRoute}
            aria-label="Передача обращения и согласованного контекста в CRM"
          >
            <div>
              <CrmBackground src={crmVisuals.contactPoints} />
              <small>01</small>
              <strong>Форма, почта, звонок или чат</strong>
              <span>Точка обращения</span>
            </div>
            <i aria-hidden="true" />
            <div>
              <CrmBackground src={crmVisuals.requestContext} />
              <small>02</small>
              <strong>Источник и содержание</strong>
              <span>Контакт и детали запроса</span>
            </div>
            <i aria-hidden="true" />
            <div className={styles.crmDestination}>
              <CrmBackground src={crmVisuals.workspace} />
              <small>03</small>
              <strong>CRM</strong>
              <span>Обращение передано команде</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.readiness} aria-labelledby="readiness-title">
        <div className={styles.container}>
          <SectionHeader
            label="06 / После запуска"
            title="После запуска сайт остаётся понятным в работе и готовым к развитию."
            lead="Передаём команде собранный продукт: адаптивные страницы, доступы, материалы и согласованный порядок поддержки."
            titleId="readiness-title"
          />
          <div className={styles.readinessPanel}>
            <div className={styles.readinessVisual} aria-hidden="true">
              <Image
                src="/services/websites-post-launch-handoff-v2.png"
                alt=""
                fill
                sizes="(max-width: 760px) calc(100vw - 44px), (max-width: 1080px) 52vw, 620px"
              />
            </div>
            <div className={styles.readinessContent}>
              <ul className={styles.readinessList}>
                <li>
                  <span>01</span>
                  <div>
                    <h3>Готовые страницы</h3>
                    <p>Согласованный состав и адаптивные состояния.</p>
                  </div>
                </li>
                <li>
                  <span>02</span>
                  <div>
                    <h3>Доступы и материалы</h3>
                    <p>Всё необходимое для дальнейшей работы команды.</p>
                  </div>
                </li>
                <li>
                  <span>03</span>
                  <div>
                    <h3>Основа для развития</h3>
                    <p>
                      Новые страницы, интеграции и SEO можно добавлять по мере
                      задач.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <aside className={styles.seoBridge} aria-labelledby="seo-title">
              <div className={styles.seoHeading}>
                <p>SEO / Подготовка сайта</p>
                <h3 id="seo-title">
                  Закладываем основу для SEO-продвижения.
                </h3>
              </div>
              <div className={styles.seoDetails}>
                <p>
                  Учитываем структуру, семантическую разметку, metadata,
                  мобильную версию, скорость и доступность для индексации. Это
                  техническая база, а не обещание позиций.
                </p>
                <Link href="/services/marketing" className={styles.seoLink}>
                  SEO-продвижение и работа со спросом — в разделе «Маркетинг».{" "}
                  <ActionArrow />
                </Link>
              </div>
            </aside>
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

      <section
        className={styles.deliverables}
        aria-labelledby="deliverables-title"
      >
        <div className={styles.container}>
          <SectionHeader
            label="08 / Результат проекта"
            title="Сайт становится рабочим активом компании."
            lead="Он принимает трафик, помогает посетителю выбрать, собирает обращения и передаёт их команде. После запуска его можно поддерживать, продвигать и развивать."
            titleId="deliverables-title"
          />
          <div className={styles.deliveryMap}>
            <div className={styles.deliveryCore}>
              <span>Результат</span>
              <h3>Цифровой актив</h3>
              <small>Сайт, встроенный в работу компании</small>
            </div>
            <div className={styles.deliveryPages}>
              <div className={styles.deliveryIcon} aria-hidden="true">
                <Image
                  src="/services/websites-delivery-structure-icon-v1.png"
                  alt=""
                  fill
                  sizes="(max-width: 760px) 82px, (max-width: 1280px) 112px, 124px"
                />
              </div>
              <span>01</span>
              <h3>Структура и страницы</h3>
              <small>Адаптивный интерфейс и сценарии выбора</small>
            </div>
            <div className={styles.deliveryForms}>
              <div className={styles.deliveryIcon} aria-hidden="true">
                <Image
                  src="/services/websites-delivery-contact-icon-v1.png"
                  alt=""
                  fill
                  sizes="(max-width: 760px) 82px, (max-width: 1280px) 112px, 124px"
                />
              </div>
              <span>02</span>
              <h3>Точки обращения</h3>
              <small>Формы, почта, звонки и чат</small>
            </div>
            <div className={styles.deliveryOperations}>
              <div className={styles.deliveryIcon} aria-hidden="true">
                <Image
                  src="/services/websites-delivery-integration-icon-v1.png"
                  alt=""
                  fill
                  sizes="(max-width: 760px) 82px, (max-width: 1280px) 112px, 124px"
                />
              </div>
              <span>03</span>
              <h3>Интеграции</h3>
              <small>Передача обращений в согласованную рабочую среду</small>
            </div>
            <div className={styles.deliveryHandoff}>
              <div className={styles.deliveryIcon} aria-hidden="true">
                <Image
                  src="/services/websites-delivery-materials-icon-v1.png"
                  alt=""
                  fill
                  sizes="(max-width: 760px) 82px, (max-width: 1280px) 112px, 124px"
                />
              </div>
              <span>04</span>
              <h3>Материалы для развития</h3>
              <small>Доступы, компоненты и база для новых задач</small>
            </div>
            <i className={styles.deliveryLineOne} aria-hidden="true" />
            <i className={styles.deliveryLineTwo} aria-hidden="true" />
          </div>
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

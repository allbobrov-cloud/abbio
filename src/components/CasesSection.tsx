/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ActionArrow } from "./ActionArrow";
import styles from "./CasesSection.module.css";
import base from "./Agency.module.css";

type CaseTheme = "bogov" | "spec" | "volhonka";

const cases: Array<{
  number: string;
  slug: string;
  category: string;
  title: string;
  task: string;
  solution: string;
  tags: string[];
  theme: CaseTheme;
  desktopImage: string;
  mobileImage: string;
  metrics: Array<{ value: string; label: string; icon: string }>;
}> = [
  {
    number: "01",
    slug: "bogov",
    category: "ОБРАЗОВАНИЕ / СПОРТ",
    title: "Мотошкола Владимира Богова",
    task:
      "Создать современный сайт, который вызывает доверие у\u00a0родителей, упрощает запись\u00a0и\u00a0подчёркивает профессионализм школы.",
    solution:
      "Разработали яркий, динамичный сайт с\u00a0удобной навигацией, адаптивной записью\u00a0и\u00a0сильным акцентом на\u00a0безопасность\u00a0и\u00a0подход.",
    tags: ["Разработка сайта", "UX/UI Design"],
    theme: "bogov",
    desktopImage: "/cases/bogov-desktop.avif",
    mobileImage: "/cases/bogov-mobile.avif",
    metrics: [
      { value: "+84%", label: "Заявок с сайта", icon: "trend" },
      { value: "+52%", label: "Mobile-конверсия", icon: "phone" },
      { value: "−24%", label: "Стоимость лида", icon: "coin" },
      { value: "×3", label: "Рост вовлечённости", icon: "users" }
    ]
  },
  {
    number: "02",
    slug: "oss",
    category: "ПРОМЫШЛЕННОСТЬ / МЕТАЛЛОПРОКАТ",
    title: "ОборонСпецСплав",
    task:
      "Создать B2B-платформу, которая демонстрирует надёжность компании, упрощает подбор продукции\u00a0и\u00a0повышает эффективность отдела продаж.",
    solution:
      "Разработали структурированный каталог, мощный визуальный стиль, удобный поиск по\u00a0продукции\u00a0и\u00a0систему быстрой связи с\u00a0менеджерами.",
    tags: ["UX/UI Design", "CRM интеграция", "SEO"],
    theme: "spec",
    desktopImage: "/cases/oss-desktop.avif",
    mobileImage: "/cases/oss-mobile.avif",
    metrics: [
      { value: "+61%", label: "Рост обращений", icon: "trend" },
      { value: "−27%", label: "Снижение CPL", icon: "target" },
      { value: "×2,1", label: "Глубина просмотра", icon: "eye" },
      { value: "+43%", label: "Рост органического трафика", icon: "bars" }
    ]
  },
  {
    number: "03",
    slug: "volhonka",
    category: "ЛОГИСТИКА / МЕТАЛЛОПРОКАТ",
    title: "Металлобаза Волхонка",
    task:
      "Увеличить поток целевых заявок, упростить выбор металлопроката\u00a0и\u00a0сделать процесс заказа максимально быстрым\u00a0и\u00a0понятным.",
    solution:
      "Разработали удобный каталог с\u00a0фильтрами, быстрый расчёт заказа, интеграцию с\u00a0CRM\u00a0и\u00a0систему онлайн-заявок.",
    tags: ["Разработка сайта", "Аналитика", "SEO"],
    theme: "volhonka",
    desktopImage: "/cases/volhonka-desktop.avif",
    mobileImage: "/cases/volhonka-mobile.avif",
    metrics: [
      { value: "+127%", label: "Рост заявок", icon: "trend" },
      { value: "+73%", label: "Рост SEO-трафика", icon: "bars" },
      { value: "−31%", label: "Стоимость обращения", icon: "coin" },
      { value: "×2,7", label: "Окупаемость", icon: "target" }
    ]
  }
];

export function CasesSection() {
  return (
    <section className={styles.section} id="cases" aria-labelledby="cases-title">
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <p className={`${base.eyebrow} ${styles.eyebrow}`}>НАШИ КЕЙСЫ</p>
            <h2 id="cases-title">
              Проекты, построенные
              <br />
              <em>на&nbsp;системе и&nbsp;аналитике</em>
            </h2>
          </div>
          <div className={styles.arrows} id="cases-scroll-hint"><span>Листайте кейсы</span><span aria-hidden="true">→</span></div>
        </div>

        <div className={styles.caseList} role="region" aria-label="Кейсы агентства" aria-describedby="cases-scroll-hint" tabIndex={0}>
          {cases.map((item) => (
            <CaseCard key={item.number} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseCard({ item }: { item: (typeof cases)[number] }) {
  return (
    <article className={`${styles.card} ${styles[item.theme]}`}>
      <div className={styles.caseInfo}>
        <div className={styles.metaLine}>
          <span className={styles.number}>{item.number}</span>
          <span className={styles.category}>{item.category}</span>
        </div>
        <h3>{item.title}</h3>

        <InfoBlock title="Задача" text={item.task} />
        <InfoBlock title="Решение" text={item.solution} />
        <CaseTags tags={item.tags} />
      </div>

      <CaseMetrics metrics={item.metrics} />
      <div className={styles.caseVisual}>
        <DeviceMockups
          alt={item.title}
          desktopImage={item.desktopImage}
          mobileImage={item.mobileImage}
          theme={item.theme}
        />
        <Link className={styles.caseAction} href={`/cases/${item.slug}`}>
          Смотреть кейс <ActionArrow />
        </Link>
      </div>
    </article>
  );
}

function InfoBlock({ title, text }: { title: string; text: string }) {
  return (
    <div className={styles.infoBlock}>
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
  );
}

function CaseTags({ tags }: { tags: string[] }) {
  return (
    <div className={styles.tags}>
      {tags.map((tag) => (
        <span key={tag}>{tag}</span>
      ))}
    </div>
  );
}

function CaseMetrics({
  metrics
}: {
  metrics: Array<{ value: string; label: string; icon: string }>;
}) {
  return (
    <div className={styles.metrics}>
      <h4>Результат</h4>
      {metrics.map((metric) => (
        <CaseMetricItem key={metric.label} metric={metric} />
      ))}
    </div>
  );
}

function CaseMetricItem({
  metric
}: {
  metric: { value: string; label: string; icon: string };
}) {
  return (
    <div className={styles.metricItem}>
      <span className={styles.metricIcon} aria-hidden="true">
        <MetricIcon name={metric.icon} />
      </span>
      <span>
        <strong>{metric.value}</strong>
        <em>{metric.label}</em>
      </span>
    </div>
  );
}

function DeviceMockups({
  alt,
  desktopImage,
  mobileImage,
  theme
}: {
  alt: string;
  desktopImage: string;
  mobileImage: string;
  theme: CaseTheme;
}) {
  return (
    <div className={styles.devices} aria-label={`Визуал проекта ${alt}`}>
      <div className={styles.laptop}>
        <div className={styles.laptopScreen}>
          <img
            alt={`${alt} — desktop версия`}
            className={styles.deviceImage}
            loading="lazy"
            decoding="async"
            src={desktopImage}
          />
        </div>
        <span className={styles.laptopStand} aria-hidden="true" />
        <span className={styles.laptopBase} aria-hidden="true" />
      </div>
      <div className={`${styles.phone} ${styles[`${theme}Phone`] ?? ""}`}>
        <img
          alt={`${alt} — mobile версия`}
          className={styles.deviceImage}
          loading="lazy"
          decoding="async"
          src={mobileImage}
        />
      </div>
    </div>
  );
}

function MetricIcon({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 30 30" fill="none">
      {name === "trend" && (
        <>
          <path d="M5 22L12 15L17 18L25 8" />
          <path d="M19 8H25V14" />
        </>
      )}
      {name === "phone" && (
        <>
          <path d="M11 5H19C20.1 5 21 5.9 21 7V23C21 24.1 20.1 25 19 25H11C9.9 25 9 24.1 9 23V7C9 5.9 9.9 5 11 5Z" />
          <path d="M13 22H17" />
        </>
      )}
      {name === "coin" && (
        <>
          <circle cx="15" cy="15" r="9" />
          <path d="M15 9V21" />
          <path d="M19 12C18.2 10.9 16.8 10.4 15.2 10.6C13.3 10.8 12.2 11.8 12.3 13.2C12.4 14.7 13.8 15.2 15.4 15.5C17.1 15.8 18.8 16.3 18.8 18C18.8 19.6 17.2 20.5 15.3 20.5C13.5 20.5 12.1 19.8 11.3 18.6" />
        </>
      )}
      {name === "users" && (
        <>
          <circle cx="12" cy="12" r="4" />
          <circle cx="21" cy="12" r="3" />
          <path d="M5 24C6.5 20.5 9 19 12.5 19C16 19 18.5 20.5 20 24" />
          <path d="M19 19C21.8 19.4 23.8 20.9 25 23.5" />
        </>
      )}
      {name === "target" && (
        <>
          <circle cx="15" cy="15" r="10" />
          <circle cx="15" cy="15" r="5" />
          <circle cx="15" cy="15" r="1.5" />
        </>
      )}
      {name === "eye" && (
        <>
          <path d="M4 15C7 10 10.7 8 15 8C19.3 8 23 10 26 15C23 20 19.3 22 15 22C10.7 22 7 20 4 15Z" />
          <circle cx="15" cy="15" r="3" />
        </>
      )}
      {name === "bars" && (
        <>
          <path d="M7 24V16" />
          <path d="M15 24V9" />
          <path d="M23 24V13" />
        </>
      )}
    </svg>
  );
}

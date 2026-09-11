import type { CSSProperties } from "react";
import styles from "./ServicesSection.module.css";

type ServiceTone = "blue" | "violet" | "cyan" | "indigo" | "purple" | "teal";
type ServiceIcon =
  | "monitor"
  | "search"
  | "target"
  | "dashboard"
  | "gear"
  | "growth";

const services: Array<{
  number: string;
  title: string;
  description: string;
  points: string[];
  icon: ServiceIcon;
  tone: ServiceTone;
}> = [
  {
    number: "01",
    title: "Разработка digital-систем",
    description:
      "Создаём сайты\u00a0и\u00a0платформы, которые решают задачи бизнеса\u00a0и\u00a0приносят результат.",
    points: [
      "Корпоративные сайты",
      "Лендинги и\u00a0многостраничники",
      "Интернет-магазины и\u00a0каталоги",
      "Веб-платформы и\u00a0сервисы"
    ],
    icon: "monitor",
    tone: "blue"
  },
  {
    number: "02",
    title: "SEO\u00a0и\u00a0органический рост",
    description:
      "Приводим целевой трафик из\u00a0поиска\u00a0и\u00a0увеличиваем видимость бизнеса.",
    points: [
      "Технический SEO-аудит",
      "Семантика\u00a0и\u00a0структура",
      "Оптимизация\u00a0и\u00a0контент",
      "Рост позиций\u00a0и\u00a0трафика"
    ],
    icon: "search",
    tone: "violet"
  },
  {
    number: "03",
    title: "Performance marketing",
    description:
      "Запускаем эффективные рекламные кампании\u00a0и\u00a0приводим клиентов, а\u00a0не просто трафик.",
    points: [
      "Яндекс Директ\u00a0и\u00a0Google Ads",
      "Лидогенерация\u00a0и\u00a0воронки",
      "Оптимизация ROMI\u00a0и\u00a0CPL",
      "Сквозная аналитика"
    ],
    icon: "target",
    tone: "cyan"
  },
  {
    number: "04",
    title: "CRM\u00a0и\u00a0аналитика",
    description:
      "Строим прозрачную систему учёта\u00a0и\u00a0аналитики для управления продажами\u00a0и\u00a0маркетингом.",
    points: [
      "Настройка CRM",
      "Сквозная аналитика",
      "Дашборды\u00a0и\u00a0отчёты",
      "Контроль результатов"
    ],
    icon: "dashboard",
    tone: "indigo"
  },
  {
    number: "05",
    title: "Автоматизация процессов",
    description:
      "Автоматизируем рутину, интегрируем сервисы\u00a0и\u00a0ускоряем ваш бизнес.",
    points: [
      "Интеграции\u00a0и\u00a0API",
      "Автоматизация заявок",
      "CRM-сценарии\u00a0и\u00a0триггеры",
      "Уведомления\u00a0и\u00a0отчёты"
    ],
    icon: "gear",
    tone: "purple"
  },
  {
    number: "06",
    title: "Рост digital-системы",
    description:
      "Постоянно улучшаем систему, находим точки роста\u00a0и\u00a0масштабируем эффективные решения.",
    points: [
      "Аналитика\u00a0и\u00a0гипотезы",
      "A/B-тестирование",
      "SEO\u00a0и\u00a0CRO-оптимизация",
      "Масштабирование результатов"
    ],
    icon: "growth",
    tone: "teal"
  }
];

const orbitModules: Array<{
  icon: ServiceIcon | "users" | "interface";
  label: string;
  angle: number;
}> = [
  { icon: "search", label: "SEO", angle: -92 },
  { icon: "dashboard", label: "Аналитика", angle: -32 },
  { icon: "users", label: "CRM", angle: 28 },
  { icon: "gear", label: "Автоматизация", angle: 92 },
  { icon: "growth", label: "Рост", angle: 152 },
  { icon: "interface", label: "Сайт", angle: 212 }
];

const visualParticles = Array.from({ length: 36 }, (_, index) => ({
  id: index,
  x: 8 + ((index * 23) % 84),
  y: 8 + ((index * 31) % 78),
  size: 1 + (index % 3),
  duration: 3.8 + (index % 6) * 0.7,
  delay: (index % 11) * -0.42
}));

export function ServicesSection() {
  return (
    <section
      className={styles.section}
      id="services"
      aria-labelledby="services-title"
    >
      <div className={styles.container}>
        <div className={styles.layout}>
          <div className={styles.intro}>
            <p className={styles.eyebrow}>УСЛУГИ</p>
            <h2 id="services-title">
              Digital-решения
              <br />
              для роста вашего бизнеса
            </h2>
            <p className={styles.description}>
              Создаём и&nbsp;развиваем digital-инфраструктуру,
              которая приносит клиентов, увеличивает продажи&nbsp;и&nbsp;помогает
              масштабировать бизнес.
            </p>

            <div className={styles.infoPanel}>
              Вы можете подключить отдельное направление&nbsp;или собрать
              полноценную систему под ваши бизнес-задачи.
            </div>

            <ServicesOrbitVisual />

            <div className={styles.metrics} aria-label="Ключевые показатели услуг">
              <span>
                <strong>6+</strong>
                направлений
              </span>
              <span>
                <strong>50+</strong>
                проектов
              </span>
              <span>
                <strong>100%</strong>
                фокус на&nbsp;результат
              </span>
            </div>
          </div>

          <div className={styles.cards}>
            {services.map((service, index) => (
              <ServiceCard key={service.number} index={index} service={service} />
            ))}
          </div>
        </div>

        <ServicesBottomBanner />
      </div>
    </section>
  );
}

function ServicesOrbitVisual() {
  return (
    <div className={styles.visual} aria-label="Модули единой digital-системы">
      <div className={styles.visualGlow} aria-hidden="true" />
      <div className={styles.particles} aria-hidden="true">
        {visualParticles.map((particle) => (
          <span
            key={particle.id}
            style={
              {
                "--x": `${particle.x}%`,
                "--y": `${particle.y}%`,
                "--s": `${particle.size}px`,
                "--d": `${particle.duration}s`,
                "--delay": `${particle.delay}s`
              } as CSSProperties
            }
          />
        ))}
      </div>
      <div className={styles.orbitPlate}>
        <span className={styles.orbitRing} />
        <span className={styles.orbitRingSecond} />
        <span className={styles.orbitRingThird} />

        <div className={styles.orbitSpin}>
          {orbitModules.map((module) => (
            <span
              className={styles.orbitModule}
              key={module.label}
              style={{ "--angle": `${module.angle}deg` } as CSSProperties}
            >
              <span className={styles.orbitModuleInner}>
                <ServiceIconShape name={module.icon} />
              </span>
            </span>
          ))}
        </div>

        <div className={styles.core}>
          <span className={styles.coreAura} />
          <span className={styles.sphere}>
            <span className={styles.spherePattern}>
              <svg viewBox="0 0 128 128" aria-hidden="true">
                <path d="M24 44H48V30H70" />
                <path d="M74 30H92V48H106" />
                <path d="M32 80H54V96H76" />
                <path d="M78 96H96V78H110" />
                <path d="M30 62H54" />
                <path d="M76 62H104" />
                <path d="M64 24V44" />
                <path d="M64 84V108" />
                <circle cx="24" cy="44" r="3" />
                <circle cx="70" cy="30" r="3" />
                <circle cx="106" cy="48" r="3" />
                <circle cx="32" cy="80" r="3" />
                <circle cx="76" cy="96" r="3" />
                <circle cx="110" cy="78" r="3" />
                <circle cx="54" cy="62" r="2.5" />
                <circle cx="76" cy="62" r="2.5" />
                <circle cx="64" cy="44" r="2.5" />
                <circle cx="64" cy="84" r="2.5" />
              </svg>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

function ServiceCard({
  service,
  index
}: {
  service: (typeof services)[number];
  index: number;
}) {
  return (
    <article
      className={`${styles.card} ${styles[service.tone]}`}
      style={{ "--delay": `${index * 90}ms` } as CSSProperties}
    >
      <div className={styles.cardTop}>
        <span className={styles.number}>{service.number}</span>
        <span className={styles.iconBox} aria-hidden="true">
          <ServiceIconShape name={service.icon} />
        </span>
      </div>
      <h3>{service.title}</h3>
      <p className={styles.cardDescription}>{service.description}</p>
      <ul>
        {service.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
      <a className={styles.detailsLink} href="#contacts" aria-label={`Подробнее: ${service.title}`}>
        Подробнее
        <span aria-hidden="true">↗</span>
      </a>
    </article>
  );
}

function ServicesBottomBanner() {
  return (
    <div className={styles.bottomBanner}>
      <p className={styles.bottomText}>
        Мы не&nbsp;просто выполняем задачи&nbsp;—
        <br />
        мы строим систему, которая работает
        <br />
        на&nbsp;рост вашего бизнеса.
      </p>
      <div className={styles.bottomItems}>
        <article>
          <h3>Прозрачные процессы</h3>
          <p>Вы всегда знаете, что происходит и&nbsp;зачем</p>
        </article>
        <article>
          <h3>Измеримые результаты</h3>
          <p>Каждый шаг имеет метрики и&nbsp;влияет на&nbsp;рост</p>
        </article>
        <article>
          <h3>Полная вовлечённость</h3>
          <p>Мы заинтересованы в&nbsp;вашем результате не&nbsp;меньше вас</p>
        </article>
      </div>
    </div>
  );
}

function ServiceIconShape({
  name
}: {
  name: ServiceIcon | "users" | "interface";
}) {
  return (
    <svg viewBox="0 0 36 36" fill="none">
      {name === "monitor" && (
        <>
          <rect x="6" y="8" width="24" height="17" rx="3" />
          <path d="M14 29H22" />
          <path d="M18 25V29" />
          <path d="M11 13H25" />
          <path d="M11 18H19" />
        </>
      )}
      {name === "search" && (
        <>
          <circle cx="16" cy="16" r="8" />
          <path d="M22 22L29 29" />
          <path d="M16 12V16L19 18" />
        </>
      )}
      {name === "target" && (
        <>
          <circle cx="18" cy="18" r="11" />
          <circle cx="18" cy="18" r="5" />
          <path d="M18 18L28 8" />
          <path d="M25 8H28V11" />
        </>
      )}
      {name === "dashboard" && (
        <>
          <path d="M8 26V10H28V26H8Z" />
          <path d="M12 15H17" />
          <path d="M12 20H15" />
          <path d="M21 24A6 6 0 1 0 21 12V18H27" />
        </>
      )}
      {name === "gear" && (
        <>
          <circle cx="18" cy="18" r="5" />
          <path d="M18 6V10" />
          <path d="M18 26V30" />
          <path d="M6 18H10" />
          <path d="M26 18H30" />
          <path d="M9.5 9.5L12.3 12.3" />
          <path d="M23.7 23.7L26.5 26.5" />
          <path d="M26.5 9.5L23.7 12.3" />
          <path d="M12.3 23.7L9.5 26.5" />
        </>
      )}
      {name === "growth" && (
        <>
          <path d="M7 28L15 20L21 24L29 11" />
          <path d="M23 11H29V17" />
          <path d="M8 13V28H30" />
        </>
      )}
      {name === "users" && (
        <>
          <circle cx="14" cy="15" r="4" />
          <circle cx="24" cy="14" r="3" />
          <path d="M7 28C8.5 23.7 11.8 22 16 22C20 22 23 23.7 25 28" />
          <path d="M22 22C25.2 22.3 27.6 24 29 27" />
        </>
      )}
      {name === "interface" && (
        <>
          <rect x="7" y="8" width="22" height="20" rx="4" />
          <path d="M7 14H29" />
          <path d="M12 20H17" />
          <path d="M21 20H24" />
          <path d="M12 24H24" />
        </>
      )}
    </svg>
  );
}

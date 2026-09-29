import Image from "next/image";
import Link from "next/link";
import { ActionArrow } from "@/components/ActionArrow";
import styles from "./ServicesOverviewPage.module.css";
import { CasesBlock } from "@/components/cases/CasesBlock";
import { ServicesProgressiveSystem } from "./ServicesProgressiveSystem";
import { ServicesSituationExplorer } from "./ServicesSituationExplorer";
import { ServicesHero } from "./ServicesHero";
import { ServicesFinalCta } from "./ServicesFinalCta";
import { DirectionsSpotlight } from "./DirectionsSpotlight";

const directions = [
  {
    slug: "websites",
    number: "01",
    title: "Сайты",
    description: "Создаём путь от первого экрана до обращения.",
    items: ["Лендинги", "Корпоративные сайты", "Каталоги", "UX/UI", "Разработка"],
    actionLabel: "Смотреть сайты",
  },
  {
    slug: "design",
    number: "02",
    title: "Дизайн",
    description: "Помогаем понятно и убедительно представить продукт.",
    items: ["Айдентика", "Web/UI", "Презентации", "Материалы для продаж"],
    actionLabel: "Смотреть дизайн",
  },
  {
    slug: "marketing",
    number: "03",
    title: "Маркетинг",
    description: "Привлекаем спрос и связываем его с результатом.",
    items: ["Контент", "CRM", "Аналитика"],
    actionLabel: "Весь маркетинг",
  },
  {
    slug: "seo",
    number: "04",
    title: "SEO-продвижение",
    description: "Развиваем сайт под реальный спрос и измеримые обращения.",
    items: ["Спрос", "Структура", "Измерение"],
    actionLabel: "Смотреть SEO",
  },
  {
    slug: "yandex-direct",
    number: "05",
    title: "Яндекс Директ",
    description: "Запускаем платный поток обращений с понятным отчётом.",
    items: ["Контекстная реклама", "CRM", "Отчётность"],
    actionLabel: "Смотреть Директ",
  },
] as const;

const directionClasses = {
  design: styles.directionDesign,
  websites: styles.directionWebsites,
  marketing: styles.directionMarketing,
  seo: styles.directionSeo,
  "yandex-direct": styles.directionDirect,
};

function DirectionVisual({ slug }: { slug: (typeof directions)[number]["slug"] }) {
  if (slug === "websites") {
    return (
      <div className={[styles.capabilityVisual, styles.websitesVisual].join(" ")} aria-hidden="true">
        <Image
          className={styles.websitesArtwork}
          src="/services/websites-journey.webp"
          alt=""
          width={1212}
          height={1297}
          sizes="(max-width: 760px) 80vw, (max-width: 1100px) 22vw, 24vw"
        />
      </div>
    );
  }

  if (slug === "design") {
    return (
      <div className={[styles.capabilityVisual, styles.designArtworkVisual].join(" ")} aria-hidden="true">
        <Image
          className={styles.designArtwork}
          src="/services/design-journey.webp"
          alt=""
          width={1277}
          height={1231}
          sizes="(max-width: 760px) 80vw, (max-width: 1100px) 16vw, 18vw"
        />
      </div>
    );
  }

  if (slug === "seo") {
    return (
      <div className={[styles.capabilityVisual, styles.seoArtworkVisual].join(" ")} aria-hidden="true">
        <Image
          className={styles.seoArtwork}
          src="/services/seo-journey.webp"
          alt=""
          width={1536}
          height={1024}
          sizes="(max-width: 760px) 80vw, (max-width: 1100px) 35vw, 23vw"
        />
      </div>
    );
  }

  if (slug === "yandex-direct") {
    return (
      <div className={[styles.capabilityVisual, styles.directArtworkVisual].join(" ")} aria-hidden="true">
        <Image
          className={styles.directArtwork}
          src="/services/yandex-direct-journey.webp"
          alt=""
          width={1229}
          height={1280}
          sizes="(max-width: 760px) 80vw, (max-width: 1100px) 35vw, 23vw"
        />
      </div>
    );
  }

  return (
    <div className={[styles.capabilityVisual, styles.marketingArtworkVisual].join(" ")} aria-hidden="true">
      <Image
        className={styles.marketingArtwork}
        src="/services/marketing-journey.webp"
        alt=""
        width={1644}
        height={957}
        sizes="(max-width: 760px) 80vw, (max-width: 1100px) 45vw, 40vw"
      />
    </div>
  );
}

export function ServicesOverviewPage() {
  return (
    <main id="main" className={styles.page}>
      <ServicesHero directions={directions} />

      <section className={styles.directions} id="directions" aria-labelledby="directions-title">
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <p className={styles.sectionIndex}>01 / Направления</p>
            <div>
              <h2 id="directions-title">Что можем сделать для вашего проекта.</h2>
            </div>
          </div>

          <DirectionsSpotlight targetId="directions" />
          <div className={styles.directionGrid}>
            {directions.map((item) => (
              <article key={item.slug} className={[styles.direction, directionClasses[item.slug]].join(" ")}>
                <div className={styles.directionMeta}>
                  <span>{item.number}{item.slug === "design" || item.slug === "marketing" || item.slug === "seo" || item.slug === "yandex-direct" ? " /" : ""}</span>
                  <p>{item.title}</p>
                </div>
                <div className={styles.directionContent}>
                  <h3>
                    {item.slug === "websites" ? (
                      <>
                        Сайты,<br />
                        которые ведут<br />
                        <span>к обращению.</span>
                      </>
                    ) : item.slug === "design" ? (
                      <>
                        Дизайн,<br />
                        который делает<br />
                        <span>ваш продукт сильнее.</span>
                      </>
                    ) : item.slug === "marketing" ? (
                      <>
                        Маркетинг,<br />
                        который <span>даёт результат.</span>
                      </>
                    ) : item.slug === "seo" ? (
                      <>
                        SEO-<br />
                        продвижение,<br />
                        <span>которое приводит<br />клиентов.</span>
                      </>
                    ) : item.slug === "yandex-direct" ? (
                      <>
                        Яндекс<br />
                        Директ,<br />
                        <span>который приводит<br />клиентов.</span>
                      </>
                    ) : null}
                  </h3>
                  <p>
                    {item.slug === "websites" ? (
                      <>
                        Продумываем структуру, дизайн и функциональность,{" "}<br />
                        чтобы сайт работал на ваши цели.
                      </>
                    ) : item.slug === "design" ? (
                      <>
                        Помогаем понятно и убедительно<br />
                        представить продукт.
                      </>
                    ) : item.slug === "marketing" ? (
                      <>
                        Привлекаем целевую аудиторию и превращаем<br />
                        её в клиентов с понятной аналитикой.
                      </>
                    ) : item.slug === "seo" ? (
                      <>
                        Развиваем сайт под реальный спрос<br />
                        и измеримые обращения.
                      </>
                    ) : item.slug === "yandex-direct" ? (
                      <>
                        Запускаем платный поток обращений<br />
                        с понятным отчётом.
                      </>
                    ) : null}
                  </p>
                  <ul>
                    {(item.slug === "marketing" ? ["Стратегия", "SMM", "Контент", "Реклама"] : item.items).map((entry) => <li key={entry}>{entry}</li>)}
                  </ul>
                  <div className={styles.directionActions}>
                    <Link href={`/services/${item.slug}`} className={styles.directionLink}>{item.actionLabel} <ActionArrow /></Link>
                  </div>
                </div>
                <DirectionVisual slug={item.slug} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <ServicesSituationExplorer />

      <ServicesFinalCta />

      <ServicesProgressiveSystem />

      <CasesBlock
        title="Как услуги работают вместе."
        description="В каждом проекте свой набор задач. Где-то достаточно одного направления, а где-то сайт, дизайн и продвижение работают как одна система."
        slugs={["bogov", "volhonka", "profline"]}
      />
    </main>
  );
}

import Image from "next/image";
import Link from "next/link";
import styles from "./VolhonkaHero.module.css";

/*
 * Hero кейса «Металлобаза Волхонка».
 * Показатели подтверждены владельцем проекта 25.09.2026.
 * Посещения и лиды указаны за месяц; доля запросов в ТОП-3 — на дату подтверждения.
 * Изображения (ноутбук + выдача, металлопрокат) — готовые replaceable assets в public/cases/.
 */
const METRICS = [
  { n: "01", value: "85–90%", label: ["отслеживаемых", "запросов в ТОП-3"] },
  { n: "02", value: "23–27 тыс.", label: ["посещений", "в месяц"] },
  { n: "03", value: "1 100–1 400", label: ["уникальных лидов", "в месяц"] },
] as const;
const toc = [
  { label: "Бренд", href: "#brand" },
  { label: "Коммерческий сайт", href: "#commercial-site" },
  { label: "Развитие", href: "#live-site" },
  { label: "SEO", href: "#seo" },
  { label: "Лиды", href: "#leads" },
  { label: "Результат", href: "#result" },
];

export function VolhonkaHero() {
  return (
    <section className={styles.hero} aria-labelledby="vh-title">
      <div className={styles.stage}>
        <div className={styles.glow} aria-hidden="true" />

        <nav className={styles.breadcrumbs} aria-label="Хлебные крошки">
          <Link href="/">Главная</Link>
          <span aria-hidden="true">/</span>
          <Link href="/cases">Кейсы</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Металлобаза Волхонка</span>
        </nav>

        <div className={styles.copy}>
          <p className={styles.eyebrow}>
            {/* Логотип на светлой плашке: контур логотипа чёрный и на тёмном фоне не читается */}
            <span className={styles.logoChip}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/cases/volhonka-logo.avif" alt="Металлобаза Волхонка, Санкт-Петербург" width="386" height="320" />
            </span>
            Кейс · Металлобаза Волхонка
          </p>
          <h1 id="vh-title">
            Из металлобазы —{" "}
            <br />
            в заметный{" "}
            <br />
            <em>digital-бренд.</em>
          </h1>
          <p className={styles.description}>
            Создали сайт и систему продвижения для металлобазы в
            Санкт-Петербурге: развиваем каталог, поддерживаем актуальность
            предложения и превращаем поисковый спрос в обращения.
          </p>
        </div>

        <div className={styles.metricsWrap}>
          <ul className={styles.metrics}>
            {METRICS.map((m) => (
              <li key={m.n}>
                <b>{m.value}</b>
                <span>
                  {m.label[0]}{" "}
                  <br />
                  {m.label[1]}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <nav className={styles.toc} aria-label="Разделы кейса">
          {toc.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </nav>

        <div className={styles.metal} aria-hidden="true">
          <Image src="/cases/volhonka-hero-metal.avif" alt="" width={1536} height={1024} sizes="60vw" priority />
        </div>
        <div className={styles.visual}>
          <Image
            src="/cases/volhonka-hero-visual.avif"
            alt="Сайт Металлобазы Волхонка на ноутбуке и карточки поисковой выдачи Яндекса и Google с позициями в ТОП-3"
            fill
            sizes="(max-width: 1180px) 100vw, 58vw"
            priority
          />
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { ActionArrow } from "@/components/ActionArrow";
import { cases } from "@/lib/content";
import { CasesReveal } from "./CasesReveal";
import styles from "./CasesShowcase.module.css";

/*
 * Три кейса — три разные композиции одной системы.
 * Тексты берутся только из данных кейса: task — «Задача», tags — «Сделали»,
 * summary — «Результат». Ничего не придумано.
 * tint — едва заметный оттенок свечения от цвета самого проекта.
 */
const layouts = [
  {
    slug: "bogov",
    variant: "a", // текст слева, крупный visual справа, кадр выходит за край
    ratio: 1.5,
    ratioMobile: 1.25,
    position: "56% 40%",
    positionMobile: "78% 38%",
    tint: "rgba(240, 178, 30, 0.13)",
  },
  {
    slug: "oss",
    variant: "b", // visual слева, текст справа и прижат вниз
    ratio: 1.9,
    ratioMobile: 1.25,
    position: "63% 32%",
    positionMobile: "63% 32%",
    tint: "rgba(214, 56, 56, 0.13)",
  },
  {
    slug: "volhonka",
    variant: "c", // полноширинный visual, компактный текст сверху
    ratio: 2.4,
    ratioMobile: 1.4,
    position: "50% 60%",
    positionMobile: "38% 60%",
    tint: "rgba(240, 190, 64, 0.12)",
  },
] as const;

function Field({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <dt>{label}</dt>
      <dd className={className}>{children}</dd>
    </div>
  );
}

function Cta({ href, name }: { href: string; name: string }) {
  return (
    <Link
      href={href}
      className={styles.cta}
      aria-label={`Смотреть кейс: ${name}`}
    >
      Смотреть кейс <ActionArrow />
    </Link>
  );
}

export function CasesShowcase() {
  return (
    <section
      id="cases"
      className={styles.section}
      aria-labelledby="cases-list-title"
    >
      <CasesReveal targetId="cases" />
      <div className={styles.container}>
        <h2 className="sr-only" id="cases-list-title">
          Проекты агентства
        </h2>

        {layouts.map((layout, index) => {
          const project = cases.find((item) => item.slug === layout.slug);
          if (!project) {
            return null;
          }
          const href = `/cases/${project.slug}`;
          const vars = {
            "--ar": layout.ratio,
            "--arm": layout.ratioMobile,
            "--pos": layout.position,
            "--posm": layout.positionMobile,
            "--tint": layout.tint,
          } as CSSProperties;

          const head = (
            <div className={styles.head}>
              <span className={styles.num}>0{index + 1}</span>
              <h3>{project.name}</h3>
            </div>
          );

          const visual = (
            <Link
              href={href}
              className={styles.visual}
              style={vars}
              aria-label={`${project.name}: открыть кейс`}
              tabIndex={-1}
              data-reveal
            >
              <span className={styles.frame}>
                <Image
                  src={project.image}
                  alt={`Сайт ${project.name}`}
                  fill
                  sizes={
                    layout.variant === "c"
                      ? "(max-width: 760px) 92vw, 100vw"
                      : "(max-width: 760px) 92vw, 70vw"
                  }
                  priority={index === 0}
                />
              </span>
            </Link>
          );

          const details = (
            <dl className={styles.details}>
              <Field label="Задача">{project.task}</Field>
              <Field label="Сделали" className={styles.tags}>
                {project.tags.join(" · ")}
              </Field>
              <Field label="Что получилось">{project.summary}</Field>
              <Cta href={href} name={project.name} />
            </dl>
          );

          return (
            <article
              key={project.slug}
              className={`${styles.case} ${styles[layout.variant]}`}
            >
              {layout.variant === "c" ? (
                <>
                  <div className={styles.topRow} data-reveal>
                    <div className={styles.cLeft}>
                      {head}
                      <dl className={styles.details}>
                        <Field label="Сделали" className={styles.tags}>
                          {project.tags.join(" · ")}
                        </Field>
                        <Cta href={href} name={project.name} />
                      </dl>
                    </div>
                    <dl className={styles.cRight}>
                      <Field label="Задача">{project.task}</Field>
                      <Field label="Что получилось">{project.summary}</Field>
                    </dl>
                  </div>
                  {visual}
                </>
              ) : (
                <>
                  <div className={styles.copy} data-reveal>
                    {head}
                    {details}
                  </div>
                  {visual}
                </>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}

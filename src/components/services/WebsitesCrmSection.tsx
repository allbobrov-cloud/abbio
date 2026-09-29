import Image from "next/image";
import styles from "./WebsitesServicePage.module.css";

const steps = [
  {
    number: "01",
    title: "Форма, почта, звонок или чат",
    description: "Точка обращения",
    image: "/services/websites-crm-contact-points-v1.webp",
  },
  {
    number: "02",
    title: "Источник и содержание",
    description: "Контакт и детали запроса",
    image: "/services/websites-crm-request-context-v1.webp",
  },
  {
    number: "03",
    title: "CRM",
    description: "Обращение передано команде",
    image: "/services/websites-crm-workspace-v1.webp",
  },
] as const;

export function WebsitesCrmSection() {
  return (
    <section className={styles.crmSection} aria-labelledby="crm-title">
      <div className={styles.container}>
        <div className={styles.crmFlowHeader}>
          <div>
            <p className={styles.sectionIndex}>05 / Интеграция сайта</p>
            <h2 id="crm-title">Соединяем все точки обращения с CRM.</h2>
          </div>
          <p>
            Формы, почту, звонки и чат подключаем к согласованной воронке,
            чтобы обращения попадали в рабочую среду команды вместе с
            источником и содержанием запроса. Состав интеграции фиксируется
            в проекте.
          </p>
        </div>
        <ol className={styles.crmFlow} aria-label="Передача обращения и согласованного контекста в CRM">
          {steps.map((step) => (
            <li key={step.number}>
              <div className={styles.crmFlowImage} aria-hidden="true">
                <Image
                  src={step.image}
                  alt=""
                  fill
                  sizes="(max-width: 760px) calc(100vw - 72px), (max-width: 1080px) 30vw, 380px"
                />
              </div>
              <div className={styles.crmFlowContent}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

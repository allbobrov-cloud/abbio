"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./WebsitesServicePage.module.css";

const platforms = {
  bitrix: {
    title: "1С-Битрикс",
    logo: "/services/websites-platform-1c-bitrix.svg",
    reasoning: "Закрывает сложный каталог, права доступа и типовые интеграции без разработки с нуля.",
  },
  wordpress: {
    title: "WordPress",
    logo: "/services/websites-platform-wordpress.png",
    reasoning: "Даёт команде самостоятельно вести разделы и материалы при понятной структуре сайта.",
  },
  react: {
    title: "React / Next.js",
    logo: "/services/websites-platform-react.svg",
    reasoning: "Подходит, когда типовые CMS ограничивают логику интерфейса или важна скорость загрузки.",
  },
} as const;

const scenarios = [
  {
    number: "01",
    label: "Каталог и работа менеджеров",
    context: "Сложный ассортимент, фильтры, права доступа и связка с обращениями.",
    platform: "bitrix",
  },
  {
    number: "02",
    label: "Команда сама ведёт контент",
    context: "Нужно самостоятельно публиковать разделы, статьи и новости без разработчика.",
    platform: "wordpress",
  },
  {
    number: "03",
    label: "Нестандартная логика и скорость",
    context: "Уникальные сценарии интерфейса и высокие требования к скорости загрузки.",
    platform: "react",
  },
] as const satisfies ReadonlyArray<{ number: string; label: string; context: string; platform: keyof typeof platforms }>;

export function WebsitesTechnologySelector() {
  const [active, setActive] = useState(0);
  const scenario = scenarios[active];
  const platform = platforms[scenario.platform];

  return (
    <div className={styles.techMap}>
      <div className={styles.techScenarios} role="group" aria-label="Выберите задачу сайта">
        {scenarios.map((item, index) => (
          <button
            key={item.number}
            type="button"
            className={styles.techScenario}
            aria-pressed={active === index}
            aria-controls="tech-platform-panel"
            onClick={() => setActive(index)}
          >
            <span>{item.number}</span>
            <strong>{item.label}</strong>
            <p>{item.context}</p>
          </button>
        ))}
      </div>
      <div className={styles.techPlatformPanel} id="tech-platform-panel" aria-live="polite">
        <div className={styles.techIcon} aria-hidden="true">
          <Image src={platform.logo} alt="" width={56} height={56} />
        </div>
        <p className={styles.techPlatformLabel}>Как подбирается CMS</p>
        <h3>{platform.title}</h3>
        <p>{platform.reasoning}</p>
      </div>
    </div>
  );
}

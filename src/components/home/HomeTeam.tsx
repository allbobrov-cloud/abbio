import Image from "next/image";
import Link from "next/link";
import { team } from "@/lib/content";
import styles from "./HomeTeam.module.css";

/*
 * «Люди за проектом»: портреты в тёмных карточках с лавандовым тонированием, имя и роль —
 * на стеклянной плашке. Портреты и имена демонстрационные — это подписано на карточке и под блоком.
 */
export function HomeTeam() {
  return (
    <section id="team" className={styles.section} aria-labelledby="team-title">
      <div className={styles.container}>
        <header className={styles.head}>
          <div>
            <p className={styles.eyebrow}>Люди за проектом</p>
            <h2 id="team-title">
              Небольшая команда.{" "}
              <br />
              <em>Прямой контакт.</em>
            </h2>
          </div>
          <Link className={styles.more} href="/process">
            Как работаем
            <span aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M8 7h9v9" /></svg>
            </span>
          </Link>
        </header>

        <p className={styles.swipeHint} id="team-scroll-hint">Листайте команду <span aria-hidden="true">→</span></p>
        <ul className={styles.grid} aria-label="Команда агентства" aria-describedby="team-scroll-hint">
          {team.map((person, index) => (
            <li key={person.name} className={styles.card}>
              <span className={styles.photo}>
                <Image
                  src={person.image}
                  alt={`Демонстрационный AI-портрет: ${person.name}, вымышленный персонаж`}
                  fill
                  sizes="(max-width: 760px) 80vw, 30vw"
                />
              </span>
              <span className={styles.demo}>Демо-профиль</span>
              <span className={styles.num} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <span className={styles.plate}>
                <strong>{person.name}</strong>
                <span>{person.role}</span>
              </span>
            </li>
          ))}
        </ul>

        <p className={styles.note}>Профили и портреты здесь демонстрационные. Данные реальной команды уточняются.</p>
      </div>
    </section>
  );
}

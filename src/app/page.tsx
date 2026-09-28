import { HomeProcess } from "@/components/home/HomeProcess";
import { HomeTeam } from "@/components/home/HomeTeam";
import { CasesBlock } from "@/components/cases/CasesBlock";
import { IndustryFocus } from "@/components/home/HomePortfolio";
import { HomeServices } from "@/components/home/HomeServices";
import { HomeReports } from "@/components/home/HomeReports";
import { HomeHero } from "@/components/home/HomeHero";
import { TaskExplorer, ClientJourney, WorkFormats } from "@/components/home/HomeExperience";
import styles from "@/components/home/HomeExperience.module.css";

export default function Home() {
  return (
    <main id="main" className={styles.home}>
      <HomeHero />
      <TaskExplorer />
      <HomeServices />
      <CasesBlock id="cases" eyebrow="Избранные проекты" title="Лучше показать." slugs={["bogov", "oss", "stroybaza-volhonka"]} />
      <IndustryFocus />
      <HomeReports />
      <ClientJourney />
      <HomeProcess />
      <WorkFormats />
      <HomeTeam />
    </main>
  );
}

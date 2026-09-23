import { AgencyProcess } from "@/components/AgencySections";
import { HomeCases, HomeServices, IndustryFocus, ReportsPreview } from "@/components/home/HomePortfolio";
import { HomeHero, TaskExplorer, ClientJourney, WorkFormats } from "@/components/home/HomeExperience";
import styles from "@/components/home/HomeExperience.module.css";

export default function Home() {
  return (
    <main id="main" className={styles.home}>
      <HomeHero />
      <TaskExplorer />
      <HomeServices />
      <HomeCases />
      <IndustryFocus />
      <ReportsPreview />
      <ClientJourney />
      <AgencyProcess />
      <WorkFormats />
    </main>
  );
}

import { AgencyProcess, TeamSection } from "@/components/AgencySections";
import { HomeServices, IndustryFocus, ProjectCta, ReportsPreview } from "@/components/home/HomePortfolio";
import { CasesSection } from "@/components/CasesSection";
import { HomeHero, TaskExplorer, ClientJourney, WorkFormats } from "@/components/home/HomeExperience";
import styles from "@/components/home/HomeExperience.module.css";

export default function Home() {
  return (
    <main id="main" className={styles.home}>
      <HomeHero />
      <TaskExplorer />
      <HomeServices />
      <CasesSection />
      <ReportsPreview />
      <ProjectCta />
      <IndustryFocus />
      <ClientJourney />
      <AgencyProcess />
      <WorkFormats />
      <TeamSection />
    </main>
  );
}

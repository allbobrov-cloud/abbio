import { HomeProcess } from "@/components/home/HomeProcess";
import { HomeTeam } from "@/components/home/HomeTeam";
import { CasesBlock } from "@/components/cases/CasesBlock";
import { IndustryFocus } from "@/components/home/IndustryFocus";
import { HomeServices } from "@/components/home/HomeServices";
import { HomeReports } from "@/components/home/HomeReports";
import { HomeHero } from "@/components/home/HomeHero";
import { ClientJourney } from "@/components/home/HomeExperience";
import { WorkFormats } from "@/components/home/WorkFormats";
import { HomeTasks } from "@/components/home/HomeTasks";
import styles from "@/components/home/HomeExperience.module.css";
import { OrganizationJsonLd } from "@/components/StructuredData";
import type { Metadata } from "next";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <main id="main" className={styles.home}>
      <OrganizationJsonLd />
      <HomeHero />
      <HomeTasks />
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

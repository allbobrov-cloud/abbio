import type { Metadata } from "next";
import { FoundExperience } from "@/components/FoundExperience";

export const metadata: Metadata = {
  title: { absolute: "Найдено — ABBiO" },
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function FoundPage() {
  return <main id="main"><FoundExperience /></main>;
}

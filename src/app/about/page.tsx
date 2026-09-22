import { AboutApproach } from "@/components/about/AboutApproach";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutPrinciples } from "@/components/about/AboutPrinciples";
export const metadata = { title: "Об ABBiO", description: "ABB.IO — команда на стыке продукта, дизайна, разработки и маркетинга." };
export default function Page() { return <main id="main"><AboutHero /><AboutApproach /><AboutPrinciples /></main>; }

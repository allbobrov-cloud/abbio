import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cases } from "@/lib/content";
import { PageIntro } from "@/components/PageIntro";
import { BogovAds } from "@/components/cases/BogovAds";
import { BogovDesign } from "@/components/cases/BogovDesign";
import { BogovFinal } from "@/components/cases/BogovFinal";
import { BogovHero } from "@/components/cases/BogovHero";
import { BogovLeads } from "@/components/cases/BogovLeads";
import { BogovSeo } from "@/components/cases/BogovSeo";
import { BogovStructure } from "@/components/cases/BogovStructure";
import { OssCatalog } from "@/components/cases/OssCatalog";
import { OssEntryPoints } from "@/components/cases/OssEntryPoints";
import { OssGeo } from "@/components/cases/OssGeo";
import { OssHero } from "@/components/cases/OssHero";
import { OssResult } from "@/components/cases/OssResult";
import { OssSeo } from "@/components/cases/OssSeo";
import { OssUx } from "@/components/cases/OssUx";
import { VolhonkaBrand } from "@/components/cases/VolhonkaBrand";
import { VolhonkaHero } from "@/components/cases/VolhonkaHero";
import { VolhonkaLive } from "@/components/cases/VolhonkaLive";
import { VolhonkaLeads } from "@/components/cases/VolhonkaLeads";
import { VolhonkaResult } from "@/components/cases/VolhonkaResult";
import { VolhonkaSeo } from "@/components/cases/VolhonkaSeo";
import { VolhonkaSite } from "@/components/cases/VolhonkaSite";
import styles from "@/components/Agency.module.css";
import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/StructuredData";
import { socialMetadata } from "@/lib/seo";
export function generateStaticParams() { return cases.filter(({ slug }) => slug !== "stroybaza-volhonka").map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = cases.find(item => item.slug === slug);
  if (!project) return { title: "Проект не найден", robots: { index: false } };
  const titles: Record<string, string> = {
    bogov: "Мотошкола Владимира Богова — сайт и запись на обучение",
    oss: "ОборонСпецСплав — каталог металлопроката и SEO",
    volhonka: "Металлобаза Волхонка — сайт, SEO и CRM",
  };
  return {
    title: titles[slug] ?? project.name,
    description: project.summary,
    alternates: { canonical: `/cases/${slug}` },
    ...socialMetadata(`${titles[slug] ?? project.name} | Агентство ABBiO`, project.summary),
  };
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = cases.find(item => item.slug === slug);
  if (!project) notFound();
  const next = cases[(cases.indexOf(project) + 1) % cases.length];
  const breadcrumb = <BreadcrumbJsonLd items={[{ name: "Главная", path: "/" }, { name: "Кейсы", path: "/cases" }, { name: project.name, path: `/cases/${slug}` }]} />;
  if (project.slug === "bogov") {
    return <main id="main">{breadcrumb}<BogovHero /><BogovStructure /><BogovDesign /><BogovLeads /><BogovSeo /><BogovAds /><BogovFinal next={{ slug: next.slug, name: next.name }} service={project.service} /></main>;
  }
  if (project.slug === "volhonka") {
    return <main id="main">{breadcrumb}<VolhonkaHero /><VolhonkaBrand /><VolhonkaSite /><VolhonkaLive /><VolhonkaSeo /><VolhonkaLeads /><VolhonkaResult /></main>;
  }
  if (project.slug === "oss") {
    return <main id="main">{breadcrumb}<OssHero /><OssCatalog /><OssEntryPoints /><OssUx /><OssGeo /><OssSeo /><OssResult /></main>;
  }
  return <main id="main">{breadcrumb}<PageIntro title={project.name} description={project.title} parent={{ href: "/cases", title: "Кейсы" }} /><section className={styles.detailSection}><div className={styles.container}><div className={styles.tags}>{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><Image className={styles.detailImage} src={project.image} alt={`Главная страница сайта ${project.name}`} width={1400} height={1000} sizes="90vw" priority /><div className={styles.detailGrid}><div><h2>Задача</h2><p>{project.task}</p></div><div><h2>Что сделали</h2><p>{project.solution}</p></div></div><a className={styles.button} href="#contact-dialog" data-contact-dialog>Обсудить похожую задачу <span aria-hidden="true">↗</span></a><Link className={styles.relatedLink} href={`/cases/${next.slug}`}>Следующий проект: {next.name}<span aria-hidden="true">→</span></Link><Link className={styles.textLink} href={`/services/${project.service}`}>Подробнее об услуге <span aria-hidden="true">↗</span></Link></div></section></main>;
}

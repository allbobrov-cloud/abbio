import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cases } from "@/lib/content";
import { PageIntro } from "@/components/PageIntro";
import styles from "@/components/Agency.module.css";
export function generateStaticParams() { return cases.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const project = cases.find(item => item.slug === slug); return { title: project?.name || "Проект не найден", description: project?.summary }; }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = cases.find(item => item.slug === slug);
  if (!project) notFound();
  const next = cases[(cases.indexOf(project) + 1) % cases.length];
  return <main id="main"><PageIntro title={project.name} description={project.title} parent={{ href: "/cases", title: "Кейсы" }} /><section className={styles.detailSection}><div className={styles.container}><div className={styles.tags}>{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><Image className={styles.detailImage} src={project.image} alt={`Главная страница сайта ${project.name}`} width={1400} height={1000} sizes="90vw" priority /><div className={styles.detailGrid}><div><h2>Задача</h2><p>{project.task}</p></div><div><h2>Что сделали</h2><p>{project.solution}</p></div></div><a className={styles.button} href="#contacts" data-contact-dialog>Обсудить похожую задачу <span aria-hidden="true">↗</span></a><Link className={styles.relatedLink} href={`/cases/${next.slug}`}>Следующий проект: {next.name}<span aria-hidden="true">→</span></Link><Link className={styles.textLink} href={`/services/${project.service}`}>Подробнее об услуге <span aria-hidden="true">↗</span></Link></div></section></main>;
}

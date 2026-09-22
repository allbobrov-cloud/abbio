import Image from "next/image";
import Link from "next/link";
import { ActionArrow } from "./ActionArrow";
import { cases, services, steps, team } from "@/lib/content";
import { FooterContactForm } from "./FooterContactForm";
import { FooterFrame } from "./FooterFrame";
import styles from "./Agency.module.css";

export function AgencyHero() {
  return <section className={styles.hero} aria-labelledby="hero-title"><div className={styles.container}><div className={styles.heroGrid}>
    <div className={styles.heroCopy}><p className={styles.eyebrow}><span className={styles.dot} /> Независимое агентство ABB.IO</p><h1 id="hero-title">Ваш бизнес.<br />Заметнее.<br /><em>Убедительнее.</em></h1><p className={styles.heroDescription}>Дизайн, сайты и маркетинг — чтобы вас находили, выбирали и становились клиентами.</p><a className={styles.button} href="#contact-dialog" data-contact-dialog>Обсудить задачу <span aria-hidden="true">↗</span></a></div>
    <Link href="/cases/bogov" className={styles.heroVisual} aria-label="Посмотреть проект Bogov Team"><div className={styles.heroOrbit} aria-hidden="true" /><div className={styles.heroWindow}><div className={styles.windowBar} aria-hidden="true"><i /><i /><i /><span>bogov team / website</span></div><Image src="/cases/bogov-desktop.avif" alt="Дизайн сайта мотошколы Bogov Team" width={1000} height={750} sizes="(max-width: 760px) 90vw, 48vw" priority /></div><div className={styles.heroPhone}><Image src="/cases/bogov-mobile.avif" alt="Мобильная версия сайта Bogov Team" width={300} height={620} sizes="180px" priority /></div><span className={styles.visualCaption}>Избранный проект <strong>Bogov Team ↗</strong></span><span className={styles.heroStamp} aria-hidden="true">От идеи<br />до запуска.</span></Link>
  </div><div className={styles.heroBottom}><span>Хорошая идея заслуживает хорошего воплощения.</span><a href="#services">Что мы делаем <span aria-hidden="true">↓</span></a></div></div></section>;
}

export function AgencyServices({ overview = false }: { overview?: boolean }) {
  return <section id="services" className={styles.section} aria-labelledby="services-title"><div className={styles.container}>
    {!overview ? <div className={styles.sectionHead}><div><p className={styles.eyebrow}>01 / Что мы делаем</p><h2 id="services-title">Что нужно<br /><em>вашему бизнесу?</em></h2></div><p className={styles.sectionIntro}>Подключимся к отдельной задаче<br />или пройдём весь путь вместе.</p></div> : <h2 id="services-title" className="sr-only">Направления работы</h2>}
    <div className={styles.services}>{services.map(service => <Link className={styles.serviceRow} key={service.slug} href={`/services/${service.slug}`}><span className={styles.serviceNumber}>{service.number}</span><h3>{service.title}</h3><div><p>{service.problem}</p><div className={styles.tags}>{service.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div><ActionArrow className={styles.circleArrow} /></Link>)}</div>
  </div></section>;
}

export function AgencyCases({ overview = false }: { overview?: boolean }) {
  return <section id="cases" className={styles.section} aria-labelledby="cases-title"><div className={styles.container}>
    {!overview ? <div className={styles.sectionHead}><div><p className={styles.eyebrow}>02 / Наши проекты</p><h2 id="cases-title">Лучше показать.</h2></div><Link className={styles.textLink} href="/cases">Все кейсы <span aria-hidden="true">↗</span></Link></div> : <h2 className="sr-only" id="cases-title">Проекты агентства</h2>}
    <div className={styles.casesGrid}>{cases.map((item, index) => <article key={item.slug} className={styles.caseCard}><Link href={`/cases/${item.slug}`} className={styles.caseLink}><div className={styles.caseVisual} data-project={item.slug}><span className={styles.caseIndex}>0{index + 1} / {item.category}</span><Image src={item.image} alt={`Сайт ${item.name} — главная страница`} width={1200} height={800} loading={index === 0 ? "eager" : "lazy"} sizes={index === 0 ? "90vw" : "(max-width: 760px) 90vw, 44vw"} /><ActionArrow className={styles.caseOpen} /></div><div className={styles.caseCaption}><div><h3>{item.name}</h3><p>{item.summary}</p></div><div className={styles.tags}>{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div></Link></article>)}</div>
  </div></section>;
}

export function AgencyProcess({ overview = false }: { overview?: boolean }) {
  return <section id="process" className={`${styles.section} ${styles.processSection}`} aria-labelledby="process-title"><div className={styles.container}>
    {!overview ? <div className={styles.sectionHead}><div><p className={styles.eyebrow}>Как работаем</p><h2 id="process-title" aria-label="На связи. На каждом этапе.">На связи.<br /><em>На каждом этапе.</em></h2></div><Link className={styles.textLink} href="/process">Подробнее о работе <span aria-hidden="true">↗</span></Link></div> : <h2 id="process-title" className="sr-only">Этапы работы</h2>}
    <ol className={styles.steps}>{steps.map((step, index) => <li className={index === 2 ? styles.stepInProgress : undefined} key={step.title}><span className={styles.stepNumber}>0{index + 1}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol>
  </div></section>;
}

export function TeamSection({ overview = false }: { overview?: boolean }) {
  return <section id="team" className={styles.section} aria-labelledby="team-title"><div className={styles.container}><div className={styles.sectionHead}><div><p className={styles.eyebrow}>Люди за проектом</p><h2 id="team-title" aria-label="Небольшая команда. Прямой контакт.">Небольшая команда.<br /><em>Прямой контакт.</em></h2></div>{!overview && <Link className={styles.textLink} href="/about">Об ABBiO <span aria-hidden="true">↗</span></Link>}</div><p className={styles.mobileSwipeHint} id="team-scroll-hint">Листайте команду <span aria-hidden="true">→</span></p><div className={styles.teamGrid} role="region" aria-label="Команда агентства" aria-describedby="team-scroll-hint" tabIndex={0}>{team.map(person => <article className={styles.person} key={person.name}><div className={styles.portrait}><Image src={person.image} alt={`Временный AI-портрет: ${person.name}, вымышленный персонаж`} width={1122} height={1402} sizes="(max-width: 600px) 90vw, 30vw" /><span>Демо-профиль</span></div><h3>{person.name}</h3><p>{person.role}</p></article>)}</div></div></section>;
}

export function ArticlesSection() {
  return <section id="articles" className={styles.section} aria-labelledby="articles-title"><div className={styles.container}><div className={styles.journal}><div><p className={styles.eyebrow}>05 / Практика</p><h2 id="articles-title">Разбираем то,<br />что важно бизнесу.</h2><Link href="/articles" className={styles.textLink}>В раздел статей <span aria-hidden="true">↗</span></Link></div><div className={styles.journalTopics}><span className={styles.comingSoon}>Готовим первые материалы</span><p><span>01</span> Сайт, который помогает выбрать</p><p><span>02</span> SEO без туманных обещаний</p><p><span>03</span> Куда пропадают заявки</p></div></div></div></section>;
}

export function AgencyFooter() {
  return <FooterFrame className={styles.footer} compactClassName={styles.footerCompact} containerClassName={styles.container} contact={<div className={styles.contactGrid}><div><p className={styles.eyebrow}>Начнём с разговора</p><h2 aria-label="Есть задача? Давайте обсудим.">Есть задача?<br /><em>Давайте обсудим.</em></h2><p className={styles.contactDescription}>Оставьте контакты и пару слов о том, что хотите изменить.</p></div><div className={styles.contactDetails}><FooterContactForm /></div></div>}><div className={styles.footerBottom}><Link href="/" className={styles.footerBrand} aria-label="ABBiO — на главную"><span className={styles.footerBrandWordmark} aria-hidden="true"><span className={styles.footerBrandCore}>ABB</span><span className={styles.footerBrandI}>i</span><span className={styles.footerBrandO}>O</span></span></Link><div className={styles.footerScope}><span>Независимое агентство</span><strong>Дизайн · Сайты · Маркетинг</strong></div><a className={styles.footerTop} href="#main"><span>Наверх</span><i aria-hidden="true">↑</i></a></div></FooterFrame>;
}

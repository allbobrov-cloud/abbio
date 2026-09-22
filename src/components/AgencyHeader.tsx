"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import styles from "./Agency.module.css";
const items = [["Услуги", "/services"], ["Кейсы", "/cases"], ["Как работаем", "/process"], ["Статьи", "/articles"], ["Об ABBiO", "/about"]];
export function AgencyHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggle = useRef<HTMLButtonElement>(null);
  return <header className={styles.header} onKeyDown={event => { if (event.key === "Escape" && open) { setOpen(false); toggle.current?.focus(); } }}><div className={styles.headerInner}>
    <Link href="/" className={styles.brand} onClick={() => setOpen(false)} aria-label="Агентство ABBiO — главная"><span className={styles.brandWordmark} aria-hidden="true"><span className={styles.brandCore}>ABB</span><span className={styles.brandI}>i</span><span className={styles.brandO}>O</span></span><small>дизайн · сайты · маркетинг</small></Link>
    <button className={styles.menuButton} ref={toggle} type="button" aria-expanded={open} aria-controls="main-navigation" aria-label={open ? "Закрыть меню" : "Открыть меню"} onClick={() => setOpen(!open)}><span /><span /><span /></button>
    {open && <button className={styles.menuBackdrop} type="button" aria-hidden="true" tabIndex={-1} onClick={() => setOpen(false)} />}
    <nav id="main-navigation" className={styles.nav} data-open={open} aria-label="Основная навигация">{items.map(([label, href]) => <Link key={href} href={href} aria-current={pathname.startsWith(href) ? "page" : undefined} onClick={() => setOpen(false)}>{label}</Link>)}<a className={styles.mobileContact} href="#contact-dialog" data-contact-dialog onClick={() => setOpen(false)}>Обсудить задачу</a></nav>
    <a className={styles.headerCta} href="#contact-dialog" data-contact-dialog onClick={() => setOpen(false)}>Обсудить задачу</a>
  </div></header>;
}

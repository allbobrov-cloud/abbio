"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { cases, services } from "@/lib/content";

/*
 * Общий футер. На страницах, где контактная секция встроена в саму страницу
 * (сейчас /process), верхний блок «Есть задача?» + форма не дублируется:
 * остаётся только нижняя строка футера. То же самое для 404: короткая ошибка
 * не должна сразу упираться в большую контактную форму (контакт остаётся в
 * header). Путь 404 заранее не известен, поэтому вместо списка страниц
 * сравниваем с перечнем реально существующих маршрутов.
 */
const PAGES_WITH_OWN_CONTACT = ["/process"];
const KNOWN_ROUTES = new Set([
  "/",
  "/about",
  "/articles",
  "/cases",
  "/process",
  "/services",
  ...services.map((service) => `/services/${service.slug}`),
  ...cases.map((item) => `/cases/${item.slug}`),
]);

export function FooterFrame({
  contact,
  children,
  className,
  compactClassName,
  containerClassName,
}: {
  contact: ReactNode;
  children: ReactNode;
  className: string;
  compactClassName: string;
  containerClassName: string;
}) {
  const pathname = usePathname();
  const own =
    PAGES_WITH_OWN_CONTACT.includes(pathname) || !KNOWN_ROUTES.has(pathname);

  return (
    <footer id="contacts" className={own ? `${className} ${compactClassName}` : className}>
      <div className={containerClassName}>
        {!own && contact}
        {children}
      </div>
    </footer>
  );
}

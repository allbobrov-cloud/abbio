"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/*
 * Общий футер. На страницах, где контактная секция встроена в саму страницу
 * (сейчас /process), верхний блок «Есть задача?» + форма не дублируется:
 * остаётся только нижняя строка футера.
 */
const PAGES_WITH_OWN_CONTACT = ["/process"];

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
  const own = PAGES_WITH_OWN_CONTACT.includes(usePathname());

  return (
    <footer id="contacts" className={own ? `${className} ${compactClassName}` : className}>
      <div className={containerClassName}>
        {!own && contact}
        {children}
      </div>
    </footer>
  );
}

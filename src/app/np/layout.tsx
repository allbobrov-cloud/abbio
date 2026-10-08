import type { Metadata } from "next";
import { NpFooter } from "@/components/np/NpFooter";
import { NpHeader } from "@/components/np/NpHeader";
import { NpRequestDialog } from "@/components/np/NpRequestDialog";
import { NP_TITLE, NP_URL } from "@/lib/np/content";
import styles from "@/components/np/np.module.css";

/* Раздел открывается по ссылке и закрыт от индексации (решение владельца, 08.10.2026). */
export const metadata: Metadata = {
  metadataBase: new URL(NP_URL),
  title: { default: `${NP_TITLE} — партнёрство, сайты и SEO`, template: `%s — ${NP_TITLE}` },
  description: "Региональное партнёрство с Potolki-vsem.ru, готовые сайты и SEO для компаний по натяжным потолкам.",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  alternates: { canonical: null },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: NP_TITLE,
    title: `${NP_TITLE} — больше клиентов для вашей компании`,
    description: "Региональное партнёрство, готовые сайты и SEO-продвижение для компаний по натяжным потолкам.",
  },
};

export default function NpLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.root} data-np-root>
      <NpHeader />
      {children}
      <NpFooter />
      <NpRequestDialog />
    </div>
  );
}

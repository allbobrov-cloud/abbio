import type { Metadata } from "next";
import { finalSteps, NpFinal, NpHero } from "@/components/np/NpBlocks";
import { NpDirectBlock } from "@/components/np/NpDirectBlock";
import { NpJump } from "@/components/np/NpJump";
import { NpSiteBlock } from "@/components/np/NpSiteBlock";
import { NpSeoBlock } from "@/components/np/NpSeoBlock";
import styles from "@/components/np/np.module.css";

export const metadata: Metadata = {
  title: "Готовый сайт, SEO и Яндекс Директ для компании по натяжным потолкам",
  description: "Сайт под вашим брендом на основе Potolki-vsem.ru, SEO-продвижение и реклама в Яндекс Директе для компаний по натяжным потолкам.",
};

export default function Page() {
  return (
    <main id="main">
      <NpHero
        compact
        image={null}
        title={<>Свой сайт, поиск и&nbsp;реклама&nbsp;— <em>на проверенной основе</em></>}
        lead="Всё, что работает на Potolki-vsem.ru, — для вашей компании: сайт под вашим брендом, продвижение в поиске и реклама в Яндексе."
      >
        <NpJump />
      </NpHero>

      <section className={styles.section} aria-label="Готовый сайт и SEO-продвижение" style={{ paddingTop: "clamp(40px, 5vw, 64px)" }}>
        <div className={styles.container}>
          <NpSiteBlock />
          <NpSeoBlock />
          <NpDirectBlock />
        </div>
      </section>

      <NpFinal faq="site" service="website" title="Обсудим сайт и рекламу" steps={finalSteps.site} />
    </main>
  );
}

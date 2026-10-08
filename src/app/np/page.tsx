import type { Metadata } from "next";
import { NpFinal, NpHero, NpRequestButton } from "@/components/np/NpBlocks";
import { NpFormats } from "@/components/np/NpFormats";
import { NpProof } from "@/components/np/NpProof";
import { NP_TITLE, npResults, npTrackedQueries } from "@/lib/np/content";
import styles from "@/components/np/np.module.css";

export const metadata: Metadata = {
  title: { absolute: `${NP_TITLE} — больше клиентов для компаний по натяжным потолкам` },
  description: "Региональное партнёрство с Potolki-vsem.ru, готовые сайты и SEO для компаний по натяжным потолкам. Условия, тарифы и проверка города.",
};

export default function Page() {
  const [spb] = npResults;
  return (
    <main id="main">
      <NpHero
        title={<>Больше клиентов для вашей компании по <em>натяжным потолкам</em></>}
        lead="Мы создали и продвигаем проект Potolki-vsem.ru. Теперь этот поток клиентов из поиска может работать на вас — в вашем городе, под нашим брендом или вашим."
        actions={<>
          <NpRequestButton />
          <a href="#format" className={styles.buttonGhost}>Выбрать формат</a>
        </>}
      >
        <div className={styles.heroFacts}>
          <div><strong>{spb.value}</strong><span>запросов в ТОП-10 Яндекса · Санкт-Петербург</span><small>{spb.source}, {spb.date}</small></div>
          <div><strong>3 города</strong><span>Санкт-Петербург, Москва, Новосибирск</span><small>{npTrackedQueries.total} отслеживаемых запроса</small></div>
          <div><strong>4 формата</strong><span>партнёрство, готовый сайт, SEO, Яндекс Директ</span><small>можно совмещать</small></div>
        </div>
      </NpHero>

      <section className={styles.section} id="format" aria-labelledby="np-format">
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2} id="np-format">Выберите <em>свой формат</em></h2>
            <p className={styles.lead}>Четыре способа получать клиентов из поиска и рекламы. Найдите свою ситуацию — и сразу видно, что подойдёт.</p>
          </div>
          <NpFormats />
        </div>
      </section>

      <section className={styles.section} aria-labelledby="np-results" style={{ paddingTop: 0 }}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2} id="np-results">Проект, который <em>уже работает</em></h2>
            <p className={styles.lead}>Всё, что мы предлагаем, сначала сделали для себя. Potolki-vsem.ru мы создали и продвигаем сами — вот что это даёт.</p>
          </div>
          <NpProof />
        </div>
      </section>

      <NpFinal faq="hub" />
    </main>
  );
}

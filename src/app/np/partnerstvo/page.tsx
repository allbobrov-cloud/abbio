import type { Metadata } from "next";
import { NpFinal, NpHero, NpRequestButton } from "@/components/np/NpBlocks";
import { NpTariffs } from "@/components/np/NpTariffs";
import { NpCityMock } from "@/components/np/NpCityMock";
import { NpRoles } from "@/components/np/NpRoles";
import { partnerFacts, partnerSteps, tariffIncluded, tariffRuleCards } from "@/lib/np/content";
import styles from "@/components/np/np.module.css";
import rules from "@/components/np/NpRules.module.css";
import { NpDirectPartner } from "@/components/np/NpDirectPartner";

export const metadata: Metadata = {
  title: "Региональное партнёрство",
  description: "Станьте эксклюзивным партнёром Potolki-vsem.ru в своём городе: клиенты находят сайт в поиске и звонят вам, сайт и продвижение — на нас.",
};

export default function Page() {
  return (
    <main id="main">
      <NpHero
        compact
        image={null}
        aside={<NpCityMock />}
        title={<>Станьте партнёром <em>Потолки Всем</em> в своём городе</>}
        lead="Клиенты из вашего города находят Potolki-vsem.ru в поиске — и звонят вам. Сайт и продвижение берём на себя, вы занимаетесь замерами, договорами и монтажом."
        actions={<>
          <NpRequestButton />
          <a href="#tarify" className={styles.buttonGhost}>Тарифы</a>
        </>}
      >
        <div className={styles.heroFacts}>
          {partnerFacts.map((fact) => (
            <div key={fact.title}><strong>{fact.title}</strong><span>{fact.text}</span></div>
          ))}
        </div>
      </NpHero>

      <section className={styles.section} aria-labelledby="np-how">
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2} id="np-how">Как это <em>работает</em></h2>
          </div>
          <ol className={styles.steps}>
            {partnerSteps.map((step) => (
              <li key={step.title}><strong className={styles.h3}>{step.title}</strong><p>{step.text}</p></li>
            ))}
          </ol>

          <div style={{ marginTop: "clamp(56px, 7vw, 96px)", display: "grid", gap: 20 }}>
            <NpRoles />
            <p className={styles.small} style={{ margin: 0 }}>SEO-продвижение раздела входит в подписку. Позиции и количество заявок не гарантируем — показываем динамику в отчётах.</p>
          </div>
        </div>
      </section>

      <div className={styles.container}><div className={styles.beam} /></div>

      <section className={styles.section} id="tarify" aria-labelledby="np-tariffs">
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2} id="np-tariffs">Тарифы <em>по ступеням</em></h2>
            <p className={styles.lead}>Старт — 15 000 ₽ в месяц. Дальше цена может вырасти до 30 000 ₽, но только когда растут показатели. Переключите и посмотрите.</p>
          </div>
          <NpTariffs />

          <div className={rules.grid}>
            {tariffRuleCards.map((rule) => (
              <div key={rule.title} className={rules.card}>
                <strong>{rule.title}</strong>
                <span>{rule.text}</span>
              </div>
            ))}
          </div>

          <div className={rules.included}>
            <span className={rules.includedLabel}>Входит в подписку</span>
            <ul className={styles.chips}>{tariffIncluded.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>

          <NpDirectPartner />
        </div>
      </section>

      <NpFinal faq="partner" />
    </main>
  );
}

import { ActionArrow } from "@/components/ActionArrow";
import styles from "./Articles.module.css";
export function ArticleCta() {
  return <aside className={styles.articleCta}><span className={styles.category}>От чтения — к задаче</span><h2>Есть похожая задача?</h2><p>Разберём сайт, маркетинг или аналитику и найдём точку старта.</p>
    <a href="#contact-dialog" data-contact-dialog data-article-event="article_cta_click">Обсудить задачу <ActionArrow /></a></aside>;
}

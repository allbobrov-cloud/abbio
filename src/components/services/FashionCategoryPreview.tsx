import { FashionSilhouette, type SilhouetteVariant } from "./FashionSilhouette";
import styles from "./FashionCategoryPreview.module.css";

export type FashionProduct = {
  name: string;
  variant: SilhouetteVariant;
  sizes: string;
  swatches: number;
};

type FashionCategoryPreviewProps = {
  brand: string;
  title: string;
  eyebrow?: string;
  filters: string[];
  activeFilter?: number;
  products?: FashionProduct[];
  ctaLabel?: string;
  ctaActive?: boolean;
  compact?: boolean;
  className?: string;
};

export function FashionCategoryPreview({
  brand,
  title,
  eyebrow,
  filters,
  activeFilter = 0,
  products,
  ctaLabel,
  ctaActive = false,
  compact = false,
  className,
}: FashionCategoryPreviewProps) {
  return (
    <div className={[styles.page, compact ? styles.compact : "", className ?? ""].join(" ")}>
      <p className={styles.brand}>{brand}</p>
      <h3 className={styles.title}>{title}</h3>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <div className={styles.filters}>
        {filters.map((f, i) => (
          <span key={f} className={[styles.filter, i === activeFilter ? styles.filterActive : ""].join(" ")}>
            {f}
          </span>
        ))}
      </div>
      {products && (
        <div className={styles.products}>
          {products.map((p) => (
            <div className={styles.product} key={p.name}>
              <div className={styles.swatch}>
                <FashionSilhouette variant={p.variant} />
              </div>
              <p className={styles.productName}>{p.name}</p>
              <p className={styles.productMeta}>{p.sizes}</p>
              <div className={styles.colorDots} aria-hidden="true">
                {Array.from({ length: p.swatches }).map((_, i) => <i key={i} />)}
              </div>
            </div>
          ))}
        </div>
      )}
      {ctaLabel && (
        <span className={[styles.cta, ctaActive ? styles.ctaActive : ""].join(" ")}>
          {ctaLabel} <b aria-hidden="true">→</b>
        </span>
      )}
    </div>
  );
}

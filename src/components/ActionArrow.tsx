import styles from "./ActionArrow.module.css";

type ActionArrowProps = {
  className?: string;
};

export function ActionArrow({ className }: ActionArrowProps) {
  return (
    <span className={[styles.arrow, className].filter(Boolean).join(" ")} aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" focusable="false">
        <path d="M6 18 18 6M6 6h12v12" />
      </svg>
    </span>
  );
}

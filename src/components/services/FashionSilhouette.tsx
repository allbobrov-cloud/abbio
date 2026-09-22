export type SilhouetteVariant = "straight" | "oversize" | "structured";

const PATHS: Record<SilhouetteVariant, { body: string; center: string }> = {
  straight: {
    body: "M29 6 L51 6 L59 18 L50 23 L50 92 L30 92 L30 23 L21 18 Z",
    center: "M40 6 L40 92",
  },
  oversize: {
    body: "M22 8 L58 8 L69 22 L57 29 L60 93 L20 93 L23 29 L11 22 Z",
    center: "M40 8 L40 93",
  },
  structured: {
    body: "M31 6 L49 6 L56 16 L49 21 L52 60 L45 72 L35 72 L28 60 L31 21 L24 16 Z",
    center: "M40 6 L40 72",
  },
};

export function FashionSilhouette({ variant, className }: { variant: SilhouetteVariant; className?: string }) {
  const { body, center } = PATHS[variant];
  return (
    <svg viewBox="0 0 80 100" className={className} aria-hidden="true">
      <path d={body} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
      <path d={center} stroke="currentColor" strokeWidth="1" opacity="0.35" />
    </svg>
  );
}

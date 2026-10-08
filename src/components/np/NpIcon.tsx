// Иконки раздела: единая сетка 24px, линия 1.8, скруглённые окончания.
const paths = {
  arrow: "M5 12h14M13 6l6 6-6 6",
  check: "M5 12.5l4.2 4.2L19 7",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z",
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-4-4",
  pin: "M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  layout: "M4 5h16v14H4zM4 9h16M9 9v10",
  chart: "M4 20V4M4 20h16M8 16l4-5 3 3 5-6",
  close: "M6 6l12 12M18 6L6 18",
  plus: "M12 5v14M5 12h14",
  external: "M14 5h5v5M19 5l-8 8M18 14v5H5V6h5",
} as const;

export type NpIconName = keyof typeof paths;

export function NpIcon({ name, className }: { name: NpIconName; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d={paths[name]} />
    </svg>
  );
}

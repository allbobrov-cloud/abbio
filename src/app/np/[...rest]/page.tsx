import { notFound } from "next/navigation";

// Неизвестные адреса np.abbio.ru показывают 404 внутри раздела, а не страницу ABBiO.
export default function Page() {
  notFound();
}

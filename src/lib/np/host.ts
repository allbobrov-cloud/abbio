// Поддомен раздела «Потолки Всем для бизнеса». np.localhost — для локальной проверки.
export const NP_HOSTS = ["np.abbio.ru", "np.localhost"];
export const NP_PREFIX = "/np";

export function isNpHost(host: string | null | undefined) {
  if (!host) return false;
  return NP_HOSTS.includes(host.split(",")[0].trim().split(":")[0].toLowerCase());
}

export const QUEST_STORAGE_KEY = "abbio_quest";
export const QUEST_IDS = ["home", "design", "marketing", "cases"] as const;
export type QuestId = (typeof QUEST_IDS)[number];

export type QuestState = {
  version: 1;
  found: QuestId[];
  hintTarget: QuestId | null;
  hintLevel: 1 | 2;
  startedAt: string;
  completedAt: string | null;
  questId: string;
};

export const QUEST_HINTS: Record<QuestId, { page: string; href: string; first: string; second: string }> = {
  home: {
    page: "Главная",
    href: "/#client-journey",
    first: "Когда путь клиента заканчивается, остаётся вопрос: что происходит дальше?",
    second: "На главной откройте последний этап «Пути клиента». У результата есть маленькая деталь.",
  },
  design: {
    page: "Дизайн",
    href: "/services/design",
    first: "У хорошей идеи есть свой язык. Иногда достаточно двух букв, чтобы его заметить.",
    second: "На странице «Дизайн» найдите демо ARC 01 и его UI kit: знак рядом с «Aa».",
  },
  marketing: {
    page: "Маркетинг",
    href: "/services/marketing",
    first: "Заявка пришла. А кто продолжит разговор?",
    second: "На странице «Маркетинг» проследите маршрут обращения до CRM. Ищите знак рядом с ответственным.",
  },
  cases: {
    page: "Кейсы",
    href: "/cases",
    first: "Что, если самое интересное в кейсах находится ещё до первого проекта?",
    second: "На странице «Кейсы» посмотрите возле короткого описания того, что получилось.",
  },
};

export function isQuestId(value: unknown): value is QuestId {
  return typeof value === "string" && (QUEST_IDS as readonly string[]).includes(value);
}

export function nextHint(found: QuestId[], previous?: QuestId | null): QuestId | null {
  const remaining = QUEST_IDS.filter((id) => !found.includes(id));
  if (!remaining.length) return null;
  if (previous && remaining.includes(previous)) return previous;
  const last = found.at(-1);
  const offset = last ? (QUEST_IDS.indexOf(last) + 1) % QUEST_IDS.length : 0;
  return [...QUEST_IDS.slice(offset), ...QUEST_IDS.slice(0, offset)].find((id) => remaining.includes(id)) ?? remaining[0];
}

export function readQuestState(raw: string | null): QuestState | null {
  if (!raw) return null;
  try {
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== "object") return null;
    const data = value as Record<string, unknown>;
    if (data.version !== 1 || !Array.isArray(data.found) || !data.found.every(isQuestId) ||
      new Set(data.found).size !== data.found.length || typeof data.startedAt !== "string" ||
      typeof data.questId !== "string" || !/^Q-[A-Z0-9]{6,12}$/.test(data.questId)) return null;
    const found = data.found as QuestId[];
    const completedAt = found.length === 4 && typeof data.completedAt === "string" ? data.completedAt : null;
    return {
      version: 1, found, startedAt: data.startedAt, completedAt, questId: data.questId,
      hintTarget: nextHint(found, isQuestId(data.hintTarget) ? data.hintTarget : null),
      hintLevel: data.hintLevel === 2 ? 2 : 1,
    };
  } catch { return null; }
}

export function newQuestId(): string {
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);
  return `Q-${Array.from(bytes, (byte) => "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"[byte % 32]).join("")}`;
}

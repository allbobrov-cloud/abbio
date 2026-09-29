export type ContactSubmission = {
  fullName: string;
  phone: string;
  description: string;
  page: string;
  website?: string;
};

export function isTelegramContactEnabled() {
  return process.env.TELEGRAM_CONTACT_ENABLED === "true" &&
    Boolean(process.env.TELEGRAM_BOT_TOKEN?.trim()) &&
    Boolean(process.env.TELEGRAM_CHAT_ID?.trim());
}

export function parseContactSubmission(value: unknown): ContactSubmission | null {
  if (!value || typeof value !== "object") return null;
  const data = value as Record<string, unknown>;
  if (
    typeof data.fullName !== "string" ||
    typeof data.phone !== "string" ||
    typeof data.description !== "string" ||
    typeof data.page !== "string" ||
    (data.website !== undefined && typeof data.website !== "string")
  ) return null;

  const fullName = data.fullName.trim();
  const phone = data.phone.trim();
  const description = data.description.trim();
  const page = data.page.trim();
  if (
    fullName.length < 2 || fullName.length > 120 ||
    /[\r\n\x00-\x1f]/.test(fullName) ||
    !/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(phone) ||
    description.length > 2000 ||
    !/^\/(?!\/)[^?#\s]{0,199}$/.test(page) ||
    (data.website && data.website.length > 200)
  ) return null;

  return { fullName, phone, description, page, website: data.website };
}

export function formatTelegramContact(submission: ContactSubmission) {
  const { fullName, phone, description, page } = submission;
  return [
    "Новая заявка с сайта ABBiO",
    "",
    `Имя: ${fullName}`,
    `Телефон: ${phone}`,
    `Задача: ${description || "Не указана"}`,
    `Страница: ${page}`,
  ].join("\n");
}

export async function sendTelegramContact(submission: ContactSubmission) {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();
  if (!token || !chatId) return false;

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: formatTelegramContact(submission),
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) {
      console.warn(`Telegram contact delivery failed with HTTP ${response.status}.`);
      return false;
    }
    const result: unknown = await response.json();
    const accepted = Boolean(result && typeof result === "object" && "ok" in result && result.ok === true);
    if (!accepted) console.warn("Telegram contact delivery returned an unexpected response.");
    return accepted;
  } catch (error) {
    const cause = error && typeof error === "object" && "cause" in error ? error.cause : null;
    const code = cause && typeof cause === "object" && "code" in cause && typeof cause.code === "string" ? cause.code : "unknown";
    console.warn(`Telegram contact delivery failed before confirmation (${code}).`);
    return false;
  }
}

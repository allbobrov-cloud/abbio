export type ContactPayload = {
  fullName: string;
  phone: string;
  description: string;
  page: string;
  website: string;
};

export async function submitContact(payload: ContactPayload): Promise<"telegram" | "email"> {
  let telegramReady = false;
  try {
    const status = await fetch("/api/contact", { cache: "no-store" });
    if (status.ok) {
      const result: unknown = await status.json();
      telegramReady = Boolean(result && typeof result === "object" && "mode" in result && result.mode === "telegram");
    }
  } catch {
    // Keep the existing email route available until Telegram is configured.
  }
  if (!telegramReady) return "email";

  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });
  if (!response.ok) throw new Error("delivery_failed");
  const result: unknown = await response.json();
  if (!result || typeof result !== "object" || !("ok" in result) || result.ok !== true) {
    throw new Error("delivery_failed");
  }
  return "telegram";
}

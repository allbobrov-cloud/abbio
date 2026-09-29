import { operator } from "@/lib/legal";

export type ContactFormErrors = {
  fullName?: string;
  phone?: string;
};

export function contactEmailLink(fullName: string, phone: string, description: string) {
  const subject = encodeURIComponent("Заявка с сайта ABBiO");
  const body = encodeURIComponent(
    `Имя: ${fullName.trim()}\nТелефон: ${phone.trim()}\n\nЗадача:\n${description.trim() || "Не указана"}`,
  );
  return `mailto:${operator.email}?subject=${subject}&body=${body}`;
}

export function nationalPhoneDigits(value: string) {
  let digits = value.replace(/\D/g, "");

  if (digits.startsWith("8") || digits.startsWith("7")) {
    digits = digits.slice(1);
  }

  return digits.slice(0, 10);
}

export function formatRussianPhone(value: string) {
  const digits = nationalPhoneDigits(value);

  if (!digits) return "+7";

  let formatted = `+7 (${digits.slice(0, 3)}`;

  if (digits.length >= 3) formatted += ")";
  if (digits.length > 3) formatted += ` ${digits.slice(3, 6)}`;
  if (digits.length > 6) formatted += `-${digits.slice(6, 8)}`;
  if (digits.length > 8) formatted += `-${digits.slice(8, 10)}`;

  return formatted;
}

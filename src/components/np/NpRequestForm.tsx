"use client";

import { FormEvent, useId, useRef, useState } from "react";
import { contactEmailLink, formatRussianPhone, nationalPhoneDigits } from "@/lib/contactForm";
import { submitContact } from "@/lib/contactDelivery";
import { operator } from "@/lib/legal";
import { cityStatusOf, cityStatusText, citySuggestions, npServices, type NpServiceKey } from "@/lib/np/content";
import { NpIcon } from "./NpIcon";
import styles from "./NpRequest.module.css";
import np from "./np.module.css";

type Errors = { name?: string; phone?: string };

/*
 * Заявка раздела np.abbio.ru. Доставка — существующий /api/contact (Telegram,
 * запасной путь — письмо). API не меняется: город и услуга передаются в тексте заявки.
 * Начальные значения читаются при монтировании; диалог пересоздаёт форму через key.
 */
export function NpRequestForm({
  service: initialService = "partnership",
  city: initialCity = "",
  onDone,
}: {
  service?: NpServiceKey;
  city?: string;
  onDone?: () => void;
}) {
  const id = useId();
  const nameRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+7");
  const [city, setCity] = useState(initialCity);
  const [service, setService] = useState<NpServiceKey>(initialService);
  const [comment, setComment] = useState("");
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "email" | "error">("idle");


  const cityStatus = cityStatusOf(city);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (state === "sending") return;
    const next: Errors = {};
    if (name.trim().length < 2) next.name = "Укажите имя, чтобы мы знали, как к вам обратиться.";
    if (nationalPhoneDigits(phone).length !== 10) next.phone = "Введите 10 цифр номера после +7.";
    setErrors(next);
    if (next.name) { document.getElementById(`${id}-name`)?.focus(); return; }
    if (next.phone) { document.getElementById(`${id}-phone`)?.focus(); return; }

    const description = [
      "Раздел: Потолки Всем для бизнеса (np.abbio.ru)",
      `Услуга: ${npServices[service].label}`,
      `Город: ${city.trim() || "не указан"}`,
      `Комментарий: ${comment.trim() || "—"}`,
    ].join("\n");
    const page = `/np${window.location.pathname.replace(/^\/np(?=\/|$)/, "")}`.replace(/\/$/, "") || "/np";

    setState("sending");
    try {
      const mode = await submitContact({ fullName: name.trim(), phone, description, website, page });
      if (mode === "email") {
        window.location.href = contactEmailLink(name, phone, description);
        setState("email");
      } else {
        setState("sent");
      }
    } catch {
      setState("error");
    }
  };

  if (state === "sent" || state === "email") {
    return (
      <div className={styles.done} role="status">
        <span className={styles.doneMark}><NpIcon name="check" /></span>
        <h3 className={np.h3}>{state === "sent" ? "Заявка отправлена" : "Завершите отправку письма"}</h3>
        <p className={np.muted}>
          {state === "sent"
            ? "Спасибо! Свяжемся с вами по указанному номеру."
            : <>Откройте почтовое приложение и отправьте подготовленное письмо на <a href={`mailto:${operator.email}`}>{operator.email}</a>.</>}
        </p>
        {onDone && <button type="button" className={np.buttonGhost} onClick={onDone}>Закрыть</button>}
      </div>
    );
  }

  return (
    <form className={`${styles.form} ym-hide-content`} noValidate onSubmit={submit}>
      <input className={styles.honeypot} type="text" name="website" value={website} onChange={(e) => setWebsite(e.target.value)} autoComplete="off" tabIndex={-1} aria-hidden="true" />

      <fieldset className={styles.services}>
        <legend>Что интересует</legend>
        {(Object.keys(npServices) as NpServiceKey[]).map((key) => (
          <label key={key} className={styles.chip}>
            <input type="radio" name={`${id}-service`} value={key} checked={service === key} onChange={() => setService(key)} />
            <span>{npServices[key].label}</span>
          </label>
        ))}
      </fieldset>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor={`${id}-name`}>Имя <span aria-hidden="true">*</span></label>
          <input ref={nameRef} id={`${id}-name`} type="text" autoComplete="name" maxLength={120} value={name}
            onChange={(e) => { setName(e.target.value); if (errors.name) setErrors((c) => ({ ...c, name: undefined })); }}
            aria-required="true" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? `${id}-name-error` : undefined} placeholder="Как к вам обращаться" />
          {errors.name && <p className={styles.error} id={`${id}-name-error`}>{errors.name}</p>}
        </div>
        <div className={styles.field}>
          <label htmlFor={`${id}-phone`}>Телефон <span aria-hidden="true">*</span></label>
          <input id={`${id}-phone`} type="tel" inputMode="numeric" autoComplete="tel" value={phone}
            onChange={(e) => { setPhone(formatRussianPhone(e.target.value)); if (errors.phone) setErrors((c) => ({ ...c, phone: undefined })); }}
            aria-required="true" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? `${id}-phone-error` : undefined} placeholder="+7 (___) ___-__-__" />
          {errors.phone && <p className={styles.error} id={`${id}-phone-error`}>{errors.phone}</p>}
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor={`${id}-city`}>Город</label>
        <input id={`${id}-city`} type="text" list={`${id}-cities`} autoComplete="address-level2" maxLength={80} value={city} onChange={(e) => setCity(e.target.value)} placeholder="Например, Томск" />
        <datalist id={`${id}-cities`}>{citySuggestions.map((item) => <option key={item} value={item} />)}</datalist>
        <p className={styles.cityStatus} data-status={cityStatus ?? undefined} aria-live="polite">
          {cityStatus ? <><span className={styles.dot} aria-hidden="true" />{cityStatusText[cityStatus].label}</> : "Статус города покажем сразу, а уточним вручную."}
        </p>
      </div>

      <div className={styles.field}>
        <label htmlFor={`${id}-comment`}>Комментарий <span className={styles.optional}>необязательно</span></label>
        <textarea id={`${id}-comment`} rows={3} maxLength={1200} value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Например: работаем 5 лет, своя бригада, хотим больше заявок из поиска." />
      </div>

      <div className={styles.submitRow}>
        <button className={np.button} type="submit" disabled={state === "sending"}>
          {state === "sending" ? "Отправляем…" : "Отправить заявку"} <NpIcon name="arrow" />
        </button>
        {state === "error" && (
          <p className={styles.error} role="alert">
            Не удалось отправить заявку. Попробуйте ещё раз или напишите на <a href={`mailto:${operator.email}`}>{operator.email}</a>.
          </p>
        )}
      </div>
    </form>
  );
}

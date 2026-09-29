"use client";

import { FormEvent, useState } from "react";
import { ContactFormErrors, contactEmailLink, formatRussianPhone, nationalPhoneDigits } from "@/lib/contactForm";
import { operator } from "@/lib/legal";
import { submitContact } from "@/lib/contactDelivery";
import { ActionArrow } from "./ActionArrow";
import styles from "./FooterContactForm.module.css";

/*
 * footer — форма в общем футере (без изменений).
 * task — вариант для страниц, где первым шагом идёт рассказ о задаче:
 * та же логика и проверки, другие подписи, задача выделена как главное поле.
 */
type Variant = "footer" | "task";

const copy = {
  footer: {
    prefix: "footer-contact",
    nameLabel: "ФИО",
    nameError: "Укажите ФИО, чтобы мы знали, как к вам обратиться.",
    namePlaceholder: "Иванов Иван Иванович",
    phoneLabel: "Номер телефона",
    taskLabel: "Описание задачи",
    taskPlaceholder: "Например: нужен сайт для нового направления.",
    taskRows: 3,
    button: "Отправить заявку",
    successTitle: "Завершите отправку письма.",
  },
  task: {
    prefix: "task-contact",
    nameLabel: "Как к вам обращаться",
    nameError: "Укажите имя, чтобы мы знали, как к вам обратиться.",
    namePlaceholder: "Ваше имя",
    phoneLabel: "Телефон",
    taskLabel: "Коротко расскажите, что хотите изменить",
    taskPlaceholder: "Например: сайт есть, но обращений мало",
    taskRows: 5,
    button: "Отправить заявку",
    successTitle: "Завершите отправку письма.",
  },
} as const;

export function FooterContactForm({ variant = "footer" }: { variant?: Variant }) {
  const text = copy[variant];
  const id = text.prefix;
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("+7");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [deliveryMode, setDeliveryMode] = useState<"telegram" | "email">("email");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const resetForm = () => {
    setFullName("");
    setPhone("+7");
    setDescription("");
    setWebsite("");
    setErrors({});
    setSubmitted(false);
    setSubmitError(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;

    const nextErrors: ContactFormErrors = {};
    if (fullName.trim().length < 2) nextErrors.fullName = text.nameError;
    if (nationalPhoneDigits(phone).length !== 10) nextErrors.phone = "Введите 10 цифр номера после +7.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    setSubmitError(false);
    try {
      const mode = await submitContact({ fullName, phone, description, website, page: window.location.pathname });
      if (mode === "email") window.location.href = contactEmailLink(fullName, phone, description);
      setDeliveryMode(mode);
      setSubmitted(true);
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  };

  const rootClass = variant === "task" ? ` ${styles.task}` : "";

  if (submitted) {
    return (
      <section className={`${styles.success}${rootClass}`} aria-live="polite" aria-labelledby={`${id}-success-title`}>
        <span className={styles.successMark} aria-hidden="true">✓</span>
        <div>
          <p className={styles.eyebrow}>{deliveryMode === "telegram" ? "Заявка отправлена" : "Заявка подготовлена"}</p>
          <h3 id={`${id}-success-title`}>{deliveryMode === "telegram" ? "Спасибо! Мы получили вашу заявку." : text.successTitle}</h3>
          <p>{deliveryMode === "telegram" ? "Свяжемся с вами по указанному номеру." : <>Откройте почтовое приложение и отправьте подготовленное письмо на <a href={`mailto:${operator.email}`}>{operator.email}</a>.</>}</p>
        </div>
        <button type="button" onClick={resetForm}>Заполнить ещё раз</button>
      </section>
    );
  }

  return (
    <section className={`${styles.formSection}${rootClass}`} aria-label="Форма обратной связи">
      <form className={styles.form} noValidate onSubmit={handleSubmit}>
        <input className={styles.honeypot} type="text" name="website" value={website} onChange={(event) => setWebsite(event.target.value)} autoComplete="off" tabIndex={-1} aria-hidden="true" />
        <div className={styles.field}>
          <label htmlFor={`${id}-full-name`}>{text.nameLabel} <span aria-hidden="true">*</span></label>
          <input
            id={`${id}-full-name`}
            name="fullName"
            type="text"
            maxLength={120}
            autoComplete="name"
            value={fullName}
            onChange={event => {
              setFullName(event.target.value);
              if (errors.fullName) setErrors(current => ({ ...current, fullName: undefined }));
            }}
            aria-required="true"
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? `${id}-full-name-error` : undefined}
            placeholder={text.namePlaceholder}
          />
          {errors.fullName && <p className={styles.error} id={`${id}-full-name-error`} role="alert">{errors.fullName}</p>}
        </div>

        <div className={styles.field}>
          <label htmlFor={`${id}-phone`}>{text.phoneLabel} <span aria-hidden="true">*</span></label>
          <input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            value={phone}
            onChange={event => {
              setPhone(formatRussianPhone(event.target.value));
              if (errors.phone) setErrors(current => ({ ...current, phone: undefined }));
            }}
            aria-required="true"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? `${id}-phone-error` : `${id}-phone-hint`}
            placeholder="+7 (___) ___-__-__"
          />
          {!errors.phone && <p className={styles.hint} id={`${id}-phone-hint`}>Только цифры, номер России.</p>}
          {errors.phone && <p className={styles.error} id={`${id}-phone-error`} role="alert">{errors.phone}</p>}
        </div>

        <div className={`${styles.field}${variant === "task" ? ` ${styles.fieldTask}` : ""}`}>
          <label htmlFor={`${id}-description`}>{text.taskLabel} <span className={styles.optional}>необязательно</span></label>
          <textarea
            id={`${id}-description`}
            name="description"
            maxLength={2000}
            value={description}
            onChange={event => setDescription(event.target.value)}
            placeholder={text.taskPlaceholder}
            rows={text.taskRows}
          />
        </div>

        <div className={styles.formFooter}>
          <button type="submit" disabled={submitting}>{submitting ? "Отправляем…" : text.button} <ActionArrow /></button>
          {submitError && <p className={styles.error} role="alert">Не удалось отправить заявку. Попробуйте позже или напишите на <a href={`mailto:${operator.email}`}>{operator.email}</a>.</p>}
        </div>
      </form>
    </section>
  );
}

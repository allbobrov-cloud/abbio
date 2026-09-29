"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import {
  ContactFormErrors,
  contactEmailLink,
  formatRussianPhone,
  nationalPhoneDigits,
} from "@/lib/contactForm";
import { ActionArrow } from "./ActionArrow";
import { operator } from "@/lib/legal";
import { submitContact } from "@/lib/contactDelivery";
import styles from "./ContactDialog.module.css";

export function ContactDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const nameInput = useRef<HTMLInputElement>(null);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("+7");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [deliveryMode, setDeliveryMode] = useState<"telegram" | "email">("email");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handlePhoneChange = (value: string) => {
    setPhone(formatRussianPhone(value));
    if (errors.phone)
      setErrors((current) => ({ ...current, phone: undefined }));
  };

  const closeDialog = () => {
    dialogRef.current?.close();
    setIsOpen(false);
    setSubmitted(false);
    setSubmitError(false);
    setErrors({});
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${window.location.search}`,
    );
  };

  useEffect(() => {
    const openDialog = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const trigger = target.closest<HTMLElement>("[data-contact-dialog]");
      if (!trigger) return;

      event.preventDefault();
      triggerRef.current = trigger;
      setIsOpen(true);
    };

    document.addEventListener("click", openDialog);
    return () => document.removeEventListener("click", openDialog);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !isOpen || dialog.open) return;

    dialog.showModal();
    nameInput.current?.focus();
  }, [isOpen]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;

    const nextErrors: ContactFormErrors = {};
    if (fullName.trim().length < 2)
      nextErrors.fullName =
        "Укажите ФИО, чтобы мы знали, как к вам обратиться.";
    if (nationalPhoneDigits(phone).length !== 10)
      nextErrors.phone = "Введите 10 цифр номера после +7.";

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

  return (
    <dialog
      ref={dialogRef}
      id="contact-dialog"
      className={styles.dialog}
      aria-labelledby="contact-dialog-title"
      aria-describedby="contact-dialog-description"
      onCancel={(event) => {
        event.preventDefault();
        closeDialog();
      }}
      onClose={() => {
        setIsOpen(false);
        triggerRef.current?.focus();
      }}
    >
      <div className={styles.shell}>
        <button
          className={styles.close}
          type="button"
          aria-label="Закрыть форму"
          onClick={closeDialog}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>

        {submitted ? (
          <div className={styles.success} aria-live="polite">
            <span className={styles.successMark} aria-hidden="true">
              ✓
            </span>
            <p className={styles.eyebrow}>{deliveryMode === "telegram" ? "Заявка отправлена" : "Заявка подготовлена"}</p>
            <h2 id="contact-dialog-title">{deliveryMode === "telegram" ? "Спасибо! Мы получили вашу заявку." : "Завершите отправку письма."}</h2>
            <p>{deliveryMode === "telegram" ? "Свяжемся с вами по указанному номеру." : <>Откройте почтовое приложение и отправьте подготовленное письмо на <a href={`mailto:${operator.email}`}>{operator.email}</a>.</>}</p>
            <button
              className={styles.secondaryAction}
              type="button"
              onClick={closeDialog}
            >
              Закрыть
            </button>
          </div>
        ) : (
          <>
            <div className={styles.heading}>
              <p className={styles.eyebrow}>Обсудим задачу</p>
              <h2 id="contact-dialog-title">
                Расскажите, что хотите изменить.
              </h2>
              <p id="contact-dialog-description">Опишите задачу — так будет проще подготовиться к разговору.</p>
            </div>

            <form className={styles.form} noValidate onSubmit={handleSubmit}>
              <input className={styles.honeypot} type="text" name="website" value={website} onChange={(event) => setWebsite(event.target.value)} autoComplete="off" tabIndex={-1} aria-hidden="true" />
              <div className={styles.field}>
                <label htmlFor="contact-full-name">
                  ФИО <span aria-hidden="true">*</span>
                </label>
                <input
                  ref={nameInput}
                  id="contact-full-name"
                  name="fullName"
                  type="text"
                  maxLength={120}
                  autoComplete="name"
                  value={fullName}
                  onChange={(event) => {
                    setFullName(event.target.value);
                    if (errors.fullName)
                      setErrors((current) => ({
                        ...current,
                        fullName: undefined,
                      }));
                  }}
                  aria-required="true"
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={
                    errors.fullName ? "contact-full-name-error" : undefined
                  }
                  placeholder="Иванов Иван Иванович"
                />
                {errors.fullName && (
                  <p
                    className={styles.error}
                    id="contact-full-name-error"
                    role="alert"
                  >
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="contact-phone">
                  Номер телефона <span aria-hidden="true">*</span>
                </label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  value={phone}
                  onChange={(event) => handlePhoneChange(event.target.value)}
                  aria-required="true"
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={
                    errors.phone ? "contact-phone-error" : "contact-phone-hint"
                  }
                  placeholder="+7 (___) ___-__-__"
                />
                {!errors.phone && (
                  <p className={styles.hint} id="contact-phone-hint">
                    Только цифры, номер России.
                  </p>
                )}
                {errors.phone && (
                  <p
                    className={styles.error}
                    id="contact-phone-error"
                    role="alert"
                  >
                    {errors.phone}
                  </p>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="contact-description">
                  Описание задачи{" "}
                  <span className={styles.optional}>необязательно</span>
                </label>
                <textarea
                  id="contact-description"
                  name="description"
                  maxLength={2000}
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Например: нужен сайт для нового направления и понятный план продвижения."
                  rows={4}
                />
              </div>

              <div className={styles.formFooter}>
                <button className={styles.submit} type="submit" disabled={submitting}>
                  {submitting ? "Отправляем…" : "Отправить заявку"} <ActionArrow />
                </button>
                {submitError && <p className={styles.error} role="alert">Не удалось отправить заявку. Попробуйте позже или напишите на <a href={`mailto:${operator.email}`}>{operator.email}</a>.</p>}
              </div>
            </form>
          </>
        )}
      </div>
    </dialog>
  );
}

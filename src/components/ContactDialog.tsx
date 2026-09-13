"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import {
  ContactFormErrors,
  formatRussianPhone,
  nationalPhoneDigits,
} from "@/lib/contactForm";
import { ActionArrow } from "./ActionArrow";
import styles from "./ContactDialog.module.css";

export function ContactDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const nameInput = useRef<HTMLInputElement>(null);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("+7");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submitted, setSubmitted] = useState(false);
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: ContactFormErrors = {};
    if (!fullName.trim())
      nextErrors.fullName =
        "Укажите ФИО, чтобы мы знали, как к вам обратиться.";
    if (nationalPhoneDigits(phone).length !== 10)
      nextErrors.phone = "Введите 10 цифр номера после +7.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitted(true);
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
            <p className={styles.eyebrow}>Данные проверены</p>
            <h2 id="contact-dialog-title">Обращение подготовлено.</h2>
            <p>
              Приём заявок ещё не подключён, поэтому данные никуда не отправлены
              и не сохранены.
            </p>
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
              <p id="contact-dialog-description">
                Опишите задачу — так будет проще подготовиться к разговору.
              </p>
            </div>

            <form className={styles.form} noValidate onSubmit={handleSubmit}>
              <div className={styles.field}>
                <label htmlFor="contact-full-name">
                  ФИО <span aria-hidden="true">*</span>
                </label>
                <input
                  ref={nameInput}
                  id="contact-full-name"
                  name="fullName"
                  type="text"
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
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Например: нужен сайт для нового направления и понятный план продвижения."
                  rows={4}
                />
              </div>

              <div className={styles.formFooter}>
                <button className={styles.submit} type="submit">
                  Отправить заявку <ActionArrow />
                </button>
                <p>Поля со звёздочкой обязательны.</p>
              </div>
            </form>
          </>
        )}
      </div>
    </dialog>
  );
}

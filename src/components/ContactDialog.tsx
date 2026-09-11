"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { ContactFormErrors, formatRussianPhone, nationalPhoneDigits } from "@/lib/contactForm";
import styles from "./ContactDialog.module.css";

export function ContactDialog() {
  const dialog = useRef<HTMLDialogElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("+7");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const resetForm = useCallback(() => {
    setFullName("");
    setPhone("+7");
    setDescription("");
    setErrors({});
    setSubmitted(false);
  }, []);

  const openDialog = useCallback(() => {
    const element = dialog.current;
    if (!element) return;

    resetForm();
    if (!element.open) element.showModal();
    window.requestAnimationFrame(() => nameInput.current?.focus());
  }, [resetForm]);

  const closeDialog = useCallback(() => dialog.current?.close(), []);

  useEffect(() => {
    const handleTrigger = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;

      const trigger = event.target.closest<HTMLElement>("[data-contact-dialog]");
      if (!trigger) return;

      event.preventDefault();
      openDialog();
    };

    document.addEventListener("click", handleTrigger);
    return () => document.removeEventListener("click", handleTrigger);
  }, [openDialog]);

  const handlePhoneChange = (value: string) => {
    setPhone(formatRussianPhone(value));
    if (errors.phone) setErrors(current => ({ ...current, phone: undefined }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: ContactFormErrors = {};
    if (!fullName.trim()) nextErrors.fullName = "Укажите ФИО, чтобы мы знали, как к вам обратиться.";
    if (nationalPhoneDigits(phone).length !== 10) nextErrors.phone = "Введите 10 цифр номера после +7.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitted(true);
  };

  return (
    <dialog
      className={styles.dialog}
      ref={dialog}
      aria-labelledby="contact-dialog-title"
      aria-describedby="contact-dialog-description"
      onClick={event => {
        if (event.target === dialog.current) closeDialog();
      }}
      onClose={resetForm}
    >
      <div className={styles.shell}>
        <button className={styles.close} type="button" onClick={closeDialog} aria-label="Закрыть форму">
          <span aria-hidden="true">×</span>
        </button>

        {submitted ? (
          <div className={styles.success} aria-live="polite">
            <span className={styles.successMark} aria-hidden="true">✓</span>
            <p className={styles.eyebrow}>Данные проверены</p>
            <h2 id="contact-dialog-title">Обращение подготовлено.</h2>
            <p>Приём заявок ещё не подключён, поэтому данные никуда не отправлены и не сохранены.</p>
            <button className={styles.secondaryAction} type="button" onClick={closeDialog}>Закрыть</button>
          </div>
        ) : (
          <>
            <div className={styles.heading}>
              <p className={styles.eyebrow}>Обсудим задачу</p>
              <h2 id="contact-dialog-title">Расскажите, что хотите изменить.</h2>
              <p id="contact-dialog-description">Опишите задачу — так будет проще подготовиться к разговору.</p>
            </div>

            <form className={styles.form} noValidate onSubmit={handleSubmit}>
              <div className={styles.field}>
                <label htmlFor="contact-full-name">ФИО <span aria-hidden="true">*</span></label>
                <input
                  ref={nameInput}
                  id="contact-full-name"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  value={fullName}
                  onChange={event => {
                    setFullName(event.target.value);
                    if (errors.fullName) setErrors(current => ({ ...current, fullName: undefined }));
                  }}
                  aria-required="true"
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={errors.fullName ? "contact-full-name-error" : undefined}
                  placeholder="Иванов Иван Иванович"
                />
                {errors.fullName && <p className={styles.error} id="contact-full-name-error" role="alert">{errors.fullName}</p>}
              </div>

              <div className={styles.field}>
                <label htmlFor="contact-phone">Номер телефона <span aria-hidden="true">*</span></label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  value={phone}
                  onChange={event => handlePhoneChange(event.target.value)}
                  aria-required="true"
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? "contact-phone-error" : "contact-phone-hint"}
                  placeholder="+7 (___) ___-__-__"
                />
                {!errors.phone && <p className={styles.hint} id="contact-phone-hint">Только цифры, номер России.</p>}
                {errors.phone && <p className={styles.error} id="contact-phone-error" role="alert">{errors.phone}</p>}
              </div>

              <div className={styles.field}>
                <label htmlFor="contact-description">Описание задачи <span className={styles.optional}>необязательно</span></label>
                <textarea
                  id="contact-description"
                  name="description"
                  value={description}
                  onChange={event => setDescription(event.target.value)}
                  placeholder="Например: нужен сайт для нового направления и понятный план продвижения."
                  rows={4}
                />
              </div>

              <div className={styles.formFooter}>
                <button className={styles.submit} type="submit">Отправить заявку <span aria-hidden="true">↗</span></button>
                <p>Поля со звёздочкой обязательны.</p>
              </div>
            </form>
          </>
        )}
      </div>
    </dialog>
  );
}

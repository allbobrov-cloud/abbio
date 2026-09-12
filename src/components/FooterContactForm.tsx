"use client";

import { FormEvent, useState } from "react";
import { ContactFormErrors, formatRussianPhone, nationalPhoneDigits } from "@/lib/contactForm";
import { ActionArrow } from "./ActionArrow";
import styles from "./FooterContactForm.module.css";

export function FooterContactForm() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("+7");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const resetForm = () => {
    setFullName("");
    setPhone("+7");
    setDescription("");
    setErrors({});
    setSubmitted(false);
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

  if (submitted) {
    return (
      <section className={styles.success} aria-live="polite" aria-labelledby="footer-contact-success-title">
        <span className={styles.successMark} aria-hidden="true">✓</span>
        <div>
          <p className={styles.eyebrow}>Данные проверены</p>
          <h3 id="footer-contact-success-title">Обращение подготовлено.</h3>
          <p>Приём заявок ещё не подключён, поэтому данные никуда не отправлены и не сохранены.</p>
        </div>
        <button type="button" onClick={resetForm}>Заполнить ещё раз</button>
      </section>
    );
  }

  return (
    <section className={styles.formSection} aria-label="Форма обратной связи">
      <form className={styles.form} noValidate onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="footer-contact-full-name">ФИО <span aria-hidden="true">*</span></label>
          <input
            id="footer-contact-full-name"
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
            aria-describedby={errors.fullName ? "footer-contact-full-name-error" : undefined}
            placeholder="Иванов Иван Иванович"
          />
          {errors.fullName && <p className={styles.error} id="footer-contact-full-name-error" role="alert">{errors.fullName}</p>}
        </div>

        <div className={styles.field}>
          <label htmlFor="footer-contact-phone">Номер телефона <span aria-hidden="true">*</span></label>
          <input
            id="footer-contact-phone"
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
            aria-describedby={errors.phone ? "footer-contact-phone-error" : "footer-contact-phone-hint"}
            placeholder="+7 (___) ___-__-__"
          />
          {!errors.phone && <p className={styles.hint} id="footer-contact-phone-hint">Только цифры, номер России.</p>}
          {errors.phone && <p className={styles.error} id="footer-contact-phone-error" role="alert">{errors.phone}</p>}
        </div>

        <div className={styles.field}>
          <label htmlFor="footer-contact-description">Описание задачи <span className={styles.optional}>необязательно</span></label>
          <textarea
            id="footer-contact-description"
            name="description"
            value={description}
            onChange={event => setDescription(event.target.value)}
            placeholder="Например: нужен сайт для нового направления."
            rows={3}
          />
        </div>

        <div className={styles.formFooter}>
          <button type="submit">Отправить заявку <ActionArrow /></button>
          <p>Поля со звёздочкой обязательны.</p>
        </div>
      </form>
    </section>
  );
}

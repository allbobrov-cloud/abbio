"use client";

import { FormEvent, useState } from "react";
import { ContactFormErrors, formatRussianPhone, nationalPhoneDigits } from "@/lib/contactForm";
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
    successTitle: "Обращение подготовлено.",
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
    button: "Обсудить задачу",
    successTitle: "Задача подготовлена.",
  },
} as const;

export function FooterContactForm({ variant = "footer" }: { variant?: Variant }) {
  const text = copy[variant];
  const id = text.prefix;
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
    if (!fullName.trim()) nextErrors.fullName = text.nameError;
    if (nationalPhoneDigits(phone).length !== 10) nextErrors.phone = "Введите 10 цифр номера после +7.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitted(true);
  };

  const rootClass = variant === "task" ? ` ${styles.task}` : "";

  if (submitted) {
    return (
      <section className={`${styles.success}${rootClass}`} aria-live="polite" aria-labelledby={`${id}-success-title`}>
        <span className={styles.successMark} aria-hidden="true">✓</span>
        <div>
          <p className={styles.eyebrow}>Данные проверены</p>
          <h3 id={`${id}-success-title`}>{text.successTitle}</h3>
          <p>Приём заявок ещё не подключён, поэтому данные никуда не отправлены и не сохранены.</p>
        </div>
        <button type="button" onClick={resetForm}>Заполнить ещё раз</button>
      </section>
    );
  }

  return (
    <section className={`${styles.formSection}${rootClass}`} aria-label="Форма обратной связи">
      <form className={styles.form} noValidate onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor={`${id}-full-name`}>{text.nameLabel} <span aria-hidden="true">*</span></label>
          <input
            id={`${id}-full-name`}
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
            value={description}
            onChange={event => setDescription(event.target.value)}
            placeholder={text.taskPlaceholder}
            rows={text.taskRows}
          />
        </div>

        <div className={styles.formFooter}>
          <button type="submit">{text.button} <ActionArrow /></button>
          <p>Поля со звёздочкой обязательны.</p>
        </div>
      </form>
    </section>
  );
}

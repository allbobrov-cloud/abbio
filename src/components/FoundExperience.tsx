"use client";

import Link from "next/link";
import { useState, type CSSProperties, type FormEvent } from "react";
import { useQuest } from "@/components/QuestLayer";
import { submitContact } from "@/lib/contactDelivery";
import { contactEmailLink, formatRussianPhone, nationalPhoneDigits } from "@/lib/contactForm";
import { QUEST_HINTS, QUEST_IDS, type QuestId, type QuestState } from "@/lib/quest";
import styles from "./FoundExperience.module.css";

/* Точки «созвездия» — фиксированные места страниц; линия соединяет их в порядке находок */
const STARS: Record<QuestId, { x: number; y: number }> = {
  home: { x: 92, y: 112 },
  design: { x: 300, y: 78 },
  marketing: { x: 318, y: 282 },
  cases: { x: 108, y: 300 },
};

function formatDuration(startedAt: string, completedAt: string) {
  const seconds = Math.floor((Date.parse(completedAt) - Date.parse(startedAt)) / 1000);
  if (!Number.isFinite(seconds) || seconds < 0) return { value: "—", unit: "Время недоступно" };
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const rest = String(seconds % 60).padStart(2, "0");
  return hours
    ? { value: `${hours}:${String(minutes).padStart(2, "0")}:${rest}`, unit: "ч : мин : сек" }
    : { value: `${minutes}:${rest}`, unit: "мин : сек" };
}

function formatCompletionDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Дата недоступна";
  return new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" }).format(date);
}

function Constellation({ found }: { found: QuestId[] }) {
  const points = found.map((id) => STARS[id]);
  const path = points.map((p, i) => `${i ? "L" : "M"}${p.x} ${p.y}`).join(" ");
  return (
    <div className={styles.sky} aria-hidden="true">
      <svg viewBox="0 0 400 380" className={styles.skySvg}>
        <circle className={styles.skyRing} cx="205" cy="192" r="150" />
        <circle className={styles.skyRing} cx="205" cy="192" r="96" />
        {path && <path className={styles.route} d={path} pathLength={1} />}
        {QUEST_IDS.map((id) => {
          const order = found.indexOf(id);
          const star = STARS[id];
          return (
            <g key={id} className={styles.star} data-found={order >= 0} style={{ "--o": order } as CSSProperties}>
              <circle cx={star.x} cy={star.y} r="16" className={styles.starHalo} />
              <circle cx={star.x} cy={star.y} r="5" className={styles.starCore} />
              <text x={star.x} y={star.y + (star.y > 200 ? 36 : -26)} textAnchor="middle" className={styles.starLabel}>
                {order >= 0 ? `0${order + 1} · ${QUEST_HINTS[id].page}` : "?"}
              </text>
            </g>
          );
        })}
      </svg>
      <div className={styles.skyCore}>
        <strong>{found.length}<span>/4</span></strong>
        <small>{found.length === 4 ? "найдено" : "в пути"}</small>
      </div>
    </div>
  );
}

function Early({ state }: { state: QuestState | null }) {
  const found = state?.found ?? [];
  const next = state?.hintTarget ? QUEST_HINTS[state.hintTarget] : QUEST_HINTS.home;
  return (
    <section className={styles.early} aria-labelledby="found-early-title">
      <div className={styles.earlyCopy}>
        <p className={styles.status}><i aria-hidden="true" />Скрытый слой · найдено {found.length} из 4</p>
        <h1 id="found-early-title">Вы пришли{" "}<br /><em>немного раньше.</em></h1>
        <p className={styles.lead}>
          {found.length
            ? "Часть деталей уже у вас. Подарок откроется, когда найдёте все четыре."
            : "На четырёх страницах сайта спрятаны детали со знаком ✳. Найдите все — и здесь откроется подарок."}
        </p>
        <ol className={styles.slots}>
          {QUEST_IDS.map((id, i) => {
            const done = found.includes(id);
            return (
              <li key={id} data-found={done}>
                <span>{done ? "✳" : String(i + 1).padStart(2, "0")}</span>
                {done ? QUEST_HINTS[id].page : "Ещё не найдено"}
              </li>
            );
          })}
        </ol>
        <div className={styles.nextHint}>
          <small>{found.length ? "Следующая страница" : "Можно начать отсюда"}</small>
          <Link href={next.href}>{next.page} <span aria-hidden="true">↗</span></Link>
          <p>{next.first}</p>
        </div>
      </div>
      <Constellation found={found} />
    </section>
  );
}

export function FoundExperience() {
  const { state, hydrated } = useQuest();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("+7");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [emailMode, setEmailMode] = useState(false);
  const [error, setError] = useState("");
  const completedState = state?.completedAt && state.found.length === 4 ? state : null;

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending || !completedState?.completedAt) return;
    if (fullName.trim().length < 2 || nationalPhoneDigits(phone).length !== 10) {
      setError("Укажите имя и номер телефона из 10 цифр после +7.");
      return;
    }
    setSending(true);
    setError("");
    try {
      const mode = await submitContact({
        fullName, phone, description, website, page: "/found",
        quest: { questId: completedState.questId, completedAt: completedState.completedAt, foundCount: 4 },
      });
      if (mode === "email") {
        window.location.href = contactEmailLink(fullName, phone, `Квест ABBiO 4/4. Бесплатный созвон 60 минут. Quest ID: ${completedState.questId}. ${description}`);
        setEmailMode(true);
      }
      setSent(true);
    } catch {
      setError("Не удалось отправить заявку. Попробуйте ещё раз или напишите на info@abbio.ru.");
    } finally { setSending(false); }
  };

  if (!hydrated) {
    return <div className={styles.page}><div className={styles.loading} aria-live="polite">Открываем скрытый слой…</div></div>;
  }

  if (!completedState) {
    return <div className={styles.page} id="found-page"><div className={styles.container}><Link className={styles.backHome} href="/"><span aria-hidden="true">←</span> На главную</Link><Early state={state} /></div></div>;
  }

  const duration = formatDuration(completedState.startedAt, completedState.completedAt ?? "");

  return (
    <div className={styles.page} id="found-page">
      <div className={styles.container}>
        <Link className={styles.backHome} href="/"><span aria-hidden="true">←</span> На главную</Link>
        {/* 1. Финал */}
        <section className={styles.hero} aria-labelledby="found-title">
          <div className={styles.heroCopy}>
            <p className={styles.status}><i aria-hidden="true" />Скрытый слой · открыт</p>
            <h1 id="found-title">Вы нашли{" "}<br /><em>все четыре детали.</em></h1>
            <p className={styles.lead}>Порядок был свободным, поэтому маршрут сложился только у вас. Мы ничего не обещали. Но подарок всё-таки есть.</p>
            <div className={styles.actions}>
              <a className={styles.primary} href="#reward">Забрать подарок <span aria-hidden="true">↓</span></a>
              <a className={styles.secondary} href="#route">Мой маршрут <span aria-hidden="true">↓</span></a>
            </div>
          </div>
          <Constellation found={completedState.found} />
        </section>

        {/* 2. Маршрут */}
        <section className={styles.routeSection} id="route" aria-labelledby="route-title">
          <header className={styles.head}>
            <div>
              <p className={styles.eyebrow}>Ваше прохождение</p>
              <h2 id="route-title">Следы,{" "}<br /><em>которые вы оставили.</em></h2>
            </div>
            <p className={styles.headNote}>Статистика хранится только в этом браузере.</p>
          </header>

          <div className={styles.stats}>
            <div className={styles.statMain}>
              <small>Найдено</small>
              <strong>4<span>/4</span></strong>
              <p>Все детали на месте</p>
            </div>
            <div>
              <small>Время прохождения</small>
              <strong>{duration.value}</strong>
              <p>{duration.unit}</p>
            </div>
            <div>
              <small>Финиш</small>
              <strong className={styles.date}>{formatCompletionDate(completedState.completedAt ?? "")}</strong>
              <p>Сохранено на этом устройстве</p>
            </div>
          </div>

        </section>

        {/* 3. Подарок и заявка */}
        <section className={styles.reward} id="reward" aria-labelledby="reward-title">
          <div className={styles.rewardCopy}>
            <p className={styles.eyebrow}>Ваш подарок</p>
            <h2 id="reward-title">60 минут.{" "}<br /><em>Один разговор.</em>{" "}<br />Без счёта.</h2>
            <p className={styles.rewardLead}>Разберём ваш сайт, маркетинг или digital-задачу. Созвон бесплатный, без обязательства что-либо покупать.</p>
            <ol className={styles.steps}>
              <li><b>01</b>Оставьте контакт</li>
              <li><b>02</b>Свяжемся и договоримся о времени</li>
              <li><b>03</b>Созвон на 60 минут</li>
            </ol>
          </div>

          <div className={styles.formCard}>
            <div className={styles.code}>
              <span>Ваш код прохождения</span>
              <code>{completedState.questId}</code>
            </div>
            {sent ? (
              <div className={styles.success} role="status">
                <span aria-hidden="true">✳</span>
                <strong>{emailMode ? "Письмо подготовлено" : "Заявка отправлена"}</strong>
                <p>{emailMode ? "Подтвердите отправку в почтовом приложении." : "Спасибо. Мы свяжемся с вами, чтобы договориться о времени созвона."}</p>
              </div>
            ) : (
              <form className="ym-hide-content" onSubmit={submit} noValidate>
                <input className={styles.honeypot} type="text" name="website" value={website} onChange={(event) => setWebsite(event.target.value)} autoComplete="off" tabIndex={-1} aria-hidden="true" />
                <label htmlFor="quest-fullname">Имя или ФИО <span className={styles.req}>*</span></label>
                <input id="quest-fullname" name="fullName" value={fullName} onChange={(event) => setFullName(event.target.value)} autoComplete="name" maxLength={120} required />
                <label htmlFor="quest-phone">Телефон <span className={styles.req}>*</span></label>
                <input id="quest-phone" name="phone" type="tel" inputMode="tel" value={phone} onChange={(event) => setPhone(formatRussianPhone(event.target.value))} autoComplete="tel" required />
                <label htmlFor="quest-description">О чём хотите поговорить <span className={styles.optional}>необязательно</span></label>
                <textarea id="quest-description" name="description" value={description} onChange={(event) => setDescription(event.target.value)} maxLength={2000} rows={3} />
                {error && <p className={styles.error} role="alert">{error}</p>}
                <button type="submit" disabled={sending}>
                  {sending ? "Отправляем…" : "Забрать созвон"}
                  <span aria-hidden="true">↗</span>
                </button>
                <p className={styles.consent}>Подробнее об обработке данных — в <Link href="/privacy">политике</Link>.</p>
              </form>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

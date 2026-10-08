"use client";

import { useEffect, useRef, useState } from "react";
import { npServices, type NpServiceKey } from "@/lib/np/content";
import { NpIcon } from "./NpIcon";
import { NpRequestForm } from "./NpRequestForm";
import styles from "./NpRequest.module.css";
import np from "./np.module.css";

const titles: Record<NpServiceKey, string> = {
  partnership: "Обсудим ваш город",
  direct: "Обсудим рекламу",
  website: "Обсудим ваш сайт",
  seo: "Обсудим продвижение",
};

/*
 * Общее окно заявки раздела. Любая кнопка с data-np-request открывает его;
 * data-service и data-city подставляют услугу и город.
 */
export function NpRequestDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const [request, setRequest] = useState<{ service: NpServiceKey; city: string; n: number } | null>(null);

  useEffect(() => {
    const open = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const trigger = event.target.closest<HTMLElement>("[data-np-request]");
      if (!trigger) return;
      event.preventDefault();
      triggerRef.current = trigger;
      const service = trigger.dataset.service as NpServiceKey | undefined;
      setRequest((current) => ({
        service: service && service in npServices ? service : "partnership",
        city: trigger.dataset.city ?? "",
        n: (current?.n ?? 0) + 1,
      }));
    };
    document.addEventListener("click", open);
    return () => document.removeEventListener("click", open);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!request || !dialog) return;
    if (!dialog.open) dialog.showModal();
    // Фокус в первое поле — после showModal, иначе браузер ставит его на кнопку закрытия.
    dialog.querySelector<HTMLInputElement>('input[autocomplete="name"]')?.focus();
  }, [request]);

  const close = () => dialogRef.current?.close();

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="np-request-title"
      onClose={() => { setRequest(null); triggerRef.current?.focus(); }}
      onClick={(event) => { if (event.target === dialogRef.current) close(); }}
    >
      {request && (
        <div className={styles.dialogBody}>
          <button type="button" className={styles.dialogClose} onClick={close} aria-label="Закрыть форму">
            <NpIcon name="close" />
          </button>
          <h2 id="np-request-title" className={np.h2}>{titles[request.service]}</h2>
          <p className={np.muted}>Оставьте контакты — расскажем об условиях и ответим на вопросы.</p>
          <NpRequestForm key={request.n} service={request.service} city={request.city} onDone={close} />
        </div>
      )}
    </dialog>
  );
}

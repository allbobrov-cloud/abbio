"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { isQuestId, newQuestId, nextHint, QUEST_HINTS, QUEST_STORAGE_KEY, readQuestState, type QuestId, type QuestState } from "@/lib/quest";
import styles from "./QuestLayer.module.css";

type QuestContextValue = { state: QuestState | null; hydrated: boolean; find: (id: QuestId) => void };
const QuestContext = createContext<QuestContextValue | null>(null);

export function useQuest() {
  const context = useContext(QuestContext);
  if (!context) throw new Error("Quest layer is missing");
  return context;
}

export function QuestLayer({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [state, setState] = useState<QuestState | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState(false);
  const stateRef = useRef<QuestState | null>(null);

  useEffect(() => {
    let restored: QuestState | null = null;
    try { restored = readQuestState(window.localStorage.getItem(QUEST_STORAGE_KEY)); } catch { /* Storage may be unavailable. */ }
    stateRef.current = restored;
    queueMicrotask(() => { setState(restored); setHydrated(true); });
  }, []);

  const save = useCallback((next: QuestState) => {
    stateRef.current = next;
    setState(next);
    try { window.localStorage.setItem(QUEST_STORAGE_KEY, JSON.stringify(next)); } catch { /* Keep current-tab progress. */ }
  }, []);

  const find = useCallback((id: QuestId) => {
    if (!isQuestId(id)) return;
    const current = stateRef.current;
    if (current?.found.includes(id)) { setOpen(true); return; }
    const found = [...(current?.found ?? []), id];
    const next: QuestState = {
      version: 1,
      found,
      startedAt: current?.startedAt ?? new Date().toISOString(),
      completedAt: found.length === 4 ? new Date().toISOString() : null,
      questId: current?.questId ?? newQuestId(),
      hintTarget: nextHint(found, current?.hintTarget),
      hintLevel: 1,
    };
    save(next);
    setOpen(false);
    setToast(true);
  }, [save]);

  const changeHint = () => {
    const current = stateRef.current;
    if (current && current.hintLevel === 1) save({ ...current, hintLevel: 2 });
  };

  const panel = pathname !== "/found" && state && (toast || open);
  const hint = state?.hintTarget ? QUEST_HINTS[state.hintTarget] : null;
  return (
    <QuestContext.Provider value={{ state, hydrated, find }}>
      {children}
      {pathname !== "/found" && state && !panel && <button className={styles.indicator} type="button" onClick={() => setOpen(true)} aria-label={`Открыть найденное: ${state.found.length} из 4`}><span aria-hidden="true">✳</span>{state.found.length} / 4</button>}
      {panel && <aside className={styles.panel} aria-label="Найденные детали" aria-live="polite">
        <div className={styles.panelTop}><span>Скрытый слой / ABBiO</span><button type="button" onClick={() => { setToast(false); setOpen(false); }} aria-label="Закрыть подсказку">×</button></div>
        <p className={styles.count}>Найдено {state.found.length} / 4</p>
        <h2>{state.found.length === 4 ? "Вы нашли всё." : state.found.length === 1 ? "Что-то нашли." : state.found.length === 2 ? "Это уже не случайность." : "Осталась одна деталь."}</h2>
        <p className={styles.intro}>{state.found.length === 4 ? "Мы ничего не обещали. Но подарок всё-таки есть." : "Это не ошибка интерфейса. По сайту спрятаны ещё детали."}</p>
        {hint ? <div className={styles.hint}><span>Следующая страница</span><Link href={hint.href} onClick={() => { setToast(false); setOpen(false); }}>{hint.page} ↗</Link><p>{state.hintLevel === 2 ? hint.second : hint.first}</p>{state.hintLevel === 1 && <button type="button" onClick={changeHint}>Нужна ещё подсказка?</button>}</div> : <Link className={styles.reward} href="/found" onClick={() => { setToast(false); setOpen(false); }}>Открыть подарок <span aria-hidden="true">↗</span></Link>}
      </aside>}
    </QuestContext.Provider>
  );
}

export function QuestMark({ id, label, className = "" }: { id: QuestId; label: string; className?: string }) {
  const { state, find } = useQuest();
  const found = state?.found.includes(id) ?? false;
  return <button type="button" className={`${styles.mark} ${className}`} data-found={found} onClick={() => find(id)} aria-label={label} title={label}><span aria-hidden="true">✳</span></button>;
}

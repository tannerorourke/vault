import { useSyncExternalStore } from "react";


export type ChargeDir = "up" | "down" | null;

let current: ChargeDir = null;
const listeners = new Set<() => void>();

export function setChargeDir(next: ChargeDir) {
  if (next === current) return;
  current = next;
  for (const l of listeners) l();
}

/**
 * module-level store (rather than DrawerProvider) keeps re-render 
 * engine decoupled from the React tree, only the cue subscribes.
 * 
 * Ensures cue state is consistent even wheb user scrolls up/down repeatedly 
 */
export function useChargeDir(): ChargeDir {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => current,
    () => null, // SSR / first paint: idle
  );
}

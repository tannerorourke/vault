'use client';

import {
  createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useState,
  type ReactNode,
} from "react";


export type DrawerId = "work" | "contact";

/**
 * Which edge each drawer slides in from. The ScrollCue gateway maps a downward
 * gesture to the right (work) and an upward gesture to the left (contact); the
 * SidebarMenu uses this map to anchor + animate each panel.
 */
export const DRAWER_SIDE: Record<DrawerId, "left" | "right"> = {
  contact: "left",
  work: "right",
};

type DrawerContextValue = {
  open: DrawerId | null;
  openDrawer: (id: DrawerId) => void;
  closeDrawer: () => void;
  hubOpen: boolean;
  setHubOpen: (v: boolean) => void;
  // True whenever a sidebar drawer or corner menu is open
  overlayOpen: boolean;
};

const DrawerContext = createContext<DrawerContextValue | null>(null);

export function useDrawer() {
  const ctx = useContext(DrawerContext);
  if (!ctx) throw new Error("useDrawer must be used within a DrawerProvider");
  return ctx;
}


/**
 * Hold state of NavHub and sidebar drawer open/close.
 * - /work and /contact redirect to `/?view=work` and `/?view=contact`
 * - '?view=work' and '?view=contact' QP's opens work/contact drawers
 * - Correct drawer is opened, QP stripped on mount
 * - NavHub opens drawer via context, no URL change.
 */
export function DrawerProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState<DrawerId | null>(null);
  const [hubOpen, setHubOpen] = useState(false);

  const openDrawer = useCallback((id: DrawerId) => setOpen(id), []);
  const closeDrawer = useCallback(() => setOpen(null), []);

  // Reflect open state to the document root so layout CSS can push page content
  // aside for the open drawer (≥ md). Mirrors ContentTransitionProvider's
  // data-page-transition convention. contact = left drawer, work = right.
  useLayoutEffect(() => {
    document.documentElement.dataset.drawer = open ?? "";
  }, [open]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const view = params.get("view");
    if (view !== "work" && view !== "contact") return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(view);
    params.delete("view");
    const qs = params.toString();
    window.history.replaceState(
      null, "",
      window.location.pathname + (qs ? `?${qs}` : "") + window.location.hash,
    );
  }, []);

  const value = useMemo(
    () => ({
      open, openDrawer, closeDrawer,
      hubOpen, setHubOpen,
      overlayOpen: open !== null || hubOpen,
    }),
    [open, openDrawer, closeDrawer, hubOpen],
  );

  return <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>;
}

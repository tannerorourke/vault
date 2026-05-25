"use client";

import {
  createContext, useContext, useRef, useState, useEffect, useCallback,
  ReactNode
} from "react";
import { usePathname } from "next/navigation";


export type AppContext = {
  pathname: string;
  hasAppHistory: boolean;
  viewedProjects: ReadonlySet<string>;
  markProjectViewed: (pid: string) => void;
};

const AppContext =
  createContext<AppContext | null>(null);


export function AppProvider({
  children,
}: {
  children: ReactNode,
}) {
  const [hasAppHistory, setHasAppHistory] = useState(false);
  const [viewedProjects, setViewedProjects] = useState<Set<string>>(() => new Set());
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!hasAppHistory) setHasAppHistory(true);
  }, [pathname]);

  const markProjectViewed = useCallback((pid: string) => {
    setViewedProjects((prev) => {
      if (prev.has(pid)) return prev;
      const next = new Set(prev);
      next.add(pid);
      return next;
    });
  }, []);

  return (
    <AppContext.Provider value={{
      pathname,
      hasAppHistory,
      viewedProjects,
      markProjectViewed,
    }}>
      {children}
    </AppContext.Provider>
  );
}


export function useAppContext() {
  const cntx = useContext(AppContext);
  if (!cntx)
    throw new Error("Can't call hook on the server-side silly");
  return cntx;
}

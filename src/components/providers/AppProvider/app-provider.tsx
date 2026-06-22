"use client";

import {
  createContext, useContext, useState, useCallback,
  ReactNode
} from "react";
import { usePathname } from "next/navigation";


export type AppContext = {
  pathname: string;
  hasAppHistory: boolean;
  viewedProjects: ReadonlySet<string>;
  markProjectViewed: (pid: string) => void;
};

const AppContext = createContext<AppContext | null>(null);


export function AppProvider({
  numProjects,
  children,
}: {
  numProjects: number;
  children: ReactNode,
}) {
  const [hasAppHistory, setHasAppHistory] = useState(false);
  const [viewedProjects, setViewedProjects] = useState<Set<string>>(() => new Set());
  
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
  
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    if (!hasAppHistory)
      setHasAppHistory(true);
    if (viewedProjects.size >= numProjects)
      setViewedProjects(new Set());
  }

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
      markProjectViewed
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

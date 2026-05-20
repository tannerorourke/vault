"use client";

import { 
  createContext, useContext, useMemo, useRef, useState, useEffect,
  ReactNode, Dispatch, SetStateAction
} from "react";
import { usePathname } from "next/navigation";
import { NavFilter } from "@/lib/types/nav";


export type AppContext = {
  pathname: string;
  hasAppHistory: boolean
  activeFilters: NavFilter['id'][];
  setActiveFilters: Dispatch<SetStateAction<NavFilter['id'][]>>;
};

const AppContext =
  createContext<AppContext | null>(null);


export function AppProvider({
  children,
}: {
  children: ReactNode,
}) {
  const [activeFilters, setActiveFilters] = useState<NavFilter['id'][]>([]);
  const [hasAppHistory, setHasAppHistory] = useState(false);
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!hasAppHistory) setHasAppHistory(true);
  }, [pathname]);

  // const data = useMemo(() => ({
  //   pathname,
  //   hasAppHistory,
  //   activeFilters,
  //   setActiveFilters,
  // }), [activeFilters]);

  return (
    <AppContext.Provider value={{
      pathname,
      hasAppHistory,
      activeFilters,
      setActiveFilters,
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

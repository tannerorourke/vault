"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import { NavFilter } from "@/lib/types/nav";


export type AppContext = {
  activeFilters: NavFilter['id'][];
  setActiveFilters: React.Dispatch<React.SetStateAction<NavFilter['id'][]>>;
};


const FilterContext =
  createContext<AppContext | null>(null);


export function AppProvider({
  children,
}: {
  children: React.ReactNode,
}) {
  const [activeFilters, setActiveFilters] = useState<NavFilter['id'][]>([]);

  const data = useMemo(
    () => ({ activeFilters, setActiveFilters }),
    [activeFilters]
  );

  return <FilterContext.Provider value={data}>
    {children}
  </FilterContext.Provider>;
}


export function useProjectFilter() {
  const cntx = useContext(FilterContext);
  if (!cntx)
    throw new Error("Can't call hook on the server-side silly");
  return cntx;
}

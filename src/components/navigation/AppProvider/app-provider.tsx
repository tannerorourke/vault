"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import { IFilter } from "@/lib/types/global";

export type AppContext = {
  activeFilters: IFilter['id'][];
  setActiveFilters: React.Dispatch<React.SetStateAction<IFilter['id'][]>>;
};


const FilterContext =
  createContext<AppContext | null>(null);


export function AppProvider({
  children,
}: {
  children: React.ReactNode,
}) {
  const [activeFilters, setActiveFilters] = useState<IFilter['id'][]>([]);

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

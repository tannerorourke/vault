"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import { IFilter } from "@/lib/types/global";

export type AppContext = {
  projectFilter: string;
  setProjectFilter: React.Dispatch<React.SetStateAction<IFilter['id']>> 
};


const FilterContext = 
  createContext<AppContext | null>(null);


export function AppProvider({ 
  children,
  initProjectFilterId
}: { 
  children: React.ReactNode,
  initProjectFilterId: IFilter['id']
}) {
  const [projectFilter, setProjectFilter] = useState<IFilter['id']>(
    initProjectFilterId
  );

  const data = useMemo(
    () => ({ projectFilter, setProjectFilter }),
    [projectFilter]
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
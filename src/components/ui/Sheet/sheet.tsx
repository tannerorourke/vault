import type { ReactNode } from "react";

import * as sty from "./sheet.css";


export type SheetProps = {
  accent?: "copper";
  className?: string;
  children: ReactNode;
};

export function Sheet({ accent, className, children }: SheetProps) {
  const cls = [sty.sheet, accent === "copper" && sty.sheetCopper, className]
    .filter(Boolean)
    .join(" ");
  return <div className={cls}>{children}</div>;
}

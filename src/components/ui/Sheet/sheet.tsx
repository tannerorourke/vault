import type { ComponentPropsWithoutRef } from "react";

import * as sty from "./sheet.css";


export type SheetProps = ComponentPropsWithoutRef<"div"> & {
  accent?: "copper";
};

export function Sheet({ accent, className, children, ...rest }: SheetProps) {
  const cls = [sty.sheet, accent === "copper" && sty.sheetCopper, className]
    .filter(Boolean)
    .join(" ");
  return (
    <div {...rest} className={cls}>
      {children}
    </div>
  );
}

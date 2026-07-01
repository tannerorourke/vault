'use client';

import {
  cloneElement, isValidElement, useEffect, useId, useRef, useState,
  type MouseEvent, type ReactElement, type ReactNode,
} from "react";
import { usePathname } from "next/navigation";

import * as sty from "./popover.css";


export type PopoverProps = {
  /** The trigger element (e.g. IconButton / TextLink). Cloned to attach the
   * toggle handler + aria wiring, kept generic */
  input: ReactElement;
  children: ReactNode;
  /** Controlled open state. Omit for self-managed (uncontrolled) behaviour. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  align?: "start" | "end";
  className?: string;
  panelClassName?: string;
  /** name for the panel (it is a labelled region). */
  "aria-label"?: string;
};

/**
 * Anchored popover: an absolutely-positioned panel animates in on `data-open`,
 * gated with native `inert`, dismissed on outside-click / Escape / route change. 
 * No portal (consistent with the rest of the nav chrome).
 */
export function Popover({
  input,
  children,
  open: openProp,
  onOpenChange,
  align = "end",
  className,
  panelClassName,
  "aria-label": ariaLabel,
}: PopoverProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const pathname = usePathname();
  const prevPath = useRef(pathname);

  const [openState, setOpenState] = useState(false);
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : openState;

  const setOpen = (v: boolean) => {
    if (!isControlled) setOpenState(v);
    onOpenChange?.(v);
  };

  // Close on real route change (not initial mount, so deep-links stay open).
  useEffect(() => {
    if (prevPath.current !== pathname) {
      prevPath.current = pathname;
      setOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Close on outside pointerdown / Escape while open.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const trigger = isValidElement(input)
    ? cloneElement(input as ReactElement<Record<string, unknown>>, {
        onClick: (e: MouseEvent) => {
          (input.props as { onClick?: (e: MouseEvent) => void }).onClick?.(e);
          setOpen(!open);
        },
        "aria-expanded": open,
        "aria-controls": panelId,
        "aria-haspopup": "dialog",
      })
    : input;

  return (
    <div ref={wrapRef} className={[sty.wrap, className].filter(Boolean).join(" ")}>
      {trigger}
      <div
        id={panelId}
        inert={!open}
        aria-label={ariaLabel}
        className={[
          sty.panel,
          align === "start" ? sty.alignStart : sty.alignEnd,
          panelClassName,
        ].filter(Boolean).join(" ")}
        data-popover-open={open || undefined}
      >
        {children}
      </div>
    </div>
  );
}

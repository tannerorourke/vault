'use client';

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";

import { Icon, IconButton } from "@/components/ui/Icon";
import Text from "@/components/ui/Text";

import * as sty from "./bottom-drawer.css";


export type BottomDrawerProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

/**
 * Bottom sheet (controlled). Same surface design as the side drawers, anchored to
 * the bottom edge and sized to its content. Overlays the page (no content-push).
 */
export function BottomDrawer({ open, onClose, title, children }: BottomDrawerProps) {
  const ref = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const prevPath = useRef(pathname);

  // Close on real route change.
  useEffect(() => {
    if (prevPath.current !== pathname) {
      prevPath.current = pathname;
      onClose();
    }
  }, [pathname, onClose]);

  // Close on outside pointerdown / Escape; skip the panel + 'data-cue' controls.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Element;
      if (ref.current?.contains(target) || target.closest("[data-cue]")) return;
      onClose();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <aside
      ref={ref}
      inert={!open}
      className={sty.drawer}
      data-bottom-drawer-open={open || undefined}
      aria-label={title}
    >
      <div className={sty.inner}>
        <div className={sty.top}>
          <Text as="h2" variant="bodyLg" className={sty.title}>
            {title}
          </Text>
          <IconButton variant="pill" onClick={onClose} alt="Close">
            <Icon name="times" size="lg" />
          </IconButton>
        </div>
        {children}
      </div>
    </aside>
  );
}

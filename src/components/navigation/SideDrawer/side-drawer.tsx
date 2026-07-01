'use client';

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";

import { Icon, IconButton } from "@/components/ui/Icon";
import Text from "@/components/ui/Text";

import * as sty from "./side-drawer.css";


export type SideDrawerProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  side?: "left" | "right";
  children: ReactNode;
};

/**
 * Single sliding side panel (controlled). One route per instance. 
 */
export function SideDrawer({ open, onClose, title, side = "right", children }: SideDrawerProps) {
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

  // Close on outside pointerdown / Escape. Skip the panel and any nav control
  // marked `data-cue` so the opening control doesn't immediately re-close it.
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
      className={[sty.drawer, sty[side]].join(" ")}
      data-drawer-open={open || undefined}
      aria-label={title}
    >
      <div className={sty.inner}>
        <div className={sty.top}>
          <Text as="h2" variant="bodyLg" className={sty.title}>
            {title}
          </Text>
          <IconButton variant="pill" onClick={onClose} alt="Close">
            <Icon name="times" size="xl" />
          </IconButton>
        </div>
        {children}
      </div>
    </aside>
  );
}

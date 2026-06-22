'use client';

import { useEffect, useRef, type ReactNode, type Ref } from "react";
import { usePathname } from "next/navigation";

import { Icon, IconButton } from "@/components/ui/Icon";
import Text from "@/components/ui/Text";
import { useDrawer } from "@/components/providers/DrawerProvider";

import { LINKS } from "@/content/nav-links";
import * as sty from "./sidebar-menu.css";


/** One sliding panel. Content is static per side so it just slides in/out. */
function Panel({
  ref, side, domId, isOpen, title, onClose, children,
}: {
  ref: Ref<HTMLElement>;
  side: "left" | "right";
  domId: string;
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <aside
      ref={ref}
      id={domId}
      inert={!isOpen}
      className={[sty.drawer, sty[side]].join(" ")}
      data-open={isOpen || undefined}
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

/** Shared wrapper for WorkIndex and ConnectIndex.
 * - Rendered in the layout shell so the work/connect bodies are SSR'd.
 * - Open states hooked from DrawerProvider
 */
export function SidebarMenu({ work, connect }: { work: ReactNode; connect: ReactNode }) {
  const { open, closeDrawer } = useDrawer();
  const leftRef = useRef<HTMLElement>(null);
  const rightRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const prevPath = useRef(pathname);

  const isOpen = open !== null;

  // Close on route change
  useEffect(() => {
    if (prevPath.current !== pathname) {
      prevPath.current = pathname;
      closeDrawer();
    }
  }, [pathname, closeDrawer]);

  // Close on ESC / outside-click (but not when clicking inside a panel or the NavHub)
  useEffect(() => {
    if (!isOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Element;
      if (
        leftRef.current?.contains(target) ||
        rightRef.current?.contains(target) ||
        target.closest("[data-nav-hub]")
      ) return;
      closeDrawer();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, closeDrawer]);

  return (
    <>
      <Panel
        ref={leftRef}
        side="left"
        domId="sidebar-contact"
        isOpen={open === "contact"}
        title={LINKS.contact.text ?? "Reach out"}
        onClose={closeDrawer}
      >
        {connect}
      </Panel>
      <Panel
        ref={rightRef}
        side="right"
        domId="sidebar-work"
        isOpen={open === "work"}
        title={LINKS.mywork.text ?? "My Work"}
        onClose={closeDrawer}
      >
        {work}
      </Panel>
    </>
  );
}

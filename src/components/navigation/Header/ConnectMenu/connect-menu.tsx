'use client';

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { useTheme } from "@/components/navigation/ThemeProvider";

import type { NavLink } from "@/content/nav-links";
import { Icon, IconButton } from "@/components/ui/Icon";
import MorphIcon from "@/components/ui/MorphIcon";

import { LINKS } from "@/content/nav-links";
import * as sty from "./connect-menu.css";


const PANEL_ID = "header-connect-panel";

export function ConnectMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={wrapRef} className={sty.wrap}>
      <IconButton
        variant="pill"
        className={[sty.trigger, isOpen && sty.triggerOpen].filter(Boolean).join(" ")}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls={PANEL_ID}
        aria-haspopup="menu"
        alt={isOpen ? "Close menu" : "Open menu"}
      >
        <MorphIcon
          active={isOpen}
          from={<Icon name="network" size="lg" />}
          to={<Icon name="times" size="lg" />}
        />
      </IconButton>

      <motion.div
        id={PANEL_ID}
        role="menu"
        aria-hidden={!isOpen}
        className={sty.panel}
        initial={false}
        animate={{
          opacity: isOpen ? 1 : 0,
          y: isOpen ? 0 : -6,
          scale: isOpen ? 1 : 0.98,
          pointerEvents: isOpen ? "auto" : "none",
        }}
        transition={{
          opacity: { duration: 0.2, ease: "easeInOut" },
          y: { duration: 0.24, ease: [0.2, 0.1, 0.2, 1] },
          scale: { duration: 0.24, ease: [0.2, 0.1, 0.2, 1] },
        }}
      >
        <div className={sty.eyebrow}>Connect</div>
        <ul className={sty.list}>
          {LINKS.map((item: NavLink, ix: number) => (
            <li key={ix} role="none">
              <a
                role="menuitem"
                className={sty.item}
                href={item.href}
                target={item.target}
                download={item.download}
                aria-label={item.alt}
                onClick={() => setIsOpen(false)}
                tabIndex={isOpen ? 0 : -1}
              >
                {item.iconName && (
                  <span className={sty.itemIcon}>
                    <Icon name={item.iconName} size="lg" />
                  </span>
                )}
                <span className={sty.itemLabel}>{item.text}</span>
                <span className={sty.itemArrow}>
                  <Icon name="arrow-up-right" size="sm" />
                </span>
              </a>
            </li>
          ))}
        </ul>
        <hr className={sty.divider} />
        <button
          role="menuitem"
          type="button"
          className={sty.item}
          onClick={toggleTheme}
          aria-pressed={isDark}
          tabIndex={isOpen ? 0 : -1}
        >
          <span className={sty.itemIcon}>
            <MorphIcon
              active={isDark}
              from={<Icon name="sun" size="lg" />}
              to={<Icon name="moon" size="lg" />}
            />
          </span>
          <span className={sty.itemLabel}>{isDark ? "Dark mode" : "Light mode"}</span>
          <span className={sty.toggleDot} data-on={isDark} aria-hidden />
        </button>
      </motion.div>
    </div>
  );
}

'use client';

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { useTheme } from "@/components/navigation/ThemeProvider";

import { Icon, IconButton } from "@/components/ui/Icon";
import MorphIcon from "@/components/ui/MorphIcon";

import { NavLink, NAV_LINKS } from "@/content/nav-links";
import * as sty from "./connect-menu.css";
import Eyebrow from "@/components/ui/Eyebrow";


function NavItem(
  { link, onClick }:
  { link: NavLink; onClick: () => void; }
) {
  return (
    <a
      className={sty.item}
      href={link.href}
      target={link.target ?? undefined}
      download={link.download ?? undefined}
      onClick={onClick}
    >
      {link.iconName && (
        <span className={sty.itemIcon}>
          <Icon name={link.iconName} size="lg" />
        </span>
      )}
      <span className={sty.itemLabel}>{link.text}</span>
      <span className={sty.itemArrow}>
        <Icon name="arrow-up-right" size="sm" />
      </span>
    </a>
  );
}


const PANEL_ID = "header-connect-panel";

export function ConnectMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const pathname = usePathname();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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

  const CV_LINK = NAV_LINKS.find(link => link.alt === "Download CV") ?? null;
  const LINKS = NAV_LINKS.filter(link => link.alt !== "Download CV");

  return (
    <div ref={wrapRef} className={sty.wrap}>
      <IconButton
        variant="pill"
        className={[sty.trigger, isOpen && sty.triggerOpen].filter(Boolean).join(" ")}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls={PANEL_ID}
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
        inert={!isOpen}
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
        <Eyebrow size="micro" className={sty.eyebrow}>Connect</Eyebrow>
        <ul className={sty.list}>
          {LINKS.map((item: NavLink, ix: number) => (
            <li key={ix}>
              <NavItem
                link={item}
                onClick={() => setIsOpen(false)}
              />
            </li>
          ))}
        </ul>

        {CV_LINK && (
          <>
          <hr className={sty.divider} />
          <NavItem
            link={CV_LINK}
            onClick={() => setIsOpen(false)}
          />
          </>
        )}
        
        <hr className={sty.divider} />
        <button
          type="button"
          className={sty.item}
          onClick={toggleTheme}
          aria-pressed={isDark}
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

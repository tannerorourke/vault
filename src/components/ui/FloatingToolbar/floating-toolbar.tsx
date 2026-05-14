'use client';

import { useState, useEffect } from "react";
import * as sty from "./floating-toolbar.css";

import { useTheme } from '@/components/navigation/ThemeProvider';
import { LINKS, NavLink } from "@/content/nav-links";

import MorphIcon from "@/components/ui/MorphIcon";
import { IconButton, IconLink } from "@/components/ui/Icon";

import { Sun } from '@/content/icons/sun';
import { Moon } from '@/content/icons/moon';
import { Network } from '@/content/icons/network';
import { Times } from '@/content/icons/times';

const LIST_ID = "icon-list-items";

export function FloatingToolbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const sync = () => {
      setIsDesktop(mql.matches);
      if (mql.matches) setIsOpen(false);
    };
    sync();
    mql.addEventListener("change", sync);
    return () => mql.removeEventListener("change", sync);
  }, []);

  const tooltipSide = isDesktop ? "right" : "top";
  const itemsFocusable = isDesktop || isOpen;

  return (
    <div className={sty.toolbarWrap}>
      <aside className={[sty.toolbar, !isDesktop && isOpen ? sty.toolbarOpen : ""].filter(Boolean).join(" ")}>
        <ul 
          id={LIST_ID}
          className={[sty.list, !isDesktop && isOpen ? sty.listOpen : ""].filter(Boolean).join(" ")}
        >
          {LINKS.map((item: NavLink, ix: number) => (
            <li key={ix} className={sty.item}>
              <IconLink
                variant='flat'
                href={item.href}
                target={item.target}
                download={item.download}
                alt={item.alt}
                tooltipText={item.tooltipText}
                tooltipSide={tooltipSide}
                tabIndex={itemsFocusable ? 0 : -1}
                aria-hidden={itemsFocusable ? undefined : true}
              >
                <item.Icon duopacity={0} />
              </IconLink>
            </li>
          ))}
        </ul>

        {/** Mobile Chevron social list toggle */}
        <IconButton
          variant='pill'
          className={sty.toolbarMbToggle}
          onClick={() => setIsOpen((prev) => !prev)}
          alt={isOpen ? "Hide social links" : "Show social links"}
          aria-expanded={isOpen}
          aria-controls={LIST_ID}
        >
          <MorphIcon active={isOpen} from={<Network />} to={<Times />} />
        </IconButton>
      </aside>

      {/** THEME TOGGLE */}
      <IconButton
        variant='pill'
        className={sty.themeToggle}
        onClick={toggleTheme}
        alt={isDark ? "Switch to light mode" : "Switch to dark mode"}
        aria-pressed={isDark}
      >
        <MorphIcon active={isDark} from={<Sun />} to={<Moon />} />
      </IconButton>
    </div>
  );
}

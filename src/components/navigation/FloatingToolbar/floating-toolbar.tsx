'use client';

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from '@/components/navigation/ThemeProvider';

import type { NavLink } from "@/lib/types/nav";
import { IconButton, IconLink } from "@/components/ui/Icon";
import MorphIcon from "@/components/ui/MorphIcon";
import { Sun } from '@/components/icons/sun';
import { Moon } from '@/components/icons/moon';
import { Network } from '@/components/icons/network';
import { Times } from '@/components/icons/times';

import { LINKS } from "@/content/nav-links";
import * as sty from "./floating-toolbar.css";


const LIST_ID = "icon-list-items";

export function FloatingToolbar() {
  const [isOpen, setIsOpen] = useState(false);

  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className={sty.toolbarWrap}>
      <aside className={[sty.toolbar, isOpen && sty.toolbarOpen].filter(Boolean).join(" ")}>
        <ul
          id={LIST_ID}
          className={[sty.list, isOpen && sty.listOpen].filter(Boolean).join(" ")}
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
                tooltipSide="top"
              >
                {item.Icon && <item.Icon duopacity={0.05} />}
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

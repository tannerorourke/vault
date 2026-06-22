'use client';

import { Fragment, useEffect, useRef, type MouseEvent } from "react";
import { usePathname } from "next/navigation";
import { Link } from "next-view-transitions";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useDrawer } from "@/components/providers/DrawerProvider";

import { Icon, IconButton } from "@/components/ui/Icon";
import MorphIcon from "@/components/ui/MorphIcon";

import { NavLink, MENU_LINKS, LINKS } from "@/content/nav-links";
import * as sty from "./nav-hub.css";


export function NavItem(
  { link, onClick, active }:
  { link: NavLink; onClick?: (e: MouseEvent) => void; active?: boolean; }
) {
  const isSection = !!link.section;

  const inner = <>
    {link.iconName && (
      <span className={sty.itemIcon}>
        <Icon name={link.iconName} size="lg" />
      </span>
    )}
    <span className={sty.itemLabel}>{link.text}</span>
    <span className={sty.itemArrow}>
      <Icon name={isSection ? "arrow-down" : "arrow-up-right"} size="sm" />
    </span>
  </>;

  return isSection ? (
    <Link
      href={link.href ?? "/"}
      className={sty.item}
      onClick={onClick}
      aria-current={active ? "true" : undefined}
    >
      {inner}
    </Link>
  ) : (
    <a
      className={sty.item}
      href={link.href}
      target={link.target ?? undefined}
      download={link.download ?? undefined}
      onClick={onClick}
      aria-current={active ? "true" : undefined}
    >
      {inner}
    </a>
  );
}


const PANEL_ID = "header-connect-panel";

export function NavHub() {
  const wrapRef = useRef<HTMLDivElement>(null);

  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const pathname = usePathname();
  const { open, openDrawer, hubOpen, setHubOpen } = useDrawer();

  useEffect(() => {
    setHubOpen(false);
  }, [pathname, setHubOpen]);

  useEffect(() => {
    if (!hubOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) {
        setHubOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setHubOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [hubOpen, setHubOpen]);

  const handleLinkClick = (link: NavLink) => (e: MouseEvent) => {
    setHubOpen(false);

    // Drawer items (Work / Contact) open the sidebar in place, no navigation.
    if (link.drawer) {
      e.preventDefault();
      openDrawer(link.drawer);
      return;
    }

    if (!link?.section) return;

    const id = link.href?.split("#")[1];
    if (id && pathname === "/") {
      e.preventDefault();
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    // Off home, let the client <Link> navigate to "/#id"
  };

  return (
    <div
      ref={wrapRef}
      className={sty.posflex}
      data-nav-hub
    >
      <IconButton
        variant="pill"
        className={[sty.pillIcon, hubOpen && sty.pillIconOpen].filter(Boolean).join(" ")}
        onClick={() => setHubOpen(!hubOpen)}
        aria-expanded={hubOpen}
        aria-controls={PANEL_ID}
        alt={hubOpen ? "Close menu" : "Open menu"}
      >
        <MorphIcon
          active={hubOpen}
          from={<Icon name="list" size="lg" />}
          to={<Icon name="times" size="lg" />}
        />
      </IconButton>

      <div
        id={PANEL_ID}
        inert={!hubOpen}
        className={sty.panel}
        data-open={hubOpen || undefined}
      >
        {Object.entries(MENU_LINKS).map(([key, items]) => (
          <Fragment key={key}>
            {items.length === 1 ? (
              <NavItem
                link={LINKS[items[0]]}
                onClick={() => setHubOpen(false)}
              />
            ) : (
              <ul className={sty.list}>
                {items.map((item: keyof typeof LINKS, ix: number) => (
                  <li key={ix}>
                    <NavItem
                      link={LINKS[item]}
                      onClick={handleLinkClick(LINKS[item])}
                      active={!!LINKS[item].drawer && open === LINKS[item].drawer}
                    />
                  </li>
                ))}
              </ul>
            )}
            <hr className={sty.divider} />
          </Fragment>
        ))}

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
      </div>
    </div>
  );
}

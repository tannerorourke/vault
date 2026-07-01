'use client';

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Link } from "next-view-transitions";

import { useDrawer } from "@/components/providers/DrawerProvider";
import { Icon, IconButton, IconLink } from "@/components/ui/Icon";
import MorphIcon from "@/components/ui/MorphIcon";
import TextLink from "@/components/ui/TextLink";

import Popover from "@/components/navigation/Popover";
import SideDrawer from "@/components/navigation/SideDrawer";
import BottomDrawer from "@/components/navigation/BottomDrawer";
import ThemeToggle from "@/components/navigation/ThemeToggle";

import { type IconName } from "@/components/icons/registry";
import { LINKS } from "@/content/nav-links";
import * as sty from "./header.css";


/** One row inside the mobile menu popover. */
function MenuItem({
  label, iconName, active, nextHref, onClick,
}: {
  label: string;
  iconName: IconName;
  active?: boolean;
  nextHref?: string;
  onClick?: () => void;
}) {
  const inner = (
    <>
      <span className={sty.menuItemIcon}>
        <Icon name={iconName} size="lg" />
      </span>
      <span className={sty.menuItemLabel}>{label}</span>
      {active && <span className={sty.dot} aria-hidden />}
    </>
  );

  return nextHref ? (
    <Link
      href={nextHref}
      className={sty.menuItem}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
    >
      {inner}
    </Link>
  ) : (
    <button
      type="button"
      className={sty.menuItem}
      onClick={onClick}
      aria-pressed={active}
    >
      {inner}
    </button>
  );
}

/**
 * Global header. Fixed, full-viewport overlay layer (pointer-events
 * pass through the empty middle to the page) carrying:
 *  - a back affordance on project pages (top-left),
 *  - a morphing pill menu on mobile / text links on tablet+ (top-right),
 *  - the Work side drawer + the Contact bottom-drawer (mobile) / popover (tablet+).
 *
 * Nav state is read from DrawerProvider so deep-links (`/work`, `/contact`) and
 * the >=md content-push keep working. The overlay carries `data-cue` so a control
 * that opens a drawer isn't treated as an outside-click that closes it.
 */
export function Header({ work, connect }: { work: ReactNode; connect: ReactNode }) {
  const tbSlotRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const { open, openDrawer, closeDrawer, hubOpen, setHubOpen } = useDrawer();

  const isHome = pathname === "/";
  const isProject = !isHome;

  useEffect(() => {
    const el = tbSlotRef.current;
    if (!el) return;
    const publish = () =>
      document.documentElement.style.setProperty("--header-tb-width", `${el.offsetHeight}px`);
    publish();
    const ro = new ResizeObserver(publish);
    ro.observe(el);
    return () => {
      ro.disconnect();
      document.documentElement.style.removeProperty("--footer-height");
    };
  }, []);

  // Home renders the tablet links over the dark hero panel; recolor them for it.
  const featureLinkProps = {
    className: [sty.featureLink, isHome && sty.onFeatureLink].filter(Boolean).join(" "), // isHome ? sty.onFeatureLink : undefined,
    textProps: isHome
      ? { tone: "onFeature" as const, className: sty.onFeatureLabel }
      : undefined,
  };

  return (
    <>
      <div className={sty.root} data-cue>
        {isProject && (
          <div className={sty.backSlot}>
            <IconLink
              variant="pill"
              alt="Back to start"
              nextProps={{ href: "/" }}
              className={sty.backSlotLink}
            >
              <Icon name="arrow-left" size="lg" />
            </IconLink>
          </div>
        )}

        {/* Mobile: pill -> popover menu */}
        <div className={sty.mobileSlot}>
          <Popover
            open={hubOpen}
            onOpenChange={setHubOpen}
            align="end"
            aria-label="Site menu"
            input={
              <IconButton
                variant="pill"
                className={[sty.pill, hubOpen && sty.pillOpen].filter(Boolean).join(" ")}
                alt={hubOpen ? "Close menu" : "Open menu"}
              >
                <MorphIcon
                  active={hubOpen}
                  from={<Icon name="list" size="lg" />}
                  to={<Icon name="times" size="lg" />}
                />
              </IconButton>
            }
          >
            <ul className={sty.menuList}>
              <li>
                <MenuItem
                  label="Hello" iconName="user" active={isHome}
                  nextHref="/" onClick={() => setHubOpen(false)}
                />
              </li>
              <li>
                <MenuItem
                  label="Work" iconName="code-brackets" active={open === "work"}
                  onClick={() => { setHubOpen(false); openDrawer("work"); }}
                />
              </li>
              <li>
                <MenuItem
                  label="Contact" iconName="envelope" active={open === "contact"}
                  onClick={() => { setHubOpen(false); openDrawer("contact"); }}
                />
              </li>
            </ul>
            <hr className={sty.divider} />
            <ThemeToggle variant="switch" />
          </Popover>
        </div>

        {/* Tablet+: text links + icon toggle */}
        <nav
          ref={tbSlotRef}
          className={`${sty.tabletSlot} ${isHome ? sty.onFeature : sty.tabletChrome}`}
          aria-label="Primary"
        >
          <span className={sty.navItem}>
            {isHome && <span className={sty.dot} aria-hidden />}
            <TextLink
              intent="navigation"
              label="Hello"
              nextProps={{ href: "/", "aria-current": isHome ? "page" : undefined }}
              {...featureLinkProps}
            />
          </span>

          <span className={sty.navItem}>
            {open === "work" && <span className={sty.dot} aria-hidden />}
            <TextLink
              intent="navigation"
              label="Work"
              isActive={open === "work"}
              onClick={() => openDrawer("work")}
              {...featureLinkProps}
            />
          </span>

          <span className={sty.navItem}>
            {open === "contact" && <span className={sty.dot} aria-hidden />}
            <Popover
              open={open === "contact"}
              onOpenChange={(v) => (v ? openDrawer("contact") : closeDrawer())}
              align="end"
              aria-label={LINKS.contact.text ?? "Reach out"}
              input={
                <TextLink
                  intent="navigation"
                  label="Contact"
                  isActive={open === "contact"}
                  {...featureLinkProps}
                />
              }
            >
              {connect}
            </Popover>
          </span>

          <ThemeToggle
            variant="icon"
            className={[sty.tabletToggle, isHome && sty.onFeatureToggle]
              .filter(Boolean)
              .join(" ")}
          />
        </nav>
      </div>

      {/* Work: side drawer, every breakpoint */}
      <SideDrawer
        open={open === "work"}
        onClose={closeDrawer}
        title={LINKS.mywork.text ?? "My Work"}
        side="right"
      >
        {work}
      </SideDrawer>

      {/* Contact: bottom sheet on mobile only (hidden >= sm; the tablet popover takes over) */}
      <div className={sty.bottomDrawerSlot}>
        <BottomDrawer
          open={open === "contact"}
          onClose={closeDrawer}
          title={LINKS.contact.text ?? "Reach out"}
        >
          {connect}
        </BottomDrawer>
      </div>
    </>
  );
}

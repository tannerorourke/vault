'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useAppContext } from "@/components/navigation/AppProvider";
import { NavFilter } from "@/lib/types/nav";

import Link from "next/link";
import TextLink from "@/components/ui/TextLink";
import Text from "@/components/ui/Text";

import { NAV_FILTERS } from "@/content/nav-links";
import * as sty from "./header.css";


type HeaderProps = {
  enableClickAnimation?: boolean;
};

export function Header({
  enableClickAnimation = true,
}: HeaderProps) {
  const { pathname, activeFilters, setActiveFilters } = useAppContext()
  const router = useRouter();

  /** Logo: Go home, or reset filters */
  const onLogoClick = () => {
    if (pathname === "/") {
      setActiveFilters([]);
      return;
    }
    router.push("/");
  }

  const isHome = pathname === "/";
  const isOnAbout = pathname === "/about";

  const morphLabel =
    activeFilters.length === 1
      ? NAV_FILTERS.find((f) => f.id === activeFilters[0])?.label ?? "Projects"
      : "Projects";
  const morphArrowDir = isOnAbout ? "left" as const : "up" as const;

  /** Filter links: Apply always, conditionally wait for reroute */
  const toggleFilter = (id: NavFilter['id']) => {
    const apply = () =>
      setActiveFilters((current) => current.includes(id) ? current.filter((f) => f !== id) : [...current, id]);
    
    if (pathname === "/") {
      apply();
      return;
    }
    router.push("/");
    setTimeout(apply, 500);
  };

  const onNavShiftWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
    if (!e.shiftKey) return;
    const el = e.currentTarget;
    if (el.scrollWidth <= el.clientWidth) return;
    e.preventDefault();
    el.scrollLeft += e.deltaY;
  };

  useEffect(() => {
    const spans: NodeListOf<HTMLSpanElement> = document.querySelectorAll('[data-logo-span]');

    const handleClick = (e: MouseEvent): void => {
      const target = e.target as HTMLSpanElement | null;
      if (target) target.dataset.active = '';
    };
    const handleAnimationEnd = (e: AnimationEvent): void => {
      const target = e.target as HTMLSpanElement | null;
      if (target) delete target.dataset.active;
    };

    if (enableClickAnimation) {
      spans.forEach((span) => {
        span.addEventListener("click", handleClick);
        span.addEventListener("animationend", handleAnimationEnd);
      });
    }

    return () => {
      spans.forEach((span) => {
        span.removeEventListener("click", handleClick);
        span.removeEventListener("animationend", handleAnimationEnd);
      });
    };
  }, [enableClickAnimation])

  return (
    <header className={`${sty.root}`}>
        <Link prefetch href="/" onNavigate={onLogoClick} className={sty.logoContainer} aria-label="Home">
          <Text as="span" variant={"titleLg"} className={sty.word} id="w2">
            <span data-logo-span id="logo-T">T</span>
            <span data-logo-span>A</span>
            <span data-logo-span>N</span>
            <span data-logo-span id="logo-N2">N</span>
            <span data-logo-span>E</span>
            <span data-logo-span>R</span>
            &nbsp;&nbsp;
          </Text>
          <Text as="span" variant={"titleLg"} className={sty.word} id="w1">
            <br/>
            <span data-logo-span id="logo-O1">O</span>
            <span data-logo-span>'</span>
            <span data-logo-span>R</span>
            <span data-logo-span>O</span>
            <span data-logo-span id="logo-U">U</span>
            <span data-logo-span>R</span>
            <span data-logo-span id="logo-K">K</span>
            <span data-logo-span>E</span>
          </Text>
        </Link>
        <div className={sty.navScrollWrap} onWheel={onNavShiftWheel}>
          <AnimatePresence mode="popLayout" initial={false}>
            {isHome ? (
              <motion.nav
                key="filters"
                className={sty.navFlex}
                aria-label="Filter projects"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                {NAV_FILTERS.map((cf: NavFilter) => (
                  <TextLink
                    key={cf.id}
                    label={cf.label}
                    filterId={cf.id}
                    isActive={activeFilters.includes(cf.id)}
                    notifyOnClick={toggleFilter}
                    textProps={{
                      variant: "bodyLg",
                      tone: "primary",
                      className: sty.navFilters
                    }}
                  />
                ))}
              </motion.nav>
            ) : (
              <motion.div
                key="morph"
                className={sty.navFlex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                <TextLink
                  label={morphLabel}
                  leftArrow={{ dir: morphArrowDir }}
                  nextProps={{ href: "/", prefetch: true }}
                  textProps={{
                    variant: "bodyLg",
                    tone: "primary",
                    className: sty.navFilters
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className={sty.navRight}>
          <AnimatePresence initial={false}>
            {!isOnAbout && (
              <motion.div
                key="about-link"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                <TextLink
                  label="About"
                  rightArrow={{ dir: "right" }}
                  nextProps={{ href: "/about", prefetch: true, className: sty.navProfLink }}
                  textProps={{ variant: "bodyLg", tone: "primary", className: sty.navFilters }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
  )
}

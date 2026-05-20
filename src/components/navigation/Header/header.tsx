'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/components/navigation/AppProvider";
import { NavFilter } from "@/lib/types/nav";

import Link from "next/link";
import TextLink from "@/components/ui/TextLink";
import Text from "@/components/ui/Text";

import { NAV_FILTERS } from "@/content/nav-links";
import * as sty from "./header.css";


type HeaderProps = {
  enableLoadAnimation?: boolean;
  enableClickAnimation?: boolean;
};

export function Header({
  enableLoadAnimation = false,
  enableClickAnimation = true,
}: HeaderProps) {
  const { pathname, activeFilters, setActiveFilters } = useAppContext()
  const router = useRouter();

  /** Logo: Go home, or reset filters */
  const onLogoClick = () => {
    console.log("logo clicked")
    if (pathname === "/") {
      setActiveFilters([]);
      return;
    }
    router.push("/");
  }

  const isOnAbout = pathname === "/about";
  const aboutBtnProps = isOnAbout 
    ? { hrefOp: "back", label: "Back", leftArrow: { dir: "left" as const }, rightArrow: undefined } 
    : { hrefOp: "/about", label: "About", leftArrow: undefined, rightArrow: { dir: "right" as const } };

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

    if (enableLoadAnimation && spans.length > 0) {
      window.setTimeout(() => {
        spans[0].dataset.active = '';
      }, 500);
    }

    return () => {
      spans.forEach((span) => {
        span.removeEventListener("click", handleClick);
        span.removeEventListener("animationend", handleAnimationEnd);
      });
    };
  }, [enableLoadAnimation, enableClickAnimation])

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
          <nav className={sty.navFlex} aria-label="Filter projects">
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
          </nav>
        </div>
        <div className={sty.navRight}>
          <TextLink
            label={aboutBtnProps.label}
            leftArrow={aboutBtnProps.leftArrow}
            rightArrow={aboutBtnProps.rightArrow}
            nextProps={{ href: aboutBtnProps.hrefOp, prefetch: true, className: sty.navProfLink }}
            textProps={{ variant: "bodyLg", tone: "primary", className: sty.navFilters }}
            aria-current={isOnAbout ? "page" : undefined}
          />
        </div>
      </header>
  )
}

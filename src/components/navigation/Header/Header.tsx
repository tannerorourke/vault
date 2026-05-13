'use client'

import "./logo.css";
import { useEffect } from "react";
import Link from "next/link";

import * as sty from "./Header.css";
import TextLink from "src/components/ui/TextLink";

import { NAV_FILTERS } from "@/content/nav-links";
import { IFilter } from "src/lib/types/global";
import { useProjectFilter } from "../AppProvider/app-provider";
import Text from "@/components/ui/Text";



type HeaderProps = {
  enableLoadAnimation?: boolean;
  enableClickAnimation?: boolean;
};

export function Header({
  enableLoadAnimation = false,
  enableClickAnimation = true,
}: HeaderProps) {
  const { activeFilters, setActiveFilters } = useProjectFilter();

  const toggleFilter = (id: IFilter['id']) => {
    setActiveFilters((current) =>
      current.includes(id) ? current.filter((f) => f !== id) : [...current, id]
    );
  };

  const onShiftWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
    if (!e.shiftKey) return;
    const el = e.currentTarget;
    if (el.scrollWidth <= el.clientWidth) return;
    e.preventDefault();
    el.scrollLeft += e.deltaY;
  };

  useEffect(() => {
    const spans: NodeListOf<HTMLSpanElement> = document.querySelectorAll('.word span');

    const handleClick = (e: MouseEvent): void => {
      const target = e.target as HTMLSpanElement | null;
      target?.classList.add("active");
    };
    const handleAnimationEnd = (e: AnimationEvent): void => {
      const target = e.target as HTMLSpanElement | null;
      target?.classList.remove("active");
    };

    if (enableClickAnimation) {
      spans.forEach((span) => {
        span.addEventListener("click", handleClick);
        span.addEventListener("animationend", handleAnimationEnd);
      });
    }

    if (enableLoadAnimation) {
      spans.forEach((span, index) => {
        window.setTimeout(() => {
          span.classList.add("active");
        }, 500 * (index + 1));
      });
    }

    return () => {
      spans.forEach((span) => {
        span.removeEventListener("click", handleClick);
        span.removeEventListener("animationend", handleAnimationEnd);
      });
    };
  }, [enableLoadAnimation, enableClickAnimation])

  return (
    <header className={sty.root}>
        <Link href="/" prefetch className={sty.logoContainer} aria-label="Home">
          <Text as="span" variant={"titleLg"} className={"word1"}>
            <span>T</span>
            <span>A</span>
            <span>N</span>
            <span>N</span>
            <span>E</span>
            <span>R</span>
            &nbsp;&nbsp;
          </Text>
          <Text as="span" variant={"titleLg"} className={"word2"}>
            <span>O</span>
            <span>'</span>
            <span>R</span>
            <span>O</span>
            <span>U</span>
            <span>R</span>
            <span>K</span>
            <span>E</span>
          </Text>
        </Link>
        <div className={sty.navScrollWrap} onWheel={onShiftWheel}>
          <nav className={sty.navMain} aria-label="Filter projects">
            {NAV_FILTERS.map((cf: IFilter) => (
              <TextLink
                key={cf.id}
                label={cf.label}
                filterId={cf.id}
                isActive={activeFilters.includes(cf.id)}
                notifyOnClick={toggleFilter}
                textProps={{
                  variant: "bodyLg", 
                  tone: "primary"
                }}
              />
            ))}
          </nav>
        </div>
        <div className={sty.navRight}>
          <TextLink
            label="Profile"
            nextProps={{
              href: "/profile",
              prefetch: true,
            }}
            textProps={{
              variant: "bodyLg", 
              tone: "primary" 
            }}
          />
        </div>
      </header>
  )
}

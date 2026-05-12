'use client'

import "./logo.css";
import { useEffect } from "react";
import Link from "next/link";

import * as sty from "./Header.css";
import TextLink from "src/components/ui/TextLink";
import FilterPill from "@/components/ui/FilterPill";

import { NAV_FILTERS } from "public/content/nav-links";
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
  const { projectFilter, setProjectFilter } = useProjectFilter();

  const toggleFilter = (id: IFilter['id']) => {
    setProjectFilter((current) => (current === id ? "" : id));
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
        <div className={sty.headerLeft}>
          <Link href="/" prefetch className={sty.logoContainer} aria-label="Home">
            {/* <Text as="h1" variant={"titleLg"} className={sty.logoWord}>
              Tanner<br/>O'Rourke
            </Text> */}
            <Text as="span" variant={"titleLg"} className={"word"}>
              <span>T</span>
              <span>A</span>
              <span>N</span>
              <span>N</span>
              <span>E</span>
              <span>R</span><br/>
              <span>O'</span>
              <span>R</span>
              <span>O</span>
              <span>U</span>
              <span>R</span>
              <span>K</span>
              <span>E</span>
            </Text>
          </Link>
          <nav className={sty.filterRow} aria-label="Filter projects">
            {NAV_FILTERS.map((cf: IFilter) => (
              <FilterPill
                key={cf.id}
                label={cf.label}
                filterId={cf.id}
                isActive={projectFilter === cf.id}
                notifyOnClick={toggleFilter}
              />
            ))}
          </nav>
        </div>
        <div className={sty.headerRight}>
          <TextLink
            className={sty.profileLinkStyles}
            label="Profile"
            nextProps={{
              href: "/profile",
              prefetch: true
            }}
            textProps={{ variant: "ui" }}
          />
        </div>
      </header>
  )
}
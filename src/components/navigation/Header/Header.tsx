'use client'

import "./logo.css";
import { useEffect } from "react";
import Link from "next/link";

import * as sty from "./Header.css";
import TextLink from "src/components/ui/TextLink";

import { NAV_FILTERS } from "src/content/nav-links";
import { IFilter } from "src/lib/types/global";
import { useProjectFilter } from "../AppProvider/app-provider";
import Text from "@/components/ui/Text";



type HeaderProps = {
  
};

export function Header({}: HeaderProps) {
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

    spans.forEach((span, index) => {
      span.addEventListener("click", handleClick);
      span.addEventListener("animationend", handleAnimationEnd);

      // Initial staggered animation
      window.setTimeout(() => {
        span.classList.add("active");
      }, 750 * (index + 1));
    });

    return () => {
      spans.forEach((span) => {
        span.removeEventListener("click", handleClick);
        span.removeEventListener("animationend", handleAnimationEnd);
      });
    };
    
  }, [])

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
          {
            NAV_FILTERS.map((cf: IFilter) => (
              <TextLink
                className={sty.linkStyles}
                key={cf.id}
                label={cf.label}
                textProps={{
                  variant: "body",
                }}
                filterId={cf.id}
                isActive={projectFilter === cf.id}
                notifyOnClick={toggleFilter}
              />
            ))
          }
        </div>
        <div className={sty.headerRight}>
          <TextLink
            className={sty.profileLinkStyles}
            label="Profile"
            nextProps={{
              href: "/profile",
              prefetch: true
            }}
          />
        </div>
      </header>
  )
}
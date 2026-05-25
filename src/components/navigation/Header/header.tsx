'use client'

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useAppContext } from "@/components/navigation/AppProvider";
import { IconName } from "@/components/icons/registry";

import Link from "next/link";
import TextLink from "@/components/ui/TextLink";
import Text from "@/components/ui/Text";
import ConnectMenu from "./ConnectMenu";

import * as sty from "./header.css";


type HeaderProps = {
  enableClickAnimation?: boolean;
};

export function Header({
  enableClickAnimation = true,
}: HeaderProps) {
  const { pathname } = useAppContext();
  
  // Logo
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
  }, [enableClickAnimation]);

  // Nav item
  const navProps = pathname === "/about"
    ? { key: "back", label: "Back", href: "back", icon: "arrow-left" as IconName }
    : { key: "about", label:"About", href: "/about", icon: "user" as IconName };

  return (
    <header className={sty.root}>
      <motion.div
        key="header"
        initial={{ opacity: 0.5 }} animate={{ opacity: 1 }}
        // transition={{ duration: 0.18, ease: "easeOut", delay: 0 }}
        className={sty.container}
      >
        <Link prefetch href="/" className={sty.logoContainer} aria-label="Home">
          <Text as="span" variant={"titleLg"} className={sty.word} id="w2">
            <span data-logo-span id="logo-T">T</span>
            <span>A</span>
            <span>N</span>
            <span data-logo-span id="logo-N2">N</span>
            <span>E</span>
            <span>R</span>
            &nbsp;&nbsp;
          </Text>
          <Text as="span" variant={"titleLg"} className={sty.word} id="w1">
            <br/>
            <span data-logo-span id='logo-O1'>O</span>
            <span>'</span>
            <span>R</span>
            <span>O</span>
            <span data-logo-span id="logo-U">U</span>
            <span>R</span>
            <span data-logo-span id="logo-K">K</span>
            <span>E</span>
          </Text>
        </Link>
        <div className={sty.navRight}>
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              key={navProps.key}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1,
                transition: { duration: 0.2, delay: 0.1, ease: "easeIn" },
              }}
              exit={{ 
                opacity: 0,
                transition: { duration: 0.15, ease: "easeOut" },
              }}
            >
              <TextLink
                label={navProps.label}
                leftIcon={{ icon: navProps.icon, hold: true, props: { height: 20, width: 20 } }}
                nextProps={{ href: navProps.href, prefetch: true, className: sty.aboutLink }}
                textProps={{ variant: "bodyLg", tone: "primary", className: sty.aboutText }}
              />
            </motion.div>
          </AnimatePresence>
          <ConnectMenu />
        </div>
      </motion.div>
    </header>
  )
}

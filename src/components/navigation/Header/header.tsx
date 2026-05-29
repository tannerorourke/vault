'use client'

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Link, useTransitionRouter } from "next-view-transitions";
import { useAppContext } from "@/components/navigation/AppProvider";

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
  const { pathname, hasAppHistory } = useAppContext();
  const router = useTransitionRouter();

  const isAbout = pathname === "/about";
  const handleBack = () => {
    if (hasAppHistory) router.back();
    else router.push("/");
  };
  
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
            <span>&apos;</span>
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
              key={isAbout ? "back" : "about"}
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
              {isAbout ? (
                <TextLink
                  intent="navigation"
                  label="Back"
                  leftIcon={{ name: "arrow-left", hold: true }}
                  onClick={handleBack}
                  className={sty.aboutLink}
                  textProps={{ variant: "bodyLg", tone: "primary", className: sty.aboutText }}
                />
              ) : (
                <TextLink
                  intent="navigation"
                  label="About"
                  leftIcon={{ name: "user", hold: true }}
                  nextProps={{ href: "/about", prefetch: true, className: sty.aboutLink }}
                  textProps={{ variant: "bodyLg", tone: "primary", className: sty.aboutText }}
                />
              )}
            </motion.div>
          </AnimatePresence>
          <ConnectMenu />
        </div>
      </motion.div>
    </header>
  )
}

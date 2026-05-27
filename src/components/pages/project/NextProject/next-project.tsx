"use client";

import { useEffect, useMemo } from "react";
import { useAppContext } from "@/components/navigation/AppProvider";

import { Link } from "next-view-transitions";
import Markdown from "@/components/ui/Markdown";

import { PROJECTS } from "@/lib/content/projects";
import * as sty from "./next-project.css";
import * as PjSty from "../project-page.css";

export function NextProjectFooter({ currentPid }: { currentPid: string }) {
  const { viewedProjects, markProjectViewed } = useAppContext();

  useEffect(() => {
    const setNext = () => {
      const el = document.getElementById(currentPid);
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const scrolled = -rect.top;
      if (scrolled < rect.height / 2) return;

      markProjectViewed(currentPid);
      console.log("user completed viewing ", currentPid);
    }
    window.addEventListener("scroll", setNext)
    return () => window.removeEventListener("scroll", setNext)
  })

  const next = useMemo(() => {
    const unviewed = 
      PROJECTS.find((p) => p.pid !== currentPid && !viewedProjects.has(p.pid));

    if (unviewed) return unviewed;
    return null; // user has viewed all projects 
  }, [currentPid, viewedProjects]);

  const linkProps = !next 
    ? { href: "/", title: "Home", ariaLabel: "Return to home" } 
    : { href: `/${next.pid}`, title: next.title, ariaLabel: `Next project: ${next.title}` }

  return (
    <Link href={linkProps.href} className={sty.root} aria-label={linkProps.ariaLabel}>
      {next && 
        <div className={PjSty.eyebrow}>Next Project</div>}
      <h2 className={PjSty.title}>
        <Markdown value={linkProps.title} inline />
      </h2>
      {next !== null && (next?.eyebrow || next?.year) && (
        <div className={PjSty.eyebrow}>
          {next.eyebrow && <span>{next.eyebrow}</span>}
          {next.eyebrow && next.year && <span className={PjSty.eyebrowDot} aria-hidden />}
          {next.year && <span className={PjSty.eyebrowYear}>{next.year}</span>}
        </div>
      )}
    </Link>
  );
}

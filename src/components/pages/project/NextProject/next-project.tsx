"use client";

import { useMemo } from "react";
import { useAppContext } from "@/components/navigation/AppProvider";

import { Link } from "next-view-transitions";
import Eyebrow from "@/components/ui/Eyebrow";
import Markdown from "@/components/ui/Markdown";

import { PROJECTS } from "@/lib/content/projects";
import * as sty from "./next-project.css";
import * as PjSty from "../project-page.css";

export function NextProjectFooter({ currentPid }: { currentPid: string }) {
  const { viewedProjects } = useAppContext();

  const next = useMemo(() => {
    const unviewed = PROJECTS.find((p) =>
      p.pid !== currentPid && !viewedProjects.has(p.pid));

    if (unviewed) return unviewed;
    return null; // user has viewed all projects 
  }, [currentPid, viewedProjects]);

  const linkProps = !next 
    ? { href: "/", title: "Home", ariaLabel: "Return to home" } 
    : { href: `/${next.pid}`, title: next.title, ariaLabel: `Next project: ${next.title}` }

  return (
    <Link href={linkProps.href} className={sty.root} aria-label={linkProps.ariaLabel}>
      {next && 
        <Eyebrow 
          className={[PjSty.eyebrow, sty.eyebrowBox].join(" ")} 
          aria-hidden
        >Next Project</Eyebrow>
      }

      <Markdown 
        textProps={{ as: 'h3', variant: 'display', className: PjSty.title }}
        value={linkProps.title}
      />

      {next !== null && next?.eyebrow &&
        <Eyebrow as="span" className={[PjSty.eyebrow, sty.eyebrowGutter].join(" ")}>{next?.eyebrow}</Eyebrow>
      }
    </Link>
  );
}

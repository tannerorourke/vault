"use client";

import { useMemo } from "react";
import { useAppContext } from "@/components/navigation/AppProvider";

import { Link } from "next-view-transitions";
import Eyebrow from "@/components/ui/Eyebrow";
import Markdown from "@/components/ui/Markdown";

import { PROJECTS } from "@/lib/content/projects";
import { PROJECT_FOOTER } from "@/content/nav-links";
import * as sty from "./footer.css";
import * as PjSty from "../project-page.css";
import { par } from "@/lib/styles/common.css";


export function Footer({ currentPid }: { currentPid: string }) {
  const { viewedProjects } = useAppContext();

  const next = useMemo(() => {
    for (const p of PROJECTS) {
      if (p.pid === currentPid) continue;
      if (viewedProjects.has(p.pid)) continue;
      return p;
    }
    // All projects viewed. AppProvider resets viewed set on home navigation
    return null;
  }, [currentPid, viewedProjects]);

  const linkProps = next === null
    ? { eyebrow: "Thanks for reading! Email me with any questions or feedback :)", 
        title: "Home", href: "/", ariaLabel: "Return to home", 
      }
    : { eyebrow: next.category === "experience" ? "Next" : "Next Project",
        title: next.title, href: `/${next.pid}`, ariaLabel: `Next project: ${next.title}`
      }

  return (
    <div className={sty.root}>
      <div className={sty.note}>
        <Markdown
          textProps={{ as: 'p', variant: 'bodyLg', className: par }}
          value={PROJECT_FOOTER}
        />
      </div>
      <Link 
        href={linkProps.href} 
        className={sty.nextProjLink}
        aria-label={linkProps.ariaLabel}
      >
        <Eyebrow 
          className={[PjSty.eyebrow, sty.eyebrowBox].join(" ")}
          aria-hidden
        >
          {linkProps.eyebrow}
        </Eyebrow>
        <Markdown 
          textProps={{ as: 'h3', variant: 'titleLg', className: PjSty.title }}
          value={linkProps.title}
        />
        {next && next?.eyebrow &&
          <Eyebrow
            as="span" 
            className={[PjSty.eyebrow, sty.eyebrowGutter].join(" ")}
          >
            {next?.eyebrow}
          </Eyebrow>
        }
      </Link>
    </div>
  );
}

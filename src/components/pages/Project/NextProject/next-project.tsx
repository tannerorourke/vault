"use client";

import { useMemo, type ReactNode } from "react";
import { useAppContext } from "@/components/providers/AppProvider";

import { Link } from "next-view-transitions";
import Eyebrow from "@/components/ui/Eyebrow";
import Text from "@/components/ui/Text";

import * as sty from "./next-project.css";
import * as PjSty from "../project-page.css";

export function NextProjectFooter(
  { currentPid, pids, titleNodes }:
  { currentPid: string; 
    pids: Record<string, { title: string; subtitle: string; eyebrow: string }>;
    titleNodes: Record<string, ReactNode> }
) {
  const { viewedProjects } = useAppContext();

  const nextPid = useMemo(() => {
    for (const pid of Object.keys(pids)) {
      if (pid === currentPid) continue;
      if (viewedProjects.has(pid)) continue;
      return pid;
    }
    // All projects viewed. AppProvider resets viewed set on home navigation
    return null;
  }, [currentPid, pids, viewedProjects]);

  const linkProps = nextPid === null
    ? { eyebrow: "Wow, you've read it all - thank you! Email me with any questions or feedback :)",
        href: "/",
        ariaLabel: "Return to home",
      }
    : { eyebrow: "Keep reading",
        href: `/${nextPid}`,
        ariaLabel: `Next project: ${pids[nextPid].title}`
      }

  return (
    <footer className={sty.footer}>
      <Link href={linkProps.href} className={sty.footLink} aria-label={linkProps.ariaLabel}>
        <Eyebrow className={[PjSty.eyebrow, sty.eyebrowBox].join(" ")} aria-hidden>
          {linkProps.eyebrow}
        </Eyebrow>
        {nextPid
          ? titleNodes[nextPid]
          : <Text as="h3" variant="display" className={PjSty.title}>Home</Text>}
      </Link>
    </footer>
  );
}

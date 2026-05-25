"use client";

import { useEffect, useState } from "react";
import * as sty from "./toc.css";

export type TocSection = { id: string; title: string };

export function ProjectToc({ sections }: { sections: TocSection[] }) {
  const [activeId, setActiveId] = useState<string | null>(
    sections[0]?.id ?? null
  );

  useEffect(() => {
    if (sections.length === 0) return;

    const targets = sections
      .map((s) => document.getElementById(`section-${s.id}`))
      .filter((el): el is HTMLElement => el !== null);

    if (targets.length === 0) return;

    const visible = new Map<string, IntersectionObserverEntry>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry);
          } else {
            visible.delete(entry.target.id);
          }
        }

        if (visible.size === 0) return;

        let topId: string | null = null;
        let topY = Infinity;
        for (const entry of visible.values()) {
          const y = entry.boundingClientRect.top;
          if (y < topY) {
            topY = y;
            topId = entry.target.id;
          }
        }

        if (topId) {
          setActiveId(topId.replace(/^section-/, ""));
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 }
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [sections]);

  if (sections.length === 0) return null;

  return (
    <nav aria-label="Sections" className={sty.tocNav}>
      <div className={sty.tocLabel}>Contents</div>
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#section-${s.id}`}
          className={sty.tocLink}
          data-active={s.id === activeId ? "true" : "false"}
        >
          {s.title}
        </a>
      ))}
    </nav>
  );
}

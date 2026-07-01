"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Eyebrow from "@/components/ui/Eyebrow";
import Icon from "@/components/ui/Icon";
import * as sty from "./toc.css";


export type TocSection = { id: string; title: ReactNode };

export function ProjectToc({ sections }: { sections: TocSection[] }) {
  const [activeId, setActiveId] = useState<string | null>(sections[0]?.id ?? null);
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

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

  return (
    <div className={sty.tocPos}>
      <nav ref={navRef} aria-label="Sections" className={sty.nav}>
        <button
          type="button"
          className={sty.trigger}
          aria-expanded={open}
          aria-controls="project-toc-list"
          onClick={() => setOpen((o) => !o)}
        >
          <div className={sty.triggerLeft}>
            <Eyebrow as="span" className={sty.contents}>Contents</Eyebrow>
            <span className={sty.sectionCount}>{sections.length} sections</span>
          </div>
          <Icon name="caret-circle-down" size="lg" className={sty.triggerIcon} />
        </button>
        <div
          id="project-toc-list"
          className={sty.body}
          data-open={open ? "true" : "false"}
        >
          <ul className={sty.list}>
            {sections.map((s) => (
              <li 
                key={s.id} 
                className={sty.item} 
                data-active={s.id === activeId ? "true" : "false"}
              >
                <a
                  key={s.id}
                  href={`#section-${s.id}`}
                  className={sty.link}
                  aria-current={s.id === activeId ? "location" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
}

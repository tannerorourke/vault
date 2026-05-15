"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import type { ProjectContent } from "@/lib/types/project-content";

import Link from "next/link";
import TagChip from "@/components/ui/TagChip";
import { CaretCircleDown } from "@/content/icons/caret-circle-down";

import * as sty from "./project-card.css";


export type ProjectCardProps = {
  project: ProjectContent;
  eyebrow: string;
  year: string;
  isFeature?: boolean;
};

const MAX_VISIBLE_TAG_CHARS = 28;

function getVisibleTags(tags: ProjectContent["tags"]) {
  if (!tags || tags.length === 0) return { visible: [], overflow: 0 };
  let total = 0;
  let cutoff = tags.length;
  for (let i = 0; i < tags.length; i++) {
    total += tags[i].label.length + 2;
    if (total > MAX_VISIBLE_TAG_CHARS && i > 0) {
      cutoff = i;
      break;
    }
  }
  return {
    visible: tags.slice(0, cutoff),
    overflow: tags.length - cutoff,
  };
}

export function ProjectCard({
  project,
  eyebrow,
  year,
  isFeature = false,
}: ProjectCardProps) {
  const { visible: visibleTags, overflow } = getVisibleTags(project.tags);
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [revealed, setRevealed] = useState(false);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (revealed) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(hover: none)").matches
    ) {
      e.preventDefault();
      setRevealed(true);
    }
  };

  useEffect(() => {
    if (!revealed) return;
    const onPointerDown = (e: PointerEvent) => {
      if (cardRef.current &&
        !cardRef.current.contains(e.target as Node)
      ) {
        setRevealed(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [revealed]);

  return (
    <Link
      ref={cardRef}
      href={`/${project.pid}`}
      prefetch
      className={sty.cardBase}
      onClick={handleClick}
      data-feature={isFeature ? "true" : undefined}
      data-revealed={revealed ? "true" : undefined}
    >
      <div className={sty.eyebrow}>
        {isFeature && (
          <span className={sty.featureDot} aria-label="Featured" />
        )}
        <span>{eyebrow}</span>
        <span className={sty.year}>{year}</span>
      </div>

      <div className={sty.swap}>
        <h3 className={sty.title}>{project.title}</h3>
        {project.summary && (
          <p className={sty.summary}>{project.summary}</p>
        )}
      </div>

      <div className={sty.reveal}>
        {visibleTags.length > 0 && (
          <div className={sty.tagsRow}>
            {visibleTags.map((t, i) => (
              <TagChip key={i} label={t.label} color={t.color} />
            ))}
            {overflow > 0 && (
              <TagChip color="grey" label={`+${overflow}`} />
            )}
          </div>
        )}
        
        <span className={sty.cta}>
          <CaretCircleDown />
        </span>
      </div>
    </Link>
  );
}

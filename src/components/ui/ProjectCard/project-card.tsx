"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import type { ProjectContent } from "@/lib/types/project-content";
import TagChip from "@/components/ui/TagChip";
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

function ArrowDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M9.364.765c-.037 5.419-.078 10.936-.12 16.553a398914.9 398914.9 0 0 0-6.454-6.361c-.385-.312-.802-.221-1.067.035c-.248.24-.353.7.007 1.09c2.368 2.326 4.975 4.892 7.82 7.697a.794.794 0 0 0 .554.222a.745.745 0 0 0 .539-.222c2.726-2.75 5.287-5.335 7.683-7.755a.754.754 0 0 0-.055-1.032c-.371-.374-.885-.229-1.093 0a3545.93 3545.93 0 0 1-6.386 6.437c.041-5.609.08-11.163.117-16.664c0-.26-.212-.765-.767-.765s-.778.469-.778.765Z"
        clipRule="evenodd"
      />
    </svg>
  );
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
      if (
        cardRef.current &&
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
          <ArrowDownIcon className={sty.ctaIcon} />
        </span>
      </div>
    </Link>
  );
}

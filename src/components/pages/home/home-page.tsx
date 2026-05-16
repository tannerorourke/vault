"use client";

import { useMemo, useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { useProjectFilter } from "@/components/navigation/AppProvider";
import type { ProjectContent, ProjectFilterId } from "@/lib/types/project-content";

import ProjectCard from "@/components/ui/ProjectCard";

import { NAV_FILTERS } from "@/content/nav-links";
import * as sty from "./home-page.css";

const MIN_CARD_WIDTH = 220;

const TRACK_MIN = 220;
const TRACK_MAX = 400;

const FILTER_LABELS: Record<string, string> = NAV_FILTERS.reduce(
  (acc, f) => ({ ...acc, [f.id]: f.label }),
  {} as Record<string, string>
);

function projectEyebrow(p: ProjectContent): string {
  if (p.eyebrow) return p.eyebrow;
  return p.tags?.[0]?.label ?? FILTER_LABELS[p.filterIds[0] ?? ""] ?? "";
}

type HomePageProps = {
  projects: ProjectContent[];
};

export function HomePage({ projects }: HomePageProps) {
  const { activeFilters } = useProjectFilter();
  const gridRef = useRef<HTMLDivElement>(null);
  const [cols, setCols] = useState<number | null>(null);
  const [gap, setGap] = useState(16);

  const visibleProjects = useMemo<ProjectContent[]>( () => (
    activeFilters.length > 0
      ? projects.filter((p) =>
          activeFilters.some((f) => p.filterIds.includes(f as ProjectFilterId))
        )
      : projects
  ),[projects, activeFilters]);

  // col resizing logic
  useEffect(() => {
    if (!gridRef.current) 
      return;

    const el = gridRef.current;
    const recompute = () => {
      const w = el.offsetWidth;
      const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
      const cardWidthAt = (n: number) => (w - (n - 1) * gap) / n;

      setCols((c) => (
        cardWidthAt(c) < TRACK_MIN ? Math.max(1, c - 1) :
        cardWidthAt(c + 1) >= TRACK_MIN ? c + 1 :
        c
      ));
      setGap(gap);
    }

    const ro = new ResizeObserver(recompute);
    ro.observe(gridRef.current);
    recompute();
    return () => ro.disconnect();
  }, []);

  return (
    <main className={sty.root}>
      <LayoutGroup>
        <div 
          ref={gridRef} 
          className={sty.grid}
          style={cols !== null ? { 
            gridTemplateColumns: `repeat(${cols}, minmax(${TRACK_MIN}px, 1fr))`,
            // maxWidth: `${cols*TRACK_MAX + (cols-1)*gap+10}px`,
          } : { visibility: 'hidden' }}
        >
          {cols !== null && (
            <AnimatePresence mode="popLayout">
              {visibleProjects.map((p) => (
                <motion.div
                  key={p.pid}
                  layout
                  initial={{ opacity: 0.5, scale: 0.96,  }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ 
                    layout: { duration: 0.4, ease: [0.2, 0.1, 0.2, 1] } ,
                    default: { duration: 0.25 },
                  }}
                >
                  <ProjectCard
                    key={p.pid}
                    project={p}
                    eyebrow={projectEyebrow(p)}
                    year={p.year ?? ""}
                    isFeature={p.isFeature}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </LayoutGroup>
    </main>
  );
}

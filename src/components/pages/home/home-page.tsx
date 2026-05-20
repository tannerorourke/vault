"use client";

import { useMemo } from "react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { useAppContext } from "@/components/navigation/AppProvider";
import type { ProjectContent, ProjectFilterId } from "@/lib/types/project-content";

import ProjectCard from "@/components/pages/home/ProjectCard";
// import Footer from "@/components/navigation/Footer";

import { NAV_FILTERS } from "@/content/nav-links";
import * as sty from "./home-page.css";


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
  const { activeFilters } = useAppContext();

  const visibleProjects = useMemo<ProjectContent[]>( () => (
    activeFilters.length > 0
      ? projects.filter((p) =>
          activeFilters.some((f) => p.filterIds.includes(f as ProjectFilterId))
        )
      : projects
  ),[projects, activeFilters]);

  return (
    <main className={sty.root}>
      <LayoutGroup>
        <div className={sty.grid}>
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((p) => (
              <motion.div
                key={p.pid}
                layout
                initial={{ opacity: 0.5, scale: 0.96,  }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ 
                  layout: { duration: 0.4, ease: [0.2, 0.1, 0.2, 1] },
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
        </div>
      </LayoutGroup>
    </main>
  );
}

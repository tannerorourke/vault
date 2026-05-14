"use client";

import { useMemo } from "react";
import * as sty from "./ProjectsGrid.css";

import { useProjectFilter } from "@/components/navigation/AppProvider/app-provider";
import { NAV_FILTERS } from "src/content/nav-links";
import type { ProjectContent, ProjectFilterId } from "@/lib/types/project-content";
import ProjectCard from "@/components/ui/ProjectCard";

const FILTER_LABELS: Record<string, string> = NAV_FILTERS.reduce(
  (acc, f) => ({ ...acc, [f.id]: f.label }),
  {} as Record<string, string>
);

function projectEyebrow(p: ProjectContent): string {
  if (p.eyebrow) return p.eyebrow;
  return p.tags?.[0]?.label ?? FILTER_LABELS[p.filterIds[0] ?? ""] ?? "";
}

type ProjectsGridProps = {
  projects: ProjectContent[];
};

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const { activeFilters } = useProjectFilter();

  const visibleProjects = useMemo<ProjectContent[]>(
    () =>
      activeFilters.length > 0
        ? projects.filter((p) =>
            activeFilters.some((f) => p.filterIds.includes(f as ProjectFilterId))
          )
        : projects,
    [projects, activeFilters]
  );

  return (
    <main className={sty.section}>
      <div className={sty.grid}>
        {visibleProjects.map((p) => (
          <ProjectCard
            key={p.pid}
            project={p}
            eyebrow={projectEyebrow(p)}
            year={p.year ?? ""}
            isFeature={p.isFeature}
          />
        ))}
      </div>
    </main>
  );
}

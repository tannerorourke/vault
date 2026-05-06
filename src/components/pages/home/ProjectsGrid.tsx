"use client";

import { useMemo } from "react";
import * as sty from "./ProjectsGrid.css";

import { useProjectFilter } from "@/components/navigation/AppProvider/app-provider";
import { NAV_FILTERS } from "@/content/nav-links";
import type { ProjectContent, ProjectFilterId } from "@/lib/types/project-content";
import ProjectCard, { type ProjectCardVariant } from "@/components/ui/ProjectCard";

const FILTER_LABELS: Record<string, string> = NAV_FILTERS.reduce(
  (acc, f) => ({ ...acc, [f.id]: f.label }),
  {} as Record<string, string>
);

function projectEyebrow(p: ProjectContent): string {
  if (p.eyebrow) return p.eyebrow;
  const lead =
    p.tags?.[0]?.label ?? FILTER_LABELS[p.filterIds[0] ?? ""] ?? "";
  return lead ? `${lead} · ${p.year}` : p.year;
}

function projectVariant(p: ProjectContent): ProjectCardVariant {
  if (p.isFeature) return "feature";
  if (!p.cardImage && !p.heroImage) return "minimal";
  return "default";
}

type ProjectsGridProps = {
  projects: ProjectContent[];
};

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const { projectFilter } = useProjectFilter();

  const visibleProjects = useMemo<ProjectContent[]>(
    () =>
      projectFilter
        ? projects.filter((p) =>
            p.filterIds.includes(projectFilter as ProjectFilterId)
          )
        : projects,
    [projects, projectFilter]
  );

  const count = visibleProjects.length;

  return (
    <section className={sty.section}>
      {/* <header className={sty.sectionHeader}>
        <h2 className={sty.sectionTitle}>Projects</h2>
        <span className={sty.sectionCount}>
          {count} project{count !== 1 ? "s" : ""}
        </span>
      </header> */}

      <div className={sty.grid}>
        {visibleProjects.map((p) => (
          <ProjectCard
            key={p.pid}
            project={p}
            eyebrow={projectEyebrow(p)}
            variant={projectVariant(p)}
          />
        ))}
      </div>
    </section>
  );
}

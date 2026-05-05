"use client";

import { useMemo } from "react";
import * as sty from "./ProjectsGrid.css";

import { useProjectFilter } from "@/components/navigation/AppProvider/app-provider";
import { PROJECTS } from "@/content/projects";
import { NAV_FILTERS } from "@/content/nav-links";
import type { IFilter, IProject } from "@/lib/types/global";
import ProjectCard, { type ProjectCardVariant } from "@/components/ui/ProjectCard";

const FILTER_LABELS: Record<string, string> = NAV_FILTERS.reduce(
  (acc, f) => ({ ...acc, [f.id]: f.label }),
  {} as Record<string, string>
);

function projectEyebrow(p: IProject): string {
  const lead =
    p.tags[0]?.label ?? FILTER_LABELS[p.filterIds[0] ?? ""] ?? "";
  return lead ? `${lead} · ${p.year}` : p.year;
}

function projectVariant(p: IProject): ProjectCardVariant {
  if (p.isFeature) return "feature";
  if (!p.imageUrl) return "minimal";
  return "default";
}

type ProjectsGridProps = {};

export function ProjectsGrid({}: ProjectsGridProps) {
  const { projectFilter } = useProjectFilter();

  const visibleProjects = useMemo<IProject[]>(
    () =>
      projectFilter
        ? PROJECTS.filter((p) =>
            p.filterIds.includes(projectFilter as IFilter["id"])
          )
        : PROJECTS,
    [projectFilter]
  );

  const count = visibleProjects.length;

  return (
    <section className={sty.section}>
      <header className={sty.sectionHeader}>
        <h2 className={sty.sectionTitle}>Projects</h2>
        <span className={sty.sectionCount}>
          {count} project{count !== 1 ? "s" : ""}
        </span>
      </header>

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

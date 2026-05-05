"use client";

import { useMemo } from "react";
import Link from "next/link";
import * as sty from "./ProjectsGrid.css";

import { useProjectFilter } from "@/components/navigation/AppProvider/app-provider";
import { PROJECTS } from "@/content/projects";
import { NAV_FILTERS } from "@/content/nav-links";
import type { IFilter, IProject } from "@/lib/types/global";

const FILTER_LABELS: Record<string, string> = NAV_FILTERS.reduce(
  (acc, f) => ({ ...acc, [f.id]: f.label }),
  {} as Record<string, string>
);

function projectEyebrow(p: IProject): string {
  const lead =
    p.tags[0]?.label ?? FILTER_LABELS[p.filterIds[0] ?? ""] ?? "";
  return lead ? `${lead} · ${p.year}` : p.year;
}

function ArrowRightIcon() {
  return (
    <svg
      className={sty.ctaIcon}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M.696 9.349c5.518-.03 11.165-.062 16.942-.096c-2.807-2.81-4.835-4.842-6.084-6.095c-.143-.179-.158-.554.112-.847c.27-.293.752-.281.89-.14c2.362 2.372 4.772 4.782 7.23 7.23a.65.65 0 0 1 .215.503a.645.645 0 0 1-.215.502a8382.495 8382.495 0 0 1-7.6 7.421a.742.742 0 0 1-1.014-.063c-.263-.287-.29-.588.061-.982c2.002-1.96 4.097-4.004 6.287-6.13c-5.713.038-11.321.07-16.824.097a.701.701 0 0 1-.696-.72c0-.507.388-.68.696-.68Z"
        clipRule="evenodd"
      />
    </svg>
  );
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
          <Link
            key={p.pid}
            href={`/work/${p.pid}`}
            prefetch
            className={sty.card}
          >
            {p.imageUrl && (
              <img
                className={sty.cardImage}
                src={p.imageUrl}
                alt={p.title}
              />
            )}
            <div className={sty.cardBody}>
              <span className={sty.eyebrow}>{projectEyebrow(p)}</span>
              <h3 className={sty.cardTitle}>{p.title}</h3>
              <p className={sty.cardDesc}>{p.summaryShort}</p>
            </div>
            <footer className={sty.cardFooter}>
              {p.tags.map((t, i) => (
                <span key={i} className={sty.tag}>
                  {t.label}
                </span>
              ))}
              {p.readTime !== undefined && (
                <span className={sty.cardCta}>
                  {p.readTime} min read
                  <ArrowRightIcon />
                </span>
              )}
            </footer>
          </Link>
        ))}
      </div>
    </section>
  );
}

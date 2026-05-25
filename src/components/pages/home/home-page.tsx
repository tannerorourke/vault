"use client";

import { useMemo } from "react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { useAppContext } from "@/components/navigation/AppProvider";
import { ProjectContent } from "@/components/pages/project";
import { ProjectFilterId } from "@/lib/types/nav";

import ProjectCard from "@/components/pages/home/ProjectCard";
import FeaturedProjectCard from "@/components/pages/home/FeaturedProjectCard";
import Markdown from "@/components/ui/Markdown";

import { HEADER } from "@/content/home";
import * as sty from "./home-page.css";



type HomePageProps = {
  projects: ProjectContent[];
};

export function HomePage({ projects }: HomePageProps) {
  const { activeFilters } = useAppContext();

  const originalFeatured = useMemo<ProjectContent | null>(
    () => projects.find((p) => p.isFeature) ?? null,
    [projects]
  );

  const featuredProject = useMemo<ProjectContent | null>(() => {
    if (activeFilters.length > 0) {
      return (
        projects.find((p) =>
          p.isFeature &&
          activeFilters.some((f) => p.filterIds.includes(f as ProjectFilterId))
        ) ?? null
      );
    }
    return projects.find((p) => p.isFeature) ?? null;
  }, [projects, activeFilters]);

  const gridProjects = useMemo<ProjectContent[]>(() => {
    return projects.filter((p) => {
      if (featuredProject && p.pid === featuredProject.pid) return false;
      if (activeFilters.length === 0) return true;
      return activeFilters.some((f) => p.filterIds.includes(f as ProjectFilterId));
    });
  }, [projects, activeFilters, featuredProject]);

  return (
    <main className={sty.root}>

      <div className={sty.content}>

        <h3 className={sty.header}>
          <Markdown value={HEADER} />
        </h3>

        {!featuredProject && originalFeatured && activeFilters.length > 0 && (
          <div className={sty.featuredHiddenNote}>
            <span className={sty.featureDotInline} />
            <span>
              Featured project hidden by active filter. Clear filters to see{" "}
              <em>{originalFeatured.title}</em>.
            </span>
          </div>
        )}

        <LayoutGroup>
          <div className={sty.gridFeature}>
            <AnimatePresence mode="popLayout">
              {featuredProject && (
                <motion.div
                  key={featuredProject.pid}
                  layout
                  initial={{ opacity: 0.5, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{
                    layout: { duration: 0.4, ease: [0.2, 0.1, 0.2, 1] },
                    default: { duration: 0.25 },
                  }}
                >
                  <FeaturedProjectCard project={featuredProject} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className={sty.grid}>
            <AnimatePresence mode="popLayout">
              {gridProjects.map((p) => (
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
                    eyebrow={p.eyebrow ?? ""}
                    year={p.year ?? ""}
                    isFeature={p.isFeature}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </LayoutGroup>
      </div>
    </main>
  );
}

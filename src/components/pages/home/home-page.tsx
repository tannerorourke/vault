"use client";

import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { ProjectContent } from "@/components/pages/project";
import { ProjectCategoryId } from "@/lib/types/project";

import ProjectCard from "@/components/pages/home/ProjectCard";
import Markdown from "@/components/ui/Markdown";

import { HEADING } from "@/content/home";
import * as sty from "./home-page.css";



type HomePageProps = {
  projects: Record<string, ProjectContent[]>;
};

const CATS: ProjectCategoryId[] = ["research", "labs", "experience"];

export function HomePage({ projects }: HomePageProps) {
  const featuredProject = projects["feature"]?.[0] ?? null;

  return (
    <main id="main-content" tabIndex={-1} className={sty.root}>
      <Markdown 
        as="h1" className={sty.heading} 
        value={HEADING} 
      />

      <LayoutGroup>
        <div className={sty.gridFeature}>
          <AnimatePresence mode="popLayout">
            {featuredProject && (
              <motion.div
                key={featuredProject.pid}
                layout
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
              >
                <ProjectCard 
                  variant="featured" 
                  project={featuredProject}  
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {CATS.map((cat) => {
          const items = projects[cat];
          if (!items?.length) return null;
          return (
            <section key={cat}>
              <Markdown
                as="h2" className={sty.sectionHeading}
                value={cat.charAt(0).toUpperCase() + cat.slice(1)}
              />
              <div className={sty.grid}>
                <AnimatePresence mode="popLayout" initial={false}>
                  {items.map((p) => (
                    <motion.div
                      key={p.pid}
                      layout
                      initial={{ opacity: 0.5 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        layout: { duration: 0.4, ease: [0.2, 0.1, 0.2, 1] },
                        default: { duration: 0.25 },
                      }}
                    >
                      <ProjectCard
                        key={p.pid}
                        project={p}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </section>
          );
        })}
      </LayoutGroup>
    </main>
  );
}

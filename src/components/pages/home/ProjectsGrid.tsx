"use client";

import { useMemo } from "react";
import Link from "next/link";
// import ProjectsGrid from "@/components/projects/ProjectsGrid/ProjectsGrid";


import type { IFilter, IProject } from "@/lib/types/global";


type ProjectsGridProps = {
};

export function ProjectsGrid({}: ProjectsGridProps) {

  // const visibleProjects = useMemo(() => {
  //   if (!activeFilter) return projects;
  //   return projects.filter(
  //     (p) => Object.keys(p.tags).includes(activeFilter)
  //   );
  // }, [projects, activeFilter]);

  // const visibleProjectIds = useMemo(() => 
  //   visibleProjects.map((p) => p.id)
  // , [visibleProjects]);

  return (
    <section>
      Hello from projects grid
    </section>
  );
}
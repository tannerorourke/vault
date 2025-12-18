"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
// import ProjectsGrid from "@/components/projects/ProjectsGrid/ProjectsGrid";
import NavLink from "../../ui/TextLink";
import * as sty from "./HomePage.css";

import type { IFilter, IProject } from "@/lib/types/global";
import { NAV_FILTERS } from "@/content/nav-links";


type HomePageProps = {
  projects: IProject[];
  initialFilterId: string; // "" means unfiltered
};

export function HomePage({ 
  projects, 
  initialFilterId 
}: HomePageProps) {
  const [activeFilter, setActiveFilter] = useState<string>(initialFilterId);

  const toggleFilter = (id: string) => {
    setActiveFilter((current) => (current === id ? "" : id));
  };

  const visibleProjects = useMemo(() => {
    if (!activeFilter) return projects;
    return projects.filter(
      (p) => Object.keys(p.tags).includes(activeFilter)
    );
  }, [projects, activeFilter]);

  // const visibleProjectIds = useMemo(() => 
  //   visibleProjects.map((p) => p.id)
  // , [visibleProjects]);

  return (
    <section className={sty.pageSection}>
      <header className={sty.headerRow}>
        <div className={sty.headerLeft}>
          <Link href="/" 
            scroll={false} 
            // style={{ textDecoration: "none", color: "inherit" }}
          >
            <img
              // className={sty.logo}
              src="icons/logo-base.svg"
              alt="TO"
              width={100}
              height={100}
            />
          </Link>
          <span>Tanner O'Rourke</span>
        </div>

        {/* <NavButtons activeFilter={activeFilter} onChange={setActiveFilter} /> */}
        <div id="links-main">
          {/* {
            NAV_FILTERS.map((cf: Filter) => (
              <NavLink
                label={cf.label}
                filterId={cf.id}
                isActive={activeFilter === cf.id}
                notifyOnClick={toggleFilter}
              />
            ))
          } */}
        </div>

        <div className={sty.headerRight}>
          <NavLink label="Profile" 
            nextProps={{
              href: "/profile",
              prefetch: true
            }}
          />
        </div>
      </header>

      {/* <ProjectsGrid 
        projectIds={visibleProjectIds} 
        projectsById={indexProjects(projects)} 
      /> */}
    </section>
  );
}

function indexProjects(projects: IProject[]): Record<string, IProject> {
  const map: Record<string, IProject> = {};
  for (const p of projects) map[p.pid] = p;
  return map;
}
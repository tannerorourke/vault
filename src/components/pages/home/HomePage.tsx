"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
// import ProjectsGrid from "@/components/projects/ProjectsGrid/ProjectsGrid";
import NavLink from "../../ui/TextLink";
import * as sty from "./HomePage.css";

import type { Filter, Project } from "@/lib/types/global";
import { NAV_FILTERS } from "@/content/nav-links";


type HomePageProps = {
  projects: Project[];
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
            style={{ textDecoration: "none", color: "inherit" }}>
            <Image
              className={sty.logo}
              src="/favicon.jpg"
              alt="Personal logo"
              width={50}
              height={50}
              priority
            />
          </Link>
          <span>Tanner O'Rourke</span>
        </div>

        {/* <NavButtons activeFilter={activeFilter} onChange={setActiveFilter} /> */}
        <div id="links-main">
          {
            NAV_FILTERS.map((cf: Filter) => (
              <NavLink
                label={cf.label}
                filterId={cf.id}
                isActive={activeFilter === cf.id}
                notifyOnClick={toggleFilter}
              />
            ))
          }
        </div>

        <div className={sty.headerRight}>
          <NavLink label="Profile" 
            nextProps={{
              href: "/profile",
              prefetch: true
            }}
          >Profile
          </NavLink>
        </div>
      </header>

      {/* <ProjectsGrid 
        projectIds={visibleProjectIds} 
        projectsById={indexProjects(projects)} 
      /> */}
    </section>
  );
}

function indexProjects(projects: Project[]): Record<string, Project> {
  const map: Record<string, Project> = {};
  for (const p of projects) map[p.id] = p;
  return map;
}
'use client'

import { useState } from "react";
import * as sty from "./Header.css";

import Link from "next/link";
import NavLink from "src/components/ui/TextLink";
import { NAV_FILTERS } from "src/content/nav-links";
import { IFilter } from "src/lib/types/global";
import { useProjectFilter } from "../AppProvider/app-provider";


type HeaderProps = {
  
};

export function Header({}: HeaderProps) {
  const { projectFilter, setProjectFilter } = useProjectFilter();

  const toggleFilter = (id: IFilter['id']) => {
    setProjectFilter((current) => (current === id ? "" : id));
  };

  return (
    <header className={sty.headerRow}>
        <div className={sty.headerLeft}>
          <Link 
            href="/" 
            scroll={false} 
          >
            <img
              src="icons/logo-base.svg"
              alt="TO"
              width={100}
              height={100}
            />
          </Link>
          <span>Tanner O'Rourke</span>
        </div>
        <div id="links-main">
          {
            NAV_FILTERS.map((cf: IFilter) => (
              <NavLink
                label={cf.label}
                filterId={cf.id}
                isActive={projectFilter === cf.id}
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
          />
        </div>
      </header>
  )
}
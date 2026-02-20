import * as sty from "./LinksList.css";
import { SIDEBAR_LINKS } from "@/content/nav-links";
import { IconButton } from "@/components/ui/IconButton/icon-button";
import { IconName } from "public/icons/icon-registry";

export function LinksList() {
  return (
    <nav className={sty.sidebarRoot} aria-label="Sidebar">
      <ul className={sty.sidebarList}>
      {SIDEBAR_LINKS.map((item, ix) => (
        <li key={ix} className={sty.sidebarItem}>
          <IconButton
            icon={item.icon as IconName}
            ssr={true}
            className={sty.sidebarItemIcon}
            href={item.href}
            target={item.target}
            //tooltipText={item.tooltipText}
          />
        </li>
      ))}
      </ul>
    </nav>
  );
}
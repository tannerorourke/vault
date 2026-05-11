import * as sty from "./IconList.css";
import { SIDEBAR_LINKS } from "public/content/nav-links";
import { IconName } from "public/icons/icon-registry";
import { IconButton } from "@/components/ui/IconButton/icon-button";

export function IconList() {
  return (
    <ul className={sty.iconList}>
      {SIDEBAR_LINKS.map((item, ix) => (
        <li key={ix} className={sty.sidebarItem}>
          <IconButton
            icon={item.icon as IconName}
            ssr={true}
            className={sty.sidebarItemIcon}
            href={item.href}
            target={item.target}
            tooltipText={item.tooltipText}
          />
        </li>
      ))}
    </ul>
  );
}
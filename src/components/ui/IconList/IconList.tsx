import * as sty from "./IconList.css";
import { SIDEBAR_LINKS } from "@/content/nav-links";
import { IconButton } from "@/components/ui/IconButton/icon-button";
import { IconName } from "public/icons/icon-registry";

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
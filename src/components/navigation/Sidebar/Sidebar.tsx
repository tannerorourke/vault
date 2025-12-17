import Link from "next/link";
import { sidebarRoot, sidebarIcon, sidebarNav } from "./Sidebar.css";
import { SIDEBAR_LINKS } from "@/content/nav-links";


export function Sidebar() {
  return (
    <aside className={sidebarRoot} aria-label="Sidebar">
      <nav className={sidebarNav}>
        {SIDEBAR_LINKS.map((item) => (
          <p>LINK</p>
          // <Link key={item.label} className={sidebarIcon} href={item.href}>
          //   {item.label}
          // </Link>
        ))}
      </nav>
    </aside>
  );
}
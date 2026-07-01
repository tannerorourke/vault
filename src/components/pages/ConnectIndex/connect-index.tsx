import { MouseEventHandler } from "react";

import { NavLink, CONTACT_LINKS, LINKS } from "@/content/nav-links";

import * as sty from "./connect-index.css";
import Icon from "@/components/ui/Icon";
import { Link } from "next-view-transitions";



function NavItem(
  { link, onClick, active }:
  { link: NavLink; onClick?: MouseEventHandler<HTMLAnchorElement>; active?: boolean; }
) {
  const isSection = !!link.section;

  const inner = <>
    {link.iconName && (
      <span className={sty.itemIcon}>
        <Icon name={link.iconName} size="lg" />
      </span>
    )}
    <span className={sty.itemLabel}>{link.text}</span>
    <span className={sty.itemArrow}>
      <Icon name={isSection ? "arrow-down" : "arrow-up-right"} size="sm" />
    </span>
  </>;

  return isSection ? (
    <Link
      href={link.href ?? "/"}
      className={sty.item}
      onClick={onClick}
      aria-current={active ? "true" : undefined}
    >
      {inner}
    </Link>
  ) : (
    <a
      className={sty.item}
      href={link.href}
      target={link.target ?? undefined}
      download={link.download ?? undefined}
      onClick={onClick}
      aria-current={active ? "true" : undefined}
    >
      {inner}
    </a>
  );
}

const LINK_KEYS: (keyof typeof LINKS)[] = [...CONTACT_LINKS];

export function ConnectIndex() {
  return (
    <ul className={sty.list}>
      {LINK_KEYS.map((key) => (
        <li key={key}>
          <NavItem link={LINKS[key]} />
        </li>
      ))}
    </ul>
  );
}

export default ConnectIndex;

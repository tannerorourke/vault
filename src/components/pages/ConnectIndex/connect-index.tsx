import { LINKS, CONTACT_LINKS } from "@/content/nav-links";
import { NavItem } from "@/components/navigation/NavHub";

import * as sty from "./connect-index.css";


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

import type { IconComponent } from "@/lib/types/icons";


/** Governs home-page header tabs filter by. */
export type ProjectFilterId = "research" | "labs" | "experience" | "papers";

export type NavFilter = {
  id: ProjectFilterId | "";
  label: string;
  order?: number;
};

export type NavLink = {
  Icon?: IconComponent;
  text?: string;
  alt?: string;
  href?: string;
  tooltipText?: string;
  target?: string;
  download?: string;
};

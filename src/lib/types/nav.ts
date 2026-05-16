import { IconName } from "@/components/icons/registry";
import type { IconComponent } from "@/lib/types/icons";
import type { ProjectFilterId } from "@/lib/types/project-content";

export type NavFilter = {
  id: ProjectFilterId | "";
  label: string;
  order?: number;
};

// code-side definition
export type NavLink = {
  Icon: IconComponent;
  text?: string;
  alt?: string;
  href?: string;
  tooltipText?: string;
  target?: string;
  download?: string;
};

// maps from icon registry
export type ContentNavLink = {
  icon: IconName;
  text?: string;
  alt?: string;
  href: string;
  tooltipText?: string;
  target?: string;
  download?: string;
}

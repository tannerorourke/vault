import { IconName } from "@/components/icons/registry";
import { TagChipColor } from "@/components/ui/TagChip";
import { ProjectSection } from "@/components/pages/project/Section";

export type ProjectCategoryId = "research" | "labs" | "experience";

export type ProjectTag = {
  label: string;
  color?: TagChipColor;
};

export type JumpIconButton = {
  icon: IconName;
  text?: string;
  alt?: string;
  href: string;
  tooltipText?: string;
  target?: string;
  download?: string;
  rel?: string;
}

export type FindingCard = {
  body: string;
  jumpToId?: string;
  jumpToLabel?: string;
  eyebrow?: string;
};

export type ProjectContent = {
  pid: string;
  title: string;
  // -- meta ------------
  live: boolean;
  category: ProjectCategoryId;
  order?: number;
  isFeature?: boolean;
  publishedAt?: string; // e.g. "2026-01-15"
  updatedAt?: string;
  // -- On card ----------
  cardSubtitle: string;
  // -- On project page --
  eyebrow?: string;
  subtitle?: string;
  tags?: ProjectTag[];
  links?: JumpIconButton[];
  finding?: FindingCard;
  heroImage?: { 
    src: string; 
    alt?: string;
    label?: string;   // Feature only
    caption?: string; // Feature only
  };
  sections: ProjectSection[];
};
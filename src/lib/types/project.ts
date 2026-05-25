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
}

export type FindingCard = {
  body: string;
  jumpToId?: string;
  jumpToLabel?: string;
  eyebrow?: string;
};

export type ProjectContent = {
  // Required
  live: boolean;
  pid: string;
  title: string;
  // ----------
  order?: number;
  summary: string; // description shown on the card
  category: ProjectCategoryId;    
  year?: string;
  isFeature?: boolean;
  eyebrow?: string;

  // On project page
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
  // Detail-page body
  sections: ProjectSection[];
};
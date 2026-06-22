import { IconName } from "@/components/icons/registry";
import { TagChipColor } from "@/components/ui/TagChip";
import { SectionTypes } from "@/components/ui/Section";

export type ProjectCategoryId = "publications" | "research" | "case-studies" | "article";

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

export type HeroImage = {
  src: string;
  alt?: string;
  label?: string; // Feature only
  caption?: string; // Feature only
  captionOnHome?: boolean; // Feature only
}

export type ProjectContent = {
  // -- meta
  pid: string;
  live: boolean;
  order?: number;
  publishedAt?: string;
  updatedAt?: string;
  // -- (card) description
  title: string;
  indexSubtitle: string;
  eyebrow?: string;
  thumbnail: {
    src: string;
    alt?: string;
  };
  // canvas descriptors
  category: ProjectCategoryId; 
  // -- On project page
  subtitle?: string;
  chips?: ProjectTag[];
  links?: JumpIconButton[];
  finding?: FindingCard;
  showToc?: boolean;
  heroImage?: { 
    src: string; 
    alt?: string;
    label?: string;
    caption?: string;
  };
  sections: SectionTypes[];
};
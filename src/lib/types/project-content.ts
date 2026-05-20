import type { TagChipColor } from "@/components/ui/TagChip";
import { ContentNavLink } from "./nav";


/** Governs home-page header tabs filter by. */
export type ProjectFilterId = "research" | "labs" | "experience";

// --------------------------------------------------------------------
// Section types - discriminated by key
// --------------------------------------------------------------------
export type SectionParagraph = {
  type: "Paragraph";
  id: string;
  title?: string;
  body: string;
  accent?: "copper";
};

export type SectionBulletedList = {
  type: "BulletedList";
  id: string;
  title?: string;
  intro?: string;
  items: string[];
  accent?: "copper";
};

export type SectionTwoUpTextImage = {
  type: "2upTextImage";
  id: string;
  title?: string;
  body: string;
  image: { src: string; alt?: string };
  /** Which side the image sits on. Defaults to "right". */
  imageSide?: "left" | "right";
  accent?: "copper";
};

export type SectionImage = {
  type: "Image";
  id: string;
  title?: string;
  src: string;
  alt?: string;
  caption?: string;
  accent?: "copper";
};

export type SectionVideo = {
  type: "Video";
  id: string;
  title?: string;
  /** Either an mp4 path/URL, or a YouTube embed URL. */
  src: string;
  /** Defaults to "mp4". Use "youtube" for an iframe embed. */
  kind?: "mp4" | "youtube";
  poster?: string;
  caption?: string;
  accent?: "copper";
};

export type SectionStats = {
  type: "Stats";
  id: string;
  title?: string;
  stats: Array<{ value: string; label: string }>;
  accent?: "copper";
};

export type ProjectSection =
  | SectionParagraph
  | SectionBulletedList
  | SectionTwoUpTextImage
  | SectionImage
  | SectionVideo
  | SectionStats;
// --------------------------------------------------------------------

export type ProjectContentTag = {
  label: string;
  color?: TagChipColor;
};

/** Optional "headline finding" callout in the hero. */
export type FindingCard = {
  /** Inline markdown supported. */
  body: string;
  /** Section id to scroll to when the jump link is clicked. */
  jumpToId?: string;
  /** Display label for the jump link. Defaults to the matching section's title, then to jumpToId. */
  jumpToLabel?: string;
  eyebrowLabel?: string;
};

export type ProjectContent = {
  /** Required */
  live: boolean;
  pid: string;
  title: string;

  /** Display order on the home page grid (ascending). */
  order?: number;

  /** Home-page card */
  /** One-line description shown on the card. */
  summary: string;
  filterIds: ProjectFilterId[];
  year: string;
  readTime?: number;
  isFeature?: boolean;
  /** Optional thumbnail; falls back to heroImage when omitted. */
  cardImage?: { src: string; alt?: string };
  /** Detail-page header */
  /** Small uppercase line above the title - e.g. "Labs · 2025". */
  eyebrow?: string;
  /** Longer outcome / summary under the title (defaults to summary). */
  subtitle?: string;
  tags?: ProjectContentTag[];
  links?: ContentNavLink[];
  heroImage?: { src: string; alt?: string };
  /** Optional headline-finding callout next to the hero title. */
  finding?: FindingCard;

  /** Detail-page body */
  sections: ProjectSection[];
};

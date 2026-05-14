import type { TagChipColor } from "@/components/ui/TagChip";
import { ContentNavLink } from "./nav";


/** Governs home-page header tabs filter by. */
export type ProjectFilterId = "aiml" | "experience" | "research" | "labs";

// --------------------------------------------------------------------
// Section types - discriminated by key
// --------------------------------------------------------------------
export type SectionParagraph = {
  type: "Paragraph";
  id: string;
  title?: string;
  body: string;
};

export type SectionBulletedList = {
  type: "BulletedList";
  id: string;
  title?: string;
  intro?: string;
  items: string[];
};

export type SectionTwoUpTextImage = {
  type: "2upTextImage";
  id: string;
  title?: string;
  body: string;
  image: { src: string; alt?: string };
  /** Which side the image sits on. Defaults to "right". */
  imageSide?: "left" | "right";
};

export type SectionImage = {
  type: "Image";
  id: string;
  title?: string;
  src: string;
  alt?: string;
  caption?: string;
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
};

export type ProjectSection =
  | SectionParagraph
  | SectionBulletedList
  | SectionTwoUpTextImage
  | SectionImage
  | SectionVideo;
// --------------------------------------------------------------------

export type ProjectContentTag = {
  label: string;
  color?: TagChipColor;
};

export type ProjectContent = {
  /** Identity */
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

  /** Detail-page body */
  sections: ProjectSection[];
};

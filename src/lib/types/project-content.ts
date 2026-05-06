import type { TagChipColor } from "@/components/ui/TagChip";

/**
 * Section types - each `type` discriminator is a simple key.
 * Add new section variants by extending the union and adding a renderer
 * in components/pages/project/sections.tsx.
 */

export type SectionParagraph = {
  type: "Paragraph";
  id: string;
  title?: string;
  /** Plain text or limited HTML (rendered via dangerouslySetInnerHTML). */
  body: string;
};

export type SectionBulletedList = {
  type: "BulletedList";
  id: string;
  title?: string;
  /** Optional intro paragraph rendered above the list. */
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

export type ProjectContentLink = {
  label: string;
  href: string;
  /** Icon name from public/icons. */
  icon?: "github" | "pdf" | "globe" | "demo";
  download?: string;
};

export type ProjectContentTag = {
  label: string;
  color?: TagChipColor;
};

/** Filter ids the home-page header tabs filter by. */
export type ProjectFilterId = "aiml" | "experience" | "research" | "labs";

export type ProjectContent = {
  /** Identity */
  pid: string;
  title: string;

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
  links?: ProjectContentLink[];
  heroImage?: { src: string; alt?: string };

  /** Detail-page body */
  sections: ProjectSection[];
};

import type { TagChipColor } from "@/components/ui/TagChip";

/**
 * Section types — each `type` discriminator is a simple key.
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

export type ProjectContent = {
  pid: string;
  title: string;
  /** Small uppercase line above the title — e.g. "Labs · 2025". */
  eyebrow?: string;
  /** One-liner outcome / summary under the title. */
  subtitle?: string;
  tags?: ProjectContentTag[];
  links?: ProjectContentLink[];
  heroImage?: { src: string; alt?: string };
  sections: ProjectSection[];
};

import type { ProjectContent } from "@/lib/types/project-content";

import gpt4 from "./gpt4/content.json";

/**
 * Registry of per-project detail content.
 * To add a new project page: drop a `src/content/<slug>/content.json` matching
 * the ProjectContent schema, then import + register it here.
 */
export const PROJECT_CONTENT: Record<string, ProjectContent> = {
  "gpt4": gpt4 as unknown as ProjectContent,
};

export function getProjectContent(slug: string): ProjectContent | null {
  return PROJECT_CONTENT[slug] ?? null;
}

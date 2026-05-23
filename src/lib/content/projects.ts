import type { ProjectContent } from "@/lib/types/project";
import directv from "@/content/projects/directv/content.json";
import fire from "@/content/projects/fire/content.json";
import gpt4Factuality from "@/content/projects/gpt4-factuality/content.json";
import interpretGpt2 from "@/content/projects/code-lm-interp/content.json";
import interpretJepa from "@/content/projects/interpret-jepa/content.json";
import negationSnli from "@/content/projects/negation-snli/content.json";


const ALL = ([
  directv,
  fire,
  gpt4Factuality,
  interpretGpt2,
  interpretJepa,
  negationSnli
] as unknown as ProjectContent[]).filter((p) => p.live);

export const PROJECTS: ProjectContent[] = [...ALL].sort(
  (a, b) => (a.order ?? 99) - (b.order ?? 99),
);

export const PROJECTS_BY_PID: Record<string, ProjectContent> =
  Object.fromEntries(PROJECTS.map((p) => [p.pid, p]));

export function getProjectContent(slug: string): ProjectContent | null {
  return PROJECTS_BY_PID[slug] ?? null;
}

export function getAllProjectSlugs(): string[] {
  return PROJECTS.map((p) => p.pid);
}

import type { ProjectContent } from "@/lib/types/project-content";
import fire from "@/content/projects/fire/content.json";
import gpt4Causality from "@/content/projects/gpt4-causality/content.json";
import negationSnli from "@/content/projects/negation-snli/content.json";


const ALL = ([
  fire,
  gpt4Causality,
  negationSnli,
] as unknown as ProjectContent[]).filter((p) => p.live);

export const PROJECTS: ProjectContent[] = [...ALL].sort(
  (a, b) => (a.order ?? 99) - (b.order ?? 99),
);

export const PROJECTS_BY_PID: Record<string, ProjectContent> =
  Object.fromEntries(PROJECTS.map((p) => [p.pid, p]));

export function getAllProjects(): ProjectContent[] {
  return PROJECTS;
}

export function getProjectContent(slug: string): ProjectContent | null {
  return PROJECTS_BY_PID[slug] ?? null;
}

export function getAllProjectSlugs(): string[] {
  return PROJECTS.map((p) => p.pid);
}

import type { ProjectContent } from "@/lib/types/project-content";
import firefusion from "./fire-fusion/content.json";
import gpt4Causality from "./gpt4-causality/content.json";
import negationSnli from "./negation-snli/content.json";
// import spotifyAnalysis from "./spotify-analysis/content.json";
// import stkRacerCnn from "./stk-racer-cnn/content.json";

const ALL = [
  firefusion,
  gpt4Causality,
  negationSnli,
  // spotifyAnalysis,
  // stkRacerCnn,
] as unknown as ProjectContent[];

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

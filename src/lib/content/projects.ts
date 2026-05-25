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

export const PROJECTS_BY_CTGY: Record<string, ProjectContent[]> =
  PROJECTS.reduce((acc, p) => {
    if (p.isFeature && !acc["feature"]) {
      acc["feature"] = [p];
    } else {
      const cat = p.category;
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(p);
    }
    return acc;
  }, {} as Record<string, ProjectContent[]>);

for (const key in PROJECTS_BY_CTGY) {
  PROJECTS_BY_CTGY[key].sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export function getProjectContent(slug: string): ProjectContent | null {
  return PROJECTS_BY_PID[slug] ?? null;
}

export function getAllProjectSlugs(): string[] {
  return PROJECTS.map((p) => p.pid);
}

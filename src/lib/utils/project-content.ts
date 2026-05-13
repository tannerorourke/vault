import { PROJECTS, PROJECTS_BY_PID } from "@/content/projects";
import type { ProjectContent } from "@/lib/types/project-content";

// keep around if we move to a codegen script
// function isProjectContent(x: unknown): x is ProjectContent {
//   if (!x || typeof x !== "object") return false;
//   const c = x as Record<string, unknown>;
//   return (
//     typeof c.pid === "string" &&
//     typeof c.title === "string" &&
//     typeof c.summary === "string" &&
//     typeof c.year === "string" &&
//     Array.isArray(c.filterIds) &&
//     Array.isArray(c.sections)
//   );
// }

export function getAllProjects(): ProjectContent[] {
  return PROJECTS;
}

export function getProjectContent(slug: string): ProjectContent | null {
  return PROJECTS_BY_PID[slug] ?? null;
}


export function getAllProjectSlugs(): string[] {
  return PROJECTS.map((p) => p.pid);
}





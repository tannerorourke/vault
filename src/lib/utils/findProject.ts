import { PROJECTS } from "@/content/projects";
import { IProject } from "../types/global";

export function findProject(projectId: string): IProject | null {
  const p = PROJECTS.find(p => p.pid === projectId)

  if (p) return p
  return null;
}
import "server-only";
import { readdir, readFile } from "fs/promises";
import { join } from "path";
import type { ProjectContent } from "@/lib/types/project-content";

const CONTENT_DIR = join(process.cwd(), "public", "content");

function isProjectContent(x: unknown): x is ProjectContent {
  if (!x || typeof x !== "object") return false;
  const c = x as Record<string, unknown>;
  return (
    typeof c.pid === "string" &&
    typeof c.title === "string" &&
    typeof c.summary === "string" &&
    typeof c.year === "string" &&
    Array.isArray(c.filterIds) &&
    Array.isArray(c.sections)
  );
}

export async function getAllProjectSlugs(): Promise<string[]> {
  try {
    const entries = await readdir(CONTENT_DIR, { withFileTypes: true });
    return entries.filter((e) => e.isDirectory()).map((e) => e.name);
  } catch {
    return [];
  }
}

export async function getProjectContent(
  slug: string
): Promise<ProjectContent | null> {
  try {
    const raw = await readFile(
      join(CONTENT_DIR, slug, "content.json"),
      "utf8"
    );
    const parsed = JSON.parse(raw);
    if (!isProjectContent(parsed)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export async function getAllProjects(): Promise<ProjectContent[]> {
  const slugs = await getAllProjectSlugs();
  const contents = await Promise.all(slugs.map(getProjectContent));
  return contents.filter((c): c is ProjectContent => c !== null);
}

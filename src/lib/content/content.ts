import { readFileSync } from 'node:fs';
import { join } from 'path';

import type { ProjectContent } from "@/lib/types/project";
import homeMd from "@/content/home.md";
import fire from "@/content/projects/fire/content.json";
import gpt4Factuality from "@/content/projects/gpt4-factuality/content.json";
import codeLM from "@/content/projects/code-lm/content.json";
import interpretJepa from "@/content/projects/jepa-mi/content.json";
import negationSnli from "@/content/projects/negation-snli/content.json";


// Resolve any section whose body is a `[!file](name.md)` marker by reading the
// markdown from that project's own content directory (src/content/projects/<pid>/).
function resolveProject(p: ProjectContent): ProjectContent {
  if (!p.sections) return p;
  const dir = join(process.cwd(), 'src/content/projects', p.pid);
  return {
    ...p,
    sections: p.sections.map((s) => {
      if (s?.body && s?.body?.startsWith("[!file]")) {
        const match = s.body.match(/^\[!file\]\((.+)\)$/);
        const file = match?.[1];
        if (!file)
          throw new Error(`Bad [!file] reference: "${s.body}"`);
        return {
          ...s,
          body: readFileSync(join(dir, file), 'utf-8'),
        };
      }
      return s;
    }),
  };
}

// Homepage markdown: the leading `# H1` is the headline, the rest is the body.
function parseHome(md: string): { headline: string; body: string } {
  const match = md.match(/^#\s+(.+?)\r?\n([\s\S]*)$/);
  if (!match)
    throw new Error("home.md must begin with an '# H1' headline");
  return { headline: match[1].trim(), body: match[2].trim() };
}

const projectList: ProjectContent[] = ([
  fire,
  gpt4Factuality,
  codeLM,
  interpretJepa,
  negationSnli,
] as unknown as ProjectContent[])
  .map(resolveProject)
  .filter((p) => p.live)
  .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

const projects: Record<string, ProjectContent> =
  Object.fromEntries(projectList.map((p) => [p.pid, p]));

const projectMeta = {
  num: projectList.length,
  pids: Object.fromEntries(
    projectList.map((p) => [
      p.pid,
      { title: p.title, subtitle: p.subtitle ?? "", eyebrow: p.eyebrow ?? "" },
    ]),
  ) as Record<string, { title: string; subtitle: string; eyebrow: string }>,
};

export const content = {
  home: parseHome(homeMd),
  projects,
  projectList,
  projectMeta,
};

export function getProjectContent(slug: string): ProjectContent | null {
  return content.projects[slug] ?? null;
}

export function getAllProjectSlugs(): string[] {
  return content.projectList.map((p) => p.pid);
}

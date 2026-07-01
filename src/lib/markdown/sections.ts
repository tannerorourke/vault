export function slugify(s: string): string {
  return s.toLowerCase().trim().replace(/[^\w]+/g, '-');
}

export type MarkdownHeadingSection = { id: string; title: string; body: string };

// Splits a markdown document on '## ' headings, one section per heading.
// A heading may pin an explicit id via a trailing `[!id](custom-slug)` annotation;
// otherwise the id is slugified from the heading text. Content before the first
// heading (e.g. a leading '# Title') is dropped.
export function splitMarkdownSections(markdown: string): MarkdownHeadingSection[] {
  const sections: MarkdownHeadingSection[] = [];

  for (const line of markdown.split('\n')) {
    const heading = line.match(/^##\s+(.+)/);
    if (heading) {
      const raw = heading[1].trim();
      const idMatch = raw.match(/^(.*?)\s*\[!id\]\(([^)]+)\)\s*$/);
      const title = idMatch ? idMatch[1].trim() : raw;
      const id = idMatch ? idMatch[2].trim() : slugify(title);
      sections.push({ id, title, body: '' });
    } else if (sections.length) {
      const last = sections[sections.length - 1];
      last.body += (last.body ? '\n' : '') + line;
    }
  }

  return sections.map((s) => ({ ...s, body: s.body.trim() }));
}

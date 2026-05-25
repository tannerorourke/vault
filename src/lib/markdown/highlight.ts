import { createHighlighter, type Highlighter, type BundledLanguage } from 'shiki/bundle/web';

import { codeBlock } from '@/components/ui/Markdown/markdown.css';
import { portfolioDark, portfolioLight } from '@/lib/shiki/themes';

const LANGS: BundledLanguage[] = [
  'ts', 'tsx', 'js', 'jsx', 'python', 'bash', 'json', 'html', 'css', 'md',
];

let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: [portfolioLight, portfolioDark],
      langs: LANGS,
    });
  }
  return highlighterPromise;
}

const FENCE_RE = /^```(\w*)\r?\n([\s\S]*?)```/gm;

/**
 * Pre-render fenced code blocks in a markdown string to Shiki HTML.
 * Replaces each fence with a `<div class="${codeBlock}">...</div>` so the
 * client-side <Markdown> + rehype-raw pipeline can pass the HTML through
 * without bundling Shiki into the client.
 */
export async function preHighlightCodeBlocks(body: string): Promise<string> {
  if (!body.includes('```')) return body;

  const hl = await getHighlighter();
  const loaded = hl.getLoadedLanguages();

  let out = '';
  let lastIndex = 0;

  for (const match of body.matchAll(FENCE_RE)) {
    const idx = match.index!;
    out += body.slice(lastIndex, idx);

    const requested = match[1] || 'text';
    const code = match[2].replace(/\r?\n$/, '');
    const lang = loaded.includes(requested as never) ? requested : 'text';

    const html = hl.codeToHtml(code, {
      lang,
      themes: { light: 'portfolio-light', dark: 'portfolio-dark' },
      defaultColor: false,
    });

    out += `\n\n<div class="${codeBlock}">${html}</div>\n\n`;
    lastIndex = idx + match[0].length;
  }

  out += body.slice(lastIndex);
  return out;
}

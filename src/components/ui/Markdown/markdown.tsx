'use client';

/** Markdown - supports:
 * - `[label](href)` (links route through next/link for internal hrefs)
 * - `**bold**`, `*em*`
 * - inline `code`
 * - inline & block math via `$...$` / `$$...$$` (KaTeX)
 * - fenced code blocks are pre-rendered to highlighted HTML server-side
 *   (see `preHighlightCodeBlocks` in `@/lib/markdown/highlight`) and passed
 *   through here as raw HTML.
 * Paragraph breaks via `\n\n`.
*/

import type { ComponentProps } from 'react';

import { Link as NextLink } from 'next-view-transitions';
import ReactMarkdown, { type Components } from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import remarkMath from 'remark-math';

import * as sty from './markdown.css';


export type MarkdownProps = {
  value: string;
  inline?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  className?: string;
};

const SmartLink = ({ href, children }: ComponentProps<'a'>) => {
  if (!href) return <>{children}</>;
  // Anchor links to the same page must NOT trigger a view transition.
  if (href.startsWith('#')) {
    return <a href={href}>{children}</a>;
  }
  if (href.startsWith('/')) {
    return <NextLink href={href}>{children}</NextLink>;
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
};

const InlineCode = ({ className, children, ...props }: ComponentProps<'code'>) => {
  // Fenced blocks are pre-rendered upstream; anything react-markdown still
  // hands us here is inline backticked code.
  const isBlock = /language-/.test(className ?? '');
  if (isBlock) {
    return <code className={className} {...props}>{children}</code>;
  }
  return <code className={sty.inlineCode} {...props}>{children}</code>;
};

const baseComponents: Components = { a: SmartLink, code: InlineCode };
const inlineComponents: Components = {
  ...baseComponents,
  p: ({ children }) => <>{children}</>,
};

const remarkPlugins = [remarkMath];
const rehypePlugins = [
  rehypeRaw,
  [rehypeKatex, { strict: 'ignore', output: 'html' }],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
] as any;

export function Markdown({ value, inline = false, as, className }: MarkdownProps) {
  let components: Components;
  if (as) {
    const Tag = as;
    components = {
      a: SmartLink,
      code: InlineCode,
      p: ({ children }) => <Tag className={className}>{children}</Tag>,
    };
  } else if (inline) {
    components = inlineComponents;
  } else {
    components = baseComponents;
  }

  return (
    <ReactMarkdown
      remarkPlugins={remarkPlugins}
      rehypePlugins={rehypePlugins}
      components={components}
    >
      {value}
    </ReactMarkdown>
  );
}

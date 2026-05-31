'use client';

/** Markdown - supports:
 * - `[label](href)` (links route through next/link for internal hrefs)
 * - `[label](${id})` (action-link operator: resolves to the `ACTION_LINKS`
 *   entry with matching `id`, inheriting its href/target/download/rel)
 * - `**bold**`, `*em*`
 * - inline `code`
 * - inline & block math via `$...$` / `$$...$$` (KaTeX)
 * - fenced code blocks are pre-rendered to highlighted HTML server-side
 *   (see `preHighlightCodeBlocks` in `@/lib/markdown/highlight`) and passed
 *   through here as raw HTML.
 * Paragraph breaks via `\n\n`.
*/

import type { ComponentProps, ElementType, ReactNode } from 'react';

import { Link as NextLink } from 'next-view-transitions';
import ReactMarkdown, { type Components } from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import remarkMath from 'remark-math';

import Text, { type TextProps } from '@/components/ui/Text';
import { getActionLink } from '@/content/nav-links';

import * as sty from './markdown.css';


export type MarkdownProps = {
  value: string;
  inline?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  className?: string;
  textProps?: Omit<TextProps<ElementType>, 'children'>;
};

// `${id}` action-link operator — resolves to an `ACTION_LINKS` entry by id.
const ACTION_LINK_RE = /^\$\{([^}]+)\}$/;

type LinkOpts = { target?: string; rel?: string; download?: string };

const renderLink = (href: string, children: ReactNode, opts: LinkOpts = {}) => {
  // Anchor links to the same page must NOT trigger a view transition.
  if (href.startsWith('#')) {
    return <a href={href}>{children}</a>;
  }
  // Internal routes transition unless they carry link metadata (download/target).
  if (href.startsWith('/') && !opts.download && !opts.target) {
    return <NextLink href={href}>{children}</NextLink>;
  }
  return (
    <a
      href={href}
      target={opts.target ?? '_blank'}
      rel={opts.rel ?? 'noopener noreferrer'}
      download={opts.download}
    >
      {children}
    </a>
  );
};

const SmartLink = ({ href, children }: ComponentProps<'a'>) => {
  if (!href) return <>{children}</>;

  const action = href.match(ACTION_LINK_RE);
  if (action) {
    const link = getActionLink(action[1]);
    // Unknown id — render the label as plain text rather than a broken link.
    if (!link?.href) return <>{children}</>;
    return renderLink(link.href, children, {
      target: link.target,
      download: link.download,
    });
  }

  return renderLink(href, children);
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

export function Markdown({ value, inline = false, as, className, textProps }: MarkdownProps) {
  let components: Components;
  if (inline) {
    components = inlineComponents;
  } else if (textProps) {
    components = {
      a: SmartLink,
      code: InlineCode,
      p: ({ children }) => <Text className={className} {...textProps}>{children}</Text>,
    };
  } else if (as) {
    const Tag = as;
    components = {
      a: SmartLink,
      code: InlineCode,
      p: ({ children }) => <Tag className={className}>{children}</Tag>,
    };
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

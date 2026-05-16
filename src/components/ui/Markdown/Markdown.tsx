'use client';

/** Inline markdown - supports:
 * -  `[label](href)`, 
 * - `**bold**`
 * - `*em*`, ``
 * - `code` ``. 
 * Paragraph breaks via `\n\n`. 
*/

import type { ComponentProps } from 'react';

import ReactMarkdown, { type Components } from 'react-markdown';
import NextLink from 'next/link';


export type MarkdownProps = {
  value: string;
  inline?: boolean;
};

const SmartLink = ({ href, children }: ComponentProps<'a'>) => {
  if (!href) return <>{children}</>;
  const isInternal = href.startsWith('/') || href.startsWith('#');
  if (isInternal) {
    return <NextLink href={href}>{children}</NextLink>;
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
};

const baseComponents: Components = { a: SmartLink };
const inlineComponents: Components = {
  ...baseComponents,
  p: ({ children }) => <>{children}</>,
};

export function Markdown({ value, inline = false }: MarkdownProps) {
  return (
    <ReactMarkdown components={inline ? inlineComponents : baseComponents}>
      {value}
    </ReactMarkdown>
  );
}

import { style, globalStyle } from '@vanilla-extract/css';

import { theme } from '@/lib/theme/theme.css';

export const inlineCode = style({
  fontFamily: theme.typography.fontFamily.mono,
  fontSize: '0.875em',
  padding: '0.12em 0.35em',
  borderRadius: '4px',
  background: theme.color.code.bg,
  color: theme.color.code.text,
  border: `1px solid ${theme.color.code.border}`,
  whiteSpace: 'break-spaces',
});

export const codeBlock = style({
  margin: `${theme.space._16} 0`,
  borderRadius: '8px',
  border: `1px solid ${theme.color.code.border}`,
  background: theme.color.code.blockBg,
  overflow: 'hidden',
});

globalStyle(`${codeBlock} pre.shiki`, {
  margin: 0,
  padding: `${theme.space._12} ${theme.space._16}`,
  fontFamily: theme.typography.fontFamily.mono,
  fontSize: '13.5px',
  lineHeight: 1.55,
  overflowX: 'auto',
  background: 'transparent',
});

globalStyle(`${codeBlock} .shiki, ${codeBlock} .shiki span`, {
  color: 'var(--shiki-light)',
  backgroundColor: 'var(--shiki-light-bg)',
});

globalStyle(`[data-theme="dark"] ${codeBlock} .shiki, [data-theme="dark"] ${codeBlock} .shiki span`, {
  color: 'var(--shiki-dark)',
  backgroundColor: 'var(--shiki-dark-bg)',
});

globalStyle('.katex', {
  fontSize: '1.0em',
  color: theme.color.text.primary,
});

globalStyle('.katex-display', {
  margin: `${theme.space._16} 0`,
  overflowX: 'auto',
  overflowY: 'hidden',
  paddingBottom: '2px',
});

import { style, globalStyle, ComplexStyleRule } from '@vanilla-extract/css';

import { theme } from '@/lib/theme/theme.css';
import { mq } from '@/lib/theme/responsive.css';

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

// --- Block prose ----------------------------------------------------------
export const md = style({
  fontFamily: theme.typography.fontFamily.serif,
});
  globalStyle(`${md} > *`, {
    marginBottom: theme.space._12,
  });
  globalStyle(`${md} > :first-child`, { marginTop: 0 });
  globalStyle(`${md} > :last-child`, { marginBottom: 0 });
  globalStyle(
    `${md} h1, ${md} h2, ${md} h3, ${md} h4, ${md} h5, ${md} h6`,
    { margin: `${theme.space._16} 0 ${theme.space._8}` },
  );

  // Inline styling (mirrors the legacy `prose` rules in section.css.ts).
  globalStyle(`${md} a`, {
    // color: theme.color.link.main,
    color: theme.color.primary.hover,
    textDecoration: 'none',
    borderRadius: "2px",
    textDecorationColor: theme.color.tint.primaryHoverSoft,
    fontWeight: theme.typography.fontWeight.semibold,

    background: "transparent",
    backgroundImage: "linear-gradient(currentColor, currentColor)",
    backgroundSize: "0% 2px",
    backgroundPosition: "bottom left",
    backgroundRepeat: "no-repeat",
    transition: "color 150ms ease, background-size 200ms ease",
  });
  globalStyle(`${md} a:focus-visible`, {
    outline: `2px solid ${theme.color.focus}`,
    outlineOffset: 2,
  });
  globalStyle(`${md} a:hover`, {
    color: theme.color.link.hover,
    backgroundSize: "100% 2px",
  });
  globalStyle(`${md} a:active`, {
    backgroundSize: "100% 2px",
  });
  
  globalStyle(`${md} strong`, {
    fontWeight: theme.typography.fontWeight.semibold,
  });
  globalStyle(`${md} em`, {
    fontStyle: 'italic',
  });


const bulletListStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: "6px",
  listStyle: 'none',
  padding: 0,
  maxWidth: '70ch',
  [mq.md]: { maxWidth: '88ch' },
  [mq.lg]: { maxWidth: '90ch' },
} satisfies ComplexStyleRule;

export const bulletList = style(bulletListStyle);

  globalStyle(`${md} li`, bulletListStyle);

  globalStyle(`${bulletList} > li`, {
    position: 'relative',
    paddingLeft: '22px',
  });
  globalStyle(`${bulletList} > li::before`, {
    content: "''",
    position: 'absolute',
    left: 0,
    top: '0.78em',
    width: '8px',
    height: '1px',
    background: theme.color.secondary.main,
    opacity: 0.85,
  });

const orderedListStyle = {
  listStyle: 'decimal',
  paddingLeft: theme.space._24,
  maxWidth: '70ch',
  [mq.md]: { maxWidth: '88ch' },
  [mq.lg]: { maxWidth: '90ch' },
} satisfies ComplexStyleRule;

export const orderedList = style(orderedListStyle);

  globalStyle(`${md} ol`, orderedListStyle);

  globalStyle(`${orderedList} > li`, {
    marginBottom: theme.space._12,
  });
  globalStyle(`${orderedList} > li:last-child`, {
    marginBottom: 0,
  });


const blockquoteStyle = {
  paddingLeft: theme.space._16,
  borderLeft: `2px solid ${theme.color.secondary.main}`,
  color: theme.color.text.secondary,
  fontStyle: 'italic'
} satisfies ComplexStyleRule;

export const blockquote = style(blockquoteStyle);

  globalStyle(`${md} blockquote`, blockquoteStyle);

  globalStyle(`${blockquote} p:last-child`, { margin: 0 });


const hrStyle = {
  border: 'none',
  height: '1px',
  margin: `${theme.space._24} 0`,
  background: theme.color.divider,
} satisfies ComplexStyleRule;

export const hr = style(hrStyle);

  globalStyle(`${md} hr`, hrStyle);

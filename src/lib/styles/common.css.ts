import { style, globalStyle } from "@vanilla-extract/css";
import { theme } from "@/lib/theme/theme.css";
import { mq } from "@/lib/theme/responsive.css";


// --- Inline markdown ---
// Shared treatment for links and emphasis inside rendered markdown. Composed
// into paragraph styles (e.g. `par`, Section's `prose`) so the identical
// `a`/`em` rules are defined once. `strong` weight is intentionally left to
// each composing style, since it differs by context.
export const markdownInline = style({});

  globalStyle(`${markdownInline} a`, {
    color: theme.color.link.main,
    textDecoration: "underline",
    textDecorationColor: theme.color.tint.primaryHoverSoft,
  });

  globalStyle(`${markdownInline} a:hover`, {
    color: theme.color.link.hover,
  });

  globalStyle(`${markdownInline} em`, {
    fontStyle: "italic",
  });

// --- Paragraph ---
// Canonical markdown paragraph. Used for about-page prose and both footers.
export const par = style([
  markdownInline,
  {
    display: "inline-block",
    opacity: 0.92,
    textWrap: "pretty",
    margin: 0,
    scrollMarginTop: `calc(${theme.header.height.xs} + ${theme.space._24})`,
    [mq.sm]: {
      scrollMarginTop: `calc(${theme.header.height.sm} + ${theme.space._24})`,
    },
  },
]);

  globalStyle(`${par} strong`, {
    fontWeight: theme.typography.fontWeight.medium,
  });

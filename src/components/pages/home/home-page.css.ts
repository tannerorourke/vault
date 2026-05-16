import { style } from "@vanilla-extract/css";
import { theme } from "@/lib/theme/theme.css";
import { mq } from "@/lib/theme/responsive.css";
import { page } from "@/lib/styles/page.css";

export const root = style([
  page,
  {
    zIndex: theme.layout.zIndex.content,
  }
]);

    export const sectionHeader = style({
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: theme.space._16,
      borderBottom: `1px solid ${theme.color.divider}`,
      paddingBottom: theme.space._12,
      marginBottom: theme.space._24,
    });

    export const sectionTitle = style({
      fontFamily: "var(--font-display)",
      fontSize: theme.typography.fontSize.bodySm,
      fontWeight: theme.typography.fontWeight.semibold,
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      color: theme.color.text.secondary,
      margin: 0,
    });

    export const sectionCount = style({
      fontSize: theme.typography.fontSize.caption,
      fontWeight: theme.typography.fontWeight.medium,
      color: theme.color.text.secondary,
    });

export const grid = style({
  display: "grid",
  marginInline: "auto",

  // xs: full width single col, v gap only
  gridTemplateColumns: "minmax(0, 1fr)",
  rowGap: theme.space._16,
  columnGap: 0,

  [mq.sm]: {
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    rowGap: theme.space._24,
    columnGap: theme.space._36,
  },
  [mq.md]: {
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    rowGap: theme.space._36,
    columnGap: theme.space._48,
  },
  [mq.lg]: {
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 360px))",
    maxWidth: `${5 * 360 + 4 * 48}px`, // ~1992px, caps growth on ultrawide
  },
});

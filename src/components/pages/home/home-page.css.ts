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
      fontSize: "13px",
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
  // maxWidth: "1400px",
  // gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
  // gridAutoRows: "1fr", // every row equal-height to the tallest in row
  gap: `${theme.space._16} ${theme.space._24}`, // theme.space._16,
  [mq.sm]: {
    gap: `${theme.space._24} ${theme.space._36}`, // theme.space._24,
  },
  [mq.lg]: {
    gap: `${theme.space._36} ${theme.space._48}`, // theme.space._36,
  },
});

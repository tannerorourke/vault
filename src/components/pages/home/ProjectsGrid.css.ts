import { style } from "@vanilla-extract/css";
import { theme } from "@/lib/theme/theme.css";
import { mq } from "@/lib/theme/responsive.css";

const DIVIDER = "1px solid rgba(0,0,0,0.08)";

export const section = style({
  display: "flex",
  flexDirection: "column",
  padding: `${theme.space._36} ${theme.space._24} ${theme.space._48}`,
  [mq.md]: {
    padding: `${theme.space._36} ${theme.space._48} ${theme.space._48}`,
  },
});

export const sectionHeader = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: theme.space._16,
  borderBottom: DIVIDER,
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
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: theme.space._20,
});

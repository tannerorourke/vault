import { style } from "@vanilla-extract/css";
import { theme } from "@/lib/theme/theme.css";
import { mq } from "@/lib/theme/responsive.css";

export const section = style({
  display: "flex",
  flexDirection: "column",
  marginTop: theme.layout.headerOffset.xs,
  padding: `0 ${theme.space._24}`,
  [mq.sm]: { 
    padding: `0 ${theme.space._48}`,
    marginTop: theme.layout.headerOffset.sm,
  },
  [mq.md]: { 
    padding: `0 ${theme.space._80}`,
    marginTop: theme.layout.headerOffset.md, 
  },
  transition: "margin-top 220ms ease 80ms, padding 220ms ease"
});

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
  gridTemplateColumns: "1fr",
  gap: theme.space._16,
  [mq.sm]: {
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: theme.space._20,
  },
  [mq.lg]: {
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: theme.space._36,
  },
  [mq.xl]: {
    gridTemplateColumns: "repeat(4, 1fr)",
  },
});

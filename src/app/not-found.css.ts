import { style } from "@vanilla-extract/css";
import { theme } from "@/lib/theme/theme.css";
import { mq } from "@/lib/theme/responsive.css";


export const page = style({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  gap: "16px",
  padding: `0 ${theme.page.gutter.xs}`,
  [mq.sm]: { 
    padding: `0 ${theme.page.gutter.sm}`
  },
  [mq.md]: {
    padding: `0 ${theme.page.gutter.md}`
  },
  [mq.lg]: {
    padding: `0 ${theme.page.gutter.md}`
  }
});

export const link = style({
  fontWeight: theme.typography.fontWeight.semibold
});
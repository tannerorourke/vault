import { style } from "@vanilla-extract/css";
import { theme } from "@/lib/theme/theme.css";

export const sheet = style({
  background: theme.sheet.bg,
  backdropFilter: `blur(${theme.sheet.blur})`,
  WebkitBackdropFilter: `blur(${theme.sheet.blur})`,
  border: theme.sheet.border,
  borderRadius: theme.sheet.radius,
  boxShadow: theme.sheet.shadow,
});

export const sheetCopper = style({
  borderLeft: `2px solid ${theme.color.secondary.main}`,
});

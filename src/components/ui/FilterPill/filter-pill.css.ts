import { globalStyle, style } from "@vanilla-extract/css";
import { theme } from "@/lib/theme/theme.css";
import { darkTheme } from "@/lib/theme/theme.css";

export const pill = style({
  fontFamily: "var(--font-body)",
  fontSize: "14px",
  fontWeight: theme.typography.fontWeight.medium,
  letterSpacing: "-0.005em",
  color: theme.color.text.secondary,
  padding: "6px 2px",
  border: "none",
  background: "transparent",
  cursor: "pointer",
  whiteSpace: "nowrap",
  lineHeight: 1,

  backgroundImage: `linear-gradient(${theme.color.primary.hover}, ${theme.color.primary.hover})`,
  backgroundSize: "0% 2px",
  backgroundPosition: "bottom left",
  backgroundRepeat: "no-repeat",
  transition: "color 200ms ease, background-size 300ms ease",

  selectors: {
    "&:hover": {
      color: theme.color.primary.main,
    },
    "&:hover, &[aria-pressed='true']": {
      backgroundSize: "100% 2px",
    },
    '&[aria-pressed="true"]': {
      color: theme.color.secondary.active,
      backgroundImage: `linear-gradient(${theme.color.secondary.main}, ${theme.color.secondary.main})`,
    },
  },
});

globalStyle(`:where(.${darkTheme}) .${pill}:hover`, {
  color: theme.color.primary.hover,
});

globalStyle(`:where(.${darkTheme}) .${pill}[aria-pressed="true"]`, {
  color: theme.color.secondary.hover,
  backgroundImage: `linear-gradient(${theme.color.secondary.main}, ${theme.color.secondary.main})`,
});

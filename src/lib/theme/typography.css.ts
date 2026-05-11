import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { theme } from "./theme.css";

const base = style({
  margin: 0,
  color: theme.color.text.primary,
});

export const textRecipe = recipe({
  base,
  variants: {
    variant: {
      display: {
        fontSize: theme.typography.fontSize.display,
        lineHeight: theme.typography.lineHeight.tight,
        fontWeight: theme.typography.fontWeight.bold,
        letterSpacing: theme.typography.letterSpacing.tight,
      },
      titleLg: {
        fontSize: theme.typography.fontSize.titleLg,
        lineHeight: theme.typography.lineHeight.snug,
        fontWeight: theme.typography.fontWeight.bold,
        letterSpacing: theme.typography.letterSpacing.tight,
      },
      titleMd: {
        fontSize: theme.typography.fontSize.titleMd,
        lineHeight: theme.typography.lineHeight.snug,
        fontWeight: theme.typography.fontWeight.semibold,
      },
      titleSm: {
        fontSize: theme.typography.fontSize.titleSm,
        lineHeight: theme.typography.lineHeight.normal,
        fontWeight: theme.typography.fontWeight.semibold,
      },
      bodyLg: {
        fontSize: theme.typography.fontSize.bodyLg,
        lineHeight: theme.typography.lineHeight.relaxed,
        fontWeight: theme.typography.fontWeight.regular,
      },
      body: {
        fontSize: theme.typography.fontSize.body,
        lineHeight: theme.typography.lineHeight.relaxed,
        fontWeight: theme.typography.fontWeight.regular,
      },
      bodySm: {
        fontSize: theme.typography.fontSize.bodySm,
        lineHeight: theme.typography.lineHeight.relaxed,
        fontWeight: theme.typography.fontWeight.regular,
      },
      uiLg: {
        fontSize: theme.typography.fontSize.body,
        lineHeight: theme.typography.lineHeight.normal,
        fontWeight: theme.typography.fontWeight.semibold,
      },
      ui: {
        fontSize: theme.typography.fontSize.ui,
        lineHeight: theme.typography.lineHeight.normal,
        fontWeight: theme.typography.fontWeight.medium,
      },
      caption: {
        fontSize: theme.typography.fontSize.caption,
        lineHeight: theme.typography.lineHeight.normal,
        fontWeight: theme.typography.fontWeight.regular,
        color: theme.color.text.secondary,
      },
      micro: {
        fontSize: theme.typography.fontSize.micro,
        lineHeight: theme.typography.lineHeight.normal,
        fontWeight: theme.typography.fontWeight.medium,
        color: theme.color.text.secondary,
      },
    },

    tone: {
      primary: { color: theme.color.text.primary },
      secondary: { color: theme.color.text.secondary },
    },

    truncate: {
      true: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      },
      false: {},
    },
  },

  defaultVariants: {
    variant: "body",
    tone: "primary",
    truncate: false,
  },
});

export type TextVariant = NonNullable<Parameters<typeof textRecipe>[0]>["variant"];
export type TextTone = NonNullable<Parameters<typeof textRecipe>[0]>["tone"];

import { recipe } from "@vanilla-extract/recipes";
import { theme } from "./theme.css";

export const textRecipe = recipe({
  variants: {
    tone: {
      primary: { color: theme.color.text.primary },
      secondary: { color: theme.color.text.secondary },
      title: { color: theme.color.primary.main }
    },

    truncate: {
      true: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      },
      false: {},
    },

    variant: {
      displayLg: {
        fontFamily: theme.typography.fontFamily.display,
        fontSize: theme.typography.fontSize.displayLg,
        lineHeight: theme.typography.lineHeight.tight,
        fontWeight: theme.typography.fontWeight.bold,
        letterSpacing: theme.typography.letterSpacing.tighter
      },
      display: {
        fontFamily: theme.typography.fontFamily.display,
        fontSize: theme.typography.fontSize.display,
        lineHeight: theme.typography.lineHeight.tight,
        fontWeight: theme.typography.fontWeight.bold,
        letterSpacing: theme.typography.letterSpacing.tighter
      },
      titleLg: {
        fontFamily: theme.typography.fontFamily.display,
        fontSize: theme.typography.fontSize.titleLg,
        lineHeight: theme.typography.lineHeight.snug,
        fontWeight: theme.typography.fontWeight.bold,
        letterSpacing: theme.typography.letterSpacing.tighter
      },
      titleMd: {
        fontFamily: theme.typography.fontFamily.display,
        fontSize: theme.typography.fontSize.titleMd,
        lineHeight: theme.typography.lineHeight.snug,
        fontWeight: theme.typography.fontWeight.semibold,
        letterSpacing: theme.typography.letterSpacing.tight
      },
      titleSm: {
        fontFamily: theme.typography.fontFamily.display,
        fontSize: theme.typography.fontSize.titleSm,
        lineHeight: theme.typography.lineHeight.normal,
        fontWeight: theme.typography.fontWeight.semibold,
        letterSpacing: theme.typography.letterSpacing.tight
      },
      titleXs: {
        fontFamily: theme.typography.fontFamily.display,
        fontSize: theme.typography.fontSize.titleXs,
        lineHeight: theme.typography.lineHeight.snug,
        fontWeight: theme.typography.fontWeight.semibold,
        letterSpacing: theme.typography.letterSpacing.tight
      },
      bodyLg: {
        fontFamily: theme.typography.fontFamily.serif,
        fontSize: theme.typography.fontSize.bodyLg,
        lineHeight: theme.typography.lineHeight.relaxed,
        fontWeight: theme.typography.fontWeight.regular,
      },
      body: {
        fontFamily: theme.typography.fontFamily.serif,
        fontSize: theme.typography.fontSize.body,
        lineHeight: theme.typography.lineHeight.relaxed,
        fontWeight: theme.typography.fontWeight.regular,
      },
      bodySm: {
        fontFamily: theme.typography.fontFamily.serif,
        fontSize: theme.typography.fontSize.bodySm,
        lineHeight: theme.typography.lineHeight.relaxed,
        fontWeight: theme.typography.fontWeight.medium,
      },
      caption: {
        fontSize: theme.typography.fontSize.caption,
        lineHeight: theme.typography.lineHeight.normal,
        fontWeight: theme.typography.fontWeight.regular,
        // color: theme.color.text.secondary,
      },
      micro: {
        fontSize: theme.typography.fontSize.micro,
        lineHeight: theme.typography.lineHeight.normal,
        fontWeight: theme.typography.fontWeight.medium,
        // color: theme.color.text.secondary,
      },
    }
  },

  defaultVariants: {
    variant: "body",
    truncate: false,
  },
});

export type TextVariant = NonNullable<Parameters<typeof textRecipe>[0]>["variant"];
export type TextTone = NonNullable<Parameters<typeof textRecipe>[0]>["tone"];

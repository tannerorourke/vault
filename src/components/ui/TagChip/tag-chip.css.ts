import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { theme } from "@/lib/theme/theme.css";

const base = style({
  display: "inline-flex",
  alignItems: "center",
  fontSize: theme.typography.fontSize.micro,
  fontWeight: theme.typography.fontWeight.semibold,
  borderRadius: "4px",
  padding: "3px 7px",
  whiteSpace: "nowrap",
});

export const tagChip = recipe({
  base,
  variants: {
    color: {
      teal: {
        color: theme.color.primary.main,
        background: theme.color.tint.primarySoft,
      },
      copper: {
        color: theme.color.secondary.active,
        background: theme.color.tint.secondarySoft,
      },
      grey: {
        color: theme.color.text.secondary,
        background: theme.color.tint.neutralSoft,
      },
    },
  },
  defaultVariants: {
    color: "teal",
  },
});

export type TagChipColor = NonNullable<
  NonNullable<Parameters<typeof tagChip>[0]>["color"]
>;

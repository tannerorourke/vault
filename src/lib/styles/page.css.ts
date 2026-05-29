/**
 * 1. If multiple *.css.ts files need the same raw rule fragment, 
 * export a plain satisfies ComplexStyleRule object. 
 * 
 * 2. If a JSX element needs parametric variants, keep the recipe 
 * and compose at the JSX site (or via style([...]) if the variant 
 * is fixed)
 */
import type { ComplexStyleRule } from '@vanilla-extract/css';

import { theme } from "@/lib/theme/theme.css";
import { mq } from "@/lib/theme/responsive.css";
import { EASE_CUBIC } from './utils.css';


export const page = {
  position: "relative",
  width: "100%",
  padding: `0 ${theme.page.gutter.xs}`,
  margin: `calc(${theme.header.offset.xs}) auto ${theme.page.marginBottom.xs}`,
  transition: `margin 400ms ${EASE_CUBIC}, padding 400ms ${EASE_CUBIC}`,
  [mq.sm]: { 
    padding: `0 ${theme.page.gutter.sm}`,
    margin: `calc(${theme.header.offset.sm}) auto ${theme.page.marginBottom.sm}`,
    maxWidth: theme.page.maxContentWidth.sm,
  },
  [mq.md]: {
    padding: `0 ${theme.page.gutter.md}`,
    margin: `calc(${theme.header.offset.md}) auto ${theme.page.marginBottom.md}`,
    width: theme.page.maxContentWidth.md,
    maxWidth: '100vw',
  },
  [mq.lg]: {
    padding: `0 ${theme.page.gutter.md}`,
    margin: `calc(${theme.header.offset.md}) auto ${theme.page.marginBottom.lg}`,
    width: theme.page.maxContentWidth.lg,
    maxWidth: theme.page.maxContentWidth.lg,
  }
} satisfies ComplexStyleRule;




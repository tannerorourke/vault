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


export const SLOW_SNAP = "cubic-bezier(.4,0, .6,1)"


export const page = {
  position: "relative",
  zIndex: theme.layout.zIndex.content,
  width: "100%",
  height: "100%",
  padding: `0 ${theme.space._24}`,
  margin: `${theme.layout.headerOffset.xs} auto ${theme.space._96}`,
  [mq.sm]: { 
    padding: `0 ${theme.space._24}`,
    margin: `${theme.layout.headerOffset.sm} 0 ${theme.space._96}`,
  },
  [mq.md]: {
    padding: `0 ${theme.space._96}`,
    margin: `${theme.layout.headerOffset.md} 0 ${theme.space._96}`,
  },
  [mq.lg]: {
    padding: `0 ${theme.space._112}`,
    margin: `${theme.layout.headerOffset.md} 0 ${theme.space._96}`,
  },
  transition: `padding 500ms ${SLOW_SNAP}`
} satisfies ComplexStyleRule;




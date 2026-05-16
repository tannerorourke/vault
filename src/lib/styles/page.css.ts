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


const SLOW_SNAP = "cubic-bezier(.4,0, .6,1)"

export const page = {
  position: "relative",
  zIndex: theme.layout.zIndex.content,
  width: "100%",
  margin: "0 auto",
  marginTop: theme.layout.headerOffset.xs,
  padding: `0 ${theme.space._24} ${theme.space._80}`,
  [mq.sm]: { 
    padding: `0 ${theme.space._24} ${theme.space._96}`,
    marginTop: theme.layout.headerOffset.sm,
  },
  [mq.md]: {
    padding: `0 ${theme.space._80} ${theme.space._96}`,
    marginTop: theme.layout.headerOffset.md, 
  },
  [mq.lg]: {
    padding: `0 ${theme.space._96} ${theme.space._96}`,
    marginTop: theme.layout.headerOffset.md,
  },
  transition: `margin-top 220ms ${SLOW_SNAP} 80ms, padding 500ms ${SLOW_SNAP}`
} satisfies ComplexStyleRule;




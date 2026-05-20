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
  margin: "0 auto",
  padding: `${theme.layout.headerOffset.xs} ${theme.space._24} ${theme.space._80}`,
  [mq.sm]: { 
    padding: `${theme.layout.headerOffset.sm} ${theme.space._24} ${theme.space._96}`,
  },
  [mq.md]: {
    padding: `${theme.layout.headerOffset.md} ${theme.space._96} ${theme.space._96}`,
  },
  [mq.lg]: {
    padding: `${theme.layout.headerOffset.md} ${theme.space._112} ${theme.space._96}`,
  },
  transition: `padding 500ms ${SLOW_SNAP}`
} satisfies ComplexStyleRule;




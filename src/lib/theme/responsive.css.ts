import { createVar, globalStyle, type GlobalStyleRule } from "@vanilla-extract/css";

export const breakpoints = {
  xs: 0, // phones (default)
  sm: 560, // phone landscape / small tablet portrait  multi-col becomes viable
  md: 900, // tablet landscape / standard laptop  comfortable two-up
  lg: 1620, // large desktop  start using the extra space
};

/**
 * Custom media query utility to easily write responsive styles for 
 * site-wide breakpoints as `[mq.sm] { ... }`, `[mq.md] { ... }`, etc"
 */
type BreakpointKey = keyof typeof breakpoints;

export const mq = (Object.keys(breakpoints)  as BreakpointKey[]).reduce(
  (acc: Record<string, string>, key) => {
    acc[key] = `@media (min-width: ${breakpoints[key]}px)`;
    return acc;
  }, {} as Record<BreakpointKey, `@media (min-width: ${number}px)`>
);

/**
 * Fluid design token. Calculate an exact value on the 
 * range [min, max] between the given viewport width range [startVw, endVw].
 */
export const fluid = (
  min: number, max: number, 
  startVw: number, endVw: number
) =>
  `clamp(${min}px, calc(${min}px + ${max - min} * (100vw - ${startVw}px) / ${endVw - startVw}), ${max}px)`;

/**
 * Viewport-relative size that equals `px` at the `lg` breakpoint and keeps
 * growing with the viewport above it. Use as the top (`lg`) stop of a
 * `stepped()` token so text scales on very large / zoomed-out screens instead
 * of staying a fixed size and looking tiny. Seamless by construction: at
 * `lg` it resolves to exactly `px`, matching the preceding step.
 */
export const vwFromLg = (px: number) =>
  `calc(${px} / ${breakpoints.lg / 100} * 1vw)`;

const toCSS = (v: number | string) =>
  typeof v === 'number' ? `${v}px` : v;

/**
 * Stepped responsive token.
 * Returns a CSS var reference; callers assign it as a theme token value.
 *
 *   stepped({ xs: 15, sm: 16, lg: 17 })
 *   stepped({ xs: 11, sm: 12 })         // md/lg inherit sm
 *   stepped({ xs: 11, sm: 12 '768': 16 }) // custom breakpoint
 */
export function stepped(
  stops: Partial<Record<BreakpointKey, number | string>> & { [px: number]: number | string }
): string {
  const v = createVar();

  const entries = (Object.entries(stops) as [string, number | string][])
    .map(([key, val]): [number, number | string] => [
      key in breakpoints ? breakpoints[key as BreakpointKey] : parseInt(key, 10),
      val,
    ])
    .sort(([a], [b]) => a - b);
  
  const rule: GlobalStyleRule = {};
  const media: Record<string, GlobalStyleRule> = {};

  for (const [px, val] of entries) {
    if (px === 0) {
      rule.vars = { [v]: toCSS(val) };
    } else {
      media[`(min-width: ${px}px)`] = { vars: { [v]: toCSS(val) } };
    }
  }

  if (Object.keys(media).length) rule["@media"] = media;

  globalStyle(":root", rule);
  return v;
}

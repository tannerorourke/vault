import { createVar, globalStyle } from "@vanilla-extract/css";

export const breakpoints = {
  xs: 0, // phones (default)
  sm: 560, // phone landscape / small tablet portrait  multi-col becomes viable
  md: 900, // tablet landscape / standard laptop  comfortable two-up
  lg: 1620, // large desktop  start using the extra space
};

type BreakpointKey = keyof typeof breakpoints;

export const mq = (Object.keys(breakpoints)  as BreakpointKey[]).reduce(
  (acc: Record<string, string>, key) => {
    acc[key] = `@media (min-width: ${breakpoints[key]}px)`;
    return acc;
  }, {} as Record<BreakpointKey, `@media (min-width: ${number}px)`>
);

const toCSS = (v: number | string) => 
  typeof v === 'number' ? `${v}px` : v;

/**
 * Stepped responsive token.
 * Returns a CSS var reference; callers assign it as a theme token value.
 *
 *   stepped({ xs: 15, sm: 16, lg: 17 })
 *   stepped({ xs: 11, sm: 12 })         // md/lg inherit sm
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
  
  const rule: Record<string, unknown> = {};

  for (const [px, val] of entries) {
    if (px === 0) {
      rule.vars = { [v]: toCSS(val) };
    } else {
      rule[`@media (min-width: ${px}px)`] = { vars: { [v]: toCSS(val) } };
    }
  }

  globalStyle(':root', rule as Parameters<typeof globalStyle>[1]);
  return v;
}

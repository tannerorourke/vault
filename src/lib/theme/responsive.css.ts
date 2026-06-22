import { createVar, globalStyle, style, type GlobalStyleRule } from "@vanilla-extract/css";

export const breakpoints = {
  xs: 0,
  sm: 560,
  md: 900,
  lg: 1620,
};

/**
 * Custom media query utility to write material-ui-style 
 * breakpoints (`[mq.sm] { ... }`, `[mq.md] { ... }`, etc)"
 */
type BreakpointKey = keyof typeof breakpoints;

export const mq = (Object.keys(breakpoints)  as BreakpointKey[]).reduce(
  (acc: Record<string, string>, key) => {
    acc[key] = `@media (min-width: ${breakpoints[key]}px)`;
    return acc;
  }, {} as Record<BreakpointKey, `@media (min-width: ${number}px)`>
);

export const fluid = (
  min: number, max: number, 
  startVw: number, endVw: number
) =>
  `clamp(${min}px, calc(${min}px + ${max - min} * (100vw - ${startVw}px) / ${endVw - startVw}), ${max}px)`;

export const vwFromLg = (px: number) =>
  `calc(${px} / ${breakpoints.lg / 100} * 1vw)`;

const toCSS = (v: number | string) =>
  typeof v === 'number' ? `${v}px` : v;

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

/** ANIMATION */
export const srOnly: GlobalStyleRule = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: '0',
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
};

export const srOnlyCls = style(srOnly);

export const EASE_CUBIC = `cubic-bezier(.2,.1,.2,1)`;

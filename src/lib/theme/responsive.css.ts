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

import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import { theme } from "./theme.css";

export const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

type BreakpointKey = keyof typeof breakpoints;

export const mq = (Object.keys(breakpoints)  as BreakpointKey[]).reduce(
  (acc: Record<string, string>, key) => {
    acc[key] = `@media (min-width: ${breakpoints[key]}px)`;
    return acc;
  }, {} as Record<BreakpointKey, `@media (min-width: ${number}px)`>
);

export const mqArray = (Object.keys(breakpoints)  as BreakpointKey[]).map(
  key => `@media (min-width: ${breakpoints[key]}px)`
);

const sprinkles = defineProperties({
  conditions: {
    xs: {},
    sm: { "@media": `screen and (min-width: ${breakpoints.sm}px)` },
    md: { "@media": `screen and (min-width: ${breakpoints.md}px)` },
    lg: { "@media": `screen and (min-width: ${breakpoints.lg}px)` },
    xl: { "@media": `screen and (min-width: ${breakpoints.xl}px)` },
  },
  defaultCondition: "xs",
  // add properties to do classical { xs: ... } styles in responsive({ ... })
  properties: {
    display: ['none', 'flex', 'block', 'inline'],
    flexDirection: ['row', 'column'],
    justifyContent: [
      'stretch', 'flex-start', 'center', 
			'flex-end', 'space-around', 'space-between'
    ],
    alignItems: ['stretch', 'flex-start', 'center', 'flex-end'],
    gap: theme.space,
    padding: theme.space,
    paddingTop: theme.space,
    paddingBottom: theme.space,
    paddingLeft: theme.space,
    paddingRight: theme.space,
    margin: theme.space,
    marginTop: theme.space,
    marginBottom: theme.space,
    marginLeft: theme.space,
    marginRight: theme.space,
  },
});

export const responsive = createSprinkles(sprinkles);
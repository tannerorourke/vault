import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import { vars } from "./theme.css";

export const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

export const mq = Object.keys(breakpoints).reduce(
  (acc: Record<string, string>, key) => {
    acc[key] = `@media (min-width: ${breakpoints[key as keyof typeof breakpoints]}px)`;
    return acc;
  }, {}
);

export const mqArray = Object.keys(breakpoints).map(
  key => `@media (min-width: ${breakpoints[key as keyof typeof breakpoints]}px)`
);


const responsive = defineProperties({
  conditions: {
    xs: {},
    sm: { "@media": `screen and (min-width: ${breakpoints.sm}px)` },
    md: { "@media": `screen and (min-width: ${breakpoints.md}px)` },
    lg: { "@media": `screen and (min-width: ${breakpoints.lg}px)` },
    xl: { "@media": `screen and (min-width: ${breakpoints.xl}px)` },
  },
  defaultCondition: "xs",
	// Add properties when they need to be responsive customized
  properties: {
    display: ['none', 'flex', 'block', 'inline'],
    flexDirection: ['row', 'column'],
    justifyContent: [
      'stretch', 'flex-start', 'center', 
			'flex-end', 'space-around', 'space-between'
    ],
    alignItems: ['stretch', 'flex-start', 'center', 'flex-end'],
    paddingTop: vars.space,
    paddingBottom: vars.space,
    paddingLeft: vars.space,
    paddingRight: vars.space,
    gap: vars.space,
  },
});

export const sprinkles = createSprinkles(responsive);
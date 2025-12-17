import { createTheme, createThemeContract } from "@vanilla-extract/css";

export const vars = createThemeContract({
  canvas: null,
  card: null,
  text: {
      primary: null,
      secondary: null
  },
  primary: {
      main: null,
      hover: null,
      active: null
  },
  secondary: {
      main: null,
      hover: null,
      active: null
  },
  link: {
      main: null, /* Spruce Teal */
      hover: null, /* Copper */
  },
  error: null,
  warning: null,
  shadow: null,
  contrast: null,
  space: {
      none: null,
      small: null,
      medium: null,
      large: null
    }
});

export const themeClass = createTheme(vars, {
    /* --- Backgrounds --- */
    canvas: '#F4F6F5',
    card: '#FFFFFF',
    text: {
        primary: '#1C2321', /* Deep Obsidian */
        secondary: '#5D6D68', /* Moss Grey */
    },
    primary: {
        main: '#2A5F58', /* Spruce Teal */
        hover: '#538D84', /* Lighter Teal */
        active: '#538D84', /* Deep teal for active states */
    },
    secondary: {
        main: '#E07A5F', /* Copper */
        hover: '#FFAB8D', /* Lighter Copper */
        active: '#AA4B34', /* Burnt Clay */
    },
    link: {
        main: '#2A5F58', /* Spruce Teal */
        hover: '#E07A5F', /* Copper */
    },
    error: '#D32F2F',
    warning: '#ED6C02',
    shadow: 'rgba(42, 95, 88, 0.12)',
    contrast: 'FFFFFF',
    space: {
      none: '0px',
      small: '4px',
      medium: '8px',
      large: '16px'
    }
});
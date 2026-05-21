import { style } from '@vanilla-extract/css';
import { theme } from '@/lib/theme/theme.css';

export const canvas = style({
  position: 'fixed',
  inset: 0,
  width: '100vw',
  height: '100vh',
  display: 'block',
  zIndex: 0,
  backgroundColor: theme.color.canvas,
});

// Bottom gradient dissolves scatter into the page body
export const fadeBottom = style({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  minHeight: theme.layout.footerHeight,
  height: '10vh',
  background: `linear-gradient(to bottom, transparent, ${theme.color.canvas})`,
  pointerEvents: 'none',
  zIndex: 1,
});

export const fadeVignette = style({
  position: 'absolute',
  inset: 0,
  background: `radial-gradient(ellipse at 50% 40%, transparent 38%, color-mix(in srgb, ${theme.color.canvas} 50%, transparent) 100%)`,
  pointerEvents: 'none',
  zIndex: 1,
});

// Slot for name, nav, etc. - sits above canvas + overlays
export const content = style({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: '0 48px 48px',

  '@media': {
    '(max-width: 640px)': {
      padding: '0 24px 32px',
    },
  },
});

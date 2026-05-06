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
  height: '20vh',
  background: `linear-gradient(to bottom, transparent, ${theme.color.canvas})`,
  pointerEvents: 'none',
  zIndex: 1,
});

// Radial vignette pulls visual focus toward center text
export const fadeVignette = style({
  position: 'absolute',
  inset: 0,
  background: `radial-gradient(ellipse at 50% 40%, transparent 38%, color-mix(in srgb, ${theme.color.canvas} 50%, transparent) 100%)`,
  pointerEvents: 'none',
  zIndex: 1,
});

// Sentinel - lives in normal document flow, reserves the vertical space above
// content so the fixed canvas appears to "be" there. Height is passed as a
// prop via inline style (defaults to 100dvh).
export const sentinel = style({
  position: 'relative',
  width: '100%',
  zIndex: 2, // above canvas + overlays so pointer events work on children
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

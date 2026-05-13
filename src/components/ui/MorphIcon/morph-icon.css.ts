import { style } from '@vanilla-extract/css';
import { theme } from '@/lib/theme/theme.css';

export const morphWrap = style({
  position: 'relative',
  display: "inline-block",
  width: '20px',
  height: '20px',
});

export const layer = style({
  position: 'absolute',
  inset: 0,
  width: "100%",
  height: "100%",
  transition: 'opacity 300ms ease, transform 300ms ease',

  '@media': {
    '(prefers-reduced-motion: reduce)': { transition: 'none' },
  },
});

export const shown  = style({ 
  opacity: 1, 
  transform: "rotate(0) scale(1)" 
});

export const hidden = style({ 
  opacity: 0, 
  transform: "rotate(-90deg) scale(0.7)" 
});
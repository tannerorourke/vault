import { style } from '@vanilla-extract/css';
import { theme } from '@/lib/theme/theme.css';

export const buttonRoot = style({
  position: 'fixed',
  bottom: '24px',
  right: '24px',
  width: '44px',
  height: '44px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  border: 'none',
  background: theme.color.card,
  color: theme.color.text.primary,
  boxShadow: `0 4px 20px -2px ${theme.color.shadow}`,
  transition: 'background-color 300ms ease, color 300ms ease, box-shadow 300ms ease',
  zIndex: 100,
  outline: 'none',

  ':focus-visible': {
    outline: `2px solid ${theme.color.primary.hover}`,
    outlineOffset: '2px',
  },
});

export const iconWrapper = style({
  position: 'relative',
  width: '20px',
  height: '20px',
});

export const moonIcon = style({
  position: 'absolute',
  inset: 0,
  opacity: 1,
  transform: 'rotate(0deg) scale(1)',
  transition: 'opacity 300ms ease, transform 300ms ease',

  '@media': {
    '(prefers-reduced-motion: reduce)': {
      transition: 'none',
    },
  },
});

export const moonIconDark = style({
  opacity: 0,
  transform: 'rotate(-90deg) scale(0.7)',
});

export const sunIcon = style({
  position: 'absolute',
  inset: 0,
  opacity: 0,
  transform: 'rotate(90deg) scale(0.7)',
  transition: 'opacity 300ms ease, transform 300ms ease',

  '@media': {
    '(prefers-reduced-motion: reduce)': {
      transition: 'none',
    },
  },
});

export const sunIconDark = style({
  opacity: 1,
  transform: 'rotate(0deg) scale(1)',
});

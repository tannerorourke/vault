import { recipe } from '@vanilla-extract/recipes';
import type { ComplexStyleRule } from '@vanilla-extract/css';

const BLUR_W = 16


// Shared pseudo-element base - everything except position/mask
const pseudoBase: ComplexStyleRule = {
  content: '""',
  position: 'absolute',
  pointerEvents: 'none',
  zIndex: -1,
};

// Helper to build a directional variant: position + linear mask
const directional = (
  inset: string,
  gradientDir: string,
): ComplexStyleRule => ({
  selectors: {
    '&::before': {
      ...pseudoBase,
      inset,
      maskImage: `linear-gradient(${gradientDir}, black 0%, black 55%, transparent 100%)`,
      WebkitMaskImage: `linear-gradient(${gradientDir}, black 0%, black 55%, transparent 100%)`,
    },
  },
});


export const blurFade = recipe({
  base: {
    position: 'relative',
    isolation: 'isolate',
  },
  variants: {
      direction: {
        bottom: directional('0 0 -40px 0', 'to bottom'),
        top:    directional('-40px 0 0 0', 'to top'),
        all: {
          selectors: {
            '&::before': {
              ...pseudoBase,
              inset: '-20px',
              maskImage:
                `linear-gradient(to right, 
                  transparent 0px, black 20px, black calc(100% - 20px), transparent 100%),
                 linear-gradient(to bottom, 
                  transparent 0px, black 20px, black calc(100% - 20px), transparent 100%)`,
              maskComposite: 'intersect',
              webkitMaskImage:
                `linear-gradient(to right, 
                  transparent 0px, black 20px, black calc(100% - 20px), transparent 100%),
                 linear-gradient(to bottom, 
                  transparent 0px, black 20px, black calc(100% - 20px), transparent 100%)`,
              webkitMaskComposite: 'source-in'
            },
          },
        },
      },
      strength: {
        subtle: { selectors: { '&::before': { backdropFilter: 'blur(3px)',  WebkitBackdropFilter: 'blur(3px)'  } } },
        medium: { selectors: { '&::before': { backdropFilter: 'blur(6px)',  WebkitBackdropFilter: 'blur(6px)'  } } },
        strong: { selectors: { '&::before': { backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' } } },
      },
      rounded: {
        none: {},
        sm: { selectors: { '&::before': { borderRadius: '8px' } } },
        md: { selectors: { '&::before': { borderRadius: '16px' } } },
        lg: { selectors: { '&::before': { borderRadius: '24px' } } },
        full: { selectors: { '&::before': { borderRadius: '9999px' } } },
      },
  },
  defaultVariants: { 
    direction: 'bottom',
    strength: 'medium',
    rounded: 'none',
  },
});
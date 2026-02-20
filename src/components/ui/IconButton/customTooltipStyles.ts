export const tooltipArrowStyles = {
  display: 'flex',
  '&[dataSide="top"]': {
    bottom: '-8px',
    rotate: '180deg',
  },
  '&[dataSide="bottom"]': {
    top: '-8px',
    rotate: '0deg',
  },
  '&[dataSide="left"]': {
    right: '-13px',
    rotate: '90deg',
  },
  '&[dataSide="right"]': {
    left: '-13px',
    rotate: '-90deg',
  }
}

export const TooltipPopupStyles = {
  // boxSizing: 'border-box',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  display: 'flex',
  // flexDirection: 'column',
  padding: '0.25rem 0.5rem',
  borderRadius: '0.375rem',
  backgroundColor: 'canvas',
  transformOrigin: 'left',
  transition: 'transform 150ms, opacity 150ms',

  '&[dataStartingStyle], &[dataEndingStyle]': {
    opacity: 0,
    transform: 'scale(0.9)'
  },

  '&[dataInstant]': {
    transition: 'none'
  },
  '@media': {
    '(prefers-color-scheme: light)': {
      outline: '1px solid var(--color-gray-200)',
      boxShadow: '0 10px 15px -3px var(--color-gray-200) 0 4px 6px -4px var(--color-gray-200)',
    },

    '(prefers-color-scheme: dark)': {
      outline: '1px solid var(--color-gray-300)',
      outlineOffset: '-1px'
    }
  }
}
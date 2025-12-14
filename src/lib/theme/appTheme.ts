'use client';

import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { palette } from './colorPalette';

let theme = createTheme({
  palette: palette,
  typography: {
    fontFamily: 'var(--font-body), var(--font-display), system-ui, sans-serif',
    h1: { fontFamily: 'var(--font-display), system-ui, sans-serif', fontWeight: 700 },
    h2: { fontFamily: 'var(--font-display), system-ui, sans-serif', fontWeight: 700 },
    h3: { fontFamily: 'var(--font-display), system-ui, sans-serif', fontWeight: 700 },
    h4: { fontFamily: 'var(--font-display), system-ui, sans-serif', fontWeight: 700 },
    h5: { fontFamily: 'var(--font-display), system-ui, sans-serif', fontWeight: 700 },
    h6: { fontFamily: 'var(--font-display), system-ui, sans-serif', fontWeight: 700 },
    button: { textTransform: 'none' }, // Remove default uppercase
  },
  components: {
    // Override global defaults here
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8 }, // Modern soft edges
      },
    },
  },
});

// Auto-scale fonts for mobile/desktop
theme = responsiveFontSizes(theme);

export default theme;
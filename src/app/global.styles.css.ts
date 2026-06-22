import { globalStyle } from '@vanilla-extract/css';
import { theme } from '@/lib/theme/theme.css';

globalStyle('body', {
  color: theme.color.text.primary,
  background: theme.color.canvas,
  fontOpticalSizing: 'auto',
});

globalStyle('a', {
  color: theme.color.link.main,
});

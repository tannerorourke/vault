import { globalStyle } from '@vanilla-extract/css';
import { theme } from '@/lib/theme/theme.css';

globalStyle('body', {
  color: theme.color.text.primary,
  background: theme.color.canvas,
});

globalStyle('a', {
  color: theme.color.link.main,
});

globalStyle('h1, h2, h3', {
  color: theme.color.primary.main,
});

globalStyle('h4, h5, h6', {
  color: theme.color.text.primary,
});

'use client';

import { useTheme } from '@/components/navigation/ThemeProvider';
import * as sty from './theme-toggle.css';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      className={sty.buttonRoot}
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
    >
      <span className={sty.iconWrapper}>
        {/* Moon (in light mode) */}
        <svg
          className={[sty.moonIcon, isDark ? sty.moonIconDark : ''].filter(Boolean).join(' ')}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <defs>
            <mask id="moon-mask">
              <rect width="20" height="20" fill="white" />
              <circle cx="13" cy="6" r="6" fill="black" />
            </mask>
          </defs>
          <circle cx="10" cy="10" r="7" mask="url(#moon-mask)" />
        </svg>

        {/* Sun (in dark mode) */}
        <svg
          className={[sty.sunIcon, isDark ? sty.sunIconDark : ''].filter(Boolean).join(' ')}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <circle cx="10" cy="10" r="4" />
          {/* 8 rays */}
          <rect x="9.25" y="1"   width="1.5" height="3" rx="0.75" />
          <rect x="9.25" y="16"  width="1.5" height="3" rx="0.75" />
          <rect x="1"   y="9.25" width="3"   height="1.5" rx="0.75" />
          <rect x="16"  y="9.25" width="3"   height="1.5" rx="0.75" />
          <rect x="3.4" y="3.4"  width="1.5" height="3" rx="0.75" transform="rotate(45 3.4 3.4)" />
          <rect x="14.1" y="3.4" width="1.5" height="3" rx="0.75" transform="rotate(-45 14.1 3.4)" />
          <rect x="3.4" y="14.1" width="1.5" height="3" rx="0.75" transform="rotate(-45 3.4 14.1)" />
          <rect x="14.1" y="14.1" width="1.5" height="3" rx="0.75" transform="rotate(45 14.1 14.1)" />
        </svg>
      </span>
    </button>
  );
}

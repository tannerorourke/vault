'use client';

import { createContext, useContext, useEffect, useState } from 'react';

import { lightTheme, darkTheme } from '@/lib/theme/theme.css';


type Theme = 'light' | 'dark';
const THEME_CLASS: Record<Theme, string> = { light: lightTheme, dark: darkTheme };

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
}

export function ThemeProvider({ 
  children,
  initialTheme,
  hasCookie
}: { 
  children: React.ReactNode,
  initialTheme: Theme;
  hasCookie: boolean;
}) {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  const swapTheme = (next: Theme) => {
      const prev: Theme = next === 'light' ? 'dark' : 'light';
      document.documentElement.classList.remove(THEME_CLASS[prev]);
      document.documentElement.classList.add(THEME_CLASS[next]);
      document.cookie = `theme=${next}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
      setTheme(next);
  }

  // First-visit only (no cookie):
  // - the server can't read prefers-color-scheme, render `initialTheme`
  // - After hydration: read the media query and correct once.
  //   Below setState-in-effect is simple solution to toggling theme without
  //   re-rendering the app or using an injected script.
  useEffect(() => {
    if (hasCookie) return; // server already rendered the right one
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const systemTheme: Theme = prefersDark ? "dark" : "light";

    if (systemTheme !== initialTheme) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      swapTheme(systemTheme);
    } else {
      document.cookie = `theme=${systemTheme}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
    }
  }, [initialTheme, hasCookie]);

  const toggleTheme = () => swapTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

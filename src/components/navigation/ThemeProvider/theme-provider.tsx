'use client';

import { createContext, useContext, useEffect, useState } from 'react';

import { lightTheme, darkTheme } from '@/lib/theme/theme.css';


type Theme = 'light' | 'dark';

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

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null;
    if (stored === 'dark') {
      setTheme('dark');
      document.documentElement.classList.remove(lightTheme);
      document.documentElement.classList.add(darkTheme);
    }
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === 'light' ? 'dark' : 'light';
    const nextClass = next === 'dark' ? darkTheme : lightTheme;
    const prevClass = next === 'dark' ? lightTheme : darkTheme;
    document.documentElement.classList.remove(prevClass);
    document.documentElement.classList.add(nextClass);
    localStorage.setItem('theme', next);
    setTheme(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

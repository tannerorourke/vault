'use client';

import { useTheme } from "@/components/providers/ThemeProvider";
import { Icon, IconButton } from "@/components/ui/Icon";
import MorphIcon from "@/components/ui/MorphIcon";

import * as sty from "./theme-toggle.css";


export type ThemeToggleProps = {
  variant?: "switch" | "icon";
  className?: string;
};

export function ThemeToggle({ variant = "switch", className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const morph = (
    <MorphIcon
      active={isDark}
      from={<Icon name="sun" size="lg" />}
      to={<Icon name="moon" size="lg" />}
    />
  );

  if (variant === "icon") {
    return (
      <IconButton
        variant="flat"
        onClick={toggleTheme}
        aria-pressed={isDark}
        alt={isDark ? "Switch to light mode" : "Switch to dark mode"}
        className={className}
      >
        {morph}
      </IconButton>
    );
  }

  return (
    <button
      type="button"
      className={[sty.row, className].filter(Boolean).join(" ")}
      onClick={toggleTheme}
      aria-pressed={isDark}
    >
      <span className={sty.icon}>{morph}</span>
      <span className={sty.label}>{isDark ? "Dark mode" : "Light mode"}</span>
      <span className={sty.dot} data-on={isDark} aria-hidden />
    </button>
  );
}

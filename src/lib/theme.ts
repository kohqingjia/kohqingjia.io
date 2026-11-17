// OWNER: Claude. Light/dark theme state. Default = dark (QJ's choice).
// The inline script in index.html applies the saved theme before first paint;
// this hook reads it on mount and applies + persists changes on toggle.
import { useCallback, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';
const KEY = 'theme';
/** Browser UI colour = the page canvas from src/index.css. */
const THEME_COLOR: Record<Theme, string> = { dark: '#0b0d14', light: '#f6f3ec' };

function current(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  root.style.colorScheme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme]);
}

export function useTheme() {
  // First render is always 'dark' so it matches the prerendered HTML (clean hydration).
  // The real theme was already applied to <html> by the pre-paint script; read it on mount.
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    setTheme(current());
  }, []);

  const toggle = useCallback(() => {
    const next: Theme = current() === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* private mode / blocked storage: the toggle still works for this visit */
    }
    setTheme(next);
  }, []);

  return { theme, toggle };
}

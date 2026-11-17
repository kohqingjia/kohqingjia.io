// OWNER: Claude. Light/dark theme state. Default = dark (QJ's choice).
// The inline script in index.html applies the saved theme before first paint;
// this hook keeps React in sync and persists changes.
import { useCallback, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';
const KEY = 'theme';
const THEME_COLOR: Record<Theme, string> = { dark: '#020617', light: '#ffffff' };

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
  const [theme, setTheme] = useState<Theme>(() => (typeof document === 'undefined' ? 'dark' : current()));

  useEffect(() => {
    applyTheme(theme);
    try {
      localStorage.setItem(KEY, theme);
    } catch {
      /* private mode / blocked storage: the toggle still works for this visit */
    }
  }, [theme]);

  const toggle = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), []);
  return { theme, toggle };
}

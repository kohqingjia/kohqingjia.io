import { useTheme } from '../lib/theme';
export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const next = theme === 'dark' ? 'light' : 'dark';
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        fill="currentColor"
        shapeRendering="crispEdges"
      >
        {theme === 'dark' ? (
          <path d="M9 1h2v3H9zM9 16h2v3H9zM1 9h3v2H1zM16 9h3v2h-3zM4 3h2v3H3V4h1zM14 3h2v1h1v2h-3zM3 14h3v3H4v-1H3zM14 14h3v2h-1v1h-2zM7 6h6v1h1v6h-1v1H7v-1H6V7h1z" />
        ) : (
          <path d="M8 2h4v2H9v2H7v6h2v2h6v-2h3v3h-2v2h-3v1H7v-1H4v-3H2V8h1V5h2V3h3z" />
        )}
      </svg>
    </button>
  );
}

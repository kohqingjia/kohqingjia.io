// OWNER: Codex (visual). Claude's skeleton: nav, skip link, footer, scroll restoration.
import { Link, NavLink, Outlet, ScrollRestoration } from 'react-router';
import { site } from '../data/site';
import ThemeToggle from './ThemeToggle';

const nav = [
  { to: '/#about', label: 'About' },
  { to: '/#experience', label: 'Experience' },
  { to: '/projects', label: 'Projects' },
  { to: '/#skills', label: 'Skills' },
  { to: '/#contact', label: 'Contact' },
];

export default function Layout() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-slate-900">
        Skip to content
      </a>
      <header className="sticky top-4 z-40 mx-auto mt-4 flex w-[min(100%-2rem,56rem)] items-center justify-between gap-4 rounded-full border border-slate-200 bg-white/90 px-4 py-2 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
        <Link to="/" className="font-mono text-sm font-medium">
          {site.short}
        </Link>
        <nav aria-label="Main" className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-300">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} className="hover:text-slate-900 dark:hover:text-white">
              {n.label}
            </NavLink>
          ))}
          <a href={site.links.resume} className="font-medium text-accent">
            Résumé
          </a>
        </nav>
        <ThemeToggle />
      </header>
      <main id="main" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <footer className="mx-auto mt-24 flex w-[min(100%-2rem,72rem)] flex-wrap justify-between gap-4 border-t border-slate-200 py-8 text-sm text-slate-500 dark:border-slate-800">
        <p>
          © {new Date().getFullYear()} {site.name} · {site.location}
        </p>
        <ul className="flex gap-4">
          <li><a href={site.links.resume}>Résumé</a></li>
          <li><a href={site.links.github} rel="me">GitHub</a></li>
          <li><a href={site.links.linkedin} rel="me">LinkedIn</a></li>
        </ul>
      </footer>
      <ScrollRestoration />
    </>
  );
}

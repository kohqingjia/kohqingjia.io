// Visual shell; routes, native fragment links and landmarks remain stable.
import { useRef } from 'react';
import { Link, Outlet, ScrollRestoration, useLocation } from 'react-router';
import type { MouseEvent } from 'react';
import { site } from '../data/site';
import ThemeToggle from './ThemeToggle';
import { DeckMark } from './NameDeck';
const nav = [
  { to: '/#about', label: 'About', icon: 'about' },
  { to: '/#experience', label: 'Journey', icon: 'experience' },
  { to: '/projects', label: 'Projects', icon: 'projects' },
  { to: '/#skills', label: 'Skills', icon: 'skills' },
  { to: '/#contact', label: 'Contact', icon: 'contact' },
];
export default function Layout() {
  const menu = useRef<HTMLDetailsElement>(null);
  const { pathname } = useLocation();
  // Router links (no full reloads). A section link on the page you're already on
  // glides to the section instead of teleporting; other pages navigate instantly
  // (a view transition here froze 100 ms+ while the big pages render) and ScrollRestoration lands on the #hash.
  const onNav = (to: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    if (menu.current) menu.current.open = false;
    const [path, hash] = to.split('#');
    if (!hash || path !== pathname || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    const target = document.getElementById(hash);
    if (!target) return;
    e.preventDefault();
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    history.pushState(history.state, '', `#${hash}`);
  };
  const links = (
    <>
      {nav.map((n) => (
        <Link key={n.to} to={n.to} onClick={onNav(n.to)}>
          {n.label}
        </Link>
      ))}
      <a className="nav-resume" href={site.links.resume}>
        Résumé<span className="sr-only"> (PDF)</span>
      </a>
    </>
  );
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className="site-header">
        <Link
          className="brand"
          to="/"
          aria-label={`${site.short} — ${site.name}, home`}
        >
          <DeckMark />
        </Link>
        <nav className="desktop-nav" aria-label="Main">
          {links}
        </nav>
        <div className="header-controls">
          <ThemeToggle />
          <details className="mobile-nav" ref={menu}>
            <summary>
              Menu
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <path d="M3 6h14M3 10h14M3 14h14" />
              </svg>
            </summary>
            <nav aria-label="Mobile">{links}</nav>
          </details>
        </div>
      </header>
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      {/* Match the reset layer so this also overrides Tailwind’s important hidden rule. */}
      <noscript>
        <style>
          {
            '@layer base{.journey-panel[hidden]{display:block!important}}.journey-tabs,.theme-toggle{display:none}.journey-panel+.journey-panel{margin-top:32px}'
          }
        </style>
      </noscript>
      <ScrollRestoration />
    </>
  );
}

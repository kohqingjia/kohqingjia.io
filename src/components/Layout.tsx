// Visual shell; routes, native fragment links and landmarks remain stable.
import { useRef } from 'react';
import { Link, Outlet, ScrollRestoration } from 'react-router';
import { site } from '../data/site';
import PixelIcon, { type PixelIconName } from './PixelIcon';
import ThemeToggle from './ThemeToggle';
const nav = [
  { to: '/#about', label: 'About', icon: 'about' },
  { to: '/#experience', label: 'Journey', icon: 'experience' },
  { to: '/projects', label: 'Projects', icon: 'projects' },
  { to: '/#skills', label: 'Skills', icon: 'skills' },
  { to: '/#contact', label: 'Contact', icon: 'contact' },
];
export default function Layout() {
  const menu = useRef<HTMLDetailsElement>(null);
  const links = (
    <>
      {nav.map((n) => (
        <a
          key={n.to}
          href={n.to}
          onClick={() => {
            if (menu.current) menu.current.open = false;
          }}
        >
          <PixelIcon name={n.icon as PixelIconName} />
          {n.label}
        </a>
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
          {site.short}
          <span aria-hidden="true">/</span>
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
      <footer className="site-footer">
        <div className="footer-signoff">
          <img
            src="/sprites/buddy-sleep.svg"
            width="64"
            height="64"
            alt=""
            loading="lazy"
          />
          <p>
            © {new Date().getFullYear()} {site.name} · {site.location}
          </p>
        </div>
        <ul>
          <li>
            <a href={site.links.resume}>Résumé</a>
          </li>
          <li>
            <a href={site.links.github} rel="me">
              GitHub
            </a>
          </li>
          <li>
            <a href={site.links.linkedin} rel="me">
              LinkedIn
            </a>
          </li>
        </ul>
      </footer>
      <noscript>
        <style>
          {
            '.journey-panel[hidden]{display:block}.journey-tabs,.theme-toggle{display:none}.journey-panel+.journey-panel{margin-top:32px}'
          }
        </style>
      </noscript>
      <ScrollRestoration />
    </>
  );
}

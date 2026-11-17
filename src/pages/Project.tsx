// OWNER: Codex (visual). Claude's skeleton: kohqingjia.io/<slug> project page.
import { Link, useParams } from 'react-router';
import { site, statusLabel } from '../data/site';
import { neighbours, period, projectBySlug } from '../lib/projects';
import { useTitle } from '../lib/useTitle';
import NotFound from './NotFound';

export default function ProjectPage() {
  const { slug } = useParams();
  const p = projectBySlug(slug);
  useTitle(p ? `${p.title} · ${site.name}` : `Not found · ${site.name}`);
  if (!p) return <NotFound />;
  const { prev, next } = neighbours(p.slug);
  return (
    <article className="mx-auto w-[min(100%-2rem,64rem)] py-16" data-status={p.status}>
      <header className="flex flex-col gap-3">
        <p className="flex flex-wrap gap-3 font-mono text-xs text-slate-500">
          <span>{statusLabel[p.status]}</span>
          <span>{period(p.start, p.end, p.status === 'building' ? 'Now' : undefined)}</span>
          {p.team && <span>Team of {p.team}</span>}
        </p>
        <h1 className="text-4xl font-medium tracking-tight sm:text-5xl">{p.title}</h1>
        <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-300">{p.tagline}</p>
        <p className="text-sm text-slate-500">{p.role}{p.org && ` · ${p.org}`}</p>
        {p.links.length > 0 && (
          <ul className="mt-2 flex flex-wrap gap-3">
            {p.links.map((l) => (
              <li key={l.href}><a href={l.href} data-link-kind={l.kind} rel="noopener" className="inline-block rounded-full bg-accent px-4 py-2 text-sm font-medium text-white">{l.label} ↗</a></li>
            ))}
          </ul>
        )}
      </header>

      {p.highlights.length > 0 && (
        <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {p.highlights.map((h) => (
            <div key={h.label} className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
              <dt className="text-sm text-slate-500">{h.label}</dt><dd className="text-2xl font-medium tabular-nums">{h.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {p.cover && (
        <figure className="mt-10">
          <a href={p.cover.src}><img src={p.cover.src} alt={p.cover.alt} width={p.cover.width} height={p.cover.height} className="w-full rounded-2xl border border-slate-200 dark:border-slate-800" /></a>
        </figure>
      )}

      <div className="mt-10 grid gap-8">
        {p.sections.map((s) => (
          <section key={s.heading}>
            <h2 className="text-xl font-medium">{s.heading}</h2>
            {s.body.map((b) => <p key={b} className="mt-2 text-slate-600 dark:text-slate-300">{b}</p>)}
          </section>
        ))}
      </div>

      {p.gallery.length > 0 && (
        <section className="mt-12" aria-labelledby="screens-title">
          <h2 id="screens-title" className="mb-4 text-xl font-medium">Screens</h2>
          <ul className="grid gap-6 sm:grid-cols-2">
            {p.gallery.map((g) => (
              <li key={g.src}>
                <figure>
                  <a href={g.src}><img src={g.src} alt={g.alt} width={g.width} height={g.height} loading="lazy" decoding="async" className="w-full rounded-xl border border-slate-200 dark:border-slate-800" /></a>
                  {g.caption && <figcaption className="mt-2 text-sm text-slate-500">{g.caption}</figcaption>}
                </figure>
              </li>
            ))}
          </ul>
        </section>
      )}

      {p.stack.length > 0 && (
        <section className="mt-12" aria-labelledby="stack-title">
          <h2 id="stack-title" className="mb-3 text-xl font-medium">Built with</h2>
          <ul className="flex flex-wrap gap-2 font-mono text-sm">{p.stack.map((s) => <li key={s} className="rounded-md bg-slate-100 px-2 py-1 dark:bg-slate-800">{s}</li>)}</ul>
        </section>
      )}

      <nav aria-label="More projects" className="mt-16 flex flex-wrap justify-between gap-4 border-t border-slate-200 pt-6 text-sm dark:border-slate-800">
        {prev ? <Link to={`/${prev.slug}`}>← {prev.title}</Link> : <span />}
        <Link to="/projects">All projects</Link>
        {next ? <Link to={`/${next.slug}`}>{next.title} →</Link> : <span />}
      </nav>
    </article>
  );
}

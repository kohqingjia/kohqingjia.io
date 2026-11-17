// OWNER: Codex (visual). Claude's skeleton: screenshot-led card linking to /<slug>.
import { Link } from 'react-router';
import type { Project } from '../data/types';
import { statusLabel } from '../data/site';
import { period } from '../lib/projects';

export default function ProjectCard({ project: p }: { project: Project }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900" data-status={p.status}>
      {p.cover ? (
        <img src={p.cover.src} alt="" width={p.cover.width} height={p.cover.height} loading="lazy" decoding="async" className="aspect-[16/10] w-full border-b border-slate-200 object-cover object-top dark:border-slate-800" />
      ) : (
        <div className="aspect-[16/10] w-full border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900" aria-hidden="true" />
      )}
      <div className="flex flex-col gap-2 p-5">
        <p className="flex gap-3 font-mono text-xs text-slate-500">
          <span>{statusLabel[p.status]}</span>
          <span>{period(p.start, p.end, p.status === 'building' ? 'Now' : undefined)}</span>
        </p>
        <h3 className="text-lg font-medium">
          <Link to={`/${p.slug}`} className="after:absolute after:inset-0 hover:text-accent">
            {p.title}
          </Link>
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300">{p.tagline}</p>
        {p.stack.length > 0 && (
          <ul className="mt-2 flex flex-wrap gap-2 font-mono text-xs text-slate-500" aria-label="Built with">
            {p.stack.slice(0, 4).map((s) => <li key={s} className="rounded-md bg-slate-100 px-2 py-1 dark:bg-slate-800">{s}</li>)}
          </ul>
        )}
      </div>
    </article>
  );
}

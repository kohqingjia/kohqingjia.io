// OWNER: Codex (visual). Claude's skeleton: every project grouped by status.
import { site, statusLabel } from '../data/site';
import { groupByStatus } from '../lib/projects';
import ProjectCard from '../components/ProjectCard';
import { useTitle } from '../lib/useTitle';

export default function ProjectsPage() {
  useTitle(`Projects · ${site.name}`);
  const groups = groupByStatus();
  return (
    <div className="mx-auto w-[min(100%-2rem,72rem)] py-16">
      <h1 className="text-4xl font-medium">Projects</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-300">Everything I've built or am building. Each one has its own page.</p>
      {(['building', 'shipped', 'archived'] as const).map((s) =>
        groups[s].length ? (
          <section key={s} className="mt-12" aria-labelledby={`g-${s}`}>
            <h2 id={`g-${s}`} className="mb-6 text-xl font-medium">
              {statusLabel[s]} <span className="font-mono text-sm text-slate-500">{groups[s].length}</span>
            </h2>
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {groups[s].map((p) => <li key={p.slug} className="relative"><ProjectCard project={p} /></li>)}
            </ul>
          </section>
        ) : null,
      )}
    </div>
  );
}

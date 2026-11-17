import { site, statusLabel } from '../data/site';
import { groupByStatus } from '../lib/projects';
import ProjectCard from '../components/ProjectCard';
import { useTitle } from '../lib/useTitle';
export default function ProjectsPage() {
  useTitle(`Projects · ${site.name}`);
  const groups = groupByStatus();
  return (
    <div className="page-width projects-page">
      <header className="page-head">
        <p className="eyebrow">Ideas put into practice</p>
        <h1>Projects</h1>
        <p>Everything I've built or am building. Each one has its own page.</p>
      </header>
      {(['building', 'shipped', 'archived'] as const).map((s) =>
        groups[s].length ? (
          <section
            className="project-group"
            key={s}
            aria-labelledby={`g-${s}`}
            data-segment={s}
          >
            <h2 id={`g-${s}`}>
              <span className="status" data-status={s}>
                {statusLabel[s]}
              </span>
              <span className="count">{groups[s].length}</span>
            </h2>
            <ul className="project-grid">
              {groups[s].map((p, i) => (
                <li key={p.slug}>
                  <ProjectCard project={p} index={i} />
                </li>
              ))}
            </ul>
          </section>
        ) : null,
      )}
    </div>
  );
}

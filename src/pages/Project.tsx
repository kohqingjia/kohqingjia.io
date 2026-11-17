import { Link, useParams } from 'react-router';
import { site, statusLabel } from '../data/site';
import { neighbours, projectPeriod, projectBySlug } from '../lib/projects';
import { useTitle } from '../lib/useTitle';
import Sprite from '../components/Sprite';
import Shot from '../components/Shot';
import NotFound from './NotFound';
export default function ProjectPage() {
  const { slug } = useParams();
  const p = projectBySlug(slug);
  useTitle(p ? `${p.title} · ${site.name}` : `Not found · ${site.name}`);
  if (!p) return <NotFound />;
  const { prev, next } = neighbours(p.slug);
  return (
    <article
      className="project page-width"
      data-status={p.status}
      data-kind={p.kind}
    >
      <p className="project__address">
        <Link to="/projects">
          <span aria-hidden="true">← </span>All projects
        </Link>
      </p>
      <header className="project__head">
        <div className="project__art">
          <Sprite slug={p.slug} file={p.sprite} size={128} eager />
        </div>
        <div className="project__summary">
          <p className="project__meta">
            <span className="status" data-status={p.status}>
              {statusLabel[p.status]}
            </span>
            <span>
              {projectPeriod(p)}
            </span>
            {p.team && <span>Team of {p.team}</span>}
          </p>
          <h1>{p.title}</h1>
          <p className="project__tagline">{p.tagline}</p>
          <p className="project__role">
            {p.role}
            {p.org && ` · ${p.org}`}
          </p>
          {p.links.length > 0 && (
            <ul className="project__links">
              {p.links.map((l) => (
                <li key={l.href}>
                  <a
                    className={`button ${l.kind === 'live' ? 'button--primary' : ''}`}
                    href={l.href}
                    data-link-kind={l.kind}
                    rel="noopener"
                  >
                    {l.label}
                    <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>
      {p.highlights.length > 0 && (
        <dl className="project__highlights">
          {p.highlights.map((h) => (
            <div key={h.label}>
              <dt>{h.label}</dt>
              <dd>{h.value}</dd>
            </div>
          ))}
        </dl>
      )}
      {p.cover && (
        <div className="project__cover">
          <Shot shot={p.cover} eager />
        </div>
      )}
      <div className="project__content prose">
        {p.sections.map((s) => {
          // Preserve paragraph breaks in content imported from Markdown headings.
          const [heading, ...paragraphs] = s.heading.split('\n');
          return (
            <section key={s.heading}>
              <h2>{heading}</h2>
              {[...paragraphs, ...s.body].filter(Boolean).map((b, i) => (
                <p key={i}>{b}</p>
              ))}
            </section>
          );
        })}
      </div>
      {p.gallery.length > 0 && (
        <section className="project__gallery" aria-labelledby="screens-title">
          <h2 id="screens-title">Screenshots</h2>
          <ul className="gallery">
            {p.gallery.map((g) => (
              <li key={g.src}>
                <Shot shot={g} />
              </li>
            ))}
          </ul>
        </section>
      )}
      {p.stack.length > 0 && (
        <section className="project__stack" aria-labelledby="stack-title">
          <h2 id="stack-title">Built with</h2>
          <ul className="tech-list">
            {p.stack.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>
      )}
      <nav className="project__pager" aria-label="More projects">
        {prev ? (
          <Link to={`/${prev.slug}`} viewTransition>
            <span className="eyebrow">← Previous project</span>
            {prev.title}
          </Link>
        ) : (
          <span />
        )}
        <Link className="project__all" to="/projects">
          All projects
        </Link>
        {next ? (
          <Link to={`/${next.slug}`} viewTransition>
            <span className="eyebrow">Next project →</span>
            {next.title}
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}

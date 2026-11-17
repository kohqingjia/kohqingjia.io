import type { CSSProperties } from 'react';
import { Link } from 'react-router';
import type { Project } from '../data/types';
import { statusLabel } from '../data/site';
import { projectPeriod } from '../lib/projects';
import Sprite from './Sprite';
export default function ProjectCard({
  project: p,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  return (
    <article
      className="project-card"
      data-station
      style={{ '--i': index } as CSSProperties}
      data-status={p.status}
      data-kind={p.kind}
    >
      <div className={`project-card__visual ${p.cover ? '' : 'project-card__visual--object'}`}>
        {p.cover && (
          <div className="project-card__preview">
            <img
              src={p.cover.src}
              alt=""
              width={p.cover.width}
              height={p.cover.height}
              loading="lazy"
              decoding="async"
            />
          </div>
        )}
        {!p.cover && (
          <div className="project-card__sprite">
            <Sprite slug={p.slug} file={p.sprite} size={128} />
          </div>
        )}
      </div>
      <div className="project-card__body">
        <p className="project-card__meta">
          <span className="status" data-status={p.status}>
            {statusLabel[p.status]}
          </span>
          <span>{projectPeriod(p)}</span>
        </p>
        <h3>
          <Link to={`/${p.slug}`} viewTransition>
            {p.title}
          </Link>
        </h3>
        <p className="project-card__tagline">{p.tagline}</p>
        {p.links.length > 0 && (
          <ul className="project-card__links">
            {p.links.slice(0, 2).map((l) => (
              <li key={l.href}>
                <a href={l.href} data-link-kind={l.kind} rel="noopener">
                  {l.label}
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

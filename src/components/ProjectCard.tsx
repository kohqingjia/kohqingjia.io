import type { CSSProperties } from 'react';
import { Link } from 'react-router';
import type { Project } from '../data/types';
import { statusLabel } from '../data/site';
import { period } from '../lib/projects';
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
      <img
        className="project-card__buddy"
        src="/sprites/buddy.svg"
        width="64"
        height="64"
        alt=""
        loading="lazy"
      />
      <div
        className={`project-card__visual ${p.cover ? '' : 'project-card__visual--object'}`}
      >
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
        <div className="project-card__sprite">
          <Sprite slug={p.slug} file={p.sprite} size={p.cover ? 64 : 128} />
        </div>
        <span className="project-card__kind">{p.kind}</span>
      </div>
      <div className="project-card__body">
        <p className="project-card__meta">
          <span className="status" data-status={p.status}>
            {statusLabel[p.status]}
          </span>
          <span>
            {period(
              p.start,
              p.end,
              p.status === 'building' ? 'Now' : undefined,
            )}
          </span>
        </p>
        <h3>
          <Link to={`/${p.slug}`} viewTransition>
            {p.title}
            <span className="project-card__arrow" aria-hidden="true">
              ↗
            </span>
          </Link>
        </h3>
        <p className="project-card__tagline">{p.tagline}</p>
        {p.stack.length > 0 && (
          <ul className="tech-list" aria-label="Built with">
            {p.stack.slice(0, 4).map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        )}
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
      </div>
    </article>
  );
}

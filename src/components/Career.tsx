import { useState, type KeyboardEvent } from 'react';
import { Link } from 'react-router';
import type { Education, Role } from '../data/types';
import { period } from '../lib/projects';
export default function Career({
  experience,
  education,
}: {
  experience: Role[];
  education: Education[];
}) {
  const [tab, setTab] = useState<'experience' | 'education'>('experience');
  function move(event: KeyboardEvent<HTMLButtonElement>) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next =
      event.key === 'Home'
        ? 'experience'
        : event.key === 'End'
          ? 'education'
          : tab === 'experience'
            ? 'education'
            : 'experience';
    setTab(next);
    document.getElementById(`tab-${next}`)?.focus();
  }
  return (
    <>
      <div role="tablist" aria-label="Journey" className="journey-tabs">
        {(['experience', 'education'] as const).map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tab === t}
            aria-controls={`panel-${t}`}
            id={`tab-${t}`}
            tabIndex={tab === t ? 0 : -1}
            onClick={() => setTab(t)}
            onKeyDown={move}
          >
            {t === 'experience' ? 'Experience' : 'Education'}
          </button>
        ))}
      </div>
      <div
        className="journey-panel"
        role="tabpanel"
        id="panel-experience"
        aria-labelledby="tab-experience"
        hidden={tab !== 'experience'}
        tabIndex={0}
      >
        <ol className="career-list">
          {experience.map((r) => (
            <li key={r.org + r.title}>
              <div className="career-date">
                <p>{period(r.start, r.end)}</p>
                <span>{r.location}</span>
              </div>
              <div className="career-copy">
                <p className="career-org">
                  {r.project ? (
                    <Link to={`/${r.project}`}>
                      {r.org}
                      <span aria-hidden="true"> ↗</span>
                    </Link>
                  ) : (
                    r.org
                  )}
                </p>
                <h3>{r.title}</h3>
                <ul>
                  {r.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <div
        className="journey-panel"
        role="tabpanel"
        id="panel-education"
        aria-labelledby="tab-education"
        hidden={tab !== 'education'}
        tabIndex={0}
      >
        <ol className="career-list">
          {education.map((e) => (
            <li key={e.school}>
              <div className="career-date">
                <p>{period(e.start, e.end)}</p>
                <span>{e.location}</span>
              </div>
              <div className="career-copy">
                <p className="career-org">{e.school}</p>
                <h3>{e.degree}</h3>
                <ul>
                  {e.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}

import { useGithubActivity } from '../lib/github';
import { site } from '../data/site';
export default function GithubActivity() {
  const data = useGithubActivity();
  const weeks: NonNullable<typeof data>['days'][] = [];
  data?.days.forEach((d, i) => {
    if (i % 7 === 0) weeks.push([]);
    weeks[weeks.length - 1].push(d);
  });
  return (
    <figure className="github-activity">
      <figcaption>
        <div>
          <p className="eyebrow">GitHub activity</p>
          <a href={site.links.github}>
            @{data?.user || site.links.githubHandle}
            <span aria-hidden="true"> ↗</span>
          </a>
        </div>
        {data?.total !== null && data?.total !== undefined && (
          <p className="github-activity__total">
            <span>{data.total}</span> contributions in the last year
          </p>
        )}
      </figcaption>
      {data ? (
        <>
          <div
            className="activity-scroll"
            tabIndex={0}
            role="img"
            aria-label={`GitHub contributions over the last year${data.total !== null ? `: ${data.total} contributions` : ''}`}
          >
            <div className="activity-weeks">
              {weeks.map((w, i) => (
                <div className="activity-week" key={i}>
                  {w.map((d) => (
                    <span
                      key={d.date}
                      className={`activity-day activity-day--${d.level}`}
                      title={`${d.date}: activity level ${d.level} of 4`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="activity-legend">
            <span>Less</span>
            {[0, 1, 2, 3, 4].map((l) => (
              <span
                key={l}
                aria-hidden="true"
                className={`activity-day activity-day--${l}`}
              />
            ))}
            <span>More</span>
          </div>
        </>
      ) : (
        <p className="activity-fallback">
          <a href={site.links.github}>
            View my contribution history on GitHub{' '}
            <span aria-hidden="true">↗</span>
          </a>
        </p>
      )}
    </figure>
  );
}

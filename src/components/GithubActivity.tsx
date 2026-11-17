// OWNER: Codex (visual). Claude's skeleton: contribution heatmap from the build-time snapshot.
import { useGithubActivity } from '../lib/github';
import { site } from '../data/site';

const shades = [
  'bg-slate-100 dark:bg-slate-800/70',
  'bg-blue-200 dark:bg-blue-950',
  'bg-blue-400 dark:bg-blue-800',
  'bg-blue-600 dark:bg-blue-600',
  'bg-blue-800 dark:bg-blue-400',
];

export default function GithubActivity() {
  const data = useGithubActivity();
  if (!data) return null;
  // Group into weeks (columns) of 7 days.
  const weeks: typeof data.days[] = [];
  data.days.forEach((d, i) => {
    if (i % 7 === 0) weeks.push([]);
    weeks[weeks.length - 1].push(d);
  });
  return (
    <figure className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
      <figcaption className="mb-4 flex flex-wrap justify-between gap-2 text-sm">
        <a href={site.links.github} className="font-mono">@{data.user}</a>
        {data.total !== null && <span className="text-slate-500">{data.total} contributions in the last year</span>}
      </figcaption>
      <div className="overflow-x-auto" role="img" aria-label={`GitHub contribution calendar for the last year${data.total !== null ? `: ${data.total} contributions` : ''}`}>
        <div className="flex gap-[3px]">
          {weeks.map((w, i) => (
            <div key={i} className="flex flex-col gap-[3px]">
              {w.map((d) => <span key={d.date} title={d.date} className={`block size-[10px] rounded-[2px] ${shades[d.level]}`} />)}
            </div>
          ))}
        </div>
      </div>
    </figure>
  );
}

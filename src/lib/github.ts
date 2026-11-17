// OWNER: Claude. Loads the build-time GitHub contributions snapshot
// (scripts/github-activity.mjs → /github-activity.json). Returns null if missing,
// so the heatmap section can simply not render.
import { useEffect, useState } from 'react';

export interface ContributionDay {
  date: string; // YYYY-MM-DD
  level: 0 | 1 | 2 | 3 | 4;
}

export interface GithubActivity {
  user: string;
  fetchedAt: string;
  total: number | null;
  /** Oldest first; 7 days per week, Sunday-first columns like GitHub. */
  days: ContributionDay[];
}

export function useGithubActivity() {
  const [data, setData] = useState<GithubActivity | null>(null);
  useEffect(() => {
    let alive = true;
    fetch('/github-activity.json')
      .then((r) => (r.ok ? r.json() : null))
      .then((d: GithubActivity | null) => alive && d && d.days?.length && setData(d))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);
  return data;
}

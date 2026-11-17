// OWNER: Claude. Query helpers so pages never sort/filter by hand.
import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;

const byOrder = (a: Project, b: Project) =>
  a.data.order - b.data.order || b.data.start.localeCompare(a.data.start);

export async function allProjects() {
  return (await getCollection('projects')).sort(byOrder);
}

export async function featuredProjects() {
  return (await allProjects()).filter((p) => p.data.featured);
}

export async function projectsByStatus() {
  const all = await allProjects();
  return {
    building: all.filter((p) => p.data.status === 'building'),
    shipped: all.filter((p) => p.data.status === 'shipped'),
    archived: all.filter((p) => p.data.status === 'archived'),
  };
}

const fmt = new Intl.DateTimeFormat('en-GB', { month: 'short', year: 'numeric' });
const toDate = (ym: string) => new Date(`${ym}-01T00:00:00Z`);

/** "Aug 2026 – Oct 2026", or "Aug 2026 – now" while building. */
export function period(p: Project) {
  const start = fmt.format(toDate(p.data.start));
  if (p.data.end) return `${start} – ${fmt.format(toDate(p.data.end))}`;
  return p.data.status === 'building' ? `${start} – now` : start;
}

/** Top-level routes a project slug must never take. */
export const RESERVED_SLUGS = new Set(['projects', 'about', '404', 'sprites', 'resume', 'cv']);

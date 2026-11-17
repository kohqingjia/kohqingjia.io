// OWNER: Claude. Query helpers so components never sort/filter by hand.
import { projects } from '../data/projects';
import type { Project } from '../data/types';

const byOrder = (a: Project, b: Project) => a.order - b.order || b.start.localeCompare(a.start);

export const allProjects = [...projects].sort(byOrder);
export const featuredProjects = allProjects.filter((p) => p.featured);

export function projectBySlug(slug: string | undefined) {
  return allProjects.find((p) => p.slug === slug);
}

/** Neighbours for the prev/next pager on a project page. */
export function neighbours(slug: string) {
  const i = allProjects.findIndex((p) => p.slug === slug);
  return { prev: allProjects[i - 1], next: allProjects[i + 1] };
}

export function groupByStatus(list: Project[] = allProjects) {
  return {
    building: list.filter((p) => p.status === 'building'),
    shipped: list.filter((p) => p.status === 'shipped'),
    archived: list.filter((p) => p.status === 'archived'),
  };
}

const fmt = new Intl.DateTimeFormat('en-GB', { month: 'short', year: 'numeric', timeZone: 'UTC' });
const toDate = (ym: string) => new Date(`${ym}-01T00:00:00Z`);

export const formatMonth = (ym: string) => fmt.format(toDate(ym));

/** "Aug 2026 – Oct 2026", or "Aug 2026 – Present" when there is no end date. */
export function period(start: string, end?: string, ongoingLabel = 'Present') {
  return `${formatMonth(start)} – ${end ? formatMonth(end) : ongoingLabel}`;
}

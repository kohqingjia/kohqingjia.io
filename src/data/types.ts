// OWNER: Claude — the data contract. Codex: read-only; ask in COLLAB.md to change.

export type ProjectStatus = 'building' | 'shipped' | 'archived';
export type ProjectKind = 'work' | 'course' | 'hackathon' | 'personal' | 'research';
export type LinkKind = 'live' | 'repo' | 'writeup' | 'demo' | 'video';

export interface Shot {
  /** Resolved URL (imported asset). */
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
}

export interface ProjectLink {
  label: string;
  href: string;
  kind: LinkKind;
}

export interface ProjectSection {
  heading: string;
  body: string[];
}

export interface Project {
  /** URL slug: kohqingjia.io/<slug> */
  slug: string;
  title: string;
  /** One plain sentence: what it is, for whom. ≤ 140 chars. */
  tagline: string;
  status: ProjectStatus;
  kind: ProjectKind;
  role: string;
  org?: string;
  /** YYYY-MM */
  start: string;
  end?: string;
  team?: number;
  stack: string[];
  links: ProjectLink[];
  /** Shown on the home page. Everything shows on /projects. */
  featured: boolean;
  /** Lower = earlier. */
  order: number;
  /** /sprites/<file> — Codex's pixel sprite (optional identity cue). */
  sprite?: string;
  cover?: Shot;
  gallery: Shot[];
  /** Long-form write-up for the project page. */
  sections: ProjectSection[];
  /** Headline numbers for the card/page, e.g. { value: '80%', label: 'faster site updates' }. */
  highlights: { value: string; label: string }[];
}

export interface Role {
  org: string;
  title: string;
  location: string;
  start: string;
  end?: string;
  /** Short bullet points, plain sentences. */
  points: string[];
  /** Related project slug, if any. */
  project?: string;
  href?: string;
}

export interface Education {
  school: string;
  degree: string;
  location: string;
  start: string;
  end?: string;
  points: string[];
}

export interface SkillGroup {
  name: string;
  /** `icon` = a Simple Icons slug (https://simpleicons.org) when one exists; Codex decides how to render. */
  items: { name: string; icon?: string }[];
}

export interface Award {
  title: string;
  detail: string;
  year: string;
  project?: string;
}

export interface Activity {
  org: string;
  role: string;
  start: string;
  end?: string;
  detail: string;
}

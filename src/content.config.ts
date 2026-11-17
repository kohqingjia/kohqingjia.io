// OWNER: Claude (data contract). Codex: read-only — ask in COLLAB.md to change.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const month = z.string().regex(/^\d{4}-\d{2}$/, 'use YYYY-MM');

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    /** One plain sentence: what it is, for whom. No hype words. */
    tagline: z.string().max(140),
    status: z.enum(['building', 'shipped', 'archived']),
    kind: z.enum(['work', 'course', 'hackathon', 'personal', 'research']),
    role: z.string(),
    org: z.string().optional(),
    start: month,
    end: month.optional(),
    team: z.number().int().positive().optional(),
    stack: z.array(z.string()).default([]),
    links: z
      .array(
        z.object({
          label: z.string(),
          href: z.string().url(),
          kind: z.enum(['live', 'repo', 'writeup', 'demo', 'video']),
        }),
      )
      .default([]),
    /** Shown on the home-page line. Everything shows on /projects. */
    featured: z.boolean().default(false),
    /** Lower = earlier on the line. */
    order: z.number().default(100),
    /** Filename in public/sprites/ (Codex draws these). Falls back to placeholder.svg. */
    sprite: z.string().default('placeholder.svg'),
    /** Hero screenshot, relative to the .md file (e.g. ./media/<slug>/home.jpg).
     *  Astro optimises it to AVIF/WebP at build time. */
    cover: z
      .object({ src: image(), alt: z.string(), caption: z.string().optional() })
      .optional(),
    /** Extra screenshots / slides, in display order. */
    gallery: z
      .array(z.object({ src: image(), alt: z.string(), caption: z.string().optional() }))
      .default([]),
    /** false = QJ has not yet checked the facts on this page. */
    reviewed: z.boolean().default(false),
  }),
});

export const collections = { projects };

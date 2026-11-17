// OWNER: Claude. Post-build: give every route its own index.html with the right
// <title>, description, canonical and Open Graph tags, so link previews (LinkedIn,
// WhatsApp, Slack) and search engines see real titles, and every route returns 200.
// The React app still renders the body client-side.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { build } from 'vite';

const SITE = 'https://kohqingjia.io';
const dist = new URL('../dist/', import.meta.url);
const template = await readFile(new URL('index.html', dist), 'utf8');

// Load the project list via a tiny Vite SSR build of the data module (handles TS + image imports).
await build({
  logLevel: 'warn',
  configFile: false,
  build: {
    ssr: new URL('../src/lib/projects.ts', import.meta.url).pathname,
    outDir: new URL('../node_modules/.prerender/', import.meta.url).pathname,
    emptyOutDir: true,
    rollupOptions: { output: { format: 'esm', entryFileNames: 'projects.mjs' } },
  },
});
const { allProjects } = await import(new URL('../node_modules/.prerender/projects.mjs', import.meta.url));

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function page({ path, title, description, image = '/og.png' }) {
  const url = SITE + path;
  const head = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${SITE}${image}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ].join('\n    ');
  return template.replace(/<title>.*?<\/title>/s, head);
}

const NAME = 'Koh Qing Jia';
const routes = [
  { path: '/', title: NAME, description: 'Information Systems student at SMU. I build AI agents, data products and the software around them.' },
  { path: '/projects', title: `Projects · ${NAME}`, description: `Everything ${NAME} has built or is building, with links and screenshots.` },
  ...allProjects.map((p) => ({ path: `/${p.slug}`, title: `${p.title} · ${NAME}`, description: p.tagline, image: p.cover?.src })),
];

for (const r of routes) {
  const dir = r.path === '/' ? dist : new URL(`.${r.path}/`, dist);
  await mkdir(dir, { recursive: true });
  await writeFile(new URL('index.html', dir), page(r));
}
await writeFile(new URL('404.html', dist), page({ path: '/404', title: `Not found · ${NAME}`, description: 'No page lives here.' }));

// sitemap.xml + robots.txt
const urls = routes.map((r) => `  <url><loc>${SITE}${r.path}</loc></url>`).join('\n');
await writeFile(new URL('sitemap.xml', dist), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
await writeFile(new URL('robots.txt', dist), `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`);
console.log(`prerender: ${routes.length} routes + 404, sitemap, robots`);

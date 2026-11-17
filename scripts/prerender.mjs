// OWNER: Claude. Post-build: give every route its own index.html with the right
// <title>, description, canonical and Open Graph tags, so link previews (LinkedIn,
// WhatsApp, Slack) and search engines see real titles, and every route returns 200.
// Each page body is rendered by React on the server (entry-server.tsx); the browser hydrates it.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { build } from 'vite';

const SITE = 'https://kohqingjia.io';
const dist = new URL('../dist/', import.meta.url);
const template = await readFile(new URL('index.html', dist), 'utf8');

// Build the server renderer (src/entry-server.tsx) with the project's own Vite config,
// so image imports resolve to the same hashed /assets URLs as the browser build.
await build({
  logLevel: 'warn',
  build: {
    ssr: 'src/entry-server.tsx',
    outDir: 'node_modules/.prerender',
    emptyOutDir: true,
    copyPublicDir: false,
    rollupOptions: { output: { format: 'esm', entryFileNames: 'entry-server.mjs' } },
  },
});
const { render, allProjects, site } = await import(new URL('../node_modules/.prerender/entry-server.mjs', import.meta.url));

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

async function page({ path, title, description, image = '/og.png', noindex = false, jsonLd }, renderPath = path) {
  const url = SITE + path;
  const head = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    noindex ? `<meta name="robots" content="noindex" />` : `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${SITE}${image}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    jsonLd && `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`,
  ].filter(Boolean).join('\n    ');
  const body = await render(renderPath);
  return template
    .replace(/<title>.*?<\/title>/s, head)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
}

const NAME = site.name;
// Share image per project: the JPEG from scripts/og-images.py, else the site card.
const ogFor = (slug) => (existsSync(new URL(`../public/og/${slug}.jpg`, import.meta.url)) ? `/og/${slug}.jpg` : '/og.png');
// Structured data for search engines, built only from facts already on the site.
const person = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: NAME,
  url: `${SITE}/`,
  image: `${SITE}/og.png`,
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'Singapore Management University' },
  sameAs: [site.links.github, site.links.linkedin],
};
const routes = [
  { path: '/', title: NAME, description: 'Information Systems student at SMU. I build AI agents, data products and the software around them.', jsonLd: person },
  { path: '/projects', title: `Projects · ${NAME}`, description: `Everything ${NAME} has built or is building, with links and screenshots.` },
  ...allProjects.map((p) => ({ path: `/${p.slug}`, title: `${p.title} · ${NAME}`, description: p.tagline, image: ogFor(p.slug) })),
];

for (const r of routes) {
  const dir = r.path === '/' ? dist : new URL(`.${r.path}/`, dist);
  await mkdir(dir, { recursive: true });
  await writeFile(new URL('index.html', dir), await page(r));
}
await writeFile(
  new URL('404.html', dist),
  await page({ path: '/404', title: `Not found · ${NAME}`, description: 'No page lives here.', noindex: true }, '/__not-found__'),
);

// sitemap.xml + robots.txt
const urls = routes.map((r) => `  <url><loc>${SITE}${r.path}</loc></url>`).join('\n');
await writeFile(new URL('sitemap.xml', dist), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
await writeFile(new URL('robots.txt', dist), `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`);
console.log(`prerender: ${routes.length} routes + 404, sitemap, robots`);

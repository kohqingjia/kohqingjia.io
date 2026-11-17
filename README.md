# kohqingjia.io

Koh Qing Jia's personal site, a hub for every project. Astro static site, deployed on a VPS.

```sh
npm install
npm run dev      # http://localhost:4321
npm run build
```

Add a project: create `src/content/projects/<slug>.md` (schema in `src/content.config.ts`). It goes live at `/<slug>`.

Deploy: see `deploy/`. Agent coordination: see `AGENTS.md`.

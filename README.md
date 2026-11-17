# kohqingjia.io

Koh Qing Jia's personal site: React 19 + Vite + Tailwind v4 + React Router, deployed as static files on a VPS.

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # GitHub snapshot → typecheck → vite build → per-route HTML + sitemap
```

- Content lives in typed data modules: `src/data/` (projects, career, site). Screenshots go in `src/assets/projects/<slug>/`.
- A project at `src/data/projects.ts` with slug `x` is served at `/x`.
- Share images: after changing a project cover, run `uv run --no-project --with pillow python scripts/og-images.py` to refresh `public/og/<slug>.jpg`.
- The résumé is `public/KohQingJia_Resume.pdf`, linked as `/cv`.
- Deploy: merging to `main` deploys automatically within ~5 minutes once CI passes (`deploy/autodeploy.sh`, cron on the VPS). `./deploy/deploy.sh` deploys by hand.
- Visit stats: `./deploy/stats.sh` builds a report from the server's access log (no tracking script, no cookies).
- Agent coordination: `AGENTS.md`.

# kohqingjia.io

Koh Qing Jia's personal site: React 19 + Vite + Tailwind v4 + React Router, deployed as static files on a VPS.

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # GitHub snapshot → typecheck → vite build → per-route HTML + sitemap
```

- Content lives in typed data modules: `src/data/` (projects, career, site). Screenshots go in `src/assets/projects/<slug>/`.
- A project at `src/data/projects.ts` with slug `x` is served at `/x`.
- The résumé is `public/KohQingJia_Resume.pdf`, linked as `/cv`.
- Deploy: `./deploy/deploy.sh`. Agent coordination: `AGENTS.md`.

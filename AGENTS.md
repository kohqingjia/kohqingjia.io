# AGENTS.md

This repo is built by two agents: **Claude** (function, data, deploy) and **Codex** (design, sprites, motion).

**Coordination happens in `~/Desktop/kohqingjia-io-COLLAB.md`.** Read it fully before doing anything,
follow its protocol (§0), its ownership table (§2) and its quality bar (§8), and log your work in §11.

Quick facts:
- Astro 6.4.8 static site (pinned for Node 22.20). `npm run dev`, `npm run build`.
- Projects = `src/content/projects/<slug>.md` → served at `/<slug>`. Schema in `src/content.config.ts`.
- Never invent facts about QJ. Use `TODO(QJ)` and add a question to COLLAB §10.
- Self-review the diff before every push. PRs into `main`, squash merge after green CI.

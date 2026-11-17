---
title: SilentLink
tagline: A local-first research platform that records AirPods head motion to study silent articulation. It makes no transcription claims.
status: building
kind: research
role: Solo developer
start: 2026-10
stack: [Swift, Core Motion, FastAPI, PostgreSQL]
links:
  - { label: Source on GitHub, href: "https://github.com/kohqingjia/silentlink", kind: repo }
  - { label: Research dashboard, href: "https://silentlink.187-52-125-31.sslip.io", kind: live }
featured: true
order: 1
cover:
  src: ./media/silentlink/dashboard.jpg
  alt: "SilentLink research workspace overview"
gallery:
  - { src: ./media/silentlink/dashboard-scroll.jpg, alt: "SilentLink recording library and signal explorer", caption: "From observation to evidence: the recording library" }
sprite: silentlink.svg
---

## What it is
An iPhone recorder for the processed motion Apple exposes from AirPods, with a private research API and dashboard behind it.

## Why it is honest about its limits
Whether this signal holds speech information is an open question. The project measures first and makes no claims.

---
title: ClassPart AI
tagline: AI agents that listen to a class discussion and draft evidence-backed participation feedback for the professor to approve.
status: shipped
kind: course
role: Lead developer
org: SMU IS469 Generative AI with LLMs
start: 2026-08
end: 2026-11
team: 6
stack: [Python, OpenAI, Streamlit, faster-whisper, Docker]
links:
  - { label: Source on GitHub, href: "https://github.com/kohqingjia/classpartai", kind: repo }
featured: true
order: 20
sprite: classpartai.svg
---

## What it is
A seven-step multi-agent workflow: a listener turns the recording into speaker-labelled turns, a coordinator plans the work, a research agent runs agentic retrieval over course material, and a judge, an auditor and a feedback agent turn the evidence into feedback. Nothing reaches students until the professor approves it.

## What I did
Led development and authored most of the merged pull requests. I deployed the demo on my own server and kept it running through the team's changes.

## What I learned
Agents need budgets and guardrails as much as prompts. Every run has a hard cap on model calls, tools and time.

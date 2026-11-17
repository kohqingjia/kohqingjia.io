---
title: Promyro energy platform
tagline: A multi-tenant energy management system for European buildings, covering solar, batteries, EV chargers, costs and CO2.
status: shipped
kind: work
role: AI and agentic developer
org: Promyro
start: 2026-05
end: 2026-09
stack: [Python, FastAPI, PostgreSQL, Next.js, Raspberry Pi, Modbus TCP]
featured: true
order: 40
sprite: promyro.svg
---

## What it is
A live energy-flow map from grid, PV and battery through the building to the EV chargers, with dashboards for cost, CO2 and peak demand, plus spot-price invoicing.

## What I did
Built it from the ground up in 12 weeks with AI coding agents and led day-to-day development in a three-person team. I wrote a Raspberry Pi edge agent that reads four KEBA chargers and a KOSTAL inverter over Modbus TCP. I also built an "Ask AI" tool-calling agent that answers energy questions from the database. It is read-only and never stores chats.

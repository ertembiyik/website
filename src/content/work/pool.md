---
title: Pool
role: Founding engineer
period: Feb 2026 — now
summary: AI screenshot app with 75M+ saved screenshots. I lead iOS
links:
  - label: pool.day
    url: https://pool.day
  - label: TechCrunch
    url: https://techcrunch.com/2026/06/11/pools-new-app-turns-your-screenshots-into-a-searchable-memory-bank/
icon: ../../assets/icons/pool.png
order: 1
---


Founding engineer at Pool, an AI app that lets you save anything with a screenshot. It's made by Random Access Memories and backed by General Catalyst, and The Verge and TechCrunch covered the launch. Pool has grown to 75M+ saved screenshots with $0 on marketing, and week-1 retention doubled from 19% to 38%

I lead iOS and own the app end to end, from architecture to the small details that make it feel native

## iOS

- Re-architected the app into 71 Tuist modules
- Own App Store releases end to end
- On-device semantic image search with SigLIP 2 on Core ML, and a local-first sync engine from Convex to SQLite
- The water-glass material that now defines Pool's look, built in Core Animation instead of full-screen GPU shaders so it stays smooth on every iOS version we support
- Cut Home scroll hitches by 81% and hitch time by 73%, and fixed hangs caused by 0.7 to 1 GB of memory pressure
- Server-driven pools: mini apps that render your saved screenshots as an iPod-style player, a places map, and more

## Backend

- Infrastructure on Cloudflare and Convex: direct R2 uploads into a sharded Queues and Workflows pipeline
- Self-hosted push notifications and Pool's first production alerting

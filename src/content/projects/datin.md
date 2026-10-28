---
title: datin
year: "2026"
summary: Agent-native dating — a CLI your AI agent uses to find you a date
links:
  - label: datinapp.com
    url: https://datinapp.com
  - label: GitHub
    url: https://github.com/datinai/cli
icon: ../../assets/icons/datin.svg
order: 1
---


Dating with no app. Your own agent — Claude Code, Codex, or another — is the interface, and the datin CLI is the client it calls

Your agent asks before reading anything personal, and you approve your profile before it's uploaded

Technical: a Bun CLI with a generated API client, a Hono API on Cloudflare Workers, and Postgres with pgvector for matching

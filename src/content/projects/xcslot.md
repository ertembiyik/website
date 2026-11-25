---
title: xcslot
year: "2026"
summary: Warm Xcode build slots for parallel coding agents
links:
  - label: GitHub
    url: https://github.com/ertembiyik/xcslot
icon: ../../assets/icons/xcslot.png
order: 1
---


Every agent gets its own git worktree, and every fresh worktree builds from scratch, because Xcode only reuses build data at the same path. xcslot keeps a few build slots at fixed paths, mirrors your worktree into a free one and runs the build there, so a new worktree's first build becomes an incremental one

Put xcslot in front of the command you already run. On IceCubesApp, a fresh worktree's first build drops from 85 s to 4.8 s

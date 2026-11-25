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


Every agent gets its own git worktree, and the first build in a new worktree starts from scratch, because Xcode only reuses build data at the same path

APFS has a neat feature you can use here: [clones](https://developer.apple.com/documentation/foundation/about-apple-file-system#Clones-Reduce-the-Cost-of-Copying), copies that are instant and take no extra disk. So I built xcslot: it keeps a few build slots at fixed paths and clones each worktree's changes into a free one. Xcode sees the same paths and builds incrementally, so the first build in a new worktree is up to 17x faster. On [IceCubesApp](https://github.com/Dimillian/IceCubesApp) it goes from 85 s to 4.8 s

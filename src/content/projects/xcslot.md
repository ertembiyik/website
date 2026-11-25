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


Every agent gets its own git worktree, and every fresh worktree builds from scratch, because Xcode only reuses build data at the same path. APFS has a neat feature for this: [clones](https://developer.apple.com/documentation/foundation/about-apple-file-system#Clones-Reduce-the-Cost-of-Copying), copies that appear instantly and take no extra disk until one side changes. xcslot keeps a few build slots at fixed paths and clones your worktree's changes into a free one, so Xcode sees the same paths and a new worktree's first build becomes an incremental one

Put xcslot in front of the command you already run. On [IceCubesApp](https://github.com/Dimillian/IceCubesApp), a fresh worktree's first build drops from 85 s to 4.8 s

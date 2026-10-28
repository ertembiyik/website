---
title: VK
role: Senior iOS engineer
period: Aug 2022 — Nov 2025
summary: Superapp for 100M+ people. Mini Apps platform, navigation, infra, performance, AI tooling
links:
  - label: vk.com
    url: https://vk.com
icon: ../../assets/icons/vk.png
order: 3
---


Three years on the VK app, where I ended up #3 of 425 iOS contributors

## Mini Apps

- Mini Apps platform: WebView-based apps with a bridge to native code through WebKit's WKScriptMessageHandler
- Mini Apps Catalog and discovery
- Mini Apps advertising system

## Superapp

- Services showcase: rebuilt a main navigation entry point from the ground up with custom collection layouts, real-time SSE updates, and bespoke animations
- Showcase settings: built widget customization and SpringBoard-style drag-and-drop behavior

## Navigation

- Tab bar customization: led the feature end to end, taking the tab bar past UIKit's five-tab limit and keeping the classic bar on iPadOS 18 by reverse engineering UIKit

[Tab Bar settings release](https://m.vk.com/wall-35005_54964)

## Infrastructure

- Co-led the iOS infrastructure team alongside product work: reviewed code across teams and set standards for architecture and the design system
- Migrated the iOS app to Tuist, modularizing the codebase into 300+ modules
- Deleted 86K lines of legacy code
- Design system: played a key role in developing and refining VK's design system (VKUI)
- Optimized image filters by moving from Accelerate to CoreImage and reducing the render pipeline to a single pass
- Analyzed app startup bottlenecks and implemented improvements, reducing p90 app launch time by 8%

## AI

- Led AI developer tooling: LLM code review on self-hosted vLLM
- Claude Code skills that automated UI test authoring, letting QA hit a major milestone with fewer testers across the VK iOS, VK Android, and Dzen teams

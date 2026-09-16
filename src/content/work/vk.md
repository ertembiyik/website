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


## Mini Apps

- Mini Apps platform: WebView-based apps with a bridge to native code through JavaScriptCore message handlers
- Mini Apps Catalog and discovery
- Mini Apps advertising system

## Superapp

- Services showcase: rebuilt a main navigation entry point from the ground up with custom collection layouts, real-time SSE updates, and bespoke animations
- Showcase settings: built widget customization and SpringBoard-style drag-and-drop behavior

## Navigation

- Tab bar customization: led the feature from end to end, including reverse engineering UIKit private APIs to support more than five tabs

[Tab Bar settings release](https://m.vk.com/wall-35005_54964)

## Infrastructure

- Migrated the iOS app to Tuist, modularizing the codebase into 300+ modules
- Design system: played a key role in developing and refining VK's design system (VKUI)
- Optimized image filters by moving from Accelerate to CoreImage and reducing the render pipeline to a single pass
- Analyzed app startup bottlenecks and implemented improvements, reducing app launch time by 8%

## AI

- Led an AI-assisted GitLab code review integration and built a CLI coding agent to help QA engineers write automated tests

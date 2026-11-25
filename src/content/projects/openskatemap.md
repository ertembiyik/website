---
title: OpenSkateMap
year: "2026"
summary: An open skate map, curated by local skaters
links:
  - label: openskatemap.app
    url: https://openskatemap.app
  - label: GitHub
    url: https://github.com/OpenSkateMap
  - label: TestFlight
    url: https://testflight.apple.com/join/3pFyeYVS
icon: ../../assets/icons/openskatemap.png
order: 2
---


An iOS app for finding skate spots: street spots, plazas, parks and DIYs. Skaters add the spots they know, with photos, obstacles and how rough the ground is, and someone who skates that city checks each one before it goes on the map

Collections for trips: private, shared with friends, or public with a link. Adding a spot works offline, and the app speaks 15 languages. The app and its backend are open source

Technical: a local-first UIKit app (SQLite with a sync engine and an outbox, PinLayout, Tuist modules) on a Hono API on Cloudflare Workers, with Postgres and PostGIS, photos in R2 and share cards drawn by Cloudflare Images

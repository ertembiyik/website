---
title: Telegram Sync CLI
year: 2026 – now
summary: Lets AI agents read and write your Telegram from the terminal
links:
  - label: GitHub
    url: https://github.com/neoromantic/telegram-sync-cli
icon: ../../assets/icons/telegram-sync-cli.svg
order: 2
---


A Telegram CLI made for agents. It syncs your chats into a local cache, so an agent can search them, run SQL over them and reply

I made a couple of features:

- Calls show up: audio or video, how long, and whether anyone picked up
- Rich messages: send them in Markdown or HTML, and read them (they used to come through empty)
- Voice and video notes turned into text with a local Whisper
- Editing, deleting, forwarding and pinning messages
- Errors that say whether a retry will work and how long to wait

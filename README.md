<p align="center">
  <img src="https://img.shields.io/badge/status-live-brightgreen" alt="Live">
  <img src="https://img.shields.io/badge/hosting-Cloudflare%20Pages-F38020" alt="Cloudflare Pages">
  <img src="https://img.shields.io/badge/backend-Cloudflare%20Workers-F38020" alt="Workers">
  <img src="https://img.shields.io/badge/storage-KV-purple" alt="KV Storage">
  <img src="https://img.shields.io/badge/glizzies-launched-hotpink" alt="Glizzies Launched">
</p>

<h1 align="center">Glizzy Timer</h1>
<p align="center"><strong>The Hotdog is Getting Hitched</strong></p>
<p align="center">
  <a href="https://glizzytimer.com">glizzytimer.com</a>
</p>

<p align="center">
  <img src="preview.png" alt="Glizzy Timer Preview" width="700">
</p>

---

## About

A wedding countdown site for Brent — who famously wore a hotdog costume. Features a live countdown timer, an interactive hotdog rocket launcher with particle effects, a global leaderboard backed by Cloudflare KV, and 120 floating hotdog emojis. Visitors tap the hotdog man 5 times to launch him into space with a full rocket animation sequence.

This started as a joke. It now has a persistent global leaderboard with thousands of launches.

## Features

- **Wedding Countdown** — Live countdown to April 23rd, 2026 with days/hours/minutes/seconds display in styled blocks

- **Hotdog Rocket Launcher** — Tap the hotdog man (Brent in costume) 5 times to initiate a full launch sequence:
  1. Nozzle appears with rumble animation
  2. Canvas particle exhaust fires up
  3. Screen shakes on liftoff
  4. Hotdog emoji burst explosion (20 emojis)
  5. Continuous exhaust trail during flight
  6. Congratulations screen with confetti
  7. Smooth return-to-pad animation

- **Canvas Particle System** — Real-time `<canvas>` particle engine for rocket exhaust. Orange/yellow particles with velocity, gravity, opacity decay, and size reduction. Runs at 60fps.

- **Global Leaderboard** — Cloudflare Workers API (`/api/leaderboard`) backed by KV storage. Enter 2-3 letter initials, scores sync automatically. Top 10 displayed with gold/silver/bronze medals.

- **Auto-Launch Mode** — Toggle button that launches the hotdog every 5.5 seconds automatically. Even counts launches silently when the tab is backgrounded, syncing every 10 launches.

- **Floating Hotdog Rain** — 120 hotdog emojis floating upward across the viewport with randomized size, opacity, speed, and delay. Pure CSS animation.

- **Gift Registry Link** — CTA button linking to the couple's registry

- **Responsive** — Full-bleed background image with overlay gradient. Works on mobile with touch events.

## Architecture

```
Browser                          Cloudflare
  |                                  |
  |  tap tap tap tap TAP             |
  |  [canvas particles + shake]      |
  |                                  |
  |  POST /api/leaderboard --------> |  Workers Function
  |       { initials, launches }     |  reads/writes KV
  |  <-------- { scores, total } --- |
  |                                  |
  |  GET /api/leaderboard ---------> |
  |  <-------- top 10 + total ------ |
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Vanilla HTML/CSS/JS — 1,127 lines |
| Fonts | Bebas Neue (display), Inter (body) via Google Fonts |
| Particles | HTML5 Canvas 2D with requestAnimationFrame |
| API | Cloudflare Pages Functions (Workers runtime) |
| Storage | Cloudflare KV namespace (`LEADERBOARD`) |
| Hosting | Cloudflare Pages |

## Project Structure

```
glizzytimer.com/
  index.html                 # Full site — HTML, CSS, JS, canvas engine
  bg.jpg                     # Hotdog close-up background photo
  hotdog-man.png             # Brent in the hotdog costume (the rocket)
  functions/
    api/
      leaderboard.js         # GET/POST leaderboard — Workers function
  wrangler.toml              # Cloudflare config + KV binding
  preview.png                # Screenshot for this README
  CLAUDE.md                  # AI assistant context
  README.md                  # You are here
```

## Deploy

```bash
wrangler pages deploy . --project-name=hotdog-wedding
```

> **Note:** The Cloudflare project name is `hotdog-wedding` (the original name before the domain was glizzytimer.com).

## KV Namespace

The leaderboard uses Cloudflare KV with namespace ID `b21a7eb58b3d40439295eac74a25ae36`. Each player's score is stored as a KV pair keyed by their initials.

## License

Private project. All rights reserved.

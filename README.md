# glizzytimer.com

Wedding countdown + interactive hotdog rocket launcher with global leaderboard.

**Live:** [glizzytimer.com](https://glizzytimer.com)

## Stack

- Single-page static HTML/CSS/JS
- Cloudflare Workers function (`functions/api/leaderboard.js`) for leaderboard API
- Cloudflare KV for persistent leaderboard storage
- Hosted on [Cloudflare Pages](https://pages.cloudflare.com) with [Functions](https://developers.cloudflare.com/pages/functions/)
- No build step

## Deploy

```bash
wrangler pages deploy . --project-name=hotdog-wedding
```

## Notes

- Cloudflare project name is `hotdog-wedding` (original name)
- KV namespace: `LEADERBOARD` (ID: `b21a7eb58b3d40439295eac74a25ae36`)
- Background image (`bg.jpg`) and cutout (`hotdog-man.png`) are served as static assets

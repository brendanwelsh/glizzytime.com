# CLAUDE.md

## glizzytime.com

Hotdog rocket game with leaderboard. Static HTML + Cloudflare Workers function + KV namespace for leaderboard storage.

## Deploy

```bash
wrangler pages deploy . --project-name=hotdog-wedding
```

Note: Cloudflare project name is still "hotdog-wedding" from original deploy. Uses KV namespace `LEADERBOARD` (id: b21a7eb58b3d40439295eac74a25ae36).

## Part of ~/Projects/prod/ — see parent CLAUDE.md for full project layout.

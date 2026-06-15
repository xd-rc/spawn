# Spawn.icu

A premium web-agency / website-builder marketing site for **Spawn** — built with
Next.js (App Router), TypeScript, TailwindCSS and Framer Motion, with a secure
Discord-bot backend for project requests.

White background, black text, cursive Spawn wordmark, tasteful 3D mockups and
small, professional motion. Fully responsive from small phones to ultrawide.

---

## ⚠️ Security notice — rotate your Discord token

A Discord bot token was shared in plain text while commissioning this project.
**Treat it as compromised.** Before deploying:

1. Open the [Discord Developer Portal](https://discord.com/developers/applications).
2. Select your application → **Bot** → **Reset Token**.
3. Put the *new* token in your `.env` file (never in code, never in git).

The token is only ever read from `process.env` on the server. It is never sent
to the browser.

---

## What's in this version

- Official Spawn logos used everywhere: wordmark in the nav and footer, S icon for
  favicon, badges, feature icons and the loading animation. Files live in
  `public/brand/`.
- Readable typography: Playfair Display for headlines, Inter for body. The cursive
  look comes only from the logo, not the text.
- Custom hero animation that builds a website on loop (idea, design, build, launch).
  No browser-window placeholders.
- Simple, direct copy. No buzzwords, no em dashes.
- Contact details shown in the header, the contact section and the footer:
  **717-750-7441** and **dom@spawn.icu**.
- Dark mode toggle in the nav (sun/moon). Default is light. Choice is remembered.
- Contact form fields: Name, Contact Information, Service Needed, Message.

## Pages

- `/` — Home (hero, 3D floating mockup, highlights, work/process teasers, CTA)
- `/work` — Our Work / Portfolio (project cards, hover previews, request-similar)
- `/services` — All nine services
- `/process` — Discovery → Design → Build → Launch → Care
- `/why` — Why Spawn
- `/faq` — Accordion FAQ (+ FAQ structured data for SEO)
- `/start` — Start a Project (the contact form)

## Tech stack

- **Next.js 14** (App Router, server components)
- **TypeScript** (strict)
- **TailwindCSS** (custom design tokens)
- **Framer Motion** (fade-ins, slide-ups, tilt, page motion, form animation)
- **discord.js** (server-only DM delivery)

---

## Getting started (local)

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
#   then edit .env and add your (freshly reset) token + your Discord user ID

# 3. Run the dev server
npm run dev
# open http://localhost:3000
```

### Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `DISCORD_BOT_TOKEN` | yes | Bot token from the Discord Developer Portal. Server-only. |
| `DISCORD_OWNER_ID` | yes | Your Discord user ID (the bot DMs this person). |
| `RATE_LIMIT_MAX` | no | Max submissions per IP per window (default `5`). |
| `RATE_LIMIT_WINDOW_SECONDS` | no | Rate-limit window length in seconds (default `600`). |

`.env` is git-ignored. `.env.example` contains placeholders only.

---

## Discord bot setup

1. **Create the app & bot:** Developer Portal → *New Application* → *Bot* →
   *Reset Token* → copy it into `.env` as `DISCORD_BOT_TOKEN`.
2. **Get your user ID:** In Discord, enable *Settings → Advanced → Developer
   Mode*, then right-click your own name → *Copy User ID*. Put it in `.env` as
   `DISCORD_OWNER_ID`.
3. **Allow DMs:** The bot must share a server with you, and you must allow DMs
   from server members, for the direct message to arrive. Invite the bot to any
   server you're both in (no special permissions/intents required for sending a
   DM to a user the bot can fetch).

On each valid submission the bot sends you:

```
🚀 New Spawn Project
Name: {name}
Contact: {contact}
Service: {service}
Message: {message}
Time: {timestamp}
```

### Backend safeguards

- **Validation & sanitisation** of every field (`src/lib/validation.ts`).
- **Rate limiting** per IP, sliding window (`src/lib/rateLimit.ts`).
- **Spam protection:** hidden honeypot field, minimum time-to-submit, and a
  link-flood check.
- **Error handling:** clean JSON errors; method guard on the route.
- **Lead logging fallback:** every submission is appended to
  `data/leads.jsonl` (git-ignored) so leads are **never lost** even if the
  Discord DM fails.
- **Token safety:** `src/lib/discord.ts` is marked `server-only` and reads the
  token exclusively from `process.env`.

> The in-memory rate limiter suits a single-process VPS deployment (the
> documented target). For multi-instance scaling, swap the `Map` for Redis —
> the function signature stays the same.

---

## Production / VPS deployment

```bash
# On your VPS (Node 18.18+)
git clone <your-repo> spawn-icu && cd spawn-icu
cp .env.example .env        # add your real secrets
npm ci
npm run build
npm run start               # serves on port 3000
```

Keep it running with a process manager and put Nginx in front for TLS:

```bash
npm i -g pm2
pm2 start "npm run start" --name spawn-icu
pm2 save && pm2 startup
```

Example Nginx reverse proxy:

```nginx
server {
  server_name spawn.icu;
  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

(Forwarding `X-Forwarded-For` lets the rate limiter see real client IPs.)

A health check is available at `/api/health`.

---

## Project structure

```
spawn-icu/
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx            # fonts, SEO metadata, nav + footer
│  │  ├─ page.tsx              # Home
│  │  ├─ work/ services/ process/ why/ faq/ start/   # pages
│  │  ├─ api/contact/route.ts  # secure Discord backend
│  │  ├─ api/health/route.ts   # uptime check
│  │  ├─ sitemap.ts / robots.ts
│  │  └─ globals.css
│  ├─ components/              # reusable UI (Navbar, TiltCard, FloatingScene…)
│  └─ lib/                     # data, validation, rateLimit, discord, leadLog
├─ public/favicon.svg
├─ data/                       # lead log fallback (git-ignored contents)
├─ .env.example
└─ ...config
```

## Notes

- Fonts are loaded via `next/font/google` (Inter, Playfair Display, Dancing
  Script) and self-hosted at build time, so the build machine needs internet
  access to Google Fonts during `npm run build`.
- Respects `prefers-reduced-motion` — all motion gracefully degrades.

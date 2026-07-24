# Paper & Dice

**▶ Play it live: [paper-dice.netlify.app](https://paper-dice.netlify.app)**

A simplified tabletop RPG, and a web app for playing it with friends over the web.
One **Story God** narrates, sets difficulties, and rolls. Everyone else brings a character.

Fully bilingual — **English / Türkçe**, switchable from the header.

## The design in four lines

- **One roll** — `d20 + Ability + Training` vs. a number the Story God says out loud.
- **No spell list** — you describe an Effect, the Story God prices it in Energy from a single table.
- **No battle map** — combat runs in four zones: Engaged → Near → Far → Distant.
- **One resource** — Energy. No spell slots, no per-day counters.

## What's in it

- **Class browser** — 14 classes, 51 subclasses. Each says plainly what it does and who it's for.
- **Character creator** — pick a class, spend ability points, choose skills and gear; a live card previews as you go. Saved in your browser.
- **Dice** — the one roll with advantage/disadvantage, difficulty, damage, and custom expressions.
- **Live tables** — a Story God opens a room, friends join by code with their characters. Shared, real-time dice log (with secret rolls), scene backdrops, and everyone's health in sync.
- **Rules reference** — the whole system on one page.
- Dark ↔ parchment theme, remembered across visits.

## Documents

| File | What it is |
|---|---|
| [`RULES.md`](RULES.md) | The complete rule set |
| [`CLASSES.md`](CLASSES.md) | 14 classes, 51 subclasses, written for players |
| [`PROMPTS.md`](PROMPTS.md) | Image-generation prompts for every class and scene |
| [`data/classes.ts`](data/classes.ts) | The same class content as typed data — the app reads this |

`CLASSES.md` is the readable rulebook; `data/classes.ts` is what the app renders.

## Tech

Next.js 15 (App Router) · React 19 · Supabase (Postgres + Realtime + Storage) · no CSS framework — a hand-rolled dark-fantasy theme.

There is **no login**: live tables join by room code, guarded by Row Level Security using
only the browser-safe publishable key. Fine for a game with friends; don't store anything
sensitive.

## Running it locally

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

Live tables need Supabase. Copy [`.env.local.example`](.env.local.example) to `.env.local`
and fill in the two browser-safe values from your Supabase project. Without them, everything
except the `/table` lobby still works.

> Never run `npm run build` while `npm run dev` is running — they share the `.next/`
> directory and the build corrupts the dev server's chunks. If that happens, stop the server
> and `rm -rf .next`.

## Deploying

Set up for **Netlify** ([`netlify.toml`](netlify.toml) + the Next.js plugin). Push to git and
import the repo; add the two `NEXT_PUBLIC_SUPABASE_*` variables in Netlify's environment
settings. They are public by design — do **not** mark them as secret values, and never add the
Supabase secret key.

## Localisation

Every player-facing string is a `{ en, tr }` pair. UI chrome lives in [`lib/i18n.ts`](lib/i18n.ts);
content carries its own pairs in the data files. Missing `tr` falls back to English, so the app
is never half-broken while translation is in progress.

## Artwork

Drop images into `public/images/` using the filenames in
[`public/images/README.md`](public/images/README.md). Prompts for all of them are in
[`PROMPTS.md`](PROMPTS.md). Anything missing falls back to a hand-drawn class glyph.

## Next

- Initiative / turn tracker and status conditions (schema is ready, UI pending)
- Preset scene backdrop art

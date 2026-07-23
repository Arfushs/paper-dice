# Paper & Dice

A simplified tabletop RPG, and a web app for playing it with friends.
One **Story God** narrates, sets difficulties, and rolls. Everyone else plays a character.

## The design in four lines

- **One roll** — `d20 + Ability + Training` vs. a number the Story God says out loud.
- **No spell list** — you describe an Effect, the Story God prices it in Energy from a single table.
- **No battle map** — combat runs in four zones: Engaged → Near → Far → Distant.
- **One resource** — Energy. No spell slots, no per-day counters.

## Documents

| File | What it is |
|---|---|
| [`RULES.md`](RULES.md) | The complete rule set |
| [`CLASSES.md`](CLASSES.md) | 14 classes, 51 subclasses, written for players |
| [`data/classes.ts`](data/classes.ts) | The same content as typed data — the app reads this |

`CLASSES.md` is the readable rulebook; `data/classes.ts` is what the app renders.
When you change a class, change both.

## Running it

```bash
npm run dev
```

Then open <http://localhost:3000>.

> **Note:** Node.js is installed at `C:\Program Files\nodejs`. If `npm` isn't found in a
> fresh shell, open a new terminal so it picks up the updated PATH.

### If the dev server starts throwing `Cannot find module './432.js'`

`next build` and `next dev` write to the same `.next/` directory, so running a build
while the dev server is up corrupts its chunk references. Stop the server, clear the
directory, and start again:

```bash
rm -rf .next
```

Never run `npm run build` while `npm run dev` is running.

## Artwork

Drop images into `public/images/` using the filenames listed in
[`public/images/README.md`](public/images/README.md). Anything missing falls back to a
hand-drawn class glyph, so art can be added one file at a time without breaking the layout.

## Localisation

Every player-facing string is a `{ en, tr }` pair (see [`data/types.ts`](data/types.ts)).
English is authored first; `tr` falls back to English until it is filled in.

## Built so far

- Landing page, class browser, class detail pages with an interactive subclass browser
- Core rules reference page
- Dark ↔ parchment theme, remembered across visits
- 14 hand-drawn SVG class glyphs

## Next

- Turkish translation pass
- Character creator — ability allocation, skills, kit, derived values
- Lobby and live sessions (Supabase: Postgres + Realtime + Auth)
- Shared dice log; the Story God can roll in secret
- Initiative and HP tracker

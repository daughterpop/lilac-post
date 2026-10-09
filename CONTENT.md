# Content rules for automated editors

Grok automations write all events and stories on The Lilac Post. Dustin reviews only what they hold for him. This file is the contract they follow. If a prompt and this file disagree on field formats, follow this file.

## Files

| File                  | Who edits it                                |
| --------------------- | ------------------------------------------- |
| `src/data/events.ts`  | weekly events automation                    |
| `src/data/posts.ts`   | stories automation                          |
| `src/data/wires.ts`   | breaking-news automation only. Nobody else. |
| `src/lib/breaking.ts` | breaking-news automation only. Nobody else. |
| anything else         | not content. Don't touch it.                |

Edit arrays in place. Never rewrite a file from scratch, and keep its header comment, imports, exports, and helper functions as they are. Use the existing style: double quotes, trailing commas, curly quotes (’ “ ”) in prose, and `\"` for any straight double quote inside a string.

## Events: `VillageEvent` in `src/data/events.ts`

| Field          | Req. | Format                                                                                                                                        |
| -------------- | ---- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`           | yes  | lowercase-kebab-case, unique, permanent. Title plus a short date suffix if needed (`book-sale-1024`). Never rename or reuse one.              |
| `title`        | yes  | text                                                                                                                                          |
| `date`         | yes  | `YYYY-MM-DD`, America/Chicago                                                                                                                 |
| `start`, `end` | no   | `HH:MM` 24-hour, Chicago time. `end` requires `start`. Leave both out for all-day events.                                                     |
| `place`        | yes  | venue name                                                                                                                                    |
| `address`      | no   | street address                                                                                                                                |
| `desk`         | yes  | `Market`, `Library`, `Village`, `Park`, `History`, `Outdoors`                                                                                 |
| `origin`       | yes  | `Village`, `Park District`, `Butterfield`, `York Center`, `Yorktown`, `Chamber`, `Historical Society`, `Library`, `School`, `Parish`, `Lilac` |
| `blurb`        | yes  | 1-2 plain sentences                                                                                                                           |
| `href`         | yes  | official source page, `https://`                                                                                                              |
| `featured`     | no   | `true` puts the event on the front page. Then `frontTitle` and `frontDek` are required.                                                       |
| `story`        | no   | an existing post `slug`                                                                                                                       |
| image fields   | no   | see Photos                                                                                                                                    |

Put a `// Source: <url>` comment above each event, and keep the array in date order. Remove events only after their date has passed. Never remove one that is today or later.

```ts
  // Source: https://www.helenplum.org/events/...
  {
    id: "book-sale-1024",
    title: "Friends of the Library Book Sale",
    date: "2026-10-24",
    start: "10:00",
    end: "14:00",
    place: "Helen Plum Library",
    address: "411 S Main St",
    desk: "Library",
    origin: "Library",
    blurb: "Used books, most a dollar or two. Proceeds support library programs.",
    href: "https://www.helenplum.org/events/...",
  },
```

## Stories: `Post` in `src/data/posts.ts`

| Field         | Req. | Format                                                                                            |
| ------------- | ---- | ------------------------------------------------------------------------------------------------- |
| `slug`        | yes  | lowercase-kebab-case, unique, permanent. It is the URL (`/dispatches/<slug>`). Max about 6 words. |
| `title`       | yes  | headline                                                                                          |
| `dek`         | yes  | one sentence                                                                                      |
| `date`        | yes  | `YYYY-MM-DD` publish date, Chicago                                                                |
| `desk`        | yes  | same values as events                                                                             |
| `order`       | yes  | integer, normally `0`                                                                             |
| `body`        | yes  | array of plain-text paragraphs. Name sources in the text ("the village said").                    |
| `sources`     | yes  | at least one `{ name, href }` with an http(s) link                                                |
| `corrections` | no   | `{ date: "YYYY-MM-DD", note }[]`. Append only; never delete one.                                  |
| image fields  | no   | see Photos                                                                                        |

Add new stories at the top of the array. Never change a published `slug`.

```ts
  {
    slug: "leaf-pickup-2026",
    title: "When the leaf vacuums come",
    dek: "The village’s fall leaf collection runs in zones through November.",
    date: "2026-10-12",
    desk: "Village",
    order: 0,
    body: [
      "First paragraph.",
      "Second paragraph.",
    ],
    sources: [{ name: "Village of Lombard", href: "https://villageoflombard.org/..." }],
  },
```

## Photos

Use real photos only, and only when they are freely licensed (public domain, CC0, CC BY, CC BY-SA, or a U.S. government work) or the organizer has published them for press use. Don't use AI images. If you can't find a fitting free photo, leave the image fields out.

- `image`: an `https://` URL to the file (for example `upload.wikimedia.org`), or `/images/<file>` for a file committed to `public/images/` in the same PR.
- `imageAlt`: required with an image. Plainly describe what the photo shows.
- `imageCaption`: what and where. If the photo is a stand-in rather than the actual place or event, the caption must say so ("Representative photo, taken at ..., not ...").
- `imageCredit`: required for every photo: `{ text: "Photo: <author> / <site>, <license>", href: "<source page URL>" }`.

## Content check

`npm run build` runs `scripts/check-content.mjs` first, so it gates every Vercel preview. To run it alone: `npm run check:content`. It fails on:

- duplicate or badly formed ids and slugs
- missing required fields
- dates or times in the wrong format
- `desk` or `origin` values not on the list
- `end` without `start`
- non-http(s) links
- a `story` that isn't a post slug
- a missing `/images/...` file or missing `imageAlt`
- a featured event without `frontTitle` and `frontDek`

A TypeScript syntax error also fails the build.

## Publishing flow

1. Never push or commit to `main`.
2. Branch from `main`: `events/<YYYY-MM-DD>` or `stories/<YYYY-MM-DD>`, adding `-2` and so on if the name is taken. Commit only the file you own, plus any new `public/images/` file.
3. Open a PR into `main`. In the body, list each item and its source links.
4. Wait until all checks pass, including the Vercel preview (check every minute, up to 15 minutes).
5. Squash-merge and delete the branch. Then re-read the file on `main` to confirm the change is there and nothing else changed.
6. If a check fails or never finishes, leave the PR open and don't merge. Email dhimmer1@gmail.com that the run failed.
7. Hold for Dustin. Anything about a real private individual, a death, a crime, or an accident gets a PR that is opened but **not** merged, plus an email asking for his OK. Never name victims or minors. Never invent facts or quotes.

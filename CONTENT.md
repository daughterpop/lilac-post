# Content: Notion → site

Dustin edits events and stories in Notion. A daily Grok automation copies rows
marked **Ready** into `src/data/events.ts` and `src/data/posts.ts` through a pull
request, merges it after the Vercel preview passes, and marks the rows
**Published**. There is no Notion token in the app or in Vercel; the site still
builds from the TypeScript files in this repo.

Notion (page "Lilac Post"):

- **Lilac Post Events**: https://app.notion.com/p/ca3c4b923a5a4bb59905f966dba32216 (data source `collection://fba1825e-835d-48a1-8ef3-acee9000c306`)
- **Lilac Post Stories**: https://app.notion.com/p/8861969fb085463d8d6c97eba3e9e6b3 (data source `collection://2ec31b34-c5e5-4e5f-819b-d9080de31010`)

## Rules for the sync

1. **Only `Status = Ready` rows change the site.** Draft, Published, and blank rows are ignored.
2. **Ready + empty Site ID → add.** Make a new id/slug (see below), add the object, then set the row's `Site ID` and `Status = Published` and clear `Sync note`.
3. **Ready + Site ID → update** the object with that `id` (events) or `slug` (stories) in place. Replace only the fields the row maps to; keep anything Notion doesn't carry. Then set `Status = Published`.
4. **`Status = Archived` with a Site ID that is still in the file → remove** that object. Leave the row Archived. Never remove anything that isn't Archived in Notion.
5. If a Ready row can't be used (missing required field, bad URL, id clash, or sensitive content that needs Dustin), **don't touch the file for it**. Leave it Ready and write the reason in `Sync note`.
6. **Never edit `src/data/wires.ts` or `src/lib/breaking.ts`.** The hourly breaking-news automation owns them. Don't edit any other file either, except `public/images/` if a future prompt says so.
7. Ids and slugs are permanent. Never rename one, and never reuse one for something else.
8. Keep the arrays as plain object literals in the existing style (double quotes, trailing commas, curly quotes in prose as typed). Add new events in date order near events with the same date; add new stories at the top of `posts`.
9. `npm run build` runs `scripts/check-content.mjs` first, so the Vercel preview fails on duplicate ids, bad dates or times, unknown desk/origin values, missing required fields, a `story` that isn't a post slug, or an `/images/...` file that doesn't exist. A failed preview means **do not merge**.

### New ids

- Event `id`: lowercase kebab-case from the title, plus a short date or month suffix when needed to stay unique (e.g. `plan-commission-jan`, `vocations-rosary-1101`).
- Story `slug`: the row's `Slug` if filled, else kebab-case of the headline (max ~6 words). It must be unique in `posts.ts`.

## Events: Notion → `VillageEvent` (`src/data/events.ts`)

| Notion property                       | Code field                            | Notes                                                                                                                                                                    |
| ------------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Name (title)                          | `title`                               | required                                                                                                                                                                 |
| Date (start)                          | `date`                                | required. `YYYY-MM-DD` **in America/Chicago**. Notion returns datetimes in UTC (e.g. 6 p.m. CST = `00:00Z` the next day), so convert before taking the date.             |
| Date (start time, if "Include time")  | `start`                               | `HH:MM` 24-hour, America/Chicago. Omit when the date has no time.                                                                                                        |
| Date (end time)                       | `end`                                 | `HH:MM`, same day, Chicago time. Only when there's a start.                                                                                                              |
| Place                                 | `place`                               | required                                                                                                                                                                 |
| Address                               | `address`                             | optional                                                                                                                                                                 |
| Category                              | `desk`                                | one of `Market`, `Library`, `Village`, `Park`, `History`, `Outdoors`. Blank → `Village`.                                                                                 |
| Organizer                             | `origin`                              | one of `Village`, `Park District`, `Butterfield`, `York Center`, `Yorktown`, `Chamber`, `Historical Society`, `Library`, `School`, `Parish`, `Lilac`. Blank → `Village`. |
| Summary                               | `blurb`                               | required, 1–2 plain sentences                                                                                                                                            |
| Source URL                            | `href`                                | required, http(s)                                                                                                                                                        |
| Featured                              | `featured: true`                      | only when checked; then Front title + Front dek are required                                                                                                             |
| Front title                           | `frontTitle`                          |                                                                                                                                                                          |
| Front dek                             | `frontDek`                            |                                                                                                                                                                          |
| Story slug                            | `story`                               | must be an existing post slug                                                                                                                                            |
| Image URL / Image alt / Image caption | `image` / `imageAlt` / `imageCaption` | image is `https://…` or an existing `/images/…`; alt required with an image                                                                                              |
| Image credit                          | `imageCredit`                         | optional. Format: `Credit text \| https://source-url`. Split on the first ` \| `; left → `text`, right → `href` (strip Notion markdown links like `[url](url)` to the bare URL). Blank → omit `imageCredit`. Both parts required when set. |
| Site ID                               | `id`                                  | written by the sync                                                                                                                                                      |

Also add a `// Source: <Source URL>` comment above each new event, like the existing entries.

## Stories: Notion → `Post` (`src/data/posts.ts`)

| Notion property                       | Code field                            | Notes                                                                                                         |
| ------------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Name (title)                          | `title`                               | required                                                                                                      |
| Dek                                   | `dek`                                 | required                                                                                                      |
| Date                                  | `date`                                | `YYYY-MM-DD`. Blank → the sync date (Chicago).                                                                |
| Desk                                  | `desk`                                | same values as events. Blank → `Village`.                                                                     |
| Page body                             | `body`                                | required. One string per paragraph, in order. Plain text only: drop formatting, keep curly quotes and dashes. |
| Source URL + Source name              | `sources[0]`                          | `{ name, href }`. URL required; blank name → the site's name (e.g. "Village of Lombard").                     |
| Extra sources                         | `sources[1..]`                        | one per line, `Name \| https://…`                                                                             |
| Slug                                  | used for a new `slug`                 | ignored once Site ID is set                                                                                   |
| Order                                 | `order`                               | integer, blank → 0                                                                                            |
| Image URL / Image alt / Image caption | `image` / `imageAlt` / `imageCaption` | same rules as events. AI-made images must have a caption starting "Illustration."                             |
| Image credit                          | `imageCredit`                         | same format as events (`Credit text \| https://…` → `{ text, href }`).                                        |
| Correction                            | `corrections[]`                       | when filled on an update, append `{ date: <today>, note }` and then clear the Notion field                    |
| Site ID                               | `slug`                                | written by the sync                                                                                           |

## Not synced (edit in code)

`src/data/places.ts`, `src/data/parishes.ts`, `src/data/wires.ts`, `src/lib/breaking.ts`, and everything outside `src/data`.

Run `npm run check:content` locally to validate the data files without a full build.

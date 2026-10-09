# Editing events and stories on GitHub

You can add or change events and stories right on github.com, from a computer or your phone. No code tools needed.

- **Events** (the calendar): [`src/data/events.ts`](src/data/events.ts)
- **Stories** (dispatches): [`src/data/posts.ts`](src/data/posts.ts)

Leave every other file alone. The breaking-news automation edits `src/data/wires.ts` and `src/lib/breaking.ts`, and the weekly events automation also edits `events.ts`.

## How to make a change

1. Go to https://github.com/daughterpop/lilac-post and tap the file (`src` → `data` → `events.ts` or `posts.ts`). On a phone, if you don't see the pencil, switch to desktop view in your browser menu.
2. Tap the **pencil** (Edit this file).
3. At the top of the file is a template. To add an entry, copy an existing entry (or the template) from its `{` through its `},` and paste it right below another entry. Then change the values.
   - Add new events next to other events on the same date.
   - Add new stories at the top of the list, just after `export const posts: Post[] = [`.
4. Tap **Commit changes...** and write a short message, like "Add library book sale".
5. Pick one:
   - **Safest: "Create a new branch for this commit and start a pull request"** (GitHub calls this "propose changes"). Vercel builds a preview and checks your entry. If the check passes, tap **Merge pull request**, then **Confirm**. If it fails, nothing goes live; open the failed check to see the reason, fix it, and commit again.
   - **Faster: "Commit directly to the main branch."** This also works. The site rebuilds in about a minute. If the entry has a mistake, the build stops and the live site stays as it was until you fix it.

To fix a typo, open the file, tap the pencil, change the text, and commit the same way.

## Typing tips

- Put every value in straight double quotes: `"like this"`. End each line with a comma.
- To use a double quote inside a value, type `\"`, or use curly quotes (“ ”). Apostrophes (’ or ') are fine.
- Dates are `YYYY-MM-DD`, like `"2026-10-24"`.
- Times are 24-hour `HH:MM`, Chicago time: `"09:30"`, `"18:00"` for 6 p.m.
- Lines starting with `//` are notes for editors. They don't show on the site.

## Event fields (`events.ts`)

| Field            | Required? | What to put                                                                                                                                                        |
| ---------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `id`             | yes       | Short and unique, lowercase with dashes: `"book-sale-oct"`. Never change or reuse one.                                                                             |
| `title`          | yes       | Event name.                                                                                                                                                        |
| `date`           | yes       | `"YYYY-MM-DD"`                                                                                                                                                     |
| `start` / `end`  | optional  | `"HH:MM"`. Use `end` only if there's a `start`. Leave both out for all-day events.                                                                                 |
| `place`          | yes       | Venue name.                                                                                                                                                        |
| `address`        | optional  | Street address.                                                                                                                                                    |
| `desk`           | yes       | One of: `Market`, `Library`, `Village`, `Park`, `History`, `Outdoors`                                                                                              |
| `origin`         | yes       | Who runs it. One of: `Village`, `Park District`, `Butterfield`, `York Center`, `Yorktown`, `Chamber`, `Historical Society`, `Library`, `School`, `Parish`, `Lilac` |
| `blurb`          | yes       | One or two plain sentences.                                                                                                                                        |
| `href`           | yes       | Link to the official page, starting with `https://`.                                                                                                               |
| `featured: true` | optional  | Puts it on the front page. Then `frontTitle` and `frontDek` are required.                                                                                          |
| `story`          | optional  | The `slug` of a story about this event.                                                                                                                            |
| image fields     | optional  | See "Photos" below.                                                                                                                                                |

## Story fields (`posts.ts`)

| Field         | Required? | What to put                                                                                                                        |
| ------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `slug`        | yes       | Short and unique, lowercase with dashes. It becomes the web address (`/dispatches/<slug>`). Never change it after the story is up. |
| `title`       | yes       | Headline.                                                                                                                          |
| `dek`         | yes       | One-sentence summary under the headline.                                                                                           |
| `date`        | yes       | `"YYYY-MM-DD"`                                                                                                                     |
| `desk`        | yes       | Same choices as events.                                                                                                            |
| `order`       | yes       | Usually `0`. A higher number moves a story up among stories with the same date.                                                    |
| `body`        | yes       | A list of paragraphs, each in its own quotes and ending with a comma.                                                              |
| `sources`     | yes       | At least one: `{ name: "Village of Lombard", href: "https://..." },`                                                               |
| `corrections` | optional  | `[{ date: "2026-10-09", note: "An earlier version gave the wrong time." }],`                                                       |
| image fields  | optional  | See "Photos" below.                                                                                                                |

## Photos

An image needs `image` and `imageAlt`. `imageCaption` and `imageCredit` are optional.

- `image`: either a full `https://` link to a photo, or a file in the repo's `public/images` folder, written as `"/images/file-name.webp"` (leave `public` out). To add a file, open `public/images` on GitHub, tap **Add file → Upload files**, and commit it before you use it.
- `imageAlt`: a plain description of the photo for screen readers.
- `imageCaption`: the line shown under the photo. Mark stand-in photos ("Representative photo, ...") and AI images ("Illustration. ...").
- `imageCredit`: the photographer and license, linked to where you found it:
  ```ts
  imageCredit: {
    text: "Photo: Jane Doe / Flickr, CC BY 2.0",
    href: "https://www.flickr.com/photos/...",
  },
  ```

Use photos you're allowed to use, such as public domain, Creative Commons, or your own, and credit them.

## The content check

Every build runs `scripts/check-content.mjs` first. If an entry is broken, the check stops the deploy and lists what's wrong, so a bad entry can't reach the live site. It catches:

- a missing required field
- a duplicate `id` or `slug`
- a date or time in the wrong format
- a `desk` or `origin` that isn't on the list
- a link that doesn't start with `http`
- a `story` that doesn't match a story's `slug`
- an `/images/...` file that doesn't exist, or a photo with no `imageAlt`
- a featured event without `frontTitle` and `frontDek`

A missing comma or quote fails the build too. When a check fails, open it from the pull request or from the commit's red ✗ to see which entry needs fixing. Developers can run `npm run check:content` to check locally.

## Not edited here

`src/data/places.ts`, `src/data/parishes.ts`, `src/data/wires.ts`, `src/lib/breaking.ts`, and everything outside `src/data` are code. Ask before changing them.

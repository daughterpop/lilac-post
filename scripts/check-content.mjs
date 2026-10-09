#!/usr/bin/env node
/**
 * Content guard for src/data/events.ts and src/data/posts.ts.
 *
 * Runs before `vite build` (so it also gates every Vercel preview). Vite's
 * build does not type-check, so a hand- or automation-edited entry with a
 * misspelled desk, a duplicate id, or a bad date would otherwise ship
 * silently. Any problem here fails the build with a readable list.
 *
 * See CONTENT.md for the field rules this enforces (written for editing on github.com).
 */
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { runnerImport } from "vite";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const config = {
  configFile: false,
  logLevel: "silent",
  resolve: { alias: { "@": join(root, "src") } },
};

const load = async (rel) => (await runnerImport(join(root, rel), config)).module;
const { DESKS, ORIGINS } = await load("src/data/types.ts");
const { events } = await load("src/data/events.ts");
const { posts } = await load("src/data/posts.ts");

const problems = [];
const bad = (where, msg) => problems.push(`${where}: ${msg}`);

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;
const isText = (v) => typeof v === "string" && v.trim().length > 0;
const isUrl = (v) => typeof v === "string" && /^https?:\/\/\S+$/.test(v);
const isDate = (v) => {
  if (typeof v !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(v)) return false;
  const d = new Date(`${v}T12:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === v;
};
const checkImage = (where, item) => {
  if (item.image === undefined) return;
  if (isUrl(item.image) && item.image.startsWith("https://")) {
    // remote images are allowed (e.g. Wikimedia); they need alt text
  } else if (typeof item.image === "string" && item.image.startsWith("/images/")) {
    if (!existsSync(join(root, "public", item.image)))
      bad(where, `image file public${item.image} does not exist`);
  } else {
    bad(
      where,
      `image must be "/images/<file>" or an https:// URL (got ${JSON.stringify(item.image)})`,
    );
  }
  if (!isText(item.imageAlt)) bad(where, "imageAlt is required when image is set");
};

if (!Array.isArray(posts) || posts.length === 0) bad("posts.ts", "posts must be a non-empty array");
if (!Array.isArray(events) || events.length === 0)
  bad("events.ts", "events must be a non-empty array");

const slugs = new Set();
for (const [i, p] of posts.entries()) {
  const w = `posts[${i}] (${p?.slug ?? "?"})`;
  if (!SLUG.test(p.slug ?? "")) bad(w, "slug must be lowercase-kebab-case");
  else if (slugs.has(p.slug)) bad(w, "duplicate slug");
  slugs.add(p.slug);
  if (!isText(p.title)) bad(w, "title is required");
  if (!isText(p.dek)) bad(w, "dek is required");
  if (!isDate(p.date)) bad(w, `date must be a real YYYY-MM-DD (got ${JSON.stringify(p.date)})`);
  if (!DESKS.includes(p.desk)) bad(w, `desk must be one of ${DESKS.join(", ")}`);
  if (!Number.isInteger(p.order)) bad(w, "order must be an integer");
  if (!Array.isArray(p.body) || p.body.length === 0 || !p.body.every(isText))
    bad(w, "body must be a non-empty array of non-empty paragraphs");
  if (!Array.isArray(p.sources) || p.sources.length === 0)
    bad(w, "at least one source is required");
  else
    for (const s of p.sources)
      if (!isText(s.name) || !isUrl(s.href)) bad(w, "each source needs a name and an http(s) href");
  for (const c of p.corrections ?? [])
    if (!isDate(c.date) || !isText(c.note))
      bad(w, "each correction needs a YYYY-MM-DD date and a note");
  checkImage(w, p);
}

const ids = new Set();
for (const [i, e] of events.entries()) {
  const w = `events[${i}] (${e?.id ?? "?"})`;
  if (!SLUG.test(e.id ?? "")) bad(w, "id must be lowercase-kebab-case");
  else if (ids.has(e.id)) bad(w, "duplicate id");
  ids.add(e.id);
  if (!isText(e.title)) bad(w, "title is required");
  if (!isDate(e.date)) bad(w, `date must be a real YYYY-MM-DD (got ${JSON.stringify(e.date)})`);
  if (e.start !== undefined && !TIME.test(e.start))
    bad(w, `start must be 24-hour HH:MM (got ${JSON.stringify(e.start)})`);
  if (e.end !== undefined && !TIME.test(e.end))
    bad(w, `end must be 24-hour HH:MM (got ${JSON.stringify(e.end)})`);
  if (e.end !== undefined && e.start === undefined) bad(w, "end needs a start");
  if (!isText(e.place)) bad(w, "place is required");
  if (!DESKS.includes(e.desk)) bad(w, `desk must be one of ${DESKS.join(", ")}`);
  if (!ORIGINS.includes(e.origin)) bad(w, `origin must be one of ${ORIGINS.join(", ")}`);
  if (!isText(e.blurb)) bad(w, "blurb is required");
  if (!isUrl(e.href)) bad(w, "href must be an http(s) URL");
  if (e.story !== undefined && !slugs.has(e.story)) bad(w, `story "${e.story}" is not a post slug`);
  if (e.featured && (!isText(e.frontTitle) || !isText(e.frontDek)))
    bad(w, "featured events need frontTitle and frontDek");
  checkImage(w, e);
}

if (problems.length) {
  console.error(
    `check-content: ${problems.length} problem(s) in src/data:\n  - ${problems.join("\n  - ")}`,
  );
  process.exit(1);
}
console.log(`check-content: ok (${posts.length} posts, ${events.length} events)`);

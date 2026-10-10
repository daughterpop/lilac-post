#!/usr/bin/env node
/**
 * Content guard for src/data/events.ts, posts.ts, editions.ts, and sports.ts.
 *
 * Runs before `vite build` (so it also gates every Vercel preview). Vite's
 * build does not type-check, so a hand- or automation-edited entry with a
 * misspelled desk, a duplicate id, or a bad date would otherwise ship
 * silently. Any problem here fails the build with a readable list.
 *
 * See CONTENT.md for the field rules this enforces.
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
const { DESKS, ORIGINS, SCHOOLS, SITES } = await load("src/data/types.ts");
const { events } = await load("src/data/events.ts");
const { posts } = await load("src/data/posts.ts");
const { editions } = await load("src/data/editions.ts");
const { results, games } = await load("src/data/sports.ts");
const { communityResults, COMMUNITY_TEAMS, TEAM_KINDS } = await load("src/data/community.ts");
const { records } = await load("src/data/records.ts");
const { standings } = await load("src/data/standings.ts");
const { pros, proUpdates } = await load("src/data/pros.ts");

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

// Sports: verified varsity results and scheduled games.
const isScore = (v) => Number.isInteger(v) && v >= 0;
const isSource = (s) => s && isText(s.name) && isUrl(s.href);
const sportIds = new Set();
const checkSportsCommon = (w, x) => {
  if (!SLUG.test(x.id ?? "")) bad(w, "id must be lowercase-kebab-case");
  else if (sportIds.has(x.id)) bad(w, "duplicate id (results and games share one id space)");
  sportIds.add(x.id);
  if (!isDate(x.date)) bad(w, `date must be a real YYYY-MM-DD (got ${JSON.stringify(x.date)})`);
  if (!isText(x.sport)) bad(w, "sport is required");
  if (x.level !== "Varsity") bad(w, 'level must be "Varsity"');
  if (!SCHOOLS.includes(x.school)) bad(w, `school must be one of ${SCHOOLS.join(", ")}`);
  if (!isText(x.opponent)) bad(w, "opponent is required");
  if (!SITES.includes(x.site)) bad(w, `site must be one of ${SITES.join(", ")}`);
  if (!isSource(x.source)) bad(w, "source needs a name and an http(s) href");
};
if (!Array.isArray(results)) bad("sports.ts", "results must be an array (it may be empty)");
for (const [i, r] of (results ?? []).entries()) {
  const w = `sports results[${i}] (${r?.id ?? "?"})`;
  checkSportsCommon(w, r);
  if (!isScore(r.scoreFor) || !isScore(r.scoreAgainst))
    bad(w, "scoreFor and scoreAgainst must be whole numbers");
  else {
    const want = r.scoreFor > r.scoreAgainst ? "W" : r.scoreFor < r.scoreAgainst ? "L" : "T";
    if (r.result !== want) bad(w, `result must be "${want}" for ${r.scoreFor}-${r.scoreAgainst}`);
  }
  if (r.note !== undefined && !isText(r.note)) bad(w, "note must be text when set");
  if (r.recap !== undefined && !isText(r.recap)) bad(w, "recap must be text when set");
  const https = (v) => typeof v === "string" && /^https?:\/\//.test(v);
  if (r.highlights !== undefined && !Array.isArray(r.highlights))
    bad(w, "highlights must be an array");
  for (const [j, h] of (Array.isArray(r.highlights) ? r.highlights : []).entries()) {
    if (!isText(h?.player) || !isText(h?.school) || !isText(h?.stat))
      bad(w, `highlights[${j}] needs player, school, and stat`);
    if (!https(h?.sourceUrl)) bad(w, `highlights[${j}] needs an http(s) sourceUrl`);
  }
  if (r.quotes !== undefined && !Array.isArray(r.quotes)) bad(w, "quotes must be an array");
  for (const [j, q] of (Array.isArray(r.quotes) ? r.quotes : []).entries()) {
    if (!isText(q?.text) || !isText(q?.speaker) || !isText(q?.sourceName))
      bad(w, `quotes[${j}] needs text, speaker, and sourceName`);
    if (!https(q?.sourceUrl)) bad(w, `quotes[${j}] needs an http(s) sourceUrl`);
  }
}
if (!Array.isArray(games)) bad("sports.ts", "games must be an array (it may be empty)");
for (const [i, g] of (games ?? []).entries()) {
  const w = `sports games[${i}] (${g?.id ?? "?"})`;
  checkSportsCommon(w, g);
  if (g.start !== undefined && !TIME.test(g.start))
    bad(w, `start must be 24-hour HH:MM (got ${JSON.stringify(g.start)})`);
}

// Editions: the Sunday Lilac Post.
const isSunday = (v) => isDate(v) && new Date(`${v}T12:00:00Z`).getUTCDay() === 0;
const INTERNAL = new Set([
  "/",
  "/breaking",
  "/dispatches",
  "/calendar",
  "/parish",
  "/village",
  "/about",
  "/sports",
  "/sports/standings",
  "/sports/records",
  "/sports/pros",
  "/editions",
  "/subscribe",
]);
const editionDates = new Set();
if (!Array.isArray(editions)) bad("editions.ts", "editions must be an array");
for (const [i, ed] of (editions ?? []).entries()) {
  const w = `editions[${i}] (${ed?.date ?? "?"})`;
  if (!isSunday(ed.date))
    bad(
      w,
      `date must be a real YYYY-MM-DD that falls on a Sunday (got ${JSON.stringify(ed.date)})`,
    );
  else if (editionDates.has(ed.date)) bad(w, "duplicate edition date");
  editionDates.add(ed.date);
  if (!isText(ed.headline)) bad(w, "headline is required");
  if (!isText(ed.lede)) bad(w, "lede is required");
  if (!Array.isArray(ed.news) || ed.news.length < 3 || ed.news.length > 6)
    bad(w, "news must have 3 to 6 items");
  for (const [j, item] of (ed.news ?? []).entries()) {
    const wi = `${w} news[${j}]`;
    if (!isText(item.headline)) bad(wi, "headline is required");
    if (!isText(item.summary)) bad(wi, "summary is required");
    else if (item.summary.length > 450)
      bad(wi, "summary is too long; keep it to one to three sentences");
    if (!isText(item.hrefLabel)) bad(wi, "hrefLabel is required");
    if (typeof item.href === "string" && item.href.startsWith("/dispatches/")) {
      const slug = item.href.slice("/dispatches/".length);
      if (!slugs.has(slug)) bad(wi, `href points to /dispatches/${slug}, which is not a post slug`);
    } else if (typeof item.href === "string" && item.href.startsWith("/")) {
      if (!INTERNAL.has(item.href))
        bad(wi, `internal href must be /dispatches/<slug> or one of ${[...INTERNAL].join(", ")}`);
    } else if (!isUrl(item.href)) bad(wi, "href must be an internal path or an http(s) URL");
  }
  if (!Array.isArray(ed.featured) || ed.featured.length < 2 || ed.featured.length > 3)
    bad(w, "featured must list 2 or 3 post slugs");
  for (const slug of ed.featured ?? [])
    if (!slugs.has(slug)) bad(w, `featured "${slug}" is not a post slug`);
  for (const id of ed.eventPicks ?? []) {
    const ev = events.find((e) => e.id === id);
    if (!ev) bad(w, `eventPicks "${id}" is not an event id`);
  }
  if (
    ed.sports?.resultsFrom !== undefined &&
    !(isDate(ed.sports.resultsFrom) && ed.sports.resultsFrom < ed.date)
  )
    bad(w, "sports.resultsFrom must be a YYYY-MM-DD before the edition date");
  if (ed.sports?.note !== undefined && !isText(ed.sports.note))
    bad(w, "sports.note must be text when set");
  if (ed.sports?.recordPick !== undefined && !records.some((r) => r.id === ed.sports.recordPick))
    bad(w, `sports.recordPick "${ed.sports.recordPick}" is not a record id`);
  if (ed.editorsNote !== undefined && !isText(ed.editorsNote))
    bad(w, "editorsNote must be text when set");
}

// Prayer line: only the two approved wordings (CONTENT.md "Prayer line").
const PRAYERS = [
  "Eternal rest grant unto them, O Lord. Our prayers are with their family and friends.",
  "Eternal rest grant unto them, O Lord. Our prayers are with all who mourn.",
];
const { wires } = await load("src/data/wires.ts");
const checkPrayer = (w, x) => {
  if (x?.prayer !== undefined && !PRAYERS.includes(x.prayer))
    bad(w, "prayer must be one of the two approved lines");
};
for (const p of posts) checkPrayer(`posts (${p.slug})`, p);
for (const x of wires ?? []) checkPrayer(`wires (${x.id})`, x);
for (const ed of editions)
  for (const item of ed.news ?? []) checkPrayer(`editions (${ed.date})`, item);

// Club/park results, records, standings, pros: every fact needs a source.
const seen = new Set();
const uniq = (w, id) => {
  if (!SLUG.test(id ?? "")) bad(w, "id must be lowercase-with-dashes");
  else if (seen.has(id)) bad(w, "duplicate id");
  seen.add(id);
};
for (const [i, r] of (communityResults ?? []).entries()) {
  const w = `community[${i}] (${r?.id ?? "?"})`;
  uniq(w, r.id);
  if (!isDate(r.date)) bad(w, "date must be YYYY-MM-DD");
  if (!TEAM_KINDS.includes(r.kind)) bad(w, `kind must be one of ${TEAM_KINDS.join(", ")}`);
  for (const f of ["team", "sport", "event", "result", "sourceName"])
    if (!isText(r[f])) bad(w, `${f} is required`);
  if (!isUrl(r.sourceUrl)) bad(w, "sourceUrl is required");
}
for (const [i, t] of (COMMUNITY_TEAMS ?? []).entries())
  if (!isUrl(t.sourceUrl)) bad(`COMMUNITY_TEAMS[${i}]`, "sourceUrl is required");
for (const [i, r] of (records ?? []).entries()) {
  const w = `records[${i}] (${r?.id ?? "?"})`;
  uniq(w, r.id);
  for (const f of ["team", "sport", "year", "title", "sourceName"])
    if (!isText(r[f])) bad(w, `${f} is required`);
  if (!["school", "club", "park"].includes(r.kind)) bad(w, "kind must be school, club, or park");
  if (!isUrl(r.sourceUrl)) bad(w, "sourceUrl is required");
}
const REC = /^\d+-\d+(-\d+)?$/;
for (const [i, t] of (standings ?? []).entries()) {
  const w = `standings[${i}] (${t?.id ?? "?"})`;
  uniq(w, t.id);
  if (!isDate(t.asOf)) bad(w, "asOf must be YYYY-MM-DD");
  if (!["current", "final"].includes(t.status)) bad(w, "status must be current or final");
  for (const f of ["sport", "conference", "season", "sourceName"])
    if (!isText(t[f])) bad(w, `${f} is required`);
  if (!isUrl(t.sourceUrl)) bad(w, "sourceUrl is required");
  if (!Array.isArray(t.rows) || t.rows.length < 2) bad(w, "rows must list the full table");
  for (const row of t.rows ?? [])
    if (!isText(row.team) || !REC.test(row.conf ?? "") || !REC.test(row.overall ?? ""))
      bad(w, `row "${row.team}" needs team, conf and overall like 5-1 or 2-1-2`);
}
const proIds = new Set();
for (const [i, p] of (pros ?? []).entries()) {
  const w = `pros[${i}] (${p?.id ?? "?"})`;
  uniq(w, p.id);
  proIds.add(p.id);
  if (!isText(p.name) || !isText(p.sport)) bad(w, "name and sport are required");
  if (!["active", "retired"].includes(p.status)) bad(w, "status must be active or retired");
  if (!isText(p.connection?.text) || !isUrl(p.connection?.sourceUrl))
    bad(w, "connection needs text and sourceUrl");
  if (!Array.isArray(p.highlights) || p.highlights.length < 1 || p.highlights.length > 2)
    bad(w, "highlights must list 1 or 2");
  for (const h of p.highlights ?? [])
    if (!isText(h.text) || !isUrl(h.sourceUrl)) bad(w, "each highlight needs text and sourceUrl");
}
for (const [i, u] of (proUpdates ?? []).entries()) {
  const w = `proUpdates[${i}]`;
  if (!isDate(u.date)) bad(w, "date must be YYYY-MM-DD");
  if (!proIds.has(u.proId)) bad(w, `proId "${u.proId}" is not in pros`);
  if (!isText(u.text) || !isUrl(u.sourceUrl)) bad(w, "text and sourceUrl are required");
}

if (problems.length) {
  console.error(
    `check-content: ${problems.length} problem(s) in src/data:\n  - ${problems.join("\n  - ")}`,
  );
  process.exit(1);
}
console.log(
  `check-content: ok (${posts.length} posts, ${events.length} events, ${editions.length} editions, ${results.length} results, ${games.length} games, ${communityResults.length} club/park, ${records.length} records, ${standings.length} standings, ${pros.length} pros)`,
);

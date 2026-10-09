/**
 * VARSITY SPORTS. Owned by the sports-results automation. Rules: see CONTENT.md.
 *
 * Only verified final scores from public sources (IHSA, MaxPreps, school
 * athletics sites, Daily Herald), each with its source link. Team-level only:
 * never name players. Never guess a score; if sources disagree, leave it out.
 * Every build checks this file (scripts/check-content.mjs).
 *
 *   {
 *     id: "ge-football-1002",                // school-sport-MMDD, lowercase-with-dashes
 *     date: "2026-10-02",
 *     sport: "Football",
 *     level: "Varsity",
 *     school: "Glenbard East",               // Glenbard East, Montini
 *     opponent: "West Chicago",
 *     site: "home",                          // home, away, neutral
 *     scoreFor: 41,                          // local school
 *     scoreAgainst: 8,
 *     result: "W",                           // W, L, T (must match the score)
 *     source: { name: "IHSA", href: "https://..." },
 *   },
 */
import type { School, SportsGame, SportsResult } from "@/data/types";

export type { SportsGame, SportsResult };

const GE_FOOTBALL = {
  name: "MaxPreps: Glenbard East football schedule",
  href: "https://www.maxpreps.com/il/lombard/glenbard-east-rams/football/schedule/",
};
const MONTINI_FOOTBALL = {
  name: "MaxPreps: Montini football schedule",
  href: "https://www.maxpreps.com/il/lombard/montini-catholic-broncos/football/schedule/",
};

export const results: SportsResult[] = [
  {
    id: "ge-football-1002",
    date: "2026-10-02",
    sport: "Football",
    level: "Varsity",
    school: "Glenbard East",
    opponent: "West Chicago",
    site: "home",
    scoreFor: 41,
    scoreAgainst: 8,
    result: "W",
    source: {
      name: "IHSA",
      href: "https://beta.ihsa.org/scores/game/glenbard-east-vs-west-chicago-4552-4731-20261002",
    },
  },
  {
    id: "ge-football-0925",
    date: "2026-09-25",
    sport: "Football",
    level: "Varsity",
    school: "Glenbard East",
    opponent: "Ridgewood",
    site: "away",
    scoreFor: 55,
    scoreAgainst: 14,
    result: "W",
    source: GE_FOOTBALL,
  },
  {
    id: "montini-football-0925",
    date: "2026-09-25",
    sport: "Football",
    level: "Varsity",
    school: "Montini",
    opponent: "St. Rita",
    site: "home",
    scoreFor: 38,
    scoreAgainst: 39,
    result: "L",
    source: MONTINI_FOOTBALL,
  },
  {
    id: "ge-football-0918",
    date: "2026-09-18",
    sport: "Football",
    level: "Varsity",
    school: "Glenbard East",
    opponent: "Glenbard South",
    site: "home",
    scoreFor: 20,
    scoreAgainst: 12,
    result: "W",
    source: GE_FOOTBALL,
  },
  {
    id: "montini-football-0918",
    date: "2026-09-18",
    sport: "Football",
    level: "Varsity",
    school: "Montini",
    opponent: "Carmel",
    site: "home",
    scoreFor: 42,
    scoreAgainst: 35,
    result: "W",
    source: MONTINI_FOOTBALL,
  },
  {
    id: "ge-football-0911",
    date: "2026-09-11",
    sport: "Football",
    level: "Varsity",
    school: "Glenbard East",
    opponent: "Elmwood Park",
    site: "home",
    scoreFor: 55,
    scoreAgainst: 0,
    result: "W",
    source: GE_FOOTBALL,
  },
  {
    id: "montini-football-0911",
    date: "2026-09-11",
    sport: "Football",
    level: "Varsity",
    school: "Montini",
    opponent: "Nazareth Academy",
    site: "away",
    scoreFor: 47,
    scoreAgainst: 42,
    result: "W",
    source: MONTINI_FOOTBALL,
  },
  {
    id: "ge-football-0904",
    date: "2026-09-04",
    sport: "Football",
    level: "Varsity",
    school: "Glenbard East",
    opponent: "Fenton",
    site: "away",
    scoreFor: 48,
    scoreAgainst: 0,
    result: "W",
    source: GE_FOOTBALL,
  },
  {
    id: "montini-football-0904",
    date: "2026-09-04",
    sport: "Football",
    level: "Varsity",
    school: "Montini",
    opponent: "Marist",
    site: "away",
    scoreFor: 35,
    scoreAgainst: 28,
    result: "W",
    source: MONTINI_FOOTBALL,
  },
  {
    id: "ge-football-0828",
    date: "2026-08-28",
    sport: "Football",
    level: "Varsity",
    school: "Glenbard East",
    opponent: "Plainfield North",
    site: "home",
    scoreFor: 0,
    scoreAgainst: 21,
    result: "L",
    source: GE_FOOTBALL,
  },
  {
    id: "montini-football-0828",
    date: "2026-08-28",
    sport: "Football",
    level: "Varsity",
    school: "Montini",
    opponent: "Sandburg",
    site: "away",
    scoreFor: 28,
    scoreAgainst: 35,
    result: "L",
    source: MONTINI_FOOTBALL,
  },
  {
    id: "ge-football-0821",
    date: "2026-08-21",
    sport: "Football",
    level: "Varsity",
    school: "Glenbard East",
    opponent: "Willowbrook",
    site: "away",
    scoreFor: 13,
    scoreAgainst: 20,
    result: "L",
    note: "OT",
    source: GE_FOOTBALL,
  },
  {
    id: "montini-football-0821",
    date: "2026-08-21",
    sport: "Football",
    level: "Varsity",
    school: "Montini",
    opponent: "Hoopeston/Armstrong",
    site: "home",
    scoreFor: 48,
    scoreAgainst: 0,
    result: "W",
    source: MONTINI_FOOTBALL,
  },
];

/** Scheduled games. Drop a game once it's played (its result goes in `results`). */
export const games: SportsGame[] = [
  {
    id: "ge-football-1009",
    date: "2026-10-09",
    start: "19:00",
    sport: "Football",
    level: "Varsity",
    school: "Glenbard East",
    opponent: "Riverside-Brookfield",
    site: "away",
    source: GE_FOOTBALL,
  },
  {
    id: "montini-football-1009",
    date: "2026-10-09",
    sport: "Football",
    level: "Varsity",
    school: "Montini",
    opponent: "Marmion",
    site: "home",
    source: MONTINI_FOOTBALL,
  },
  {
    id: "ge-football-1016",
    date: "2026-10-16",
    start: "19:00",
    sport: "Football",
    level: "Varsity",
    school: "Glenbard East",
    opponent: "South Elgin",
    site: "home",
    source: GE_FOOTBALL,
  },
  {
    id: "montini-football-1016",
    date: "2026-10-16",
    start: "19:30",
    sport: "Football",
    level: "Varsity",
    school: "Montini",
    opponent: "St. Francis",
    site: "home",
    source: MONTINI_FOOTBALL,
  },
];

/** Newest first. */
export function recentResults(school?: School) {
  return results
    .filter((r) => !school || r.school === school)
    .sort((a, b) => b.date.localeCompare(a.date) || a.school.localeCompare(b.school));
}

/** Results dated from..to inclusive (YYYY-MM-DD), newest first. */
export function resultsBetween(from: string, to: string) {
  return recentResults().filter((r) => r.date >= from && r.date <= to);
}

/** Games dated from..to inclusive, soonest first. */
export function gamesBetween(from: string, to: string) {
  return [...games]
    .filter((g) => g.date >= from && g.date <= to)
    .sort((a, b) => a.date.localeCompare(b.date) || (a.start ?? "").localeCompare(b.start ?? ""));
}

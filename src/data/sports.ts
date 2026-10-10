/**
 * VARSITY SPORTS. Owned by the sports-results automation. Rules: see CONTENT.md.
 *
 * Only verified final scores from public sources (IHSA, MaxPreps, school
 * athletics sites, Daily Herald), each with its source link. Optional recap,
 * highlights, and quotes follow the player rules in CONTENT.md; every one links its source. Never guess a score; if sources disagree, leave it out.
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
    recap:
      "Glenbard East led 34-0 at halftime and won its fifth straight, setting up an Upstate Eight East showdown at Riverside-Brookfield.",
    highlights: [
      { player: "M. Miller", school: "Glenbard East", stat: "4 catches, 117 yards, 2 TD", sourceUrl: "https://www.maxpreps.com/il/football/game/glenbard-east-lombard-vs-west-chicago/10-2-2026/?c=75e75a99-bec2-484c-9f25-cd9d79a80b7e" },
      { player: "C. Pohlman", school: "Glenbard East", stat: "4 of 8, 130 yards, 2 TD", sourceUrl: "https://www.maxpreps.com/il/football/game/glenbard-east-lombard-vs-west-chicago/10-2-2026/?c=75e75a99-bec2-484c-9f25-cd9d79a80b7e" },
      { player: "Max Stachura", school: "Glenbard East", stat: "15-yard TD run", sourceUrl: "https://www.dailyherald.com/20261003/prep-football/football-roundup-naperville-north-lake-park-fenton-glenbard-east-glenbard-south-secure-wins/" },
      { player: "Montii Perry", school: "Glenbard East", stat: "20-yard TD run", sourceUrl: "https://www.dailyherald.com/20261003/prep-football/football-roundup-naperville-north-lake-park-fenton-glenbard-east-glenbard-south-secure-wins/" },
    ],
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
const GE_SOCCER = {
  name: "MaxPreps: Glenbard East boys soccer schedule",
  href: "https://www.maxpreps.com/il/lombard/glenbard-east-rams/soccer/schedule/",
};
const MONTINI_VOLLEYBALL = {
  name: "MaxPreps: Montini girls volleyball schedule",
  href: "https://www.maxpreps.com/il/lombard/montini-catholic-broncos/volleyball/schedule/",
};

export const results: SportsResult[] = [
  {
    id: "ge-football-1009",
    date: "2026-10-09",
    sport: "Football",
    level: "Varsity",
    school: "Glenbard East",
    opponent: "Riverside-Brookfield",
    site: "away",
    scoreFor: 28,
    scoreAgainst: 38,
    result: "L",
    source: GE_FOOTBALL,
    recap:
      "The Rams' five-game win streak ended at Riverside-Brookfield, which ran for 296 yards and clinched a share of the Upstate Eight East. Glenbard East (5-3) hosts South Elgin next.",
    highlights: [
      {
        player: "Carter Pohlman",
        school: "Glenbard East",
        stat: "217 passing yards, 2 TD",
        sourceUrl:
          "https://www.dailyherald.com/20261009/prep-football/riverside-brookfield-denies-glenbard-easts-bid-for-3rd-straight-uec-east-title/",
      },
      {
        player: "Diamond Chew",
        school: "Glenbard East",
        stat: "67-yard TD catch on the first play of the second half",
        sourceUrl:
          "https://www.dailyherald.com/20261009/prep-football/riverside-brookfield-denies-glenbard-easts-bid-for-3rd-straight-uec-east-title/",
      },
    ],
    quotes: [
      {
        text: "They're a good football team and they played really well tonight. Hats off to them and you know, congrats on the win.",
        speaker: "Coach John Walters, Glenbard East",
        sourceUrl:
          "https://www.dailyherald.com/20261009/prep-football/riverside-brookfield-denies-glenbard-easts-bid-for-3rd-straight-uec-east-title/",
        sourceName: "Daily Herald",
      },
    ],
  },
  {
    id: "montini-football-1009",
    date: "2026-10-09",
    sport: "Football",
    level: "Varsity",
    school: "Montini",
    opponent: "Marmion",
    site: "home",
    scoreFor: 49,
    scoreAgainst: 7,
    result: "W",
    source: MONTINI_FOOTBALL,
    recap:
      "Montini (6-2) rolled past Marmion at home, building a lead big enough for a running clock the entire second half.",
    highlights: [
      {
        player: "Israel Abrams",
        school: "Montini",
        stat: "3 TD passes and a rushing TD",
        sourceUrl:
          "https://www.dailyherald.com/20261009/prep-football/miami-recruit-abrams-totals-4-more-touchdowns-in-montinis-rout-of-marmion/",
      },
      {
        player: "Daniel Sago",
        school: "Montini",
        stat: "2 TD catches",
        sourceUrl:
          "https://www.dailyherald.com/20261009/prep-football/miami-recruit-abrams-totals-4-more-touchdowns-in-montinis-rout-of-marmion/",
      },
      {
        player: "Eddie Kowalczyk",
        school: "Montini",
        stat: "Rushing TD",
        sourceUrl:
          "https://www.dailyherald.com/20261009/prep-football/miami-recruit-abrams-totals-4-more-touchdowns-in-montinis-rout-of-marmion/",
      },
      {
        player: "Julian Figueroa",
        school: "Montini",
        stat: "Interception",
        sourceUrl:
          "https://www.dailyherald.com/20261009/prep-football/miami-recruit-abrams-totals-4-more-touchdowns-in-montinis-rout-of-marmion/",
      },
    ],
  },
  {
    id: "ge-boys-soccer-1006",
    date: "2026-10-06",
    sport: "Boys Soccer",
    level: "Varsity",
    school: "Glenbard East",
    opponent: "Elmwood Park",
    site: "home",
    scoreFor: 1,
    scoreAgainst: 1,
    result: "T",
    source: GE_SOCCER,
  },
  {
    id: "montini-volleyball-1006",
    date: "2026-10-06",
    sport: "Girls Volleyball",
    level: "Varsity",
    school: "Montini",
    opponent: "St. Francis",
    site: "away",
    scoreFor: 1,
    scoreAgainst: 2,
    result: "L",
    source: MONTINI_VOLLEYBALL,
  },
  {
    id: "montini-volleyball-1005",
    date: "2026-10-05",
    sport: "Girls Volleyball",
    level: "Varsity",
    school: "Montini",
    opponent: "Hinsdale South",
    site: "away",
    scoreFor: 2,
    scoreAgainst: 0,
    result: "W",
    source: MONTINI_VOLLEYBALL,
  },
  {
    id: "ge-boys-soccer-1003",
    date: "2026-10-03",
    sport: "Boys Soccer",
    level: "Varsity",
    school: "Glenbard East",
    opponent: "Ridgewood",
    site: "away",
    scoreFor: 2,
    scoreAgainst: 4,
    result: "L",
    source: GE_SOCCER,
  },
  {
    id: "montini-football-1002",
    date: "2026-10-02",
    sport: "Football",
    level: "Varsity",
    school: "Montini",
    opponent: "De La Salle",
    site: "away",
    scoreFor: 49,
    scoreAgainst: 6,
    result: "W",
    source: MONTINI_FOOTBALL,
  },
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
    recap:
      "St. Rita rallied from 15 points down in the third quarter and scored the go-ahead touchdown and two-point conversion with 2:52 left.",
    highlights: [
      {
        player: "Israel Abrams",
        school: "Montini",
        stat: "TD passes to Damacio Ortegon, Donovan Evans and Daniel Sago, plus a rushing TD",
        sourceUrl:
          "https://www.shawlocal.com/friday-night-drive/2026/09/26/high-school-football-week-6-results-recaps-for-every-game-in-the-suburban-life-area/",
      },
    ],
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
    id: "ge-boys-soccer-1010",
    date: "2026-10-10",
    start: "11:00",
    sport: "Boys Soccer",
    level: "Varsity",
    school: "Glenbard East",
    opponent: "West Chicago",
    site: "away",
    source: GE_SOCCER,
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
  {
    id: "ge-boys-soccer-1017",
    date: "2026-10-17",
    start: "11:00",
    sport: "Boys Soccer",
    level: "Varsity",
    school: "Glenbard East",
    opponent: "New Trier",
    site: "away",
    source: GE_SOCCER,
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

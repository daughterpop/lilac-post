/**
 * THE SUNDAY LILAC POST. Owned by the Sunday-edition automation. Rules: see CONTENT.md.
 *
 * One object per Sunday, newest first. `date` is the Sunday and the URL
 * (/edition/<date>). The week-ahead events (Mon–Sun) and the sports results
 * are computed from events.ts and sports.ts, so they aren't repeated here.
 * Every fact must come from a published story, a wire item, or a linked
 * source. Every build checks this file (scripts/check-content.mjs).
 *
 *   {
 *     date: "2026-10-18",                    // a Sunday, YYYY-MM-DD
 *     headline: "Headline for the week",
 *     lede: "One paragraph that ties the week together.",
 *     news: [                                // 3 to 6 items
 *       {
 *         headline: "Short headline",
 *         summary: "One to three sentences.",
 *         href: "/dispatches/some-slug",     // or an https:// source page
 *         hrefLabel: "Read the story",
 *       },
 *     ],
 *     featured: ["slug-one", "slug-two"],    // 2 or 3 post slugs
 *     sports: { note: "Optional line." },    // optional; resultsFrom: "YYYY-MM-DD" widens the window
 *     editorsNote: "Optional.",
 *   },
 */
import type { Edition } from "@/data/types";

export type { Edition };

export const editions: Edition[] = [
  {
    date: "2026-10-11",
    headline: "A hard night on St. Regis, a chief’s farewell, and Spooktacular next Sunday",
    lede: "The week began with sad news from St. Regis Drive, where the village says a resident died after a fire on the night of Friday, Oct. 2. Fire Chief Richard Sander retired Thursday after 10 years in Lombard, the village says. Crosswalk work on Main Street runs through Friday, and next Sunday the chamber’s Downtown Spooktacular takes over St. Charles Road from noon to 5.",
    news: [
      {
        headline: "Resident dies after St. Regis Drive fire",
        summary:
          "Lombard firefighters put out a fire in one unit of a multi-family building on St. Regis Drive on Friday night, Oct. 2. The village says the resident was taken to the hospital in critical condition and later died. The cause is under investigation.",
        href: "/dispatches/st-regis-fire",
        hrefLabel: "Read the story",
      },
      {
        headline: "Fire Chief Sander retires",
        summary:
          "The village says Chief Richard Sander retired Oct. 8 after 10 years in Lombard and more than 40 in the fire service. A search for the next chief is underway.",
        href: "https://villageoflombard.org/m/newsflash/Home/Detail/1124",
        hrefLabel: "Village release",
      },
      {
        headline: "Main Street crosswalk work through Oct. 16",
        summary:
          "The village is repairing the crosswalk on Main Street just north of St. Charles Road through Friday, Oct. 16, weather permitting. Give the block extra time if you’re walking to the train or the library.",
        href: "https://villageoflombard.org/m/newsflash/Home/Detail/1127",
        hrefLabel: "Village news",
      },
      {
        headline: "Seniors of the Year",
        summary:
          "The village named Jackie Stawiarski and Lynn Moist the 2026 Senior Woman and Senior Man of the Year for their volunteer work.",
        href: "https://villageoflombard.org/m/newsflash/Home/Detail/1128",
        hrefLabel: "Village news",
      },
      {
        headline: "The farmers market’s last Tuesday",
        summary:
          "The chamber scheduled the 2026 Lombard Farmers Market’s final market for Tuesday, Oct. 6, under the Arch, with Inversion Jazz Band closing out the season’s music.",
        href: "/dispatches/last-tuesday-under-the-arch",
        hrefLabel: "Read the story",
      },
      {
        headline: "Spooktacular is next Sunday",
        summary:
          "The chamber’s Downtown Spooktacular runs noon to 5 on Sunday, Oct. 18, on St. Charles Road between Main and Elizabeth, with trick-or-treating at the businesses, games, and a costume contest. For Oct. 31, the village recommends neighborhood trick-or-treating from 3 to 7 p.m.",
        href: "https://villageoflombard.org/m/newsflash/Home/Detail/1126",
        hrefLabel: "Village news",
      },
    ],
    featured: ["lilacia-after-the-bloom", "prairie-path-october", "peck-homestead"],
    eventPicks: ["spooktacular", "village-board"],
    sports: {
      resultsFrom: "2026-10-02",
    },
    editorsNote:
      "This is the first Sunday Lilac Post: the week’s news in one place, a few stories worth your time, what’s on in the week ahead, and how the local teams did. A new edition goes up every Sunday morning.",
  },
];

/** Newest first. */
export function allEditions() {
  return [...editions].sort((a, b) => b.date.localeCompare(a.date));
}

export function latestEdition() {
  return allEditions()[0];
}

export function getEdition(date: string) {
  return editions.find((edition) => edition.date === date);
}

/** YYYY-MM-DD plus n days (calendar math, no time zones). */
export function addDays(iso: string, days: number) {
  const [y, m, d] = iso.split("-").map(Number);
  const next = new Date(Date.UTC(y ?? 2026, (m ?? 1) - 1, (d ?? 1) + days));
  return next.toISOString().slice(0, 10);
}

/** The edition's windows: results from the previous Sunday (or `resultsFrom`) through Saturday; events Mon–Sun ahead. */
export function editionWindows(edition: Edition) {
  return {
    resultsFrom: edition.sports?.resultsFrom ?? addDays(edition.date, -7),
    resultsTo: addDays(edition.date, -1),
    weekFrom: addDays(edition.date, 1),
    weekTo: addDays(edition.date, 7),
  };
}

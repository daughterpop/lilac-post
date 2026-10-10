/**
 * LOMBARD PROS: professional and elite athletes from Lombard (born/raised there or
 * attended a Lombard school). Adults only. Every fact needs a sourceUrl.
 * `updates` is a dated list of notable verified news only (big game, milestone,
 * Olympic result). Never rumors. Rules: see CONTENT.md.
 */
export type ProFact = { text: string; sourceUrl: string };
export type Pro = {
  id: string;
  name: string;
  sport: string;
  status: "active" | "retired";
  team?: string; // current team or event, when active
  connection: ProFact;
  highlights: ProFact[]; // 1-2
};
export type ProUpdate = { date: string; proId: string; text: string; sourceUrl: string };

const W = (p: string) => `https://en.wikipedia.org/wiki/${p}`;

export const pros: Pro[] = [
  {
    id: "rayj-dennis",
    name: "RayJ Dennis",
    sport: "Basketball (NBA)",
    status: "active",
    team: "Atlanta Hawks (two-way, College Park Skyhawks)",
    connection: {
      text: "Attended Montini Catholic before transferring.",
      sourceUrl: W("Montini_Catholic_High_School"),
    },
    highlights: [
      {
        text: "Played college basketball at Boise State, Toledo, and Baylor.",
        sourceUrl: W("RayJ_Dennis"),
      },
    ],
  },
  {
    id: "jermari-harris",
    name: "Jermari Harris",
    sport: "Football (NFL)",
    status: "active",
    connection: {
      text: "Montini Catholic, where he had eight interceptions as a senior.",
      sourceUrl: W("Jermari_Harris"),
    },
    highlights: [{ text: "Played college football at Iowa.", sourceUrl: W("Jermari_Harris") }],
  },
  {
    id: "jaleel-johnson",
    name: "Jaleel Johnson",
    sport: "Football (NFL)",
    status: "retired",
    connection: {
      text: "Montini Catholic, class of 2012.",
      sourceUrl: W("Montini_Catholic_High_School"),
    },
    highlights: [
      {
        text: "Drafted by the Minnesota Vikings in the fourth round of the 2017 NFL draft out of Iowa.",
        sourceUrl: W("Jaleel_Johnson"),
      },
      {
        text: "A member of Montini's 2011 state championship team.",
        sourceUrl: "https://beta.ihsa.org/top50/football-1974-2024/14",
      },
    ],
  },
  {
    id: "jordan-westerkamp",
    name: "Jordan Westerkamp",
    sport: "Football",
    status: "retired",
    connection: {
      text: "Montini Catholic, class of 2012.",
      sourceUrl: W("Montini_Catholic_High_School"),
    },
    highlights: [
      {
        text: "Holds the Illinois high school career receiving record, 4,548 yards.",
        sourceUrl: "https://beta.ihsa.org/top50/football-1974-2024/14",
      },
      { text: "Wide receiver at Nebraska.", sourceUrl: W("Jordan_Westerkamp") },
    ],
  },
  {
    id: "scott-sobkowiak",
    name: "Scott Sobkowiak",
    sport: "Baseball (MLB)",
    status: "retired",
    connection: {
      text: "Montini Catholic, class of 1995.",
      sourceUrl: W("Montini_Catholic_High_School"),
    },
    highlights: [
      { text: "Pitched for the Atlanta Braves in 2001.", sourceUrl: W("Scott_Sobkowiak") },
    ],
  },
];

export const proUpdates: ProUpdate[] = [];

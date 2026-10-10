/**
 * CLUB AND PARK DISTRICT SPORTS. Owned by the sports-results automation. Rules: see CONTENT.md.
 *
 * TEAM-LEVEL results only for youth club and park district teams: never name a
 * child. Every entry needs a sourceUrl (official league/club/park district page
 * or local press). Checked by scripts/check-content.mjs.
 */
export const TEAM_KINDS = ["club", "park"] as const;
export type TeamKind = (typeof TEAM_KINDS)[number];

export type CommunityResult = {
  id: string; // kind-team-YYYYMMDD, lowercase-with-dashes
  date: string; // YYYY-MM-DD
  kind: TeamKind;
  team: string; // e.g. "Lombard Waves (Lombard Park District)"
  sport: string;
  event: string; // meet, tournament, or league
  result: string; // one plain sentence, team level
  sourceName: string;
  sourceUrl: string;
};

/** Lombard clubs and park teams we follow, with where their results get posted. */
export const COMMUNITY_TEAMS: {
  name: string;
  kind: TeamKind;
  sport: string;
  about: string;
  sourceUrl: string;
}[] = [
  {
    name: "Lombard Waves",
    kind: "park",
    sport: "Summer swim and dive",
    about:
      "The Lombard Park District's summer swim and dive team, based at Paradise Bay, competes in the DuPage Swim and Dive Conference.",
    sourceUrl: "https://www.swimdsdc.org/lombard-waves",
  },
  {
    name: "Firebirds Soccer Club",
    kind: "club",
    sport: "Youth travel soccer",
    about:
      "A Lombard-based youth soccer club. Its teams play in the Illinois State Premiership, YSSL, and IWSL, and it runs a development program with the Lombard Park District.",
    sourceUrl: "https://firebirdssc.com/club/program-tryout-information",
  },
  {
    name: "Lombard Thunder",
    kind: "park",
    sport: "Girls travel softball (10U-17U)",
    about: "The Lombard Park District's travel softball program.",
    sourceUrl: "https://lombardparks.com/thunder-softball/",
  },
];

export const communityResults: CommunityResult[] = [
  {
    id: "park-waves-20260718",
    date: "2026-07-18",
    kind: "park",
    team: "Lombard Waves (Lombard Park District)",
    sport: "Swim and dive",
    event: "DuPage Swim and Dive Conference Red Division 'A' Meet, Glendale Heights",
    result:
      "Won the team title, edging the Bartlett Barracudas. Lombard and Bartlett move up to the conference's White Division in 2027.",
    sourceName: "The Lombardian, July 23, 2026",
    sourceUrl:
      "https://epsilon.creativecirclecdn.com/dupage/files/20260721-160011-c43-Lombard%20Lombardian%20072326.pdf",
  },
];

/** Newest first, optionally limited to a date window (inclusive). */
export function communityBetween(from = "0000-00-00", to = "9999-99-99") {
  return communityResults
    .filter((r) => r.date >= from && r.date <= to)
    .sort((a, b) => b.date.localeCompare(a.date));
}

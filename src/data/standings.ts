/**
 * CONFERENCE / LEAGUE STANDINGS. Refreshed by the sports-results automation each run.
 * Rules: see CONTENT.md. Each table needs asOf (YYYY-MM-DD), status, and a sourceUrl.
 * rows: team, conference record ("W-L" or "W-L-T"), overall record. Lombard teams get local: true.
 * Out-of-season sports keep last season's final table with status "final".
 */
export type StandingsRow = { team: string; conf: string; overall: string; local?: boolean };
export type StandingsTable = {
  id: string;
  sport: string;
  conference: string;
  season: string; // "2026-27"
  status: "current" | "final";
  asOf: string;
  sourceName: string;
  sourceUrl: string;
  rows: StandingsRow[];
};

const r = (team: string, conf: string, overall: string, local = false): StandingsRow =>
  local ? { team, conf, overall, local } : { team, conf, overall };

export const standings: StandingsTable[] = [
  {
    id: "ue8-east-football-2026",
    sport: "Football",
    conference: "Upstate Eight East",
    season: "2026-27",
    status: "current",
    asOf: "2026-10-10",
    sourceName: "MaxPreps: Upstate Eight East football standings",
    sourceUrl:
      "https://www.maxpreps.com/il/football/26-27/conference/upstate-8--east/?leagueid=b273f2f3-4f54-4ee4-b1d3-938a72686420",
    rows: [
      r("Riverside-Brookfield", "5-0", "7-1"),
      r("Glenbard East", "5-1", "5-3", true),
      r("Glenbard South", "4-1", "5-3"),
      r("Fenton", "2-3", "4-4"),
      r("West Chicago", "2-3", "3-5"),
      r("Elmwood Park", "0-5", "1-7"),
      r("Ridgewood", "0-5", "1-7"),
    ],
  },
  {
    id: "ccl-green-football-2026",
    sport: "Football",
    conference: "CCL Green",
    season: "2026-27",
    status: "current",
    asOf: "2026-10-10",
    sourceName: "MaxPreps: CCL Green football standings",
    sourceUrl:
      "https://www.maxpreps.com/il/football/26-27/conference/ccl--green/?leagueid=1205f5a5-d453-4eda-b466-af0a6fdcfe6e",
    rows: [
      r("St. Rita", "2-0", "5-3"),
      r("St. Francis", "1-1", "4-4"),
      r("Montini Catholic", "1-1", "6-2", true),
      r("Nazareth Academy", "0-2", "4-4"),
    ],
  },
  {
    id: "ue8-east-boys-soccer-2026",
    sport: "Boys Soccer",
    conference: "Upstate Eight East",
    season: "2026-27",
    status: "current",
    asOf: "2026-10-10",
    sourceName: "MaxPreps: Upstate Eight East boys soccer standings",
    sourceUrl:
      "https://www.maxpreps.com/il/soccer/26-27/conference/upstate-eight--east/?leagueid=ffb4cac9-0e58-4877-a62e-5272ea494201",
    rows: [
      r("West Chicago", "4-1", "10-4-4"),
      r("Fenton", "4-1-1", "7-8-1"),
      r("Glenbard East", "2-1-2", "7-4-4", true),
      r("Glenbard South", "3-2-1", "7-9-1"),
      r("Ridgewood", "2-2-2", "10-5-2"),
      r("Elmwood Park", "0-3-3", "2-8-4"),
      r("Riverside-Brookfield", "0-5-1", "4-11-1"),
    ],
  },
  {
    id: "gcac-white-girls-volleyball-2026",
    sport: "Girls Volleyball",
    conference: "GCAC White",
    season: "2026-27",
    status: "current",
    asOf: "2026-10-10",
    sourceName: "MaxPreps: GCAC White girls volleyball standings",
    sourceUrl:
      "https://www.maxpreps.com/il/volleyball/26-27/conference/gcac-white/?leagueid=a90fc716-df80-46d2-9a77-9edb638a18c9",
    rows: [
      r("Carmel", "4-1", "25-6"),
      r("Providence Catholic", "4-1", "19-4"),
      r("Nazareth Academy", "4-3", "20-13"),
      r("DePaul College Prep", "3-4", "18-9"),
      r("Montini Catholic", "2-3", "18-7", true),
      r("Saint Viator", "1-4", "7-14"),
      r("Fenwick", "0-5", "10-18"),
    ],
  },
];

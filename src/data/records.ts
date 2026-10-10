/**
 * LOMBARD SPORTS RECORDS AND HISTORY (evergreen). Rules: see CONTENT.md.
 * Every entry needs a sourceUrl. Youth records: list exactly what the league
 * or park district record board posts, nothing more.
 */
export type SportsRecord = {
  id: string;
  team: string; // "Montini", "Glenbard East", "Lombard Waves"
  kind: "school" | "club" | "park";
  sport: string;
  year: string; // "2015" or "2010-11"
  title: string; // what it is
  detail?: string;
  sourceName: string;
  sourceUrl: string;
};

const IHSA_FB = "https://www.ihsa.org/data/fb/records/team1-2.htm";
const DSDC = "https://www.swimdsdc.org/lombard-waves";

const mfb = (year: string, cls: string, score: string, rec: string): SportsRecord => ({
  id: `montini-fb-${year}`,
  team: "Montini",
  kind: "school",
  sport: "Football",
  year,
  title: `IHSA Class ${cls} state champion`,
  detail: `${score} in the title game; ${rec} season.`,
  sourceName: "IHSA football champions and runners-up",
  sourceUrl: IHSA_FB,
});
const mfbRu = (year: string, score: string): SportsRecord => ({
  id: `montini-fb-${year}-ru`,
  team: "Montini",
  kind: "school",
  sport: "Football",
  year,
  title: "IHSA Class 5A state runner-up",
  detail: score,
  sourceName: "IHSA football champions and runners-up",
  sourceUrl: IHSA_FB,
});
const wave = (div: string, event: string, time: string, year: string): SportsRecord => ({
  id: `waves-${div.toLowerCase()}-${event.replace(/\D/g, "")}`,
  team: "Lombard Waves",
  kind: "park",
  sport: "Swimming",
  year,
  title: `DSDC ${div} Division record: ${event.replace(/^Event #\d+:\s*/, "")}`,
  detail: time,
  sourceName: "DuPage Swim and Dive Conference: Lombard Waves records",
  sourceUrl: DSDC,
});

export const records: SportsRecord[] = [
  mfb("2004", "4A", "Montini 44, Coal City 7", "13-1"),
  mfb("2009", "5A", "Montini 29, Joliet Catholic 28", "10-4"),
  mfb("2010", "5A", "Montini 34, Glenwood 21", "12-2"),
  mfb("2011", "5A", "Montini 70, Joliet Catholic 45", "12-2"),
  mfb("2012", "5A", "Montini 19, Morris 6", "12-2"),
  mfb("2015", "6A", "Montini 38, Crete-Monee 15", "14-0"),
  mfb("2024", "3A", "Montini 49, Monticello 8", "12-2"),
  mfb("2025", "4A", "Montini 47, Rochester 33", "14-0"),
  mfbRu("2013", "Sacred Heart-Griffin 38, Montini 28"),
  mfbRu("2014", "Sacred Heart-Griffin 29, Montini 14"),
  mfbRu("2018", "Joliet Catholic 35, Montini 27"),
  {
    id: "montini-fb-four-straight",
    team: "Montini",
    kind: "school",
    sport: "Football",
    year: "2009-2012",
    title: "Four straight state titles",
    detail:
      "Montini became the fifth Illinois school to win four consecutive football titles. Coach Chris Andriano retired in 2016 with a 300-128 record.",
    sourceName: "IHSA Top 50 football programs: No. 14 Montini",
    sourceUrl: "https://beta.ihsa.org/top50/football-1974-2024/14",
  },
  {
    id: "montini-fb-westerkamp",
    team: "Montini",
    kind: "school",
    sport: "Football",
    year: "2011",
    title: "Jordan Westerkamp: Illinois career receiving record",
    detail:
      "4,548 career receiving yards, a state record, plus title-game records of 331 yards and five TD catches in the 2011 5A final.",
    sourceName: "IHSA Top 50 football programs: No. 14 Montini",
    sourceUrl: "https://beta.ihsa.org/top50/football-1974-2024/14",
  },
  {
    id: "ge-bbk-2011",
    team: "Glenbard East",
    kind: "school",
    sport: "Boys Basketball",
    year: "2010-11",
    title: "Third place in IHSA Class 4A",
    detail: "28-4 under coach Scott Miller; won regional, sectional, and super-sectional titles.",
    sourceName: "IHSA: Glenbard East boys basketball history",
    sourceUrl: "https://www.ihsa.org/schools/trends/school/1232/champions/BKB",
  },
  {
    id: "ge-fb-playoff-run",
    team: "Glenbard East",
    kind: "school",
    sport: "Football",
    year: "2021-2025",
    title: "Five straight IHSA playoff berths",
    detail: "Under coach John Walters.",
    sourceName: "IHSA: Glenbard East football history",
    sourceUrl: "https://www.ihsa.org/schools/trends/school/1232/champions/FB",
  },
  wave("Red", "Event #33: Girls 9-10 100 Yd. Free", "1:03.10", "2026"),
  wave("Red", "Event #42: Boys 8U 25 Yd. Fly", "0:17.27", "2026"),
  wave("Red", "Event #43: Girls 9-10 50 Yd. Fly", "0:33.96", "2026"),
  wave("Red", "Event #35: Girls 11-12 100 Yd. Free", "0:58.57", "2014"),
  wave("Red", "Event #36: Boys 11-12 100 Yd. Free", "0:57.56", "2014"),
  wave("Red", "Event #28: Boys 13-14 100 Yd. Ind. Medley", "0:59.53", "2003"),
  wave("Red", "Event #56: Boys 11-12 50 Yd. Back", "0:29.29", "2003"),
  wave("Red", "Event #26: Boys 11-12 100 Yd. Ind. Medley", "1:07.25", "2001"),
  wave("Red", "Event #47: Girls 13-14 50 Yd. Fly", "0:27.99", "1988"),
  wave("Red", "Event #64: Boys 9-10 50 Yd. Breast", "0:36.59", "1988"),
  wave("White", "Event #31: Girls 8U 50 Yd. Free", "0:32.11", "2025"),
  wave("White", "Event #17: Girls 13-14 50 Yd. Free", "0:25.63", "1996"),
  wave("White", "Event #37: Girls 13-14 100 Yd. Free", "0:54.45", "1994"),
  wave("White", "Event #35: Girls 11-12 100 Yd. Free", "0:56.20", "1993"),
  wave("White", "Event #66: Boys 11-12 50 Yd. Breast", "0:32.91", "1990"),
];

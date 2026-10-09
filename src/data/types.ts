export const DESKS = ["Market", "Library", "Village", "Park", "History", "Outdoors"] as const;

export type Desk = (typeof DESKS)[number];

export const ORIGINS = [
  "Village",
  "Park District",
  "Butterfield",
  "York Center",
  "Yorktown",
  "Chamber",
  "Historical Society",
  "Library",
  "School",
  "Parish",
  "Lilac",
] as const;

export type Origin = (typeof ORIGINS)[number];

export type Source = {
  name: string;
  href: string;
};

export type Post = {
  slug: string;
  title: string;
  dek: string;
  date: string;
  desk: Desk;
  order: number;
  body: string[];
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
  /** Photo credit shown under the caption, e.g. "Photo: Jane Doe / Flickr, CC BY 2.0", linked to the source page. */
  imageCredit?: { text: string; href: string };
  sources: Source[];
  /** Dated correction notes shown at the end of the story (see /about#corrections). */
  corrections?: { date: string; note: string }[];
};

export type VillageEvent = {
  id: string;
  title: string;
  date: string;
  start?: string;
  end?: string;
  place: string;
  address?: string;
  desk: Desk;
  origin: Origin;
  blurb: string;
  href: string;
  featured?: boolean;
  frontTitle?: string;
  frontDek?: string;
  story?: string;
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
  /** Photo credit shown under the caption, e.g. "Photo: Jane Doe / Flickr, CC BY 2.0", linked to the source page. */
  imageCredit?: { text: string; href: string };
};

export type Place = {
  id: string;
  name: string;
  kind: string;
  where: string;
  detail: string;
  href?: string;
  hrefLabel?: string;
};

/** Local schools whose varsity results /sports tracks. */
export const SCHOOLS = ["Glenbard East", "Montini"] as const;

export type School = (typeof SCHOOLS)[number];

export const SITES = ["home", "away", "neutral"] as const;

export type Site = (typeof SITES)[number];

/** A final varsity score, from the local school's point of view. Team-level only: no player names. */
export type SportsResult = {
  id: string;
  date: string;
  sport: string;
  level: "Varsity";
  school: School;
  opponent: string;
  site: Site;
  /** Local school's points. */
  scoreFor: number;
  /** Opponent's points. */
  scoreAgainst: number;
  result: "W" | "L" | "T";
  /** Short extra, e.g. "OT" or "IHSA playoffs, first round". */
  note?: string;
  source: Source;
};

/** A scheduled varsity game that hasn't been played yet. */
export type SportsGame = {
  id: string;
  date: string;
  /** HH:MM 24-hour Chicago time; omit when sources disagree or don't say. */
  start?: string;
  sport: string;
  level: "Varsity";
  school: School;
  opponent: string;
  site: Site;
  source: Source;
};

/** One short item in an edition's "This week's news" list. */
export type EditionItem = {
  headline: string;
  /** One to three sentences. */
  summary: string;
  /** An internal path ("/dispatches/<slug>") or an https:// source page. */
  href: string;
  /** Link text, e.g. "Read the story" or "Village release". */
  hrefLabel: string;
};

/** The Sunday Lilac Post. One per Sunday; slug is the date. */
export type Edition = {
  /** The Sunday, YYYY-MM-DD. Also the URL: /edition/<date>. */
  date: string;
  headline: string;
  /** The opening paragraph that ties the week together. */
  lede: string;
  /** "This week's news": 3 to 6 items. */
  news: EditionItem[];
  /** 2 or 3 post slugs. */
  featured: string[];
  /** Optional event ids to call out; the full Mon–Sun list is computed from events.ts. */
  eventPicks?: string[];
  sports?: {
    /** Show results from this date (YYYY-MM-DD) through Saturday. Default: the previous Sunday. */
    resultsFrom?: string;
    note?: string;
  };
  editorsNote?: string;
};

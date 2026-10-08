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

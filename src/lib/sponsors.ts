/**
 * Sponsor slots. This is the one place to switch a slot from the house ad
 * ("Sponsor this spot") to a real, paying sponsor.
 *
 * Each slot is `null` until a sponsor has actually signed on. Never put a
 * made-up or placeholder business here — a `null` slot shows the house ad that
 * links to /advertise. A filled slot always renders with a "Sponsored" label.
 *
 * Example:
 *   home: {
 *     name: "Example Bakery",
 *     url: "https://example.com",
 *     blurb: "Fresh bread on Main Street since 1990.",
 *     logo: "/images/sponsors/example-bakery.webp", // optional, file in public/
 *   },
 */
export type Sponsor = {
  /** Business name, shown as the heading. */
  name: string;
  /** Where the sponsor link goes. */
  url: string;
  /** One or two short sentences supplied by the sponsor. */
  blurb: string;
  /** Optional logo path (in public/) or absolute URL. */
  logo?: string;
  /** Optional alt text for the logo; defaults to the business name. */
  logoAlt?: string;
};

export type SponsorSlotId = "home" | "weekend" | "story";

export const SPONSORS: Record<SponsorSlotId, Sponsor | null> = {
  /** Home page, between the stories/upcoming grid and the footer. */
  home: null,
  /** Calendar page — the "Weekend in Lombard" sponsorship. */
  weekend: null,
  /** End of every story page, after the sources. */
  story: null,
};

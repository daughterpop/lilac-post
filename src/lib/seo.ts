import { siteUrl } from "@/lib/site";

export const PUBLISHER = {
  "@type": "NewsMediaOrganization",
  name: "The Lilac Post",
  url: siteUrl("/"),
  logo: { "@type": "ImageObject", url: siteUrl("/icon-512.png") },
};

/** <link rel="canonical"> for a site path. */
export function canonical(path: string) {
  return { rel: "canonical", href: siteUrl(path) };
}

/** A JSON-LD <script> for route head(). `<` is escaped so text can't close the tag. */
export function jsonLd(data: Record<string, unknown>) {
  return {
    type: "application/ld+json",
    children: JSON.stringify({ "@context": "https://schema.org", ...data }).replace(
      /</g,
      "\\u003c",
    ),
  };
}

/** ISO timestamp for 5 a.m. Chicago on a YYYY-MM-DD date (CDT/CST aware). */
export function morningIso(date: string) {
  const [y, m, d] = date.split("-").map(Number);
  const probe = new Date(Date.UTC(y ?? 2026, (m ?? 1) - 1, d ?? 1, 12));
  const zone = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    timeZoneName: "shortOffset",
  })
    .formatToParts(probe)
    .find((part) => part.type === "timeZoneName")?.value;
  const hours = Number(/GMT([+-]\d+)/.exec(zone ?? "")?.[1] ?? "-6");
  const offset = `${hours < 0 ? "-" : "+"}${String(Math.abs(hours)).padStart(2, "0")}:00`;
  return `${date}T05:00:00${offset}`;
}

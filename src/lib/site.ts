/**
 * Site-wide settings that change once the paper has a real home.
 *
 * SITE_URL: the public origin, no trailing slash. Used by /sitemap.xml and
 * /robots.txt. PLACEHOLDER — swap for the real domain once one is chosen.
 */
export const SITE_URL = "https://www.example.com";

/** Absolute URL for a site path, e.g. siteUrl("/calendar"). */
export function siteUrl(path: string) {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Site-wide settings that change once the paper has a real home.
 *
 * SITE_URL: the public origin, no trailing slash. Used by /sitemap.xml and
 * /robots.txt. www is canonical; Vercel 308-redirects the bare domain to it.
 */
export const SITE_URL = "https://www.thelilacpost.com";

/** Absolute URL for a site path, e.g. siteUrl("/calendar"). */
export function siteUrl(path: string) {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * CONTACT_EMAIL: where readers send tips and corrections. PLACEHOLDER — replace
 * with a real inbox before launch. While it ends in "@example.com" the About
 * page hides the address and says contact details are coming.
 */
export const CONTACT_EMAIL = "CONTACT_EMAIL@example.com";

export const CONTACT_EMAIL_IS_PLACEHOLDER = CONTACT_EMAIL.endsWith("@example.com");

/**
 * SUBSCRIBE_ENDPOINT: where the Subscribe form sends each new reader. It uses
 * FormSubmit's AJAX endpoint, the same mechanism and inbox as the Via
 * Fidelitatis Ledger and Via Salutis Ember signup forms, so every signup
 * arrives as an email to the editor. No mailing-list service is involved.
 *
 * FormSubmit asks the inbox owner to confirm once (an "Activate Form" email)
 * the first time a form on a new site submits. Submissions made before then
 * are held for 30 days and delivered after activation. The form is activated
 * for www.thelilacpost.com; the path below is the alias FormSubmit issued, so
 * the editor's inbox address stays out of the page source.
 */
export const SUBSCRIBE_ENDPOINT = "https://formsubmit.co/ajax/8fdc92dc126ca27d7e5251e2a22f202b";

/**
 * ADVERTISE_ENDPOINT: where the /advertise inquiry form sends each request.
 * Same FormSubmit inbox as SUBSCRIBE_ENDPOINT; swap both together if the
 * address changes.
 */
export const ADVERTISE_ENDPOINT = SUBSCRIBE_ENDPOINT;

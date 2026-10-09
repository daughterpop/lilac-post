import { createFileRoute } from "@tanstack/react-router";
import { siteUrl } from "@/lib/site";

// Served as a route (not public/robots.txt) so the Sitemap line follows SITE_URL.
const ROBOTS = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${siteUrl("/sitemap.xml")}
`;

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: async () =>
        new Response(ROBOTS, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        }),
    },
  },
});

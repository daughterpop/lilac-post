import { createFileRoute } from "@tanstack/react-router";
import { allEditions } from "@/data/editions";
import { allPosts } from "@/data/posts";
import { siteUrl } from "@/lib/site";

// Top-level pages. Add new static routes here so they land in the sitemap.
const STATIC_PATHS = ["/", "/breaking", "/editions", "/dispatches", "/sports", "/calendar", "/parish", "/village", "/about", "/subscribe", "/advertise"];

function escapeXml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function sitemapXml() {
  const entries = [
    ...STATIC_PATHS.map((path) => ({ loc: siteUrl(path), lastmod: undefined as string | undefined })),
    ...allEditions().map((edition) => ({ loc: siteUrl(`/edition/${edition.date}`), lastmod: edition.date })),
    ...allPosts().map((post) => ({ loc: siteUrl(`/dispatches/${post.slug}`), lastmod: post.date })),
  ];
  const urls = entries
    .map(
      ({ loc, lastmod }) =>
        `  <url><loc>${escapeXml(loc)}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}</url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () =>
        new Response(sitemapXml(), {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        }),
    },
  },
});

import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Shell } from "@/components/shell";

// Throwing notFound() from the loader marks the match as not-found, which makes
// TanStack Start answer the SSR request with HTTP 404 instead of 200.
export const Route = createFileRoute("/$")({
  loader: () => {
    throw notFound();
  },
  head: () => ({
    meta: [{ title: "Not found — The Lilac Post" }, { name: "robots", content: "noindex" }],
  }),
  component: Missing,
  notFoundComponent: Missing,
});

function Missing() {
  return (
    <Shell>
      <p className="text-xs font-semibold tracking-widest text-lilac uppercase">Page not found</p>
      <h1 className="mt-2 font-display text-4xl text-ink">We couldn’t find that page</h1>
      <p className="mt-3 text-muted">The link may be old or mistyped. Try the front page or the calendar.</p>
      <Link to="/" className="mt-4 inline-flex min-h-11 items-center font-semibold text-lilac">
        Back to the front page
      </Link>
    </Shell>
  );
}

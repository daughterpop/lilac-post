import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";

export const Route = createFileRoute("/$")({
  component: Missing,
});

function Missing() {
  return (
    <Shell>
      <p className="text-xs font-semibold tracking-widest text-lilac uppercase">Missing</p>
      <h1 className="mt-2 font-display text-4xl text-ink">Not in this edition</h1>
      <p className="mt-3 text-muted">That page isn’t in the paper.</p>
      <Link to="/" className="mt-4 inline-flex min-h-11 items-center font-semibold text-lilac">
        Back to the front page
      </Link>
    </Shell>
  );
}

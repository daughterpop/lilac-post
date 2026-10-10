import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { canonical } from "@/lib/seo";
import { records } from "@/data/records";
export const Route = createFileRoute("/sports_/records")({
  head: () => ({
    meta: [
      { title: "Lombard Record Book — The Lilac Post" },
      {
        name: "description",
        content:
          "State titles, records and milestones from Glenbard East, Montini and the Lombard Waves.",
      },
    ],
    links: [canonical("/sports/records")],
  }),
  component: Page,
});

const fmt = (d: string) =>
  new Date(`${d}T12:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
void fmt;

function Top({ title, intro }: { title: string; intro: string }) {
  return (
    <>
      <Link
        to="/sports"
        className="inline-flex min-h-11 items-center text-sm font-semibold text-lilac"
      >
        &larr; Sports
      </Link>
      <h1 className="mt-1 font-display text-4xl text-ink sm:text-5xl">{title}</h1>
      <p className="mt-3 max-w-2xl text-lg text-fg">{intro}</p>
    </>
  );
}
const src = "text-xs text-muted underline";

const GROUPS = ["Montini", "Glenbard East", "Lombard Waves"];

function Page() {
  return (
    <Shell>
      <Top
        title="Lombard Record Book"
        intro="State titles, record-setters and milestones from Lombard's teams, past and present."
      />
      {GROUPS.map((g) => (
        <section key={g} className="mt-10" aria-label={g}>
          <h2 className="border-b-2 border-ink pb-1 font-display text-3xl text-ink">
            {g === "Lombard Waves" ? "Lombard Waves: conference swim records" : g}
          </h2>
          <ul className="mt-3 divide-y divide-line">
            {records
              .filter((r) => r.team === g)
              .map((r) => (
                <li key={r.id} className="py-3">
                  <p className="text-xs font-semibold tracking-widest text-muted uppercase">
                    {r.sport} &middot; {r.year}
                  </p>
                  <p className="font-semibold text-ink">{r.title}</p>
                  {r.detail ? <p className="text-fg">{r.detail}</p> : null}
                  <a href={r.sourceUrl} className={src} rel="noopener">
                    Source: {r.sourceName}
                  </a>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </Shell>
  );
}

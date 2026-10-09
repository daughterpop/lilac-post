import { createFileRoute } from "@tanstack/react-router";
import { games, recentResults } from "@/data/sports";
import { SCHOOLS } from "@/data/types";
import { Shell } from "@/components/shell";
import { GamesList, ResultsList } from "@/components/sports-list";
import { canonical } from "@/lib/seo";
import { chicagoNow } from "@/lib/when";

export const Route = createFileRoute("/sports")({
  head: () => ({
    meta: [
      { title: "Sports — The Lilac Post" },
      {
        name: "description",
        content:
          "Varsity scores and schedules for Lombard’s high schools, Glenbard East and Montini, with a source for every result.",
      },
    ],
    links: [canonical("/sports")],
  }),
  component: SportsPage,
});

function SportsPage() {
  const today = chicagoNow().date;
  const upcoming = games
    .filter((g) => g.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date) || (a.start ?? "").localeCompare(b.start ?? ""));

  return (
    <Shell>
      <p className="text-xs font-semibold tracking-widest text-lilac uppercase">
        Lombard high schools
      </p>
      <h1 className="mt-2 font-display text-4xl text-ink sm:text-5xl">Sports</h1>
      <p className="mt-3 max-w-2xl text-lg text-fg">
        Varsity scores for Glenbard East and Montini. We post a final score only when a public
        source (IHSA, MaxPreps, the schools, or the Daily Herald) has it, and every score links to
        that source. If sources disagree, we wait.
      </p>

      <div className="mt-8 grid gap-10 lg:grid-cols-12">
        <section className="lg:col-span-7" aria-labelledby="results">
          <h2 id="results" className="border-b-2 border-ink pb-1 font-display text-3xl text-ink">
            Recent results
          </h2>
          {SCHOOLS.map((school) => (
            <div key={school} className="mt-6">
              <h3 className="text-sm font-semibold tracking-widest text-muted uppercase">
                {school}
              </h3>
              <ResultsList
                items={recentResults(school)}
                empty="No verified results yet. Scores appear here once a public source posts them."
              />
            </div>
          ))}
        </section>
        <aside className="lg:col-span-5" aria-labelledby="upcoming">
          <h2 id="upcoming" className="border-b-2 border-ink pb-1 font-display text-3xl text-ink">
            Coming up
          </h2>
          <GamesList items={upcoming} empty="No upcoming games listed right now." />
          <p className="mt-4 text-sm text-muted">
            Schedules change, especially in the playoffs. Check the school or MaxPreps before you
            go.
          </p>
        </aside>
      </div>
    </Shell>
  );
}

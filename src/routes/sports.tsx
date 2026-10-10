import { createFileRoute } from "@tanstack/react-router";
import { games, recentResults } from "@/data/sports";
import { COMMUNITY_TEAMS, communityBetween } from "@/data/community";
import { Link } from "@tanstack/react-router";
import { CommunityList } from "@/components/community-list";
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
      <p className="text-xs font-semibold tracking-widest text-lilac uppercase">Lombard sports</p>
      <h1 className="mt-2 font-display text-4xl text-ink sm:text-5xl">Sports</h1>
      <p className="mt-3 max-w-2xl text-lg text-fg">
        Scores, standings and standouts from Lombard&rsquo;s teams, from Friday nights at Glenbard
        East and Montini to the park district pool.
      </p>

      <nav
        className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-lilac"
        aria-label="More sports"
      >
        <Link to="/sports/standings" className="inline-flex min-h-11 items-center">
          Standings
        </Link>
        <Link to="/sports/records" className="inline-flex min-h-11 items-center">
          Record book
        </Link>
        <Link to="/sports/pros" className="inline-flex min-h-11 items-center">
          Lombard pros
        </Link>
      </nav>

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
              <ResultsList items={recentResults(school)} empty="No results yet this season." />
            </div>
          ))}
        </section>
        <aside className="lg:col-span-5" aria-labelledby="upcoming">
          <h2 id="upcoming" className="border-b-2 border-ink pb-1 font-display text-3xl text-ink">
            Coming up
          </h2>
          <GamesList items={upcoming} empty="No upcoming games listed right now." />
          <p className="mt-4 text-sm text-muted">
            Game times can shift, especially come playoff time. Each game links to its source for the latest.
          </p>
        </aside>
      </div>

      <section className="mt-12" aria-labelledby="community">
        <h2 id="community" className="border-b-2 border-ink pb-1 font-display text-3xl text-ink">
          Clubs and park district
        </h2>
        <CommunityList items={communityBetween()} />
        <ul className="mt-6 grid gap-4 sm:grid-cols-3">
          {COMMUNITY_TEAMS.map((t) => (
            <li key={t.name} className="border border-line p-4">
              <p className="font-display text-xl text-ink">{t.name}</p>
              <p className="text-xs font-semibold tracking-widest text-muted uppercase">
                {t.sport}
              </p>
              <p className="mt-2 text-sm text-fg">{t.about}</p>
              <a
                href={t.sourceUrl}
                className="mt-1 inline-block text-xs text-muted underline"
                rel="noopener"
              >
                Source
              </a>
            </li>
          ))}
        </ul>
      </section>
    </Shell>
  );
}

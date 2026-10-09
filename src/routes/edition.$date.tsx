import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { allEditions, editionWindows, getEdition } from "@/data/editions";
import { events } from "@/data/events";
import { getPost } from "@/data/posts";
import { gamesBetween, resultsBetween } from "@/data/sports";
import type { Edition, VillageEvent } from "@/data/types";
import { AddToCalendar } from "@/components/add-calendar";
import { EditionHref } from "@/components/edition-link";
import { Shell } from "@/components/shell";
import { SponsorSlot } from "@/components/sponsor-slot";
import { GamesList, ResultsList } from "@/components/sports-list";
import { StoryCard } from "@/components/story-card";
import { canonical, jsonLd, morningIso, PUBLISHER } from "@/lib/seo";
import { siteUrl } from "@/lib/site";
import { byDateTime, formatLong, formatShort, formatSpan } from "@/lib/when";

export const Route = createFileRoute("/edition/$date")({
  loader: ({ params }) => {
    if (!getEdition(params.date)) throw notFound();
  },
  notFoundComponent: MissingEdition,
  head: ({ params }) => {
    const edition = getEdition(params.date);
    if (!edition) return { meta: [{ title: "Edition not found — The Lilac Post" }] };
    const path = `/edition/${edition.date}`;
    const title = `The Sunday Lilac Post, ${formatLong(edition.date)}`;
    return {
      meta: [
        { title: `${title} — The Lilac Post` },
        { name: "description", content: edition.lede },
        { property: "og:type", content: "article" },
        { property: "og:title", content: `${edition.headline} — The Sunday Lilac Post` },
        { property: "og:description", content: edition.lede },
        { property: "og:url", content: siteUrl(path) },
      ],
      links: [canonical(path)],
      scripts: [
        jsonLd({
          "@type": "NewsArticle",
          headline: edition.headline.slice(0, 110),
          alternativeHeadline: title,
          description: edition.lede,
          datePublished: morningIso(edition.date),
          dateModified: morningIso(edition.date),
          url: siteUrl(path),
          mainEntityOfPage: { "@type": "WebPage", "@id": siteUrl(path) },
          image: [siteUrl("/og.jpg")],
          isPartOf: {
            "@type": "PublicationIssue",
            issueNumber: issueNumber(edition),
            datePublished: edition.date,
          },
          author: PUBLISHER,
          publisher: PUBLISHER,
          contentLocation: { "@type": "Place", name: "Lombard, Illinois" },
        }),
      ],
    };
  },
  component: EditionPage,
});

function issueNumber(edition: Edition) {
  return [...allEditions()].reverse().findIndex((e) => e.date === edition.date) + 1;
}

function weekEvents(edition: Edition) {
  const { weekFrom, weekTo } = editionWindows(edition);
  return events
    .filter((e) => e.origin !== "Parish" && e.date >= weekFrom && e.date <= weekTo)
    .sort(byDateTime);
}

function byDay(list: VillageEvent[]) {
  const days = new Map<string, VillageEvent[]>();
  for (const e of list) days.set(e.date, [...(days.get(e.date) ?? []), e]);
  return [...days.entries()];
}

function EditionPage() {
  const { date } = Route.useParams();
  const edition = getEdition(date);
  if (!edition) return <MissingEdition />;

  const windows = editionWindows(edition);
  const featured = edition.featured.map(getPost).filter((p) => p !== undefined);
  const week = weekEvents(edition);
  const picks = new Set(edition.eventPicks ?? []);
  const results = resultsBetween(windows.resultsFrom, windows.resultsTo);
  const games = gamesBetween(windows.weekFrom, windows.weekTo);
  const ordered = allEditions();
  const index = ordered.findIndex((e) => e.date === edition.date);
  const newer = ordered[index - 1];
  const older = ordered[index + 1];

  return (
    <Shell>
      <article className="mx-auto max-w-5xl border border-line bg-paper px-4 py-6 sm:px-8 sm:py-8">
        <header className="text-center">
          <p className="text-xs font-semibold tracking-widest text-muted uppercase">
            Lombard, Illinois · No. {issueNumber(edition)}
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-ink sm:text-6xl">
            The Sunday Lilac Post
          </h1>
          <div className="mt-3 border-y-2 border-ink py-1">
            <p className="text-sm font-semibold tracking-wide text-ink">
              {formatLong(edition.date)}
            </p>
          </div>
          <h2 className="mx-auto mt-6 max-w-3xl font-display text-3xl leading-tight text-ink sm:text-4xl">
            {edition.headline}
          </h2>
        </header>

        <p className="mx-auto mt-5 max-w-3xl font-display text-lg leading-relaxed sm:text-xl text-fg first-letter:float-left first-letter:mr-2 first-letter:font-display first-letter:text-6xl first-letter:leading-none first-letter:text-lilac">
          {edition.lede}
        </p>

        <section className="mt-8" aria-labelledby="news">
          <h2 id="news" className="border-b-2 border-ink pb-1 font-display text-2xl text-ink">
            This week’s news
          </h2>
          <div className="mt-4 gap-8 sm:columns-2 sm:[column-rule:1px_solid_var(--color-line)]">
            {edition.news.map((item) => (
              <div key={item.headline} className="mb-5 break-inside-avoid">
                <h3 className="font-display text-xl leading-snug text-ink">{item.headline}</h3>
                <p className="mt-1 text-fg">{item.summary}</p>
                <EditionHref
                  href={item.href}
                  className="inline-flex min-h-11 items-center text-sm font-semibold text-lilac"
                >
                  {item.hrefLabel}
                </EditionHref>
              </div>
            ))}
          </div>
        </section>

        {featured.length ? (
          <section className="mt-6" aria-labelledby="featured">
            <h2 id="featured" className="border-b-2 border-ink pb-1 font-display text-2xl text-ink">
              Worth your time
            </h2>
            {featured.map((post) => (
              <StoryCard key={post.slug} post={post} />
            ))}
          </section>
        ) : null}

        <div className="mt-8 grid gap-10 lg:grid-cols-12">
          <section className="lg:col-span-7" aria-labelledby="week">
            <h2 id="week" className="border-b-2 border-ink pb-1 font-display text-2xl text-ink">
              The week ahead
            </h2>
            <p className="mt-2 text-sm text-muted">
              {formatShort(windows.weekFrom)} to {formatShort(windows.weekTo)}. Church dates are on
              the{" "}
              <Link
                to="/parish"
                className="underline decoration-line underline-offset-2 hover:text-lilac"
              >
                Catholic corner
              </Link>
              .
            </p>
            {week.length === 0 ? (
              <p className="mt-3 text-sm text-muted">Nothing on the calendar yet for that week.</p>
            ) : (
              byDay(week).map(([day, list]) => (
                <div key={day} className="mt-4">
                  <h3 className="text-xs font-semibold tracking-widest text-lilac uppercase">
                    {formatLong(day)}
                  </h3>
                  <ul className="mt-1 divide-y divide-line">
                    {list.map((e) => (
                      <li key={e.id} className="py-2">
                        <p className="text-ink">
                          {picks.has(e.id) ? (
                            <span className="mr-1 text-lilac" aria-label="Editor’s pick">
                              ★
                            </span>
                          ) : null}
                          <span className="font-semibold">{e.title}</span>
                          <span className="text-muted"> · {formatSpan(e.start, e.end)}</span>
                        </p>
                        <p className="text-sm text-muted">
                          {e.place}
                          {e.address ? ` · ${e.address}` : ""}
                        </p>
                        {picks.has(e.id) ? <p className="mt-1 text-sm text-fg">{e.blurb}</p> : null}
                        <AddToCalendar id={e.id} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </section>

          <section className="lg:col-span-5" aria-labelledby="sports">
            <h2 id="sports" className="border-b-2 border-ink pb-1 font-display text-2xl text-ink">
              Sports
            </h2>
            {edition.sports?.note ? <p className="mt-2 text-fg">{edition.sports.note}</p> : null}
            <h3 className="mt-4 text-xs font-semibold tracking-widest text-muted uppercase">
              Final scores
            </h3>
            <ResultsList
              items={results}
              empty="No verified varsity scores for this week yet. They’re added once a public source posts them."
            />
            <h3 className="mt-6 text-xs font-semibold tracking-widest text-muted uppercase">
              This week
            </h3>
            <GamesList items={games} empty="No games listed for the week ahead." />
            <Link
              to="/sports"
              className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-lilac"
            >
              All sports
            </Link>
          </section>
        </div>

        {edition.editorsNote ? (
          <aside className="mt-8 border-t-2 border-ink pt-4">
            <h2 className="text-xs font-semibold tracking-widest text-muted uppercase">
              From the editor
            </h2>
            <p className="mt-2 font-display text-lg text-fg italic">{edition.editorsNote}</p>
          </aside>
        ) : null}

        <SponsorSlot slot="weekend" className="mt-8" />
      </article>

      <nav
        aria-label="Other editions"
        className="mx-auto mt-6 flex max-w-5xl flex-wrap justify-between gap-4 text-sm font-semibold"
      >
        {older ? (
          <Link
            to="/edition/$date"
            params={{ date: older.date }}
            className="inline-flex min-h-11 items-center text-lilac"
          >
            ← {formatLong(older.date)}
          </Link>
        ) : (
          <span />
        )}
        <Link to="/editions" className="inline-flex min-h-11 items-center text-lilac">
          All editions
        </Link>
        {newer ? (
          <Link
            to="/edition/$date"
            params={{ date: newer.date }}
            className="inline-flex min-h-11 items-center text-lilac"
          >
            {formatLong(newer.date)} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </Shell>
  );
}

function MissingEdition() {
  return (
    <Shell>
      <h1 className="font-display text-4xl text-ink">No edition for that date</h1>
      <p className="mt-3 text-fg">
        The Sunday Lilac Post comes out on Sundays.{" "}
        <Link to="/editions" className="font-semibold text-lilac">
          See every edition
        </Link>
        .
      </p>
    </Shell>
  );
}

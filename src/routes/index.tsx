import { createFileRoute, Link } from "@tanstack/react-router";
import { events } from "@/data/events";
import { latestEdition } from "@/data/editions";
import { allPosts } from "@/data/posts";
import { AddToCalendar } from "@/components/add-calendar";
import { Shell } from "@/components/shell";
import { SponsorSlot } from "@/components/sponsor-slot";
import { StoryCard } from "@/components/story-card";
import { WireLink } from "@/components/wire-link";
import { breakingItems } from "@/lib/breaking";
import { newestFirst } from "@/lib/wire-order";
import { canonical } from "@/lib/seo";
import {
  byDateTime,
  chicagoNow,
  formatLong,
  formatShort,
  formatSpan,
  isUpcoming,
} from "@/lib/when";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [{ title: "The Lilac Post — Lombard, Illinois" }],
    links: [canonical("/")],
  }),
  component: Home,
});

function plusDays(iso: string, days: number) {
  const [y, m, d] = iso.split("-").map(Number);
  const next = new Date(y ?? 2026, (m ?? 1) - 1, (d ?? 1) + days);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${next.getFullYear()}-${pad(next.getMonth() + 1)}-${pad(next.getDate())}`;
}

function Home() {
  const now = chicagoNow();
  const breaking = newestFirst(breakingItems(now.date)).slice(0, 2);
  const edition = latestEdition();
  const stories = allPosts()
    .filter((post) => post.slug !== "st-regis-fire")
    .slice(0, 3);
  const upcoming = events
    .filter(
      (event) =>
        event.origin !== "Parish" && isUpcoming(event, now) && event.date <= plusDays(now.date, 7),
    )
    .sort(byDateTime)
    .slice(0, 6);

  return (
    <Shell>
      <section className="border border-line bg-paper p-4">
        <div className="flex items-baseline justify-between gap-3">
          <h1 className="font-display text-2xl text-ink">Breaking news</h1>
          <Link
            to="/breaking"
            className="inline-flex min-h-11 items-center text-sm font-semibold text-lilac"
          >
            All breaking
          </Link>
        </div>
        {breaking.length === 0 ? (
          <p className="mt-2 text-muted">Nothing breaking right now.</p>
        ) : (
          <ul className="mt-2 divide-y divide-line">
            {breaking.map((wire) => (
              <li key={wire.id} className="py-3">
                <p className="text-xs font-semibold tracking-widest text-lilac uppercase">
                  {wire.when}
                </p>
                <h2 className="mt-1 font-display text-2xl text-ink">{wire.title}</h2>
                <p className="mt-1 max-w-2xl text-fg">{wire.detail}</p>
                {wire.prayer ? (
                  <p className="mt-1 max-w-2xl text-fg/80 italic">{wire.prayer}</p>
                ) : null}
                <WireLink wire={wire} />
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <img src="/images/lilacia-park-autumn.webp" alt="Lilacia Park in autumn" className="h-32 w-full rounded object-cover sm:h-40" />
        <img src="/images/lincoln-square-market.webp" alt="Farmers market produce" className="h-32 w-full rounded object-cover sm:h-40" />
        <img src="/images/lombard-metra-station.webp" alt="Lombard Metra station" className="h-32 w-full rounded object-cover sm:h-40" />
        <img src="/images/prairie-path-glen-ellyn.webp" alt="Prairie Path" className="h-32 w-full rounded object-cover sm:h-40" />
      </section>

      {edition ? (
        <section
          className="mt-8 border-2 border-ink bg-paper p-5 sm:p-6"
          aria-labelledby="sunday-edition"
        >
          <p className="text-xs font-semibold tracking-widest text-lilac uppercase">
            This week’s Sunday Lilac Post · {formatLong(edition.date)}
          </p>
          <h2
            id="sunday-edition"
            className="mt-2 font-display text-3xl leading-tight text-ink sm:text-4xl"
          >
            <Link to="/edition/$date" params={{ date: edition.date }} className="hover:text-lilac">
              {edition.headline}
            </Link>
          </h2>
          <p className="mt-3 max-w-3xl text-lg text-fg">{edition.lede}</p>
          <ul className="mt-4 grid gap-x-8 gap-y-2 border-t border-line pt-3 sm:grid-cols-2">
            {edition.news.slice(0, 4).map((item) => (
              <li key={item.headline} className="font-display text-lg text-ink">
                {item.headline}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-x-6">
            <Link
              to="/edition/$date"
              params={{ date: edition.date }}
              className="inline-flex min-h-11 items-center bg-lilac px-4 text-sm font-semibold text-paper"
            >
              Read the Sunday edition
            </Link>
            <Link
              to="/editions"
              className="inline-flex min-h-11 items-center text-sm font-semibold text-lilac"
            >
              Past editions
            </Link>
          </div>
        </section>
      ) : null}

      <div className="mt-10 grid gap-10 lg:grid-cols-12">
        <section className="lg:col-span-7">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="font-display text-3xl text-ink">Latest stories</h2>
            <Link
              to="/dispatches"
              className="inline-flex min-h-11 items-center text-sm font-semibold text-lilac"
            >
              All stories
            </Link>
          </div>
          <div className="mt-2">
            {stories.map((post) => (
              <StoryCard key={post.slug} post={post} />
            ))}
          </div>
        </section>

        <aside className="lg:col-span-5">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="font-display text-3xl text-ink">Upcoming events</h2>
            <Link
              to="/calendar"
              className="inline-flex min-h-11 items-center text-sm font-semibold text-lilac"
            >
              All events
            </Link>
          </div>
          <p className="mt-2 text-sm text-muted">
            The next seven days around town. Church dates are on the Catholic corner page.
          </p>
          {upcoming.length === 0 ? (
            <p className="mt-3 text-sm text-muted">Nothing listed for the next seven days.</p>
          ) : (
            <ul className="mt-1 divide-y divide-line">
              {upcoming.map((event) => (
                <li key={event.id} className="py-3">
                  <p className="text-xs font-semibold tracking-widest text-lilac uppercase">
                    {event.origin} · {formatShort(event.date)} ·{" "}
                    {formatSpan(event.start, event.end)}
                  </p>
                  <p className="mt-1 font-semibold text-ink">{event.title}</p>
                  <p className="text-sm text-muted">
                    {event.place}
                    {event.address ? ` · ${event.address}` : ""}
                  </p>
                  <AddToCalendar id={event.id} />
                </li>
              ))}
            </ul>
          )}
        </aside>
      </div>

      <SponsorSlot slot="home" className="mt-10" />
    </Shell>
  );
}

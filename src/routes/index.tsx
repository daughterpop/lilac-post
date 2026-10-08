import { createFileRoute, Link } from "@tanstack/react-router";
import { events } from "@/data/events";
import { allPosts } from "@/data/posts";
import { AddToCalendar } from "@/components/add-calendar";
import { Shell } from "@/components/shell";
import { StoryCard } from "@/components/story-card";
import { WireLink } from "@/components/wire-link";
import { breakingItems } from "@/lib/breaking";
import { byDateTime, chicagoNow, formatShort, formatSpan, isUpcoming } from "@/lib/when";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [{ title: "The Lilac Post — Lombard, Illinois" }],
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
  const breaking = breakingItems(now.date).slice(0, 2);
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
          <Link to="/breaking" className="inline-flex min-h-11 items-center text-sm font-semibold text-lilac">
            All breaking
          </Link>
        </div>
        {breaking.length === 0 ? (
          <p className="mt-2 text-muted">Nothing breaking right now.</p>
        ) : (
          <ul className="mt-2 divide-y divide-line">
            {breaking.map((wire) => (
              <li key={wire.id} className="py-3">
                <p className="text-xs font-semibold tracking-widest text-lilac uppercase">{wire.when}</p>
                <h2 className="mt-1 font-display text-2xl text-ink">{wire.title}</h2>
                <p className="mt-1 max-w-2xl text-fg">{wire.detail}</p>
                <WireLink wire={wire} />
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="mt-10 grid gap-10 lg:grid-cols-12">
        <section className="lg:col-span-7">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="font-display text-3xl text-ink">From this week’s paper</h2>
            <Link to="/dispatches" className="inline-flex min-h-11 items-center text-sm font-semibold text-lilac">
              The paper
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
            <h2 className="font-display text-3xl text-ink">Upcoming</h2>
            <Link to="/calendar" className="inline-flex min-h-11 items-center text-sm font-semibold text-lilac">
              Calendar
            </Link>
          </div>
          <p className="mt-2 text-sm text-muted">The next seven days. Parish dates stay on the Catholic corner.</p>
          {upcoming.length === 0 ? (
            <p className="mt-3 text-sm text-muted">Nothing listed for the next seven days.</p>
          ) : (
            <ul className="mt-1 divide-y divide-line">
              {upcoming.map((event) => (
                <li key={event.id} className="py-3">
                  <p className="text-xs font-semibold tracking-widest text-lilac uppercase">
                    {event.origin} · {formatShort(event.date)} · {formatSpan(event.start, event.end)}
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
    </Shell>
  );
}

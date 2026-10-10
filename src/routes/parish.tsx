import { createFileRoute, Link } from "@tanstack/react-router";
import { events } from "@/data/events";
import { knights, parishes } from "@/data/parishes";
import { AddToCalendar } from "@/components/add-calendar";
import { Shell } from "@/components/shell";
import { chicagoNow, formatShort, formatSpan, isUpcoming } from "@/lib/when";

export const Route = createFileRoute("/parish")({
  head: () => ({
    meta: [{ title: "Catholic corner — The Lilac Post" }],
  }),
  component: ParishPage,
});

function ParishPage() {
  const now = chicagoNow();
  const upcoming = events
    .filter((event) => event.origin === "Parish" && isUpcoming(event, now))
    .sort((a, b) => a.date.localeCompare(b.date) || (a.start ?? "").localeCompare(b.start ?? ""));

  return (
    <Shell>
      <p className="text-xs font-semibold tracking-widest text-lilac uppercase">In town</p>
      <h1 className="mt-2 font-display text-4xl text-ink sm:text-5xl">Catholic corner</h1>
      <p className="mt-3 max-w-xl text-lg text-fg">
        Mass times and news from Lombard’s three Catholic parishes, Sacred Heart, St. Pius X, and Christ the
        King, and their Knights of Columbus councils. All are welcome.
      </p>

      <ul className="mt-8 divide-y divide-line border-t border-line">
        {parishes.map((parish) => (
          <li key={parish.id} className="grid gap-2 py-5 sm:grid-cols-12">
            <div className="sm:col-span-4">
              <h2 className="font-display text-2xl text-ink">{parish.name}</h2>
              <p className="mt-1 text-sm text-muted">
                {parish.where}
                <br />
                {parish.phone}
              </p>
            </div>
            <div className="sm:col-span-8">
              {parish.lines.map((line) => (
                <p key={line} className="mt-2 text-fg first:mt-0">
                  {line}
                </p>
              ))}
              <a
                href={parish.href}
                className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-lilac"
              >
                Parish site
              </a>
            </div>
          </li>
        ))}
      </ul>

      <section className="mt-10">
        <h2 className="font-display text-3xl text-ink">Knights of Columbus</h2>
        <ul className="mt-4 divide-y divide-line border-t border-line">
          {knights.map((council) => (
            <li key={council.id} className="py-5">
              <p className="text-xs font-semibold tracking-widest text-lilac uppercase">{council.serves}</p>
              <h3 className="mt-1 font-display text-2xl text-ink">{council.name}</h3>
              <p className="mt-2 max-w-2xl text-fg">{council.detail}</p>
              <a
                href={council.href}
                className="mt-1 inline-flex min-h-11 items-center text-sm font-semibold text-lilac"
              >
                Council page
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="font-display text-3xl text-ink">Coming up</h2>
          <Link to="/calendar" className="inline-flex min-h-11 items-center text-sm font-semibold text-lilac">
            Calendar
          </Link>
        </div>
        {upcoming.length === 0 ? (
          <p className="mt-3 max-w-xl text-muted">
            No special parish events are scheduled right now. Regular Mass times are listed above.
          </p>
        ) : (
          <ul className="mt-2 divide-y divide-line">
            {upcoming.map((event) => (
              <li key={event.id} className="py-4">
                <p className="text-xs font-semibold tracking-widest text-lilac uppercase">
                  {formatShort(event.date)} · {formatSpan(event.start, event.end)}
                </p>
                <h3 className="mt-1 font-display text-2xl text-ink">{event.title}</h3>
                <p className="mt-1 text-sm text-muted">
                  {event.place}
                  {event.address ? ` · ${event.address}` : ""}
                </p>
                <p className="mt-2 max-w-xl text-fg">{event.blurb}</p>
                <AddToCalendar id={event.id} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </Shell>
  );
}

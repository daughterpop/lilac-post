import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { ORIGINS, type Origin } from "@/data/types";
import { datesWithEvents, eventsOn } from "@/data/events";
import { AddToCalendar } from "@/components/add-calendar";
import { Shell } from "@/components/shell";
import { SponsorSlot } from "@/components/sponsor-slot";
import { chicagoNow, formatLong, formatSpan } from "@/lib/when";

export const Route = createFileRoute("/calendar")({
  head: () => ({
    meta: [{ title: "Calendar — The Lilac Post" }],
  }),
  component: CalendarPage,
});

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function monthLabel(year: number, month: number) {
  return new Date(year, month - 1, 1).toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function CalendarPage() {
  const today = chicagoNow().date;
  const [year, month] = today.split("-").map(Number);
  const [cursor, setCursor] = useState({ year, month });
  const [selected, setSelected] = useState(today);
  const [origin, setOrigin] = useState<Origin | "All">("All");

  const marked = useMemo(() => datesWithEvents(origin), [origin]);
  const cells = useMemo(() => buildCells(cursor.year, cursor.month), [cursor]);
  const selectedEvents = eventsOn(selected, origin);

  function shift(delta: number) {
    const next = new Date(cursor.year, cursor.month - 1 + delta, 1);
    const y = next.getFullYear();
    const m = next.getMonth() + 1;
    setCursor({ year: y, month: m });
    setSelected(`${y}-${pad(m)}-01`);
  }

  return (
    <Shell>
      <p className="text-xs font-semibold tracking-widest text-lilac uppercase">Village calendar</p>
      <h1 className="mt-2 font-display text-4xl text-ink sm:text-5xl">What’s on</h1>
      <p className="mt-3 max-w-xl text-lg text-fg">
        Story times and swim nights, board meetings and craft markets, Friday lights and Sunday Masses.
        Here’s what’s happening around Lombard. Pick a day to see what’s on, and save the ones you don’t
        want to miss.
      </p>
      <a href="/api/calendar.ics" className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-lilac">
        Subscribe to this calendar
      </a>

      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter events">
        <FilterChip on={origin === "All"} onClick={() => setOrigin("All")}>
          All
        </FilterChip>
        {ORIGINS.map((item) => (
          <FilterChip key={item} on={origin === item} onClick={() => setOrigin(item)}>
            {item}
          </FilterChip>
        ))}
      </div>

      <div className="mt-6 border border-line bg-paper p-3 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => shift(-1)}
            className="inline-flex size-11 items-center justify-center text-ink hover:text-lilac"
            aria-label="Previous month"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <h2 className="font-display text-2xl text-ink">{monthLabel(cursor.year, cursor.month)}</h2>
          <button
            type="button"
            onClick={() => shift(1)}
            className="inline-flex size-11 items-center justify-center text-ink hover:text-lilac"
            aria-label="Next month"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs font-semibold tracking-wide text-muted">
          {WEEKDAYS.map((day) => (
            <div key={day} className="py-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1" role="grid" aria-label={monthLabel(cursor.year, cursor.month)}>
          {cells.map((cell, index) => {
            if (!cell) {
              return <div key={`empty-${index}`} className="min-h-11" />;
            }
            const iso = `${cursor.year}-${pad(cursor.month)}-${pad(cell)}`;
            const has = marked.has(iso);
            const isToday = iso === today;
            const isSelected = iso === selected;
            return (
              <button
                key={iso}
                type="button"
                role="gridcell"
                aria-pressed={isSelected}
                aria-label={`${formatLong(iso)}${has ? ", events listed" : ""}`}
                onClick={() => setSelected(iso)}
                className={`flex min-h-11 flex-col items-center justify-center text-sm ${
                  isSelected
                    ? "bg-lilac text-paper"
                    : isToday
                      ? "bg-lilac-soft text-ink"
                      : "text-ink hover:bg-lilac-soft"
                }`}
              >
                <span>{cell}</span>
                {has ? (
                  <span
                    className={`mt-0.5 size-1.5 rounded-full ${isSelected ? "bg-paper" : "bg-lilac"}`}
                    aria-hidden="true"
                  />
                ) : (
                  <span className="mt-0.5 size-1.5" aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <section className="mt-8">
        <h2 className="font-display text-3xl text-ink">{formatLong(selected)}</h2>
        {selectedEvents.length === 0 ? (
          <p className="mt-3 max-w-xl text-muted">
            Nothing listed. Lilacia Park is still open dawn to dusk, and the library keeps its regular hours.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-line">
            {selectedEvents.map((event) => (
              <li key={event.id} className="py-4">
                <p className="text-xs font-semibold tracking-widest text-lilac uppercase">
                  {event.origin} · {formatSpan(event.start, event.end)}
                </p>
                <h3 className="mt-1 font-display text-2xl text-ink">{event.title}</h3>
                <p className="mt-1 text-sm text-muted">
                  {event.place}
                  {event.address ? ` · ${event.address}` : ""}
                </p>
                <p className="mt-2 max-w-xl text-fg">{event.blurb}</p>
                <div className="mt-1 flex flex-wrap items-center gap-x-4">
                  <a
                    href={event.href}
                    className="inline-flex min-h-11 items-center text-sm font-semibold text-lilac"
                  >
                    Details
                  </a>
                  <AddToCalendar id={event.id} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <SponsorSlot slot="weekend" className="mt-10 max-w-2xl" />
    </Shell>
  );
}

function buildCells(year: number, month: number) {
  const first = new Date(year, month - 1, 1).getDay();
  const count = new Date(year, month, 0).getDate();
  const cells: Array<number | null> = [];
  for (let i = 0; i < first; i += 1) cells.push(null);
  for (let day = 1; day <= count; day += 1) cells.push(day);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

function FilterChip({
  on,
  onClick,
  children,
}: {
  on: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`inline-flex min-h-11 items-center border px-3 text-sm font-semibold ${
        on ? "border-lilac bg-lilac-soft text-lilac" : "border-line bg-paper text-ink"
      }`}
    >
      {children}
    </button>
  );
}

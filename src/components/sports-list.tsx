import type { SportsGame, SportsResult } from "@/data/types";
import { formatShort, formatSpan } from "@/lib/when";

const vs = (site: SportsResult["site"]) =>
  site === "away" ? "at" : site === "neutral" ? "vs. (neutral)" : "vs.";

export function ResultsList({ items, empty }: { items: SportsResult[]; empty: string }) {
  if (items.length === 0) return <p className="mt-3 text-sm text-muted">{empty}</p>;
  return (
    <ul className="mt-2 divide-y divide-line">
      {items.map((r) => (
        <li
          key={r.id}
          className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3"
        >
          <div>
            <p className="text-xs font-semibold tracking-widest text-lilac uppercase">
              {r.sport} · {formatShort(r.date)}
            </p>
            <p className="mt-1 text-ink">
              <span className="font-semibold">{r.school}</span> {vs(r.site)} {r.opponent}
            </p>
          </div>
          <div className="text-right">
            <p className="font-display text-xl text-ink tabular-nums">
              <span
                className={
                  r.result === "W" ? "text-leaf" : r.result === "L" ? "text-lilac" : "text-muted"
                }
              >
                {r.result}
              </span>{" "}
              {r.scoreFor}–{r.scoreAgainst}
              {r.note ? <span className="text-sm text-muted"> ({r.note})</span> : null}
            </p>
            <a
              href={r.source.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center text-xs text-muted underline decoration-line underline-offset-2 hover:text-lilac"
            >
              Source: {r.source.name}
            </a>
          </div>
          <GameExtras r={r} />
        </li>
      ))}
    </ul>
  );
}

const linkCls = "text-xs text-muted underline decoration-line underline-offset-2 hover:text-lilac";

function GameExtras({ r }: { r: SportsResult }) {
  const hl = r.highlights ?? [];
  const qs = r.quotes ?? [];
  if (!r.recap && hl.length === 0 && qs.length === 0) return null;
  return (
    <div className="w-full space-y-2 text-sm">
      {r.recap ? <p className="text-ink">{r.recap}</p> : null}
      {hl.length > 0 ? (
        <ul className="space-y-1">
          {hl.map((h) => (
            <li key={h.player + h.stat} className="text-ink">
              <span className="font-semibold">{h.player}</span>
              <span className="text-muted"> ({h.school})</span>: {h.stat}{" "}
              <a href={h.sourceUrl} target="_blank" rel="noopener noreferrer" className={linkCls}>
                source
              </a>
            </li>
          ))}
        </ul>
      ) : null}
      {qs.map((q) => (
        <blockquote key={q.text} className="border-l-2 border-lilac pl-3 text-ink italic">
          &ldquo;{q.text}&rdquo;
          <footer className="mt-1 text-xs text-muted not-italic">
            {q.speaker} &middot;{" "}
            <a href={q.sourceUrl} target="_blank" rel="noopener noreferrer" className={linkCls}>
              {q.sourceName}
            </a>
          </footer>
        </blockquote>
      ))}
    </div>
  );
}

export function GamesList({ items, empty }: { items: SportsGame[]; empty: string }) {
  if (items.length === 0) return <p className="mt-3 text-sm text-muted">{empty}</p>;
  return (
    <ul className="mt-2 divide-y divide-line">
      {items.map((g) => (
        <li
          key={g.id}
          className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3"
        >
          <div>
            <p className="text-xs font-semibold tracking-widest text-lilac uppercase">
              {g.sport} · {formatShort(g.date)}
              {g.start ? ` · ${formatSpan(g.start)}` : ""}
            </p>
            <p className="mt-1 text-ink">
              <span className="font-semibold">{g.school}</span> {vs(g.site)} {g.opponent}
            </p>
          </div>
          <a
            href={g.source.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center text-xs text-muted underline decoration-line underline-offset-2 hover:text-lilac"
          >
            Schedule: {g.source.name}
          </a>
        </li>
      ))}
    </ul>
  );
}

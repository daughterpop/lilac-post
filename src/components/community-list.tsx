import type { CommunityResult } from "@/data/community";

export function CommunityList({ items }: { items: CommunityResult[] }) {
  if (!items.length) return <p className="mt-4 text-muted">No club or park results this week.</p>;
  return (
    <ul className="mt-4 divide-y divide-line">
      {items.map((r) => (
        <li key={r.id} className="py-3">
          <p className="text-xs font-semibold tracking-widest text-muted uppercase">
            {r.sport} &middot;{" "}
            {new Date(`${r.date}T12:00:00`).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <p className="font-semibold text-ink">{r.team}</p>
          <p className="text-sm text-fg">{r.event}</p>
          <p className="mt-1 text-fg">{r.result}</p>
          <a href={r.sourceUrl} className="text-xs text-muted underline" rel="noopener">
            Source: {r.sourceName}
          </a>
        </li>
      ))}
    </ul>
  );
}

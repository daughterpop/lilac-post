import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { DESKS, type Desk } from "@/data/types";
import { allPosts } from "@/data/posts";
import { wires } from "@/data/wires";
import { newestFirst } from "@/lib/wire-order";
import { Shell } from "@/components/shell";
import { StoryCard } from "@/components/story-card";
import { useClips, useHydrated } from "@/lib/clips";

export const Route = createFileRoute("/dispatches/")({
  head: () => ({
    meta: [{ title: "The paper — The Lilac Post" }],
  }),
  component: Dispatches,
});

function Dispatches() {
  const [desk, setDesk] = useState<Desk | "All">("All");
  const [query, setQuery] = useState("");
  const [clippedOnly, setClippedOnly] = useState(false);
  const ready = useHydrated();
  const saved = useClips((state) => state.saved);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allPosts().filter((post) => {
      if (post.slug === "st-regis-fire") return false;
      if (desk !== "All" && post.desk !== desk) return false;
      if (clippedOnly && !saved.includes(post.slug)) return false;
      if (!q) return true;
      return (
        post.title.toLowerCase().includes(q) ||
        post.dek.toLowerCase().includes(q) ||
        post.desk.toLowerCase().includes(q)
      );
    });
  }, [desk, query, clippedOnly, saved]);

  return (
    <Shell>
      <p className="text-xs font-semibold tracking-widest text-lilac uppercase">The weekly paper</p>
      <h1 className="mt-2 font-display text-4xl text-ink sm:text-5xl">The paper</h1>
      <p className="mt-3 max-w-xl text-lg text-fg">
        Our longer stories, published weekly. Search by topic, or tap “Clip” on any story to save it
        for later on this device.
      </p>

      <label htmlFor="dispatch-search" className="mt-6 block text-sm font-semibold text-ink">
        Search
      </label>
      <input
        id="dispatch-search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Lilacs, market, Peck…"
        className="mt-2 w-full max-w-md border border-line bg-paper px-3 py-3 text-base text-fg"
      />

      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter by desk">
        <Chip on={desk === "All"} onClick={() => setDesk("All")}>
          All
        </Chip>
        {DESKS.map((item) => (
          <Chip key={item} on={desk === item} onClick={() => setDesk(item)}>
            {item}
          </Chip>
        ))}
        <Chip on={clippedOnly} onClick={() => setClippedOnly((value) => !value)}>
          {ready ? `Clipped (${saved.length})` : "Clipped"}
        </Chip>
      </div>

      <div className="mt-6">
        {list.length === 0 ? (
          <p className="border-t border-line py-8 text-muted">
            {clippedOnly
              ? "You haven’t clipped any stories on this device yet."
              : "No stories match that search."}
          </p>
        ) : (
          list.map((post) => <StoryCard key={post.slug} post={post} />)
        )}
      </div>

      <section className="mt-12">
        <h2 className="font-display text-3xl text-ink">From social media</h2>
        <p className="mt-2 max-w-xl text-muted">
          A few recent public posts from Lombard groups on X, Facebook, and Instagram.
        </p>
        <ul className="mt-4 divide-y divide-line border-t border-line">
          {newestFirst(wires)
            .filter(
              (wire) => wire.desk === "X" || wire.desk === "Facebook" || wire.desk === "Instagram",
            )
            .map((wire) => (
              <li key={wire.id} className="py-4">
                <p className="text-xs font-semibold tracking-widest text-lilac uppercase">
                  {wire.desk} · {wire.when}
                </p>
                <h3 className="mt-1 font-display text-2xl text-ink">{wire.title}</h3>
                <p className="mt-2 max-w-2xl text-fg">{wire.detail}</p>
                {wire.prayer ? (
                  <p className="mt-1 max-w-2xl text-fg/80 italic">{wire.prayer}</p>
                ) : null}
                <a
                  href={wire.href}
                  className="mt-1 inline-flex min-h-11 items-center text-sm font-semibold text-lilac"
                >
                  {wire.hrefLabel}
                </a>
              </li>
            ))}
        </ul>
      </section>
    </Shell>
  );
}

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: string }) {
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

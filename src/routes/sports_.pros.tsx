import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { canonical } from "@/lib/seo";
import { pros, proUpdates } from "@/data/pros";
export const Route = createFileRoute("/sports_/pros")({
  head: () => ({
    meta: [
      { title: "Lombard Pros — The Lilac Post" },
      { name: "description", content: "Athletes from Lombard who made it to the pros." },
    ],
    links: [canonical("/sports/pros")],
  }),
  component: Page,
});

const fmt = (d: string) =>
  new Date(`${d}T12:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
void fmt;

function Top({ title, intro }: { title: string; intro: string }) {
  return (
    <>
      <Link
        to="/sports"
        className="inline-flex min-h-11 items-center text-sm font-semibold text-lilac"
      >
        &larr; Sports
      </Link>
      <h1 className="mt-1 font-display text-4xl text-ink sm:text-5xl">{title}</h1>
      <p className="mt-3 max-w-2xl text-lg text-fg">{intro}</p>
    </>
  );
}
const src = "text-xs text-muted underline";

function Page() {
  const updates = [...proUpdates].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 10);
  return (
    <Shell>
      <Top
        title="Lombard Pros"
        intro="Lombard in the big leagues: athletes who grew up here or played for a Lombard school."
      />
      {updates.length ? (
        <section className="mt-8" aria-labelledby="latest">
          <h2 id="latest" className="border-b-2 border-ink pb-1 font-display text-2xl text-ink">
            Latest
          </h2>
          <ul className="mt-3 divide-y divide-line">
            {updates.map((u) => (
              <li key={`${u.date}-${u.proId}`} className="py-2 text-fg">
                <span className="text-xs text-muted">{fmt(u.date)}</span> {u.text}{" "}
                <a href={u.sourceUrl} className={src} rel="noopener">
                  Source
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      {(["active", "retired"] as const).map((st) => (
        <section key={st} className="mt-10" aria-label={st}>
          <h2 className="border-b-2 border-ink pb-1 font-display text-3xl text-ink">
            {st === "active" ? "Active" : "Retired"}
          </h2>
          <ul className="mt-3 grid gap-4 sm:grid-cols-2">
            {pros
              .filter((p) => p.status === st)
              .map((p) => (
                <li key={p.id} className="border border-line p-4">
                  <p className="font-display text-2xl text-ink">{p.name}</p>
                  <p className="text-xs font-semibold tracking-widest text-muted uppercase">
                    {p.sport}
                    {p.team ? ` · ${p.team}` : ""}
                  </p>
                  <p className="mt-2 text-fg">
                    {p.connection.text}{" "}
                    <a href={p.connection.sourceUrl} className={src} rel="noopener">
                      Source
                    </a>
                  </p>
                  <ul className="mt-2 list-disc pl-5 text-fg">
                    {p.highlights.map((h) => (
                      <li key={h.text}>
                        {h.text}{" "}
                        <a href={h.sourceUrl} className={src} rel="noopener">
                          Source
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </Shell>
  );
}

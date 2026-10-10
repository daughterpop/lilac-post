import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { canonical } from "@/lib/seo";
import { standings } from "@/data/standings";
export const Route = createFileRoute("/sports_/standings")({
  head: () => ({
    meta: [
      { title: "Standings — The Lilac Post" },
      { name: "description", content: "Conference standings for Glenbard East and Montini teams." },
    ],
    links: [canonical("/sports/standings")],
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
  return (
    <Shell>
      <Top
        title="Standings"
        intro="Where Lombard's teams stand in their conferences, Glenbard East and Montini highlighted."
      />
      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        {standings.map((t) => (
          <section key={t.id} aria-labelledby={t.id}>
            <h2 id={t.id} className="border-b-2 border-ink pb-1 font-display text-2xl text-ink">
              {t.sport}: {t.conference}
            </h2>
            <p className="mt-1 text-xs text-muted">
              {t.status === "final"
                ? `Final ${t.season} standings`
                : `${t.season} season, as of ${fmt(t.asOf)}`}
            </p>
            <table className="mt-3 w-full text-sm">
              <thead>
                <tr className="text-left text-xs tracking-widest text-muted uppercase">
                  <th className="py-1">Team</th>
                  <th className="py-1">Conf.</th>
                  <th className="py-1">Overall</th>
                </tr>
              </thead>
              <tbody>
                {t.rows.map((row) => (
                  <tr
                    key={row.team}
                    className={row.local ? "bg-lilac/10 font-semibold text-ink" : "text-fg"}
                  >
                    <td className="py-1.5 pl-1">{row.team}</td>
                    <td>{row.conf}</td>
                    <td>{row.overall}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <a href={t.sourceUrl} className={src} rel="noopener">
              Source: {t.sourceName}
            </a>
          </section>
        ))}
      </div>
    </Shell>
  );
}

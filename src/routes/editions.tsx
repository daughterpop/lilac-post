import { createFileRoute, Link } from "@tanstack/react-router";
import { allEditions } from "@/data/editions";
import { Shell } from "@/components/shell";
import { canonical, jsonLd, PUBLISHER } from "@/lib/seo";
import { siteUrl } from "@/lib/site";
import { formatLong } from "@/lib/when";

export const Route = createFileRoute("/editions")({
  head: () => ({
    meta: [
      { title: "The Sunday Lilac Post: all editions — The Lilac Post" },
      {
        name: "description",
        content: "Every Sunday Lilac Post: the week’s Lombard news, stories, events, and scores.",
      },
    ],
    links: [canonical("/editions")],
    scripts: [
      jsonLd({
        "@type": "CollectionPage",
        name: "The Sunday Lilac Post",
        url: siteUrl("/editions"),
        publisher: PUBLISHER,
        hasPart: allEditions().map((e) => ({
          "@type": "NewsArticle",
          headline: e.headline.slice(0, 110),
          url: siteUrl(`/edition/${e.date}`),
          datePublished: e.date,
        })),
      }),
    ],
  }),
  component: EditionsPage,
});

function EditionsPage() {
  const list = allEditions();
  return (
    <Shell>
      <p className="text-xs font-semibold tracking-widest text-lilac uppercase">Every Sunday</p>
      <h1 className="mt-2 font-display text-4xl text-ink sm:text-5xl">The Sunday Lilac Post</h1>
      <p className="mt-3 max-w-2xl text-lg text-fg">
        The week in Lombard in one place: the news, a few stories worth your time, what’s on in the
        week ahead, and how Glenbard East and Montini did.
      </p>
      {list.length === 0 ? (
        <p className="mt-6 text-muted">The first edition is on its way.</p>
      ) : (
        <ul className="mt-6 divide-y divide-line border-t-2 border-ink">
          {list.map((e, i) => (
            <li key={e.date} className="py-5">
              <p className="text-xs font-semibold tracking-widest text-lilac uppercase">
                {i === 0 ? "Latest · " : ""}
                {formatLong(e.date)}
              </p>
              <h2 className="mt-1 font-display text-2xl leading-tight text-ink">
                <Link to="/edition/$date" params={{ date: e.date }} className="hover:text-lilac">
                  {e.headline}
                </Link>
              </h2>
              <p className="mt-2 max-w-3xl text-fg">{e.lede}</p>
            </li>
          ))}
        </ul>
      )}
    </Shell>
  );
}

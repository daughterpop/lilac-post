import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getPost, relatedPosts } from "@/data/posts";
import { SaveButton } from "@/components/save-button";
import { Shell } from "@/components/shell";
import { SponsorSlot } from "@/components/sponsor-slot";
import { formatLong } from "@/lib/when";

export const Route = createFileRoute("/dispatches/$slug")({
  // Unknown slugs throw notFound() so the server responds with HTTP 404.
  loader: ({ params }) => {
    if (!getPost(params.slug)) throw notFound();
  },
  notFoundComponent: MissingDispatch,
  head: ({ params }) => {
    const post = getPost(params.slug);
    return {
      meta: [
        { title: post ? `${post.title} — The Lilac Post` : "Story not found — The Lilac Post" },
      ],
    };
  },
  component: DispatchPage,
});

function DispatchPage() {
  const { slug } = Route.useParams();
  const post = getPost(slug);

  if (!post) return <MissingDispatch />;

  const more = relatedPosts(post.slug);

  return (
    <Shell>
      <article className="mx-auto max-w-2xl">
        <p className="text-xs font-semibold tracking-widest text-lilac uppercase">{post.desk}</p>
        <h1 className="mt-2 font-display text-4xl leading-tight text-ink sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 font-display text-xl text-fg italic">{post.dek}</p>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 border-y border-line py-2">
          <p className="text-sm text-muted">Lombard · {formatLong(post.date)}</p>
          <SaveButton slug={post.slug} />
        </div>
        {post.image ? (
          <figure className="mt-6">
            <img
              src={post.image}
              alt={post.imageAlt ?? ""}
              className="aspect-video w-full object-cover"
            />
            {post.imageCaption || post.imageCredit ? (
              <figcaption className="mt-2 text-sm text-muted">
                {post.imageCaption}
                {post.imageCredit ? (
                  <>
                    {post.imageCaption ? " " : null}
                    <a
                      href={post.imageCredit.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-line underline-offset-2 hover:text-fg"
                    >
                      {post.imageCredit.text}
                    </a>
                  </>
                ) : null}
              </figcaption>
            ) : null}
          </figure>
        ) : null}
        <div className="mt-6 space-y-4 text-lg leading-relaxed">
          {post.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {post.prayer ? (
            <p className="border-t border-line pt-4 text-fg/80 italic">{post.prayer}</p>
          ) : null}
        </div>
        {post.corrections?.length ? (
          <section className="mt-8 border-t border-line pt-4" aria-labelledby="corrections">
            <h2
              id="corrections"
              className="text-sm font-semibold tracking-widest text-muted uppercase"
            >
              Corrections
            </h2>
            <ul className="mt-2 space-y-2 text-fg">
              {post.corrections.map((item) => (
                <li key={`${item.date}-${item.note}`}>
                  <span className="font-semibold">{formatLong(item.date)}:</span> {item.note}
                </li>
              ))}
            </ul>
          </section>
        ) : null}
        <section className="mt-8 border-t border-line pt-4">
          <h2 className="text-sm font-semibold tracking-widest text-muted uppercase">Sources</h2>
          <ul className="mt-2 space-y-1">
            {post.sources.map((source) => (
              <li key={source.href}>
                <a
                  href={source.href}
                  className="inline-flex min-h-11 items-center text-lilac underline decoration-line underline-offset-4"
                >
                  {source.name}
                </a>
              </li>
            ))}
          </ul>
        </section>
        <SponsorSlot slot="story" className="mt-8" />
      </article>

      <section className="mx-auto mt-12 max-w-2xl">
        <h2 className="font-display text-2xl text-ink">More from the paper</h2>
        <ul className="mt-3 divide-y divide-line">
          {more.map((item) => (
            <li key={item.slug} className="py-3">
              <p className="text-xs font-semibold tracking-widest text-lilac uppercase">
                {item.desk}
              </p>
              <Link
                to="/dispatches/$slug"
                params={{ slug: item.slug }}
                className="mt-1 inline-flex min-h-11 items-center font-display text-xl text-ink hover:text-lilac"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Shell>
  );
}

function MissingDispatch() {
  return (
    <Shell>
      <h1 className="font-display text-4xl text-ink">We couldn’t find that story</h1>
      <p className="mt-3 text-muted">It may have moved, or the link may be mistyped.</p>
      <Link
        to="/dispatches"
        className="mt-4 inline-flex min-h-11 items-center font-semibold text-lilac"
      >
        All stories
      </Link>
    </Shell>
  );
}

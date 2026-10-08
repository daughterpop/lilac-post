import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { useClips, useHydrated } from "@/lib/clips";

export const Route = createFileRoute("/subscribe")({
  head: () => ({
    meta: [{ title: "Subscribe — The Lilac Post" }],
  }),
  component: SubscribePage,
});

function SubscribePage() {
  const ready = useHydrated();
  const on = useClips((state) => state.paper);
  const subscribePaper = useClips((state) => state.subscribePaper);
  const unsubscribePaper = useClips((state) => state.unsubscribePaper);

  return (
    <Shell>
      <p className="text-xs font-semibold tracking-widest text-lilac uppercase">The Lilac Post</p>
      <h1 className="mt-2 font-display text-4xl text-ink sm:text-5xl">Subscribe</h1>
      <p className="mt-3 max-w-xl text-lg text-fg">
        One subscription. It includes breaking news and the weekly paper.
      </p>

      <div className="mt-6 max-w-md border border-line bg-paper p-5">
        <ul className="space-y-3 text-fg">
          <li>
            <Link to="/breaking" className="font-semibold text-ink hover:text-lilac">
              Breaking news
            </Link>
            <p className="text-sm text-muted">Short items as the village posts them.</p>
          </li>
          <li>
            <Link to="/dispatches" className="font-semibold text-ink hover:text-lilac">
              The weekly paper
            </Link>
            <p className="text-sm text-muted">The longer stories, once a week.</p>
          </li>
        </ul>
        {ready && on ? (
          <>
            <p className="mt-5 font-semibold text-ink">You’re subscribed on this phone.</p>
            <button
              type="button"
              onClick={unsubscribePaper}
              className="mt-3 inline-flex min-h-11 items-center border border-line px-4 text-sm font-semibold text-ink"
            >
              Unsubscribe
            </button>
          </>
        ) : (
          <button
            type="button"
            disabled={!ready}
            onClick={subscribePaper}
            className="mt-5 inline-flex min-h-11 items-center bg-lilac px-4 text-sm font-semibold text-paper disabled:opacity-60"
          >
            Subscribe
          </button>
        )}
        <p className="mt-4 text-sm text-muted">
          Saved on this phone. Open the Post and both sections are yours. This does not send email.
        </p>
      </div>
    </Shell>
  );
}

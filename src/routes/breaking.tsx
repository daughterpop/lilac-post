import { createFileRoute, Link } from "@tanstack/react-router";
import { WireLink } from "@/components/wire-link";
import { Shell } from "@/components/shell";
import { allBreaking, isBreakingLive } from "@/lib/breaking";
import { chicagoNow } from "@/lib/when";

export const Route = createFileRoute("/breaking")({
  head: () => ({
    meta: [{ title: "Breaking news — The Lilac Post" }],
  }),
  component: BreakingPage,
});

function BreakingPage() {
  const today = chicagoNow().date;
  const items = allBreaking();

  return (
    <Shell>
      <p className="text-xs font-semibold tracking-widest text-lilac uppercase">As it happens</p>
      <h1 className="mt-2 font-display text-4xl text-ink sm:text-5xl">Breaking news</h1>
      <p className="mt-3 max-w-xl text-lg text-fg">
        Short items from the village. The weekly paper is the longer read. Subscribe covers both.
      </p>
      <ul className="mt-6 divide-y divide-line border-t border-line">
        {items.map((wire) => (
          <li key={wire.id} className="py-5">
            <p className="text-xs font-semibold tracking-widest text-lilac uppercase">
              {isBreakingLive(wire.id, today) ? "Live · " : ""}
              {wire.when}
            </p>
            <h2 className="mt-1 font-display text-2xl text-ink">{wire.title}</h2>
            <p className="mt-2 max-w-2xl text-fg">{wire.detail}</p>
            <WireLink wire={wire} />
          </li>
        ))}
      </ul>
      <Link to="/subscribe" className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-lilac">
        Subscribe to breaking news and the weekly paper
      </Link>
    </Shell>
  );
}

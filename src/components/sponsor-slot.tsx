import { Link } from "@tanstack/react-router";
import { SPONSORS, type SponsorSlotId } from "@/lib/sponsors";

const HOUSE_COPY: Record<SponsorSlotId, { title: string; blurb: string }> = {
  home: {
    title: "Your business here",
    blurb: "Put your Lombard business in front of neighbors who read the paper.",
  },
  weekend: {
    title: "Sponsor the weekend in Lombard",
    blurb: "Reach neighbors planning their weekend. One local business sponsors the weekend listings each week.",
  },
  story: {
    title: "Sponsor this spot",
    blurb: "Reach readers who come to The Lilac Post for news about the village.",
  },
};

/**
 * A labeled ad slot. Shows the real sponsor from src/lib/sponsors.ts when one
 * is set, otherwise a house ad linking to /advertise. Never shows a fake sponsor.
 */
export function SponsorSlot({ slot, className = "" }: { slot: SponsorSlotId; className?: string }) {
  const sponsor = SPONSORS[slot];

  if (sponsor) {
    return (
      <aside aria-label="Sponsored" className={`border border-line bg-paper p-4 ${className}`}>
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">Sponsored</p>
        <div className="mt-2 flex items-start gap-4">
          {sponsor.logo ? (
            <img
              src={sponsor.logo}
              alt={sponsor.logoAlt ?? sponsor.name}
              loading="lazy"
              className="size-16 shrink-0 object-contain"
            />
          ) : null}
          <div>
            <a
              href={sponsor.url}
              rel="sponsored noopener"
              target="_blank"
              className="font-display text-xl text-ink hover:text-lilac"
            >
              {sponsor.name}
            </a>
            <p className="mt-1 text-sm text-fg">{sponsor.blurb}</p>
          </div>
        </div>
        <p className="mt-3 text-xs text-muted">
          Sponsors don’t influence our coverage.{" "}
          <Link
            to="/advertise"
            className="underline decoration-line underline-offset-4 hover:text-lilac"
          >
            Advertise with us
          </Link>
        </p>
      </aside>
    );
  }

  const copy = HOUSE_COPY[slot];
  return (
    <aside
      aria-label="Advertise with The Lilac Post"
      className={`border border-dashed border-line bg-lilac-soft/40 p-4 ${className}`}
    >
      <p className="text-xs font-semibold tracking-widest text-muted uppercase">From the paper</p>
      <p className="mt-1 font-display text-xl text-ink">{copy.title}</p>
      <p className="mt-1 text-sm text-fg">{copy.blurb}</p>
      <Link
        to="/advertise"
        className="mt-1 inline-flex min-h-11 items-center text-sm font-semibold text-lilac"
      >
        Advertise with us
      </Link>
    </aside>
  );
}

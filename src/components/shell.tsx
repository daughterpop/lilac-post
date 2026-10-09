import { Link, useRouterState } from "@tanstack/react-router";
import { Flower2 } from "lucide-react";
import { useEffect, type ReactNode } from "react";
import { useClips, useHydrated } from "@/lib/clips";
import { chicagoNow } from "@/lib/when";

const NAV = [
  { to: "/", label: "Home", exact: true },
  { to: "/breaking", label: "Breaking", exact: false },
  { to: "/dispatches", label: "The paper", exact: false },
  { to: "/calendar", label: "Calendar", exact: false },
  { to: "/parish", label: "Catholic corner", exact: false },
  { to: "/village", label: "Lombard", exact: false },
  { to: "/about", label: "About us", exact: false },
] as const;

function NavLink({
  to,
  label,
  exact,
}: {
  to: (typeof NAV)[number]["to"];
  label: string;
  exact: boolean;
}) {
  const path = useRouterState({ select: (state) => state.location.pathname });
  const on = exact ? path === to : path === to || path.startsWith(`${to}/`);

  return (
    <Link
      to={to}
      className={`inline-flex min-h-11 items-center border-b-2 text-sm font-semibold tracking-wide ${
        on ? "border-lilac text-lilac" : "border-transparent text-ink hover:text-lilac"
      }`}
    >
      {label}
    </Link>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  const today = chicagoNow();

  useEffect(() => {
    void useClips.persist.rehydrate();
  }, []);

  return (
    <div className="min-h-screen bg-bg text-fg">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-20 focus:bg-paper focus:px-3 focus:py-2 focus:text-ink"
      >
        Skip to the paper
      </a>
      <header className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 pt-5 sm:px-6">
          <p className="text-center text-xs font-semibold tracking-widest text-muted uppercase">
            Lombard, Illinois · The Lilac Village
          </p>
          <div className="mt-3 text-center">
            <Flower2 className="mx-auto size-4 text-lilac" aria-hidden="true" />
            <Link
              to="/"
              className="mt-2 block font-display text-4xl leading-none font-semibold tracking-tight text-ink sm:text-6xl"
            >
              The Lilac Post
            </Link>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <p className="text-sm text-muted">{today.label}</p>
            <SubscribeButton />
          </div>
          <nav aria-label="Paper" className="mt-3 flex flex-wrap justify-center gap-x-5">
            {NAV.map((item) => (
              <NavLink key={item.to} {...item} />
            ))}
          </nav>
          <div className="mt-1 border-t-2 border-ink pt-px">
            <div className="border-t border-ink" />
          </div>
        </div>
      </header>
      <main id="main" className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        {children}
      </main>
      <footer className="border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted sm:px-6">
          <p className="font-display text-lg text-ink">The Lilac Post</p>
          <p className="mt-2 max-w-xl">
            A neighborhood edition for Lombard. Not the village, the library, or the park district.
            Times come from their public listings and can change — check the host before you go.
          </p>
          <p className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
            <Link className="font-semibold underline decoration-line underline-offset-4 hover:text-lilac" to="/about">
              About the paper
            </Link>
            <a className="underline decoration-line underline-offset-4 hover:text-lilac" href="/about#corrections">
              Corrections
            </a>
            <Link className="font-semibold underline decoration-line underline-offset-4 hover:text-lilac" to="/advertise">
              Advertise with us
            </Link>
            <a className="underline decoration-line underline-offset-4 hover:text-lilac" href="https://www.helenplum.org/">
              Helen Plum Library
            </a>
            <a className="underline decoration-line underline-offset-4 hover:text-lilac" href="https://villageoflombard.org/">
              Village of Lombard
            </a>
            <a className="underline decoration-line underline-offset-4 hover:text-lilac" href="http://www.lombardlilactime.com">
              Lilac Time
            </a>
            <a
              className="underline decoration-line underline-offset-4 hover:text-lilac"
              href="https://www.lombardhistory.org/peckhomestead"
            >
              Peck Homestead
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

function SubscribeButton() {
  const ready = useHydrated();
  const on = useClips((state) => state.paper);

  return (
    <Link
      to="/subscribe"
      className="inline-flex min-h-11 items-center bg-lilac px-4 text-sm font-semibold text-paper"
    >
      {ready && on ? "Subscribed" : "Subscribe"}
    </Link>
  );
}

import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { useClips, useHydrated } from "@/lib/clips";
import { SUBSCRIBE_ENDPOINT } from "@/lib/site";

export const Route = createFileRoute("/subscribe")({
  head: () => ({
    meta: [{ title: "Subscribe — The Lilac Post" }],
  }),
  component: SubscribePage,
});

type Status = "idle" | "sending" | "done" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function SubscribePage() {
  const ready = useHydrated();
  const signedUpHere = useClips((state) => state.paper);
  const markSignedUp = useClips((state) => state.subscribePaper);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [honey, setHoney] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [another, setAnother] = useState(false);

  const cleanEmail = email.trim();
  const valid = EMAIL_PATTERN.test(cleanEmail);
  const showDone = status === "done" || (ready && signedUpHere && !another && status === "idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!valid || status === "sending") return;
    setStatus("sending");
    setError(null);
    try {
      const response = await fetch(SUBSCRIBE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: cleanEmail,
          ...(name.trim() ? { name: name.trim() } : {}),
          _subject: "New Lilac Post subscriber",
          _template: "table",
          _captcha: "false",
          _honey: honey,
        }),
      });
      const data = (await response.json().catch(() => ({}))) as {
        success?: string | boolean;
        message?: string;
      };
      if (!response.ok || String(data.success) === "false") {
        throw new Error(data.message || "Subscription failed");
      }
      markSignedUp();
      setStatus("done");
      setAnother(false);
      setEmail("");
      setName("");
    } catch {
      setStatus("error");
      setError("That didn’t go through. Check your connection and try again in a minute.");
    }
  }

  return (
    <Shell>
      <p className="text-xs font-semibold tracking-widest text-lilac uppercase">The Lilac Post</p>
      <h1 className="mt-2 font-display text-4xl text-ink sm:text-5xl">Subscribe</h1>
      <p className="mt-3 max-w-xl text-lg text-fg">
        Leave your email and the editor will add you to The Lilac Post’s reader list.
      </p>

      <div className="mt-6 max-w-md border border-line bg-paper p-5">
        {showDone ? (
          <div role="status" aria-live="polite">
            <p className="font-semibold text-ink">You’re on the list.</p>
            <p className="mt-2 text-sm text-muted">
              {status === "done"
                ? "Your address went to the editor. Thanks for reading."
                : "You signed up from this device earlier."}
            </p>
            <button
              type="button"
              onClick={() => {
                setStatus("idle");
                setAnother(true);
              }}
              className="mt-4 inline-flex min-h-11 items-center border border-line px-4 text-sm font-semibold text-ink"
            >
              Sign up another address
            </button>
          </div>
        ) : (
          <form onSubmit={(event) => void handleSubmit(event)} noValidate>
            <label htmlFor="subscribe-email" className="block text-sm font-semibold text-ink">
              Email
            </label>
            <input
              id="subscribe-email"
              type="email"
              name="email"
              autoComplete="email"
              inputMode="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={status === "sending"}
              className="mt-1 w-full border border-line bg-paper px-3 py-3 text-base text-fg"
            />

            <label htmlFor="subscribe-name" className="mt-4 block text-sm font-semibold text-ink">
              Name <span className="font-normal text-muted">(optional)</span>
            </label>
            <input
              id="subscribe-name"
              type="text"
              name="name"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              disabled={status === "sending"}
              className="mt-1 w-full border border-line bg-paper px-3 py-3 text-base text-fg"
            />

            {/* Honeypot: hidden from people, filled in by some bots. FormSubmit drops submissions that fill it. */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor="subscribe-honey">Leave this empty</label>
              <input
                id="subscribe-honey"
                type="text"
                name="_honey"
                tabIndex={-1}
                autoComplete="off"
                value={honey}
                onChange={(event) => setHoney(event.target.value)}
              />
            </div>

            <div aria-live="polite">
              {status === "error" && error ? (
                <p className="mt-4 text-sm font-semibold text-ink">{error}</p>
              ) : null}
            </div>

            <button
              type="submit"
              disabled={!valid || status === "sending"}
              className="mt-5 inline-flex min-h-11 items-center bg-lilac px-4 text-sm font-semibold text-paper disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Subscribe"}
            </button>
          </form>
        )}

        <p className="mt-5 text-sm text-muted">
          Your address goes only to the editor of The Lilac Post. It isn’t sold or shared. There’s
          no set email schedule yet. To come off the list, reply to any email from the paper and say
          so.
        </p>
      </div>

      <div className="mt-8 max-w-md">
        <p className="text-sm font-semibold text-ink">Always free to read here:</p>
        <ul className="mt-2 space-y-3 text-fg">
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
      </div>
    </Shell>
  );
}

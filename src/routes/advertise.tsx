import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { ADVERTISE_ENDPOINT } from "@/lib/site";

export const Route = createFileRoute("/advertise")({
  head: () => ({
    meta: [
      { title: "Advertise with us — The Lilac Post" },
      {
        name: "description",
        content:
          "Reach Lombard readers with a weekend sponsorship, a featured business listing, or a sponsored event listing in The Lilac Post.",
      },
    ],
  }),
  component: AdvertisePage,
});

const OPTIONS = [
  {
    id: "weekend",
    title: "Weekend in Lombard sponsor",
    detail:
      "One business sponsors the weekend listings for the week. Your name, a short line, and a link sit alongside what’s on around the village.",
  },
  {
    id: "listing",
    title: "Featured business listing",
    detail:
      "A featured spot for your business among the places neighbors use, with your hours, address, and a link.",
  },
  {
    id: "event",
    title: "Sponsored event listing",
    detail:
      "Put your event on the paper’s calendar with extra room for details. It’s marked as sponsored so readers know.",
  },
] as const;

type OptionId = (typeof OPTIONS)[number]["id"] | "not-sure";

const OPTION_LABELS: Record<OptionId, string> = {
  weekend: "Weekend in Lombard sponsor",
  listing: "Featured business listing",
  event: "Sponsored event listing",
  "not-sure": "Not sure yet",
};

type Status = "idle" | "sending" | "done" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INPUT = "mt-1 w-full border border-line bg-paper px-3 py-3 text-base text-fg";
const LABEL = "mt-4 block text-sm font-semibold text-ink";

function AdvertisePage() {
  const [business, setBusiness] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [option, setOption] = useState<OptionId>("weekend");
  const [message, setMessage] = useState("");
  const [honey, setHoney] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const cleanEmail = email.trim();
  const valid = business.trim() !== "" && contact.trim() !== "" && EMAIL_PATTERN.test(cleanEmail);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!valid || status === "sending") return;
    setStatus("sending");
    setError(null);
    try {
      const response = await fetch(ADVERTISE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          business: business.trim(),
          name: contact.trim(),
          email: cleanEmail,
          ...(phone.trim() ? { phone: phone.trim() } : {}),
          option: OPTION_LABELS[option],
          message: message.trim(),
          _subject: "Lilac Post advertising inquiry",
          _replyto: cleanEmail,
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
        throw new Error(data.message || "Inquiry failed");
      }
      setStatus("done");
      setBusiness("");
      setContact("");
      setEmail("");
      setPhone("");
      setOption("weekend");
      setMessage("");
    } catch {
      setStatus("error");
      setError("That didn’t go through. Check your connection and try again in a minute.");
    }
  }

  const sending = status === "sending";

  return (
    <Shell>
      <div className="mx-auto max-w-2xl">
        <p className="text-xs font-semibold tracking-widest text-lilac uppercase">The Lilac Post</p>
        <h1 className="mt-2 font-display text-4xl text-ink sm:text-5xl">Advertise with us</h1>
        <p className="mt-4 text-lg leading-relaxed text-fg">
          The Lilac Post is a neighborhood paper for Lombard. People read it for what’s happening in
          the village this week — the news, the calendar, and the places around town. Sponsoring the
          paper puts your business in front of those neighbors, right next to the local news they
          came for.
        </p>
        <p className="mt-3 text-lg leading-relaxed text-fg">
          We keep it small and local: a few clearly labeled spots, no pop-ups, and nothing that gets
          in the way of reading.
        </p>

        <section className="mt-10" aria-labelledby="options">
          <h2 id="options" className="font-display text-3xl text-ink">
            Ways to sponsor
          </h2>
          <ul className="mt-3 divide-y divide-line border-y border-line">
            {OPTIONS.map((item) => (
              <li key={item.id} className="py-4">
                <h3 className="font-display text-2xl text-ink">{item.title}</h3>
                <p className="mt-1 text-fg">{item.detail}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-semibold text-ink">Get in touch for rates.</p>
        </section>

        <section className="mt-10 border-l-4 border-lilac bg-paper p-4" aria-labelledby="ethics">
          <h2 id="ethics" className="text-sm font-semibold tracking-widest text-muted uppercase">
            Our promise to readers
          </h2>
          <p className="mt-2 text-fg">
            Sponsored content is always labeled “Sponsored.” Sponsors don’t influence what we cover
            or how we cover it, and nobody outside the paper approves stories before they run. More
            in{" "}
            <Link
              to="/about"
              hash="independence"
              className="font-semibold text-lilac underline decoration-line underline-offset-4"
            >
              About the paper
            </Link>
            .
          </p>
        </section>

        <section className="mt-10" aria-labelledby="inquire">
          <h2 id="inquire" className="font-display text-3xl text-ink">
            Ask about sponsoring
          </h2>
          <p className="mt-2 text-fg">
            Tell us a little about your business and the editor will reply by email.
          </p>

          <div className="mt-4 border border-line bg-paper p-5">
            {status === "done" ? (
              <div role="status" aria-live="polite">
                <p className="font-semibold text-ink">Thanks — your note is on its way.</p>
                <p className="mt-2 text-sm text-muted">
                  The editor will reply to the email you gave.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-4 inline-flex min-h-11 items-center border border-line px-4 text-sm font-semibold text-ink"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={(event) => void handleSubmit(event)} noValidate>
                <label htmlFor="ad-business" className="block text-sm font-semibold text-ink">
                  Business name
                </label>
                <input
                  id="ad-business"
                  type="text"
                  name="business"
                  autoComplete="organization"
                  required
                  value={business}
                  onChange={(event) => setBusiness(event.target.value)}
                  disabled={sending}
                  className={INPUT}
                />

                <label htmlFor="ad-contact" className={LABEL}>
                  Your name
                </label>
                <input
                  id="ad-contact"
                  type="text"
                  name="name"
                  autoComplete="name"
                  required
                  value={contact}
                  onChange={(event) => setContact(event.target.value)}
                  disabled={sending}
                  className={INPUT}
                />

                <label htmlFor="ad-email" className={LABEL}>
                  Email
                </label>
                <input
                  id="ad-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  inputMode="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  disabled={sending}
                  className={INPUT}
                />

                <label htmlFor="ad-phone" className={LABEL}>
                  Phone <span className="font-normal text-muted">(optional)</span>
                </label>
                <input
                  id="ad-phone"
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  inputMode="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  disabled={sending}
                  className={INPUT}
                />

                <label htmlFor="ad-option" className={LABEL}>
                  What are you interested in?
                </label>
                <select
                  id="ad-option"
                  name="option"
                  value={option}
                  onChange={(event) => setOption(event.target.value as OptionId)}
                  disabled={sending}
                  className={INPUT}
                >
                  {(Object.keys(OPTION_LABELS) as OptionId[]).map((id) => (
                    <option key={id} value={id}>
                      {OPTION_LABELS[id]}
                    </option>
                  ))}
                </select>

                <label htmlFor="ad-message" className={LABEL}>
                  Message
                </label>
                <textarea
                  id="ad-message"
                  name="message"
                  rows={5}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  disabled={sending}
                  className={INPUT}
                />

                {/* Honeypot: hidden from people, filled in by some bots. FormSubmit drops submissions that fill it. */}
                <div
                  aria-hidden="true"
                  className="absolute -left-[9999px] h-px w-px overflow-hidden"
                >
                  <label htmlFor="ad-honey">Leave this empty</label>
                  <input
                    id="ad-honey"
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
                  disabled={!valid || sending}
                  className="mt-5 inline-flex min-h-11 items-center bg-lilac px-4 text-sm font-semibold text-paper disabled:opacity-60"
                >
                  {sending ? "Sending…" : "Send inquiry"}
                </button>
              </form>
            )}
            <p className="mt-5 text-sm text-muted">
              Your details go only to the editor of The Lilac Post and are used only to reply to
              you.
            </p>
          </div>
        </section>
      </div>
    </Shell>
  );
}

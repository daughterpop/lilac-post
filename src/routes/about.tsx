import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { CONTACT_EMAIL } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About the paper — The Lilac Post" },
      {
        name: "description",
        content: "What The Lilac Post is, who it answers to, how corrections work, and how to reach the paper.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <Shell>
      <article className="mx-auto max-w-2xl">
        <p className="text-xs font-semibold tracking-widest text-lilac uppercase">The Lilac Post</p>
        <h1 className="mt-2 font-display text-4xl text-ink sm:text-5xl">About the paper</h1>

        <section className="mt-6 space-y-4 text-lg leading-relaxed" aria-labelledby="what">
          <h2 id="what" className="font-display text-2xl text-ink">
            What this is
          </h2>
          <p>
            The Lilac Post is a neighborhood paper for Lombard, Illinois. We publish short breaking-news items, a
            weekly set of longer stories, a calendar of what’s happening around the village, and a guide to local
            parks, landmarks, and other favorite spots.
          </p>
          <p>
            We follow the village, the parks, the library, the schools, and the parishes closely, so you don’t
            have to. Every story links to where its facts came from, and every calendar entry links to the host,
            so you’re always one tap from the details.
          </p>
        </section>

        <section className="mt-10 space-y-4 text-lg leading-relaxed" aria-labelledby="independence">
          <h2 id="independence" className="font-display text-2xl text-ink">
            Independence
          </h2>
          <p>
            The Lilac Post is independent. It is not published by, and does not speak for, the Village of Lombard,
            the Lombard Park District, Helen M. Plum Memorial Library, any school district, any parish, the Lombard
            Area Chamber of Commerce, or any business.
          </p>
          <p>
            Nobody outside the paper approves stories before they run. We don’t take payment in exchange for
            coverage. Local businesses can{" "}
            <Link to="/advertise" className="font-semibold text-lilac underline decoration-line underline-offset-4">
              sponsor the paper
            </Link>
            , and anything sponsored is always labeled “Sponsored.” Sponsors don’t influence what we cover or how we
            cover it.
          </p>
        </section>

        <section className="mt-10 space-y-4 text-lg leading-relaxed" aria-labelledby="corrections">
          <h2 id="corrections" className="font-display text-2xl text-ink">
            Corrections
          </h2>
          <p>
            When we get something wrong, we fix it and say so. A corrected story keeps a dated note at the bottom
            explaining what changed. We don’t quietly rewrite the record.
          </p>
          <p>
            If you spot a mistake, email{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-semibold text-lilac underline decoration-line underline-offset-4"
            >
              {CONTACT_EMAIL}
            </a>{" "}
            and tell us what it is and, if you can, where the right information lives. We’ll check it against the
            source and update the story or the calendar.
          </p>
        </section>

        <section className="mt-10 space-y-4 text-lg leading-relaxed" aria-labelledby="contact">
          <h2 id="contact" className="font-display text-2xl text-ink">
            Contact
          </h2>
          <p>
            Tips, corrections, and event listings:{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-semibold text-lilac underline decoration-line underline-offset-4"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
          <p>
            For village services, event registration, or library accounts, please contact the village, the event
            host, or the library directly. We can’t help with those.
          </p>
        </section>

        <p className="mt-10">
          <Link to="/" className="inline-flex min-h-11 items-center font-semibold text-lilac">
            Back to the front page
          </Link>
        </p>
      </article>
    </Shell>
  );
}

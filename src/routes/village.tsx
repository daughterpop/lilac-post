import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { places } from "@/data/places";
import { PorchNotes } from "@/components/porch-notes";
import { Shell } from "@/components/shell";

export const Route = createFileRoute("/village")({
  head: () => ({
    meta: [{ title: "About Lombard — The Lilac Post" }],
  }),
  component: VillagePage,
});

const STORY_MAP =
  "https://lombardpw.maps.arcgis.com/apps/MapTour/index.html?appid=7db1c3c3da5c49bd8c31cbec2ae43736";

function VillagePage() {
  return (
    <Shell>
      <p className="text-xs font-semibold tracking-widest text-lilac uppercase">The Lilac Village</p>
      <h1 className="mt-2 font-display text-4xl text-ink sm:text-5xl">About Lombard</h1>
      <p className="mt-3 max-w-xl text-lg text-fg">
        A map of the places people actually use, and the history that explains the name. Not the village’s
        own site.
      </p>

      <section className="mt-8">
        <h2 className="font-display text-3xl text-ink">The map</h2>
        <p className="mt-2 max-w-xl text-fg">
          Downtown, from the Prairie Path south through Lilacia and the library. The names jump to each
          place. The village and the historical society also built a story map for the 150th.
        </p>
        <div className="mt-4 overflow-hidden border border-line bg-paper">
          <iframe
            title="Map of downtown Lombard"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-88.028%2C41.868%2C-87.988%2C41.892&layer=mapnik"
            className="h-72 w-full sm:h-96"
          />
        </div>
        <p className="mt-2 text-sm text-muted">
          <a className="font-semibold text-lilac" href={STORY_MAP}>
            Village story map
          </a>
          <span> · 2019, with the historical society</span>
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {places.map((place) => (
            <li key={place.id}>
              <a
                href={`#${place.id}`}
                className="inline-flex min-h-11 items-center border border-line bg-paper px-3 text-sm font-semibold text-ink hover:text-lilac"
              >
                {place.name}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 max-w-2xl">
        <h2 className="font-display text-3xl text-ink">A short history</h2>
        <p className="mt-3 text-fg">
          After the Black Hawk War, New Englanders settled along St. Charles Road and the DuPage River. Ralph
          and Morgan Babcock were among the first. By 1834 the place was called Babcock’s Grove. The Galena
          and Chicago Union Railroad put a station here in 1849. Josiah Lombard, a Chicago banker, platted
          the town in 1868. Babcock’s Grove was incorporated as the Village of Lombard on March 29, 1869.
        </p>
        <p className="mt-3 text-fg">
          Sheldon and Harriet Peck came in 1837. Their house at 355 E. Parkside, finished in 1839, is still
          the oldest in town and still on its original ground. Peck was a portrait painter and an
          abolitionist. The homestead is a verified stop on the Underground Railroad. The historical society
          runs it.
        </p>
        <p className="mt-3 text-fg">
          Colonel William Plum and his wife Helen built the lilac collection. They named the estate Lilacia.
          The park district says he left the gardens to the people as a public park and the house, in Helen’s
          memory, as a free library. He died in 1927. That September the town voted to accept the gift, and
          the Lombard Park District began. Jens Jensen designed the garden that is now Lilacia Park. The
          lilacs are why the nickname stuck.
        </p>
        <p className="mt-3 text-fg">
          Two other names the society prints: in 1891 attorney Ellen Martin voted here, the first woman to
          vote in Illinois, because the charter said residents over 21 and never said men. And Harold Gray,
          who drew Little Orphan Annie starting in 1924, lived in Lombard.
        </p>
        <p className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold">
          <a className="inline-flex min-h-11 items-center text-lilac" href="https://www.lombardhistory.org/localhistory">
            Historical society
          </a>
          <a className="inline-flex min-h-11 items-center text-lilac" href="https://lombardparks.com/history-lilacs/">
            Park district, on the lilacs
          </a>
          <a className="inline-flex min-h-11 items-center text-lilac" href="https://www.lombardchamber.com/history">
            Chamber history
          </a>
          <a
            className="inline-flex min-h-11 items-center text-lilac"
            href="https://www.lombardhistory.org/peckhomestead"
          >
            Peck Homestead
          </a>
        </p>
      </section>

      <ul className="mt-12 divide-y divide-line border-t border-line">
        {places.map((place) => (
          <li id={place.id} key={place.id} className="grid scroll-mt-24 gap-2 py-5 sm:grid-cols-12">
            <div className="sm:col-span-4">
              <p className="text-xs font-semibold tracking-widest text-lilac uppercase">{place.kind}</p>
              <h2 className="mt-1 font-display text-2xl text-ink">{place.name}</h2>
              <p className="mt-1 flex items-start gap-1.5 text-sm text-muted">
                <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                {place.where}
              </p>
            </div>
            <div className="sm:col-span-8">
              <p className="text-fg">{place.detail}</p>
              <p className="mt-2 flex flex-wrap gap-x-4">
                {place.href ? (
                  <a
                    href={place.href}
                    className="inline-flex min-h-11 items-center text-sm font-semibold text-lilac"
                  >
                    {place.hrefLabel ?? "Details"}
                  </a>
                ) : null}
                <a
                  href={`https://www.openstreetmap.org/search?query=${encodeURIComponent(`${place.name} Lombard Illinois`)}`}
                  className="inline-flex min-h-11 items-center text-sm font-semibold text-lilac"
                >
                  On the map
                </a>
              </p>
            </div>
          </li>
        ))}
      </ul>

      <section className="mt-10 max-w-2xl border border-line bg-paper p-5">
        <h2 className="font-display text-2xl text-ink">The parishes</h2>
        <p className="mt-2 text-fg">
          Mass times, Knights meetings, and what the bulletins actually dated are on their own page.
        </p>
        <Link to="/parish" className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-lilac">
          Catholic corner
        </Link>
      </section>

      <section className="mt-10 max-w-2xl border border-line bg-paper p-5">
        <h2 className="font-display text-2xl text-ink">Who runs the lilacs</h2>
        <p className="mt-2 text-fg">
          Cruise Nights are the Village of Lombard, presented by Tommy’s Express Car Wash. The 2026 season
          was the 27th, and it was free. Ten Saturdays, June 13 through August 22, on South Park Avenue, 6 to
          10 p.m., with music from 6 to 9. Classic cars ran through August 15. August 22 was a concert only:
          Hi Infidelity, 6 to 9, stage on St. Charles just west of Main, chairs after 4, no cars. Kids’ Corner
          was Keeley’s Plumbing and Christopher B. Burke Engineering. Next year’s dates are not posted.
        </p>
        <p className="mt-3 text-fg">
          The parade is the Lombard Lilac Parade Committee, a separate group since 1929. Phone (630)
          415-2079. P.O. Box 82. In 2026 it stepped off Sunday, May 17, at 1:30 p.m., from Glenbard East,
          1014 S. Main. The theme was “Happy 250th Birthday America.” The village posted the parking rules
          for that afternoon. The committee’s next printed date is a marshall safety meeting, May 13, 2027,
          at 7 p.m., at the Log Cabin. The page does not give a street, and it does not give a 2027 parade
          date.
        </p>
        <p className="mt-3 text-fg">
          The queen and the princesses are the Lombard Junior Women’s Club, since 2001. Five princesses,
          $1,500 each, from a village tourism grant. The crowning is the first Saturday in May. In 2026 that
          was May 2, 1 p.m., at Lilacia Park. The club’s page names 2025 queen Marisa Olas and does not name
          the 2026 queen. The same club is taking new socks through Nov. 2 and is one of the groups at
          Pumpkin Smash.
        </p>
        <a
          href="https://villageoflombard.org/cruisenights"
          className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-lilac"
        >
          Cruise Nights
        </a>
      </section>

      <div className="mt-10 max-w-xl">
        <PorchNotes />
      </div>
    </Shell>
  );
}

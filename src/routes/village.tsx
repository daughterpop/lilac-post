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
        A guide to the parks, landmarks, and local spots worth knowing, plus a short history of how Lombard
        became the Lilac Village.
      </p>

      <section className="mt-8">
        <h2 className="font-display text-3xl text-ink">The map</h2>
        <p className="mt-2 max-w-xl text-fg">
          Downtown, from the Prairie Path south through Lilacia Park and the library. Tap a name below to
          jump to that spot. The village and the historical society also made a story map for Lombard’s
          150th anniversary.
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
          He left the gardens to the people as a public park and the house, in Helen’s memory, as a free
          library. He died in 1927. That September the town voted to accept the gift, and
          the Lombard Park District began. Jens Jensen designed the garden that is now Lilacia Park. The
          lilacs are why the nickname stuck.
        </p>
        <p className="mt-3 text-fg">
          Two more Lombard firsts worth bragging about: in 1891 attorney Ellen Martin voted here, the first woman to
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
          Mass times, Knights of Columbus meetings, and parish events have their own page.
        </p>
        <Link to="/parish" className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-lilac">
          Catholic corner
        </Link>
      </section>

      <section className="mt-10 max-w-2xl border border-line bg-paper p-5">
        <h2 className="font-display text-2xl text-ink">Our summer traditions</h2>
        <p className="mt-2 text-fg">
          Summer Saturdays mean Cruise Nights: classic cars lined up on South Park Avenue, live music, and
          half the town out for a stroll. The free series, hosted by the village, wrapped its 27th season in
          August with a concert under the stars on St. Charles. Dates for next summer will be on the calendar
          as soon as they’re set.
        </p>
        <p className="mt-3 text-fg">
          Every May, the Lilac Parade rolls down Main Street, as it has since 1929. This year’s stepped off
          from Glenbard East on a Sunday afternoon in May with a “Happy 250th Birthday America” theme. Watch
          this space for the 2027 date.
        </p>
        <p className="mt-3 text-fg">
          Before the parade comes the crowning of the Lilac Queen and her court in Lilacia Park, on the first
          Saturday in May. The Lombard Junior Women’s Club has run it since 2001, with each princess receiving
          a $1,500 award. This fall the club is collecting new socks for neighbors in need through Nov. 2.
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

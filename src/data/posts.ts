import type { Post } from "@/data/types";

export const posts: Post[] = [
  {
    slug: "st-regis-fire",
    title: "A fire on St. Regis Drive",
    dek: "The village says a resident died after a Friday-night fire in one apartment. The cause is still open.",
    date: "2026-10-04",
    desk: "Village",
    order: 0,
    body: [
      "On Friday, Oct. 2, at about 9:52 p.m., the Lombard Fire Department was sent to St. Regis Drive for a fire in a multi-family building. Dispatch told crews, while they were still on the way, that smoke was coming from a unit and that a resident might be inside.",
      "The first crew arrived at 9:55 p.m. Firefighters put the fire down, first with an extinguisher and then with a hose line, and searchers brought the resident out to paramedics. The fire was out by about 10:20 p.m. and stayed in the unit where it started. Neighboring apartments were evacuated and searched. One resident was displaced.",
      "The resident was taken to Advocate Good Samaritan Hospital in critical condition and later died. The Lombard fire investigation unit responded with the DuPage County fire investigators’ task force and the Office of the Illinois State Fire Marshal. The cause is under investigation. Police are investigating the death with help from the DuPage County MERIT forensic unit.",
      "The village alert center listed no active alerts on Sunday morning. For official updates, rely on the village’s release rather than secondhand reports.",
    ],
    sources: [
      {
        name: "Village of Lombard",
        href: "https://villageoflombard.org/m/newsflash/Home/Detail/1129",
      },
      { name: "Village alert center", href: "https://www.villageoflombard.org/AlertCenter.aspx" },
    ],
  },
  {
    slug: "sunday-at-the-plum",
    title: "Sunday at the Plum",
    dek: "Guitar at 2, storytime in Lilacia at 5, and Chicago playing Gotham at 6.",
    date: "2026-10-03",
    desk: "Library",
    order: 0,
    body: [
      "Helen Plum Library, 411 South Main, has a full Sunday on October 4.",
      "Family storytime is at 9:30 a.m. Preschool storytime, for ages 3–4 with an adult, is at 10:30. Studio 411 is open for drop-in making from 10 a.m. to 8 p.m. if someone in the house would rather sew, cut, or record than sit.",
      "At 2 p.m. in the meeting rooms, classical guitarist Peter Fletcher plays Bach, Fernando Sor, Gaspar Sanz, and more. The library lists it as the Sunday Music Series. It asks adults and seniors to register.",
      "The day goes back outside at 5: evening storytime in Lilacia Park, drop-in, all ages. At 6, Kelli Marshall talks through Chicago’s turn as Gotham in The Dark Knight. Teen Advisory Board meets at 3 for grades 6–12, and a Helen Plum card is required.",
      "Sunday hours, if you are only there for the stacks, are 1 to 5. Monday through Friday the building runs 9 to 9, Saturday 9 to 5. A few of Sunday’s programs fill, so check helenplum.org before you promise the 2 o’clock to anyone.",
    ],
    sources: [{ name: "Helen Plum Library", href: "https://www.helenplum.org/events/upcoming" }],
  },
  {
    slug: "last-tuesday-under-the-arch",
    title: "One last Tuesday under the Arch",
    dek: "The farmers market closes the 2026 season October 6, with Inversion Jazz Band at Park and St. Charles.",
    date: "2026-10-03",
    desk: "Market",
    order: 1,
    image: "/images/lincoln-square-market.webp",
    imageAlt: "Peaches and green and red grapes stacked on a farmers market table, with shoppers behind.",
    imageCaption:
      "Peaches and grapes at a farmers market stand. Representative photo, taken at Chicago’s Lincoln Square Farmers Market, not the Lombard market.",
    imageCredit: {
      text: "Photo: Tony Bailey / Wikimedia Commons, CC BY 2.0",
      href: "https://commons.wikimedia.org/wiki/File:Lincoln_Square_Farmers_Market.jpg",
    },
    body: [
      "The 2026 Lombard Farmers Market has one Tuesday left. October 6, 3 to 7 p.m., under the Arch at South Park Avenue and West St. Charles Road.",
      "Inversion Jazz Band closes out the season’s music lineup. The chamber’s season ran every Tuesday from May 19, with Great American Exteriors as presenting sponsor. The tables are the mix neighbors already know: produce, honey, tamales, gelato, kettle corn, kolaczki, olive oil, lemonade, and a shared spotlight for a chamber business and a nonprofit.",
      "If the train is how you arrive, this is the week to get off and walk. After the 6th the Arch goes quiet until next May.",
    ],
    sources: [
      { name: "Lombard Area Chamber of Commerce", href: "https://www.lombardchamber.com/farmers-market" },
    ],
  },
  {
    slug: "senior-fair-twenty",
    title: "The Senior Fair turns twenty",
    dek: "Wednesday morning at Madison Meadow: screenings, programs, and the village’s annual gathering for older neighbors.",
    date: "2026-10-03",
    desk: "Village",
    order: 2,
    body: [
      "The Village’s Senior Fair is Wednesday, October 7, from 9 a.m. to 1 p.m. at the Madison Meadow Athletic Center. This year is the 20th.",
      "The village describes the morning as resources, health screenings, and community programs for older residents. The village’s listing doesn’t mention tickets, so plan to just show up.",
      "If you are taking a parent, or you are the one who should go, Wednesday is the useful morning this week.",
    ],
    sources: [{ name: "Village of Lombard calendar", href: "https://villageoflombard.org/calendar.aspx" }],
  },
  {
    slug: "lilacia-after-the-bloom",
    title: "Lilacia, after the bloom",
    dek: "The park is free, dawn to dusk. The lilacs are done for the year. The paths are not.",
    date: "2026-09-28",
    desk: "Park",
    order: 0,
    image: "/images/lilacia-park-autumn.webp",
    imageAlt: "The arched Lilacia Park sign over a brick path, with trees in fall color and two people walking in.",
    imageCaption: "The Lilacia Park entrance arch in October, long after the lilacs have finished.",
    imageCredit: {
      text: "Photo: Daniel X. O’Neil / Flickr, CC BY 2.0",
      href: "https://www.flickr.com/photos/36521980095@N01/15014226963/",
    },
    body: [
      "Lilacia Park is open every day from dawn to dusk, and the village does not charge to walk in. The park’s address is 150 South Park Avenue.",
      "Lilac Time 2026 ran May 1 through May 17. October is lawn, brick, and whatever the gardeners left standing. With the library now at 411 South Main, the park district has fenced the old corner at Maple and Park as open green space, and said that land is meant to fold into the park.",
      "Colonel William R. Plum and his wife Helen built the collection. The library carries her name. The park is still why people from outside DuPage know the word Lombard.",
      "If you want company rather than a quiet loop, the library is hosting evening storytime in the park on Sunday, October 4, at 5.",
    ],
    sources: [
      { name: "Lilac Time", href: "http://www.lombardlilactime.com" },
      { name: "Helen Plum Library", href: "https://www.helenplum.org/events/upcoming" },
    ],
  },
  {
    slug: "prairie-path-october",
    title: "The Prairie Path, while the light is still long",
    dek: "Crushed limestone, a flat line through town, and a canopy that will not last the month.",
    date: "2026-09-20",
    desk: "Outdoors",
    order: 0,
    image: "/images/prairie-path-glen-ellyn.webp",
    imageAlt: "A crushed-limestone trail covered in fallen yellow leaves under a canopy of trees.",
    imageCaption: "The Illinois Prairie Path in October, just west of Lombard in Glen Ellyn.",
    imageCredit: {
      text: "Photo: Cole Jackson / Flickr, public domain",
      href: "https://www.flickr.com/photos/192165560@N04/51686693127/",
    },
    body: [
      "The Illinois Prairie Path crosses Lombard on the old Chicago, Aurora & Elgin right-of-way. It is crushed limestone, flat, and honest about the weather. In October the canopy is the reason to go — gold over the trail before the path goes gray.",
      "Toward Villa Park and Elmhurst one way, Glen Ellyn and Wheaton the other, you can ride without living on St. Charles Road the whole time. The Great Western Trail is a different trail, farther north, so don’t mix the two up on a map.",
      "Sunday’s Crop Hunger Walk uses the name Great Prairie Trail and steps off from First Church of Lombard at 220 South Main. That’s an organized church walk, not the everyday trail.",
    ],
    sources: [{ name: "Village of Lombard calendar", href: "https://villageoflombard.org/calendar.aspx" }],
  },
  {
    slug: "peck-homestead",
    title: "The oldest house on Parkside",
    dek: "Sheldon Peck’s 1839 homestead is still on its original ground, and it is a verified stop on the Underground Railroad.",
    date: "2026-09-12",
    desk: "History",
    order: 0,
    body: [
      "The oldest house in Lombard is still where it was built: the Sheldon Peck Homestead, 355 East Parkside Avenue, at the southwest corner of St. Charles Road and Grace Street. Parking is off Parkside. The museum is free, with a suggested five-dollar donation to the historical society.",
      "Sheldon and Harriet Peck came to Babcock’s Grove in 1837 and finished the house in 1839. Sheldon was a folk portrait painter and an abolitionist. The homestead is on the National Park Service Network to Freedom as a verified Underground Railroad station. Family lived there until the late 1990s. It has been a public museum, run by the Lombard Historical Society, since 1999.",
      "The society’s Tales + Tombstones walks were at Lombard Cemetery on October 2 and 3, 6 to 8 p.m., ages 12 and up. If you missed the flashlights, the house on Parkside is the visit that stays open.",
    ],
    sources: [
      { name: "Lombard Historical Society", href: "https://www.lombardhistory.org/peckhomestead" },
    ],
  },
  {
    slug: "how-the-village-got-its-lilacs",
    title: "How the village got its lilacs",
    dek: "Babcock’s Grove, Colonel Plum’s garden, and a May that still organizes the year.",
    date: "2026-05-01",
    desk: "Village",
    order: 0,
    body: [
      "Before it was Lombard it was Babcock’s Grove. The lilacs came later, with Colonel Plum’s collection, and they stuck. Lilacia Park is the estate garden. Lilac Time is the festival that still brackets early May. In 2026 that was May 1 through May 17, parade included. Helen Plum Library, now at 411 South Main, is named for the colonel’s wife.",
      "People here say Lilac Village because the park put the town on the map. In October that can feel like a coat in the closet. It is still the right name. The paths are open when the flowers are not.",
      "Next May the Bloom-o-Meter comes back, and so does the crowd. Until then the useful map is simpler: park, library, Arch, path, and the house on Parkside.",
    ],
    sources: [{ name: "Lilac Time", href: "http://www.lombardlilactime.com" }],
  },
  {
    slug: "off-the-train",
    title: "Off the train and onto St. Charles",
    dek: "The Union Pacific West stop puts you right in the middle of downtown’s best walk.",
    date: "2026-08-15",
    desk: "Outdoors",
    order: 1,
    image: "/images/lombard-metra-station.webp",
    imageAlt: "The red-brick Lombard Metra station with its clock tower, beside the platform and tracks at dusk.",
    imageCaption: "Lombard’s Metra station on the Union Pacific West line, a short walk from St. Charles Road.",
    imageCredit: {
      text: "Photo: Jacob J Mackenzie / Wikimedia Commons, CC BY-SA 4.0",
      href: "https://commons.wikimedia.org/wiki/File:Lombard_Metra_Station_bldg_2023-10-01.jpg",
    },
    body: [
      "Lombard station is on Metra’s Union Pacific West line, downtown at St. Charles Road. From the platform, the rest of downtown is a short walk.",
      "The Arch, and the farmers market when it is on, sit at Park and St. Charles. Lilacia is a few blocks south on Park. Helen Plum is at 411 South Main. The Peck Homestead is east on St. Charles at Grace.",
      "You can do library, park, and a loop without a car when the train behaves. The UP-West isn’t always on time, but the station couldn’t be better placed. Check Metra before you leave the house.",
    ],
    sources: [{ name: "Metra", href: "https://metra.com/" }],
  },
];

export function allPosts() {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date) || a.order - b.order);
}

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function relatedPosts(slug: string) {
  const current = getPost(slug);
  if (!current) return [];
  const same = allPosts().filter((post) => post.slug !== slug && post.desk === current.desk);
  const rest = allPosts().filter((post) => post.slug !== slug && post.desk !== current.desk);
  return [...same, ...rest].slice(0, 3);
}

export type Wire = {
  id: string;
  desk: string;
  title: string;
  detail: string;
  when: string;
  href: string;
  hrefLabel: string;
};

export const wires: Wire[] = [
  {
    id: "fire",
    desk: "Village",
    title: "Fatal fire on St. Regis Drive",
    detail:
      "Friday night, Oct. 2, the fire department extinguished a fire in one unit of a multi-family building. A resident later died. The cause is under investigation. The village alert center lists no active alerts this morning.",
    when: "Oct. 3",
    href: "/dispatches/st-regis-fire",
    hrefLabel: "The dispatch",
  },
  {
    id: "alerts",
    desk: "Village",
    title: "No active village alerts",
    detail: "The Lombard alert center is clear. That can change. The page is the one to check before you assume a siren is yours.",
    when: "Oct. 4",
    href: "https://www.villageoflombard.org/AlertCenter.aspx",
    hrefLabel: "Alert center",
  },
  {
    id: "crosswalk",
    desk: "Village",
    title: "Main Street crosswalk work, Oct. 5–16",
    detail:
      "Repair just north of St. Charles Road, weather permitting. Give the block extra time if you are walking to the train or the library.",
    when: "Oct. 5",
    href: "https://villageoflombard.org/m/newsflash/Home/Detail/1127",
    hrefLabel: "Village news",
  },
  {
    id: "seniors",
    desk: "Village",
    title: "Seniors of the Year",
    detail:
      "The village named Jackie Stawiarski and Lynn Moist the 2026 Senior Woman and Senior Man of the Year for volunteer work.",
    when: "Oct. 2",
    href: "https://villageoflombard.org/m/newsflash/Home/Detail/1128",
    hrefLabel: "Village news",
  },
  {
    id: "x-open-house",
    desk: "X",
    title: "@LilacVillage on the open house",
    detail:
      "The village account posted the Oct. 7 fire open house at Station 45, 6 to 8 p.m., including the note on lithium-ion battery charging.",
    when: "Sept. 30",
    href: "https://x.com/LilacVillage/status/2105338724225859823",
    hrefLabel: "On X",
  },
  {
    id: "fb-parks",
    desk: "Facebook",
    title: "Park district thanks the Garden Club",
    detail:
      "The park district’s public Facebook page posted a thank-you to the Lombard Garden Club for a donation recognized at a board meeting.",
    when: "Oct. 3",
    href: "https://www.facebook.com/lombardparks",
    hrefLabel: "Facebook",
  },
  {
    id: "ig-history",
    desk: "Instagram",
    title: "Historical society, in public",
    detail:
      "Recent public posts on Facebook and Instagram (@lombard_history) include a remembrance of Dr. Frederick Kobisk and a look at Lilacia. Their event list is the reliable calendar.",
    when: "Oct. 4",
    href: "https://www.instagram.com/lombard_history/",
    hrefLabel: "Instagram",
  },
  {
    id: "fire-chief",
    desk: "Village",
    title: "Fire Chief Sander retires Thursday",
    detail:
      "The village says Chief Richard Sander retires Oct. 8 after 10 years in Lombard and more than 40 in the fire service. A search for the next chief is underway. The open house at Station 45 is still Wednesday.",
    when: "Sept. 24",
    href: "https://villageoflombard.org/m/newsflash/Home/Detail/1124",
    hrefLabel: "Village release",
  },
  {
    id: "york-center",
    desk: "Daily Herald",
    title: "York Center finance committee, Tuesday",
    detail:
      "A legal notice in the Daily Herald sets a York Center Park District finance committee meeting for Oct. 6 at 9 a.m., 1609 S. Luther Ave. York Center is its own district. It is not the Lombard Park District.",
    when: "Sept. 30",
    href: "https://marketplace.dailyherald.com/il/legals/notice-of-committee-meeting-fo/AC1E05EE16b6209CC10pl8A38373",
    hrefLabel: "Daily Herald",
  },
  {
    id: "catholic-corner",
    desk: "Parish",
    title: "Living Rosary, then the pets",
    detail:
      "Christ the King: the Council of Catholic Women holds a living rosary after the 11 a.m. Mass. At 1 p.m. the parish blesses pets on the bell tower plaza. Stuffed animals count.",
    when: "Oct. 4",
    href: "/parish",
    hrefLabel: "Catholic corner",
  },
  {
    id: "spooktacular",
    desk: "Chamber",
    title: "Downtown Spooktacular, Oct. 18",
    detail:
      "Noon to 5 on St. Charles Road between Main and Elizabeth. The chamber runs it: trick-or-treat at the businesses, games, a costume contest, a scavenger hunt, bounce houses, and live entertainment. For Oct. 31 the village recommends neighborhood trick-or-treat from 3 to 7. Porch light on means come up.",
    when: "Sept. 30",
    href: "https://villageoflombard.org/m/newsflash/Home/Detail/1126",
    hrefLabel: "Village news",
  },
  {
    id: "yorktown",
    desk: "Yorktown",
    title: "A free craft at JCPenney",
    detail:
      "Saturday, Oct. 10, 11 to noon, second floor near Fine Jewelry. This month’s make is a Dalmatian fireman. The second Saturday of the month. That afternoon The Reptile Den is at The Game Show, 340 Yorktown, 4:30 to 8, $20, show at 6. The arcade is hosting, not the mall. Hometown Vendor Market is in the center Oct. 23–25, Friday and Saturday 10 to 5, Sunday 11 to 5.",
    when: "Oct. 10",
    href: "https://yorktowncenter.com/events/jc-penney-kids-zone/",
    hrefLabel: "Yorktown",
  },
  {
    id: "plum-month",
    desk: "Library",
    title: "Socks, and the forest preserves",
    detail:
      "The Junior Women’s Club wants new youth and adult socks through Nov. 2. Boxes are at Helen Plum, Madison Meadow, and Sunset Knoll. Chad Wooters’s show, Forest Preserve Landscapes of the Western Suburbs, is in Adult Library Services through Oct. 31. Excel Basics is Wednesday, Oct. 7, 3 to 4:30, in the computer lab. Registration and a library card.",
    when: "Oct. 4",
    href: "https://www.helenplum.org/events/upcoming",
    hrefLabel: "Helen Plum",
  },
  {
    id: "who-runs",
    desk: "Lilac",
    title: "Three different hosts for the lilac summer",
    detail:
      "Cruise Nights are the village, with Tommy’s Express as the presenting sponsor. The parade is the Lombard Lilac Parade Committee. The queen and princesses are the Lombard Junior Women’s Club. The 2026 seasons are over. The committee’s next printed meeting is May 13, 2027.",
    when: "2026",
    href: "/village",
    hrefLabel: "Who runs them",
  },
  {
    id: "chamber-market",
    desk: "Chamber",
    title: "Market ends Tuesday",
    detail:
      "The chamber’s site still has the season through Oct. 6, 3 to 7, under the Arch, with Inversion Jazz Band on the last night.",
    when: "Oct. 6",
    href: "https://www.lombardchamber.com/farmers-market",
    hrefLabel: "Chamber",
  },
];

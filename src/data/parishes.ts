export type ParishCard = {
  id: string;
  name: string;
  where: string;
  phone: string;
  href: string;
  lines: string[];
};

export const parishes: ParishCard[] = [
  {
    id: "sacred-heart",
    name: "Sacred Heart",
    where: "114 S. Elizabeth St.",
    phone: "(630) 627-0687",
    href: "https://sacredheartlombard.org/",
    lines: [
      "Saturday 5 p.m. Sunday 8:30 and 11 a.m. Monday through Friday at noon.",
      "Confession Saturday 3 to 4 p.m.",
      "The adoration chapel is for parishioners. The site says to get the code through Flocknote.",
    ],
  },
  {
    id: "pius",
    name: "St. Pius X",
    where: "1025 E. Madison St.",
    phone: "(630) 627-4526",
    href: "https://www.stpiuslombard.org/",
    lines: [
      "Saturday 5 p.m., and 7 p.m. in Spanish. Sunday 8 and 10 a.m. Weekdays 8:30 a.m.",
      "First Saturday of the month, 8:30 a.m. First Friday, 7 p.m. in Spanish.",
      "Confession Saturday 3:30 to 4:30 p.m. The prayer chapel is open Monday through Thursday, 7 to 9 p.m.",
    ],
  },
  {
    id: "ctk",
    name: "Christ the King",
    where: "1501 S. Main St.",
    phone: "(630) 629-1717",
    href: "https://www.ctklombard.org/",
    lines: [
      "Saturday 4 p.m. Sunday 8 and 11 a.m. Weekdays 8:30 a.m.",
      "Confession Saturday 3 to 3:30 p.m., or by appointment.",
      "Adoration Wednesdays after the 8:30 Mass until noon. The fourth Wednesday, Behold adoration is 7 to 8 p.m.",
    ],
  },
];

export const knights = [
  {
    id: "boecker",
    name: "Fr. Boecker Council 6090",
    serves: "Sacred Heart and St. Pius X",
    href: "https://www.uknight.org/CouncilSite/index.asp?CNO=6090",
    detail:
      "Founded in 1968 and named for Sacred Heart’s first pastor. The council’s own page says meetings are at the Sacred Heart social center: business meeting the first Thursday at 7 p.m., planning meeting the third Thursday at 7 p.m., and a social meeting the fifth Thursday at 7:30 p.m. when a month has one. Sunday evening the vocations rosary is at St. Pius X, 7 to 7:30. The same calendar also prints a 7:15 a.m. rosary. Saturday at 7 a.m. is listed as Cor, for prayer and formation. That line does not name a room.",
  },
  {
    id: "ctk-knights",
    name: "Christ the King Council 11027",
    serves: "Christ the King",
    href: "https://www.ctklombard.org/knights",
    detail:
      "Founded in 1993. The parish page names the council and the 2025–26 officers. It does not post a regular meeting night, so none is printed here. The September bulletin said the intellectual-disabilities drive would keep taking gifts online through November.",
  },
];

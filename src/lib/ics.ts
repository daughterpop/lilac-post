import { events, type VillageEvent } from "@/data/events";
import { isUpcoming } from "@/lib/when";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function stamp(date: Date) {
  return (
    `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}` +
    `T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}00Z`
  );
}

function chicagoToUtc(date: string, time: string) {
  const [y, mo, d] = date.split("-").map(Number);
  const [h, mi] = time.split(":").map(Number);
  let utc = Date.UTC(y, (mo ?? 1) - 1, d ?? 1, h ?? 0, mi ?? 0, 0);
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
  const asUtcClock = (ms: number) => {
    const parts = Object.fromEntries(
      formatter.formatToParts(new Date(ms)).map((part) => [part.type, part.value]),
    );
    const hour = Number(parts.hour) === 24 ? 0 : Number(parts.hour);
    return Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day), hour, Number(parts.minute));
  };
  utc += Date.UTC(y, (mo ?? 1) - 1, d ?? 1, h ?? 0, mi ?? 0) - asUtcClock(utc);
  return new Date(utc);
}

function escapeText(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

function fold(line: string) {
  if (line.length <= 73) return line;
  const parts = [line.slice(0, 73)];
  let rest = line.slice(73);
  while (rest.length > 0) {
    parts.push(` ${rest.slice(0, 72)}`);
    rest = rest.slice(72);
  }
  return parts.join("\r\n");
}

function vevent(event: VillageEvent) {
  const where = `${event.place} ${event.address ?? ""}`;
  const town = where.includes("Glen Ellyn") ? null : "Lombard, IL";
  const location = [event.place, event.address, town].filter(Boolean).join(", ");
  const description = `${event.blurb} Source: ${event.href}`;
  const lines = [
    "BEGIN:VEVENT",
    `UID:${event.id}@thelilacpost.local`,
    `DTSTAMP:${stamp(new Date())}`,
    `SUMMARY:${escapeText(event.title)}`,
    `LOCATION:${escapeText(location)}`,
    `DESCRIPTION:${escapeText(description)}`,
    `URL:${event.href}`,
  ];
  if (!event.start) {
    const [y, m, d] = event.date.split("-").map(Number);
    const end = new Date(y ?? 2026, (m ?? 1) - 1, (d ?? 1) + 1);
    lines.push(`DTSTART;VALUE=DATE:${event.date.replace(/-/g, "")}`);
    lines.push(`DTEND;VALUE=DATE:${end.getFullYear()}${pad(end.getMonth() + 1)}${pad(end.getDate())}`);
  } else {
    lines.push(`DTSTART:${stamp(chicagoToUtc(event.date, event.start))}`);
    lines.push(`DTEND:${stamp(chicagoToUtc(event.date, event.end ?? event.start))}`);
  }
  lines.push("END:VEVENT");
  return lines.map(fold).join("\r\n");
}

function wrap(body: string) {
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//The Lilac Post//Lombard//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:The Lilac Post",
    body,
    "END:VCALENDAR",
    "",
  ].join("\r\n");
}

export function eventToIcs(event: VillageEvent) {
  return wrap(vevent(event));
}

export function upcomingCalendarIcs() {
  const upcoming = events.filter((event) => isUpcoming(event));
  return wrap(upcoming.map(vevent).join("\r\n"));
}

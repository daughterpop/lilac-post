import type { VillageEvent } from "@/data/types";

export type ChicagoNow = {
  date: string;
  minutes: number;
  label: string;
  weekday: string;
};

export function chicagoNow(now = new Date()): ChicagoNow {
  const date = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);

  const timeParts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);

  const hourRaw = Number(timeParts.find((p) => p.type === "hour")?.value ?? "0");
  const minute = Number(timeParts.find((p) => p.type === "minute")?.value ?? "0");
  const hour = hourRaw === 24 ? 0 : hourRaw;

  const label = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(now);

  const weekday = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    weekday: "short",
  }).format(now);

  return { date, minutes: hour * 60 + minute, label, weekday };
}

const LIBRARY_HOURS: Record<string, string> = {
  Sun: "1–5 p.m.",
  Mon: "9 a.m.–9 p.m.",
  Tue: "9 a.m.–9 p.m.",
  Wed: "9 a.m.–9 p.m.",
  Thu: "9 a.m.–9 p.m.",
  Fri: "9 a.m.–9 p.m.",
  Sat: "9 a.m.–5 p.m.",
};

export function libraryHours(weekday: string) {
  return LIBRARY_HOURS[weekday] ?? "See helenplum.org";
}

export function marketNote(date: string, weekday: string) {
  if (weekday !== "Tue") return null;
  if (date < "2026-05-19" || date > "2026-10-06") return null;
  if (date === "2026-10-06") return "Last market of the season, 3–7 p.m. under the Arch.";
  return "Farmers market today, 3–7 p.m. under the Arch.";
}

function clock(hm: string) {
  const [hRaw, mRaw] = hm.split(":");
  const h = Number(hRaw);
  const m = Number(mRaw);
  const suffix = h >= 12 ? "p.m." : "a.m.";
  const hr = h % 12 || 12;
  return `${hr}:${String(m).padStart(2, "0")} ${suffix}`;
}

export function formatSpan(start?: string, end?: string) {
  if (!start) return "All day";
  if (!end) return clock(start);
  return `${clock(start)}–${clock(end)}`;
}

export function formatLong(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatShort(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function endMinutes(event: Pick<VillageEvent, "start" | "end">) {
  const raw = event.end ?? event.start;
  if (!raw) return 24 * 60;
  const [h, m] = raw.split(":").map(Number);
  return h * 60 + m;
}

export function isUpcoming(event: Pick<VillageEvent, "date" | "start" | "end">, now = chicagoNow()) {
  if (event.date > now.date) return true;
  if (event.date < now.date) return false;
  return endMinutes(event) > now.minutes;
}

export function byDateTime(a: VillageEvent, b: VillageEvent) {
  const date = a.date.localeCompare(b.date);
  if (date !== 0) return date;
  return (a.start ?? "00:00").localeCompare(b.start ?? "00:00");
}

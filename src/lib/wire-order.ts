import type { Wire } from "@/data/wires";

const MONTHS: Record<string, number> = {
  jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12,
};

/** Turns a wire's `when` (e.g. "Oct. 3", "Sept. 30", "2026-10-09", "Oct. 3, 2026") into a sortable number. Unknown → -1 (sorts last). */
export function wireSortKey(when: string, defaultYear = 2026): number {
  const s = when.trim();
  const iso = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (iso) return Number(iso[1]) * 10000 + Number(iso[2]) * 100 + Number(iso[3]);
  const m = s.match(/^([A-Za-z]{3})[A-Za-z]*\.?\s+(\d{1,2})(?:,?\s+(\d{4}))?/);
  if (m && MONTHS[m[1].toLowerCase()]) {
    const year = m[3] ? Number(m[3]) : defaultYear;
    return year * 10000 + MONTHS[m[1].toLowerCase()] * 100 + Number(m[2]);
  }
  return -1;
}

/** Newest first; ties keep original order (Array.prototype.sort is stable). */
export function newestFirst<T extends Pick<Wire, "when">>(items: readonly T[]): T[] {
  return [...items].sort((a, b) => wireSortKey(b.when) - wireSortKey(a.when));
}

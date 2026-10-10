import { wires, type Wire } from "@/data/wires";

const BREAKING_IDS = ["fire", "fire-chief", "crosswalk", "seniors"] as const;

export function isBreakingLive(id: string, today: string) {
  if (id === "fire") return today <= "2026-10-10";
  if (id === "fire-chief") return today <= "2026-10-08";
  if (id === "crosswalk") return today >= "2026-10-05" && today <= "2026-10-16";
  if (id === "seniors") return today <= "2026-10-09";
  return true;
}

export function allBreaking() {
  return BREAKING_IDS.map((id) => wires.find((wire) => wire.id === id)).filter((wire): wire is Wire =>
    Boolean(wire),
  );
}

export function breakingItems(today: string) {
  return allBreaking().filter((wire) => isBreakingLive(wire.id, today));
}

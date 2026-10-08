import { Bookmark } from "lucide-react";
import { useClips, useHydrated } from "@/lib/clips";

export function SaveButton({ slug }: { slug: string }) {
  const ready = useHydrated();
  const saved = useClips((state) => state.saved.includes(slug));
  const toggle = useClips((state) => state.toggle);
  const on = ready && saved;

  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={() => toggle(slug)}
      className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-lilac"
    >
      <Bookmark className={on ? "size-4 fill-current" : "size-4"} aria-hidden="true" />
      {on ? "Clipped" : "Clip"}
    </button>
  );
}

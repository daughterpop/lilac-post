import type { Origin } from "@/data/types";
import { useEffect, useState } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type PorchNote = {
  id: string;
  text: string;
  at: string;
};

type ClipState = {
  saved: string[];
  notes: PorchNote[];
  follows: Origin[];
  paper: boolean;
  toggle: (slug: string) => void;
  addNote: (text: string) => void;
  removeNote: (id: string) => void;
  toggleFollow: (origin: Origin) => void;
  subscribePaper: () => void;
  unsubscribePaper: () => void;
};

export const useClips = create<ClipState>()(
  persist(
    (set, get) => ({
      saved: [],
      notes: [],
      follows: [],
      paper: false,
      toggle: (slug) => {
        const saved = get().saved;
        set({
          saved: saved.includes(slug) ? saved.filter((item) => item !== slug) : [slug, ...saved],
        });
      },
      addNote: (text) => {
        const clean = text.trim().replace(/\s+/g, " ").slice(0, 280);
        if (!clean) return;
        const note: PorchNote = {
          id: crypto.randomUUID(),
          text: clean,
          at: new Date().toISOString(),
        };
        set({ notes: [note, ...get().notes].slice(0, 20) });
      },
      removeNote: (id) => set({ notes: get().notes.filter((note) => note.id !== id) }),
      toggleFollow: (origin) => {
        const follows = get().follows ?? [];
        set({
          follows: follows.includes(origin) ? follows.filter((item) => item !== origin) : [...follows, origin],
        });
      },
      subscribePaper: () => set({ paper: true }),
      unsubscribePaper: () => set({ paper: false }),
    }),
    { name: "lilac-post-clips", skipHydration: true },
  ),
);

export function useHydrated() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let live = true;
    const finish = () => {
      if (live) setReady(true);
    };

    const unsub = useClips.persist.onFinishHydration(finish);
    if (useClips.persist.hasHydrated()) finish();
    else void useClips.persist.rehydrate();
    return () => {
      live = false;
      unsub();
    };
  }, []);

  return ready;
}

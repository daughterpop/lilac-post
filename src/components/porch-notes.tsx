import { useState } from "react";
import { useClips, useHydrated } from "@/lib/clips";

export function PorchNotes() {
  const ready = useHydrated();
  const notes = useClips((state) => state.notes);
  const addNote = useClips((state) => state.addNote);
  const removeNote = useClips((state) => state.removeNote);
  const [text, setText] = useState("");

  if (!ready) {
    return (
      <section className="border border-line bg-paper p-4">
        <h2 className="font-display text-2xl text-ink">Porch notes</h2>
        <p className="mt-1 text-sm text-muted">Jot down a reminder for yourself. Notes stay private on this device.</p>
      </section>
    );
  }
  return (
    <section className="border border-line bg-paper p-4">
      <h2 className="font-display text-2xl text-ink">Porch notes</h2>
      <p className="mt-1 text-sm text-muted">
        Jot down a reminder for yourself. Notes stay private on this device and are never posted.
      </p>
      <form
        className="mt-4"
        onSubmit={(event) => {
          event.preventDefault();
          addNote(text);
          setText("");
        }}
      >
        <label htmlFor="porch-note" className="text-sm font-semibold text-ink">
          Note
        </label>
        <textarea
          id="porch-note"
          value={text}
          maxLength={280}
          rows={3}
          onChange={(event) => setText(event.target.value)}
          placeholder="Market run, storytime, who has the wagon…"
          className="mt-2 w-full border border-line bg-bg px-3 py-3 text-base text-fg"
        />
        <div className="mt-2 flex items-center justify-between gap-3">
          <p className="text-xs text-muted">{text.trim().length}/280</p>
          <button
            type="submit"
            className="inline-flex min-h-11 items-center bg-lilac px-4 text-sm font-semibold text-paper"
          >
            Pin it
          </button>
        </div>
      </form>
      <ul className="mt-4 space-y-3">
        {ready && notes.length === 0 ? (
          <li className="text-sm text-muted">Nothing pinned yet.</li>
        ) : null}
        {ready
          ? notes.map((note) => (
              <li key={note.id} className="border-t border-line pt-3">
                <p className="text-sm break-words text-fg">{note.text}</p>
                <button
                  type="button"
                  onClick={() => removeNote(note.id)}
                  className="mt-1 inline-flex min-h-11 items-center text-sm font-semibold text-lilac"
                >
                  Remove
                </button>
              </li>
            ))
          : null}
      </ul>
    </section>
  );
}

import type { ErrorComponentProps } from "@tanstack/react-router";
import { TriangleAlert } from "lucide-react";

const READER_MESSAGE = "Something went wrong on our end. Please reload the page or try again in a few minutes.";

export function AppErrorComponent({ error }: ErrorComponentProps) {
  // Readers get a plain message; the technical detail stays in the browser console.
  console.error(error);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3 bg-bg px-6 text-center text-fg">
      <span className="text-lilac" aria-hidden="true">
        <TriangleAlert className="size-10" strokeWidth={2} />
      </span>
      <h1 className="font-display text-2xl text-ink">This page didn’t load</h1>
      <p className="max-w-md text-sm break-words text-muted">{READER_MESSAGE}</p>
    </main>
  );
}

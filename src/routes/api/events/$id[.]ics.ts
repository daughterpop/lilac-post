import { createFileRoute } from "@tanstack/react-router";
import { getEvent } from "@/data/events";
import { eventToIcs } from "@/lib/ics";

export const Route = createFileRoute("/api/events/$id.ics")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const raw = "id.ics" in params ? params["id.ics"] : "";
        const id = raw.replace(/\.ics$/, "");
        const event = getEvent(id);
        if (!event) return new Response("Not in the calendar", { status: 404 });
        return new Response(eventToIcs(event), {
          headers: {
            "Content-Type": "text/calendar; charset=utf-8",
            "Content-Disposition": `inline; filename="${event.id}.ics"`,
            "Cache-Control": "public, max-age=300",
          },
        });
      },
    },
  },
});

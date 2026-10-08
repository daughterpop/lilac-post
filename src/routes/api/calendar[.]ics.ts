import { createFileRoute } from "@tanstack/react-router";
import { upcomingCalendarIcs } from "@/lib/ics";

export const Route = createFileRoute("/api/calendar.ics")({
  server: {
    handlers: {
      GET: async () => {
        return new Response(upcomingCalendarIcs(), {
          headers: {
            "Content-Type": "text/calendar; charset=utf-8",
            "Content-Disposition": 'inline; filename="lilac-post.ics"',
            "Cache-Control": "public, max-age=300",
          },
        });
      },
    },
  },
});

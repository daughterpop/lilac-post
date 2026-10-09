import { createFileRoute, redirect } from "@tanstack/react-router";
import { latestEdition } from "@/data/editions";

// Short link to the latest Sunday Lilac Post.
export const Route = createFileRoute("/sunday")({
  beforeLoad: () => {
    const latest = latestEdition();
    if (latest) throw redirect({ to: "/edition/$date", params: { date: latest.date } });
    throw redirect({ to: "/editions" });
  },
});

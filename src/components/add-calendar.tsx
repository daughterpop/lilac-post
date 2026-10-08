export function AddToCalendar({ id }: { id: string }) {
  return (
    <a
      href={`/api/events/${id}.ics`}
      className="inline-flex min-h-11 items-center text-sm font-semibold text-lilac"
    >
      Add to calendar
    </a>
  );
}

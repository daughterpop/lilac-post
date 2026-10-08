import { Link } from "@tanstack/react-router";
import type { Wire } from "@/data/wires";

export function WireLink({ wire }: { wire: Wire }) {
  const className = "mt-1 inline-flex min-h-11 items-center text-sm font-semibold text-lilac";
  if (wire.href.startsWith("/dispatches/")) {
    return (
      <Link
        to="/dispatches/$slug"
        params={{ slug: wire.href.slice("/dispatches/".length) }}
        className={className}
      >
        {wire.hrefLabel}
      </Link>
    );
  }
  if (wire.href === "/parish") {
    return (
      <Link to="/parish" className={className}>
        {wire.hrefLabel}
      </Link>
    );
  }
  if (wire.href === "/village") {
    return (
      <Link to="/village" className={className}>
        {wire.hrefLabel}
      </Link>
    );
  }
  return (
    <a href={wire.href} className={className}>
      {wire.hrefLabel}
    </a>
  );
}

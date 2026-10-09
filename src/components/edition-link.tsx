import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

/** Link for an edition item href: internal paths use the router, anything else is a plain link. */
export function EditionHref({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  if (href.startsWith("/dispatches/")) {
    return (
      <Link
        to="/dispatches/$slug"
        params={{ slug: href.slice("/dispatches/".length) }}
        className={className}
      >
        {children}
      </Link>
    );
  }
  if (href.startsWith("/")) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

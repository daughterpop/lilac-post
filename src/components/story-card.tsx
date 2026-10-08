import { Link } from "@tanstack/react-router";
import type { Post } from "@/data/types";
import { SaveButton } from "@/components/save-button";
import { formatLong } from "@/lib/when";

export function StoryCard({ post }: { post: Post }) {
  return (
    <article className="border-t border-line py-5">
      <div className={post.image ? "grid gap-4 sm:grid-cols-5" : ""}>
        {post.image ? (
          <img
            src={post.image}
            alt={post.imageAlt ?? ""}
            className="aspect-video w-full object-cover sm:col-span-2"
          />
        ) : null}
        <div className={post.image ? "sm:col-span-3" : ""}>
          <p className="text-xs font-semibold tracking-widest text-lilac uppercase">{post.desk}</p>
          <h2 className="mt-1 font-display text-2xl leading-tight text-ink">
            <Link
              to="/dispatches/$slug"
              params={{ slug: post.slug }}
              className="hover:text-lilac"
            >
              {post.title}
            </Link>
          </h2>
          <p className="mt-2 text-fg">{post.dek}</p>
          <div className="mt-3 flex flex-wrap items-center gap-x-4">
            <p className="text-sm text-muted">{formatLong(post.date)}</p>
            <SaveButton slug={post.slug} />
          </div>
        </div>
      </div>
    </article>
  );
}

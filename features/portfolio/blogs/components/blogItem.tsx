import Link from "next/link";
import type { BlogPreview } from "@/features/blog/types/blog";
import { formatFullDate } from "@/lib/formatDate";
import { Pin } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  blog: BlogPreview;
  className?: string;
};

export default function BlogItem({ blog, className }: Props) {
  return (
    <Link
      href={`/blogs/${blog.slug}`}
      className={cn("block p-4 border-b border-border group", className)}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 min-w-0">
              {blog.pinned && (
                <Pin
                  size={16}
                  className="text-secondary-foreground shrink-0"
                  aria-label="Pinned blog"
                />
              )}

              <h3 className="text-lg sm:text-2xl group-hover:underline underline-offset-3  tracking-wide truncate">
                {blog.title}
              </h3>
            </div>

            {/* Date on mobile */}
            <span className="text-xs font-mono uppercase text-secondary-foreground whitespace-nowrap block sm:hidden">
              {formatFullDate(blog.date, { shortMonth: true })}
            </span>

            {blog.new && (
              <span className="text-[11px] uppercase font-mono px-1.5 py-0.5 rounded bg-foreground text-background shrink-0">
                New
              </span>
            )}
          </div>
        </div>
        {/* Date on desktop */}
        <span className="text-xs font-mono uppercase text-secondary-foreground whitespace-nowrap hidden sm:block">
          {formatFullDate(blog.date, { shortMonth: true })}
        </span>
      </div>
      <p className="mt-2 text-sm sm:text-base text-secondary-foreground">
        {blog.description}
      </p>
    </Link>
  );
}

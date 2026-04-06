import Image from "next/image";
import type { BlogPreview } from "../types/blog";
import Link from "next/link";
import { formatFullDate } from "@/lib/formatDate";
import { Pin } from "lucide-react";
import { cn } from "@/lib/utils";
import { resolveImage } from "@/lib/constants";

type Props = {
  blog: BlogPreview;
  className?: string;
};

export default function BlogItemExpanded({ blog, className }: Props) {
  return (
    <Link
      href={`/blogs/${blog.slug}`}
      className={cn("group flex flex-col", className)}
    >
      {/* Image container */}
      <div className="relative overflow-hidden bg-muted">
        {blog.image && (
          <Image
            src={resolveImage(blog.image)}
            alt={blog.title}
            width={1200}
            height={630}
            className="h-auto w-full object-contain border-b border-border"
            loading="lazy"
          />
        )}

        {/* Badge overlay */}
        <div className="absolute top-3 left-3 flex items-center justify-center gap-2">
          {blog.pinned && (
            <div className="bg-muted/20 border border-border backdrop-blur px-2 py-1 rounded text-xs text-white flex items-center gap-1">
              <Pin size={14} />
              <span className="font-mono text-[10px] uppercase">Pinned</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h3 className="sm:text-2xl text-xl font-medium truncate group-hover:underline underline-offset-3">
            {blog.title}
          </h3>
          {blog.new && (
            <div className="text-[11px] uppercase font-mono px-1.5 py-0.5 rounded bg-foreground text-background shrink-0">
              New
            </div>
          )}
        </div>

        <div className="text-xs font-mono text-secondary-foreground">
          {formatFullDate(blog.date, { shortMonth: true })}
        </div>

        <div className="flex items-center justify-between text-sm text-secondary-foreground">
          <p className="line-clamp-2 font-mono text-xs sm:text-sm">
            {blog.description}
          </p>
        </div>
      </div>
    </Link>
  );
}

"use client";

import BlogItem from "@/features/portfolio/blogs/components/blogItem";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import type { BlogPreview } from "@/features/blog/types/blog";
import { useEffect, useState } from "react";
import BlogItemExpanded from "./blogItemExpanded";
import { cn } from "@/lib/utils";

type Props = {
  blogs: BlogPreview[];
  variant?: "compact" | "expanded";
};

export default function BlogPageClient({ blogs }: Props) {
  const router = useRouter();
  const [view, setView] = useState<"compact" | "expanded">("expanded");

  useEffect(() => {
    const ONE_DAY = 1000 * 60 * 60 * 24;
    const raw = localStorage.getItem("blog-view");
    if (!raw) return;

    const parsed = JSON.parse(raw);

    if (Date.now() - parsed.timestamp < ONE_DAY) {
      setView(parsed.value);
    } else {
      localStorage.removeItem("blog-view");
    }
  }, []);

  const handleViewChange = (mode: "compact" | "expanded") => {
    setView(mode);
    localStorage.setItem(
      "blog-view",
      JSON.stringify({
        value: mode,
        timestamp: Date.now(),
      }),
    );
  };

  return (
    <>
      <div className={`screen-line-after p-4 flex justify-between`}>
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-xs sm:text-sm font-mono text-secondary-foreground transition-opacity hover:opacity-70 cursor-pointer"
          name="back to home"
        >
          <ArrowLeft size={16} />
          <p className="sm:hidden block">home</p>
          <p className="sm:block hidden">back to home</p>
        </button>

        {/* View toggle */}
        <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-secondary-foreground cursor-default">
          <button
            onClick={() => handleViewChange("expanded")}
            className={`cursor-pointer
              ${
                view === "expanded"
                  ? "text-foreground"
                  : "opacity-60 hover:opacity-100"
              }
            `}
          >
            Expanded
          </button>
          <span>/</span>
          <button
            onClick={() => handleViewChange("compact")}
            className={`cursor-pointer
            ${
              view === "compact"
                ? "text-foreground"
                : "text-secondary-foreground/70 hover:text-secondary-foreground"
            }`}
          >
            Compact
          </button>
        </div>
      </div>

      {view === "compact" ? (
        <div className="min-h-[calc(100svh-12.5rem)]">
          {blogs.map((blog, i) => (
            <BlogItem
              key={blog.slug}
              blog={blog}
              className={cn(
                i > 4 && "last:border-0 sm:last:border-b",
                i > 6 && "sm:last:border-0",
              )}
            />
          ))}
        </div>
      ) : (
        <div className="relative min-h-[calc(100svh-12.5rem)]">
          <div className="absolute inset-0 z-10 pointer-events-none grid grid-cols-1 gap-8 max-sm:hidden sm:grid-cols-2">
            <div className="border-r border-border"></div>
            <div className="border-l border-border"></div>
          </div>

          <div className="h-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
            {blogs.map((blog) => {
              return (
                <BlogItemExpanded
                  key={blog.slug}
                  blog={blog}
                  className={cn(
                    "screen-line-before-elevated",
                    "not-even:screen-line-after",
                  )}
                />
              );
            })}
          </div>
          <div className="h-8" />
        </div>
      )}
    </>
  );
}

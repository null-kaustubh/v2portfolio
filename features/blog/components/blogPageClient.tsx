"use client";

import BlogItem from "@/features/portfolio/blogs/components/blogItem";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import type { BlogPreview } from "@/features/blog/types/blog";

type Props = {
  blogs: BlogPreview[];
};

export default function BlogPageClient({ blogs }: Props) {
  const router = useRouter();

  return (
    <>
      <div className="screen-line-after p-4 flex justify-between">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-xs sm:text-sm font-mono text-secondary-foreground transition-opacity hover:opacity-70 cursor-pointer"
        >
          <ArrowLeft size={16} />
          back to home
        </button>
      </div>

      <div className="min-h-[calc(100svh-9.3rem)]">
        {blogs.map((blog) => (
          <BlogItem key={blog.slug} blog={blog} />
        ))}
      </div>
    </>
  );
}

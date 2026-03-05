import { cache } from "react";
import { getAllBlogs } from "@/features/blog/data/blogs";
import type { BlogPreview } from "@/features/blog/types/blog";
import { isNewBlog } from "@/lib/newBlog";

export const getBlogPreviews = cache((): BlogPreview[] => {
  const blogs = getAllBlogs();

  const previews = blogs.map((blog) => ({
    slug: blog.slug,
    title: blog.metadata.title,
    description: blog.metadata.description,
    date: blog.metadata.createdAt,
    pinned: blog.metadata.pinned ?? false,
    new: isNewBlog(blog.metadata.createdAt),
    image: blog.metadata.image,
  }));

  return previews.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;

    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
});

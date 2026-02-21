import { slugify } from "@/lib/slugify";
import { BlogItemType } from "../types/blogType";

const rawBlogs = [
  {
    slug: "building-journl",
    title: "Building Journl: My dev journaling app",
    description:
      "Why I built Journl, how I structured it with Next.js and Prisma, and what I learned from it.",
    date: "2025-07-14",
    image: "",
  },
  {
    slug: "nextjs-auth-patterns",
    title: "Auth patterns I actually use in Next.js",
    description:
      "Credentials provider, OAuth, session handling, and what works well in real projects.",
    date: "2025-08-01",
    image: "",
  },
  {
    slug: "designing-dev-tools",
    title: "Designing products for developers",
    description:
      "How I think about building useful tools instead of just building projects.",
    date: "2025-09-12",
    image: "",
  },
  {
    slug: "designing-dev-tools-2",
    title: "Designing products for developers",
    description:
      "How I think about building useful tools instead of just building projects.",
    date: "2025-09-15",
    image: "",
  },
];

export const blogs: BlogItemType[] = rawBlogs.map((blog) => ({
  ...blog,
  slug: slugify(blog.title),
}));

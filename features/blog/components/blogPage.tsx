import { getBlogPreviews } from "@/features/portfolio/blogs/data/blogData";
import BlogPageClient from "./blogPageClient";

export const dynamic = "force-static";

export default function BlogPage() {
  const blogs = getBlogPreviews();
  return <BlogPageClient blogs={blogs} />;
}

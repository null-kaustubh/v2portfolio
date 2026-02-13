import { Panel, PanelContent, PanelHeader, PanelTitle } from "@/features/panel";
import Link from "next/link";
import { blogs } from "../data/blogData";
import BlogItem from "./blogItem";
import { ArrowRight } from "lucide-react";

export default function Blog() {
  const latestBlogs = blogs.slice(0, 3);

  return (
    <Panel id="blogs">
      <PanelHeader>
        <PanelTitle>Blogs</PanelTitle>
      </PanelHeader>
      <PanelContent className="p-0">
        <div className="flex flex-col">
          {latestBlogs.map((blog) => (
            <BlogItem key={blog.slug} blog={blog} />
          ))}
        </div>

        {blogs.length > 3 && (
          <div className="p-4 flex items-center justify-center">
            <Link
              href="/blogs"
              className="
                    group inline-flex items-center gap-1.5
                    text-sm uppercase font-mono text-secondary-foreground
                    hover:text-foreground transition-colors
                  "
            >
              View all blogs
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        )}
      </PanelContent>
    </Panel>
  );
}

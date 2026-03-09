// import { Panel, PanelContent, PanelHeader, PanelTitle } from "@/features/panel";
import { formatFullDate } from "@/lib/formatDate";
import { Blog } from "../types/blog";
import Image from "next/image";
import rehypeHighlight from "@shikijs/rehype";
import { MDXRemote } from "next-mdx-remote/rsc";
import { BlogComponents } from "./blogComponents";
import { Calendar, Clock } from "lucide-react";
import { Panel, PanelContent } from "@/features/panel";
import { calculateReadingTime } from "@/lib/readTime";
import { BlogToolbar } from "./blogToolbar";

type BlogContentProps = {
  blog: Blog;
};

export default function BlogContent({ blog }: BlogContentProps) {
  const readingTime = calculateReadingTime(blog.content);
  return (
    <>
      <BlogToolbar url={getBlogUrl(blog)} />

      <article className="mx-auto max-w-4xl">
        {/* Hero Section */}
        <header className="screen-line-before">
          {blog.metadata.image && (
            <div className="p-px sm:p-4">
              <div className="relative overflow-hidden rounded-xl ring-0 ring-secondary-foreground/20 sm:ring-1">
                <Image
                  src={blog.metadata.image}
                  alt={blog.metadata.title}
                  width={1200}
                  height={630}
                  priority
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          )}
          <Panel>
            <PanelContent className="p-0">
              <div>
                <h1 className="p-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                  {blog.metadata.title}
                </h1>

                <p className="text-secondary-foreground text-lg leading-relaxed screen-line-after screen-line-before p-4 lg:text-xl">
                  {blog.metadata.description}
                </p>

                <div className="text-secondary-foreground flex justify-between items-center text-sm px-4 py-2">
                  <div className="flex items-center justify-center gap-1.5">
                    <Calendar size={16} />
                    <time dateTime={blog.metadata.createdAt}>
                      {formatFullDate(blog.metadata.createdAt)}
                    </time>
                  </div>
                  <div className="flex items-center justify-center gap-1.5">
                    <Clock size={16} />
                    {readingTime}m
                  </div>
                </div>
              </div>
            </PanelContent>
          </Panel>
        </header>

        {/* Content */}
        <div className="prose prose-neutral max-w-none pt-4 px-4">
          <MDXRemote
            source={blog.content}
            components={BlogComponents}
            options={{
              mdxOptions: {
                rehypePlugins: [
                  [
                    rehypeHighlight,
                    {
                      theme: "github-dark",
                    },
                  ],
                ],
              },
            }}
          />
        </div>
      </article>
    </>
  );
}

export function getBlogUrl(blog: Blog) {
  return `/blogs/${blog.slug}`;
}

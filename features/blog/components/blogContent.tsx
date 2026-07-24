import { formatFullDate } from "@/lib/formatDate";
import { Blog } from "../types/blog";
import Image from "next/image";
import rehypeHighlight from "@shikijs/rehype";
import { MDXRemote } from "next-mdx-remote/rsc";
import { BlogComponents } from "./blogComponents";
import { Calendar, Clock } from "lucide-react";
import { Panel, PanelContent } from "@/features/panel";
import { calculateReadingTime } from "@/lib/readTime";
import { Toolbar } from "./Toolbar";
import { ASSETS_REPO } from "@/lib/constants";

type BlogContentProps = {
  blog: Blog;
};

export default function BlogContent({ blog }: BlogContentProps) {
  const readingTime = calculateReadingTime(blog.content);
  const imageUrl = blog.metadata.image?.startsWith("http")
    ? blog.metadata.image
    : `${ASSETS_REPO}${blog.metadata.image}`;

  return (
    <>
      <Toolbar url={getBlogUrl(blog)} type="blog" />

      <article className="mx-auto max-w-4xl">
        {/* Hero Section */}
        <header className="screen-line-before">
          {blog.metadata.image && (
            <div className="p-px sm:p-4">
              <div className="relative overflow-hidden rounded-none ring-0 ring-secondary-foreground/20 sm:rounded-xl sm:ring-1">
                <Image
                  src={imageUrl}
                  alt={blog.metadata.title}
                  width={1200}
                  height={630}
                  loading="lazy"
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
                      themes: {
                        light: "one-light",
                        dark: "one-dark-pro",
                      },
                      defaultColor: false,
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

// import { Panel, PanelContent, PanelHeader, PanelTitle } from "@/features/panel";
import { formatFullDate } from "@/lib/formatDate";
import { Blog } from "../types/blog";
import Image from "next/image";
import rehypeHighlight from "@shikijs/rehype";
import { MDXRemote } from "next-mdx-remote/rsc";
import { BlogComponents } from "./blogComponents";
import { SeparatorHorizontal } from "lucide-react";

type BlogContentProps = {
  blog: Blog;
};

export default function BlogContent({ blog }: BlogContentProps) {
  return (
    <article className="mx-auto max-w-4xl">
      {/* Hero Section */}
      <header className="mb-8 space-y-6">
        {blog.metadata.image && (
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image
              src={blog.metadata.image}
              alt={blog.metadata.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="space-y-4">
          <h1 className="text-4xl leading-tight font-bold lg:text-5xl">
            {blog.metadata.title}
          </h1>

          <p className="text-muted-foreground text-xl">
            {blog.metadata.description}
          </p>

          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            {/*<Calender className="size-6" />*/}
            <time dateTime={blog.metadata.createdAt}>
              {formatFullDate(blog.metadata.createdAt)}
            </time>
          </div>
        </div>

        <SeparatorHorizontal />
      </header>

      {/* Content */}
      <div className="prose prose-neutral dark:prose-invert max-w-none">
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
  );
}

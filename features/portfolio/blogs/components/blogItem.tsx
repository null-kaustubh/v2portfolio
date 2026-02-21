import Link from "next/link";
import { BlogItemType } from "../types/blogType";
import { formatFullDate } from "@/lib/formatDate";

type Props = {
  blog: BlogItemType;
};

export default function BlogItem({ blog }: Props) {
  return (
    <Link
      href={`/blogs/${blog.slug}`}
      className="block p-4 border-b border-border"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg sm:text-2xl hover:underline underline-offset-3 tracking-wide">
          {blog.title}
        </h3>

        <span className="text-xs font-mono uppercase text-secondary-foreground whitespace-nowrap">
          {formatFullDate(blog.date, { shortMonth: true })}
        </span>
      </div>

      <p className="mt-2 text-sm sm:text-base text-secondary-foreground">
        {blog.description}
      </p>
    </Link>
  );
}

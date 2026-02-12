import { CollectionPage, WithContext } from "schema-dts";
import { ContentWrapper } from "../(app)/page";
import dayjs from "dayjs";
import { USER } from "@/features/profile/data/user";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { blogs } from "@/features/blogs/data/blogData";
import { SITE_INFO } from "@/config/site";

export const metadata: Metadata = {
  title: "Blogs",
  description: "A collection of thoughts written by " + USER.displayName,
};

export default function BlogsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getBlogsPageJsonLd()).replace(/</g, "\\u003c"),
        }}
      />

      <div className="relative">
        {/* Side pattern layer */}
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-y-0 -left-[100vw] -right-[100vw] -z-10",
            "bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)]",
            "bg-size-[10px_10px] [--pattern-foreground:var(--color-edge)]/30",
          )}
        />

        <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-0 md:max-w-4xl lg:max-w-4xl">
          <ContentWrapper>
            <div>Hello blogs</div>
          </ContentWrapper>
        </div>
      </div>
    </>
  );
}

function getBlogsPageJsonLd(): WithContext<CollectionPage> {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Blogs",
    description: "A collection of thoughts written by " + USER.displayName,
    dateModified: dayjs().toISOString(),
    inLanguage: "en",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: blogs.map((blog, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: blog.title,
        url: `${SITE_INFO.url}/blogs/${blog.slug}`,
      })),
    },
    about: {
      "@type": "Person",
      name: USER.displayName,
      identifier: USER.username,
      image: USER.avatar,
    },
    publisher: {
      "@type": "Person",
      name: USER.displayName,
    },
  };
}

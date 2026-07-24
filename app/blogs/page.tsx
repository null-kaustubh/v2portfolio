import { CollectionPage, WithContext } from "schema-dts";
import { ContentWrapper } from "../(app)/page";
import dayjs from "dayjs";
import { USER } from "@/features/portfolio/profile/data/user";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { getBlogPreviews } from "@/features/portfolio/blogs/data/blogData";
import { SITE_INFO } from "@/config/site";
import Footer from "@/features/footer/components/footer";
import BlogPage from "@/features/blog/components/blogPage";

const BLOGS_DESCRIPTION =
  "A collection of thoughts written by " + USER.displayName;

export const metadata: Metadata = {
  title: "Blogs",
  description: BLOGS_DESCRIPTION,
  alternates: {
    canonical: "/blogs",
  },
  openGraph: {
    title: `Blogs - ${SITE_INFO.name}`,
    description: BLOGS_DESCRIPTION,
    siteName: SITE_INFO.name,
    locale: "en_US",
    url: "/blogs",
    type: "website",
    images: [
      { url: SITE_INFO.ogImage, width: 1200, height: 630, alt: SITE_INFO.name },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Blogs - ${SITE_INFO.name}`,
    description: BLOGS_DESCRIPTION,
    images: [SITE_INFO.ogImage],
  },
};

const blogs = getBlogPreviews();

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
            <BlogPage />
            <Footer />
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
    description: BLOGS_DESCRIPTION,
    url: `${SITE_INFO.url}/blogs`,
    dateModified: dayjs().toISOString(),
    inLanguage: "en",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: blogs.length,
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

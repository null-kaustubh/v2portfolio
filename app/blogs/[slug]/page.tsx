import { CreativeWork, WithContext } from "schema-dts";
import { ContentWrapper } from "../../(app)/page";
import { USER } from "@/features/profile/data/user";
import { cn } from "@/lib/utils";
import { SITE_INFO } from "@/config/site";
import { notFound } from "next/navigation";
import { blogs } from "@/features/blogs/data/blogData";
import { Metadata } from "next";
import { BlogItemType } from "@/features/blogs/types/blogType";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const blog = blogs.find((p) => p.slug === slug);

  if (!blog) {
    return {};
  }

  return {
    title: blog.title,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      url: `/blogs/${blog.slug}`,
      images: [
        {
          url: blog.image,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      images: [blog.image],
    },
  };
}

export default async function BlogPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = blogs.find((p) => p.slug === slug);

  if (!blog) {
    notFound();
  }

  const jsonLd = getBlogPageJsonLd(blog);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
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
            <div>Hello</div>
          </ContentWrapper>
        </div>
      </div>
    </>
  );
}

function getBlogPageJsonLd(blog: BlogItemType): WithContext<CreativeWork> {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",

    name: blog.title,
    description: blog.description,
    url: `${SITE_INFO.url}/blogs/${blog.slug}`,

    datePublished: blog.date,
    dateModified: blog.date,

    inLanguage: "en",

    author: {
      "@type": "Person",
      name: USER.displayName,
      identifier: USER.username,
      image: USER.avatar,
    },

    publisher: {
      "@type": "Person",
      name: USER.displayName,
    },

    image: blog.image
      ? {
          "@type": "ImageObject",
          url: blog.image,
        }
      : undefined,
  };
}

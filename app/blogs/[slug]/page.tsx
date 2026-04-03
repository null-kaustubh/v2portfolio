import { CreativeWork, WithContext } from "schema-dts";
import { ContentWrapper } from "../../(app)/page";
import { USER } from "@/features/portfolio/profile/data/user";
import { cn } from "@/lib/utils";
import { SITE_INFO } from "@/config/site";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAllBlogs, getBlogBySlug } from "@/features/blog/data/blogs";
import { Blog } from "@/features/blog/types/blog";
import BlogContent from "@/features/blog/components/blogContent";
import Footer from "@/features/footer/components/footer";
import { getTableOfContents } from "@/lib/toc";
import TableOfContents from "@/features/blog/components/tableOfContents";

export const dynamic = "force-static";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const blogs = getAllBlogs();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    return notFound();
  }

  const { title, description, image, createdAt, updatedAt } = blog.metadata;

  const blogUrl = getBlogUrl(blog);
  const ogImage = image || "";

  return {
    title,
    description,
    alternates: {
      canonical: blogUrl,
    },
    openGraph: {
      url: blogUrl,
      type: "article",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      publishedTime: new Date(createdAt).toISOString(),
      modifiedTime: new Date(updatedAt).toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      images: [ogImage],
    },
  };
}

export default async function BlogPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const toc = getTableOfContents(blog.content);
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
            <TableOfContents items={toc} />
            <BlogContent blog={blog} />
            <Footer />
          </ContentWrapper>
        </div>
      </div>
    </>
  );
}

function getBlogPageJsonLd(blog: Blog): WithContext<CreativeWork> {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",

    headline: blog.metadata.title,
    description: blog.metadata.description,
    url: `${SITE_INFO.url}${getBlogUrl(blog)}`,

    datePublished: new Date(blog.metadata.createdAt).toISOString(),
    dateModified: new Date(blog.metadata.updatedAt).toISOString(),

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

    image: blog.metadata.image,
  };
}

function getBlogUrl(blog: Blog) {
  return `/blogs/${blog.slug}`;
}

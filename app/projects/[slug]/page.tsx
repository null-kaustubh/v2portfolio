import { CreativeWork, WithContext } from "schema-dts";
import { ContentWrapper } from "../../(app)/page";
import dayjs from "dayjs";
import { USER } from "@/features/portfolio/profile/data/user";
import { cn } from "@/lib/utils";
import { SITE_INFO } from "@/config/site";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Project } from "@/features/project/types/project";
import ProjectContent, {
  getProjectUrl,
} from "@/features/project/components/projectContent";
import Footer from "@/features/footer/components/footer";
import {
  getAllProjects,
  getProjectBySlug,
} from "@/features/project/data/projects";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const project = await getProjectBySlug(slug);

  if (!project) {
    return notFound();
  }

  const { title, description, image, createdAt, updatedAt } = project.metadata;

  const projectUrl = getProjectUrl(project);
  const ogImage = image || "";

  return {
    title,
    description,
    alternates: {
      canonical: projectUrl,
    },
    openGraph: {
      url: projectUrl,
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

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const jsonLd = getProjectPageJsonLd(project);

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
            <ProjectContent project={project} />
            <Footer />
          </ContentWrapper>
        </div>
      </div>
    </>
  );
}

function getProjectPageJsonLd(project: Project): WithContext<CreativeWork> {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",

    name: project.metadata.title,
    description: project.metadata.description,
    url: `${SITE_INFO.url}/projects/${project.slug}`,

    dateCreated: project.metadata.createdAt
      ? dayjs(project.metadata.createdAt).toISOString()
      : undefined,
    dateModified: dayjs().toISOString(),

    author: {
      "@type": "Person",
      name: USER.displayName,
      identifier: USER.username,
      image: USER.avatar,
    },

    creator: {
      "@type": "Person",
      name: USER.displayName,
    },

    keywords: project.metadata.tech?.join(", "),

    image: project.metadata.image
      ? {
          "@type": "ImageObject",
          url: project.metadata.image,
        }
      : undefined,
  };
}

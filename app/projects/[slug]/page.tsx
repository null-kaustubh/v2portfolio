import { CreativeWork, WithContext } from "schema-dts";
import { ContentWrapper } from "../../(app)/page";
import dayjs from "dayjs";
import { USER } from "@/features/profile/data/user";
import { cn } from "@/lib/utils";
import { SITE_INFO } from "@/config/site";
import { notFound } from "next/navigation";
import { Project, projects } from "@/features/projects/data/projects";
import { Metadata } from "next";

type PageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      url: `/projects/${project.slug}`,
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: [project.image],
    },
  };
}

export default function ProjectPage({ params }: PageProps) {
  const project = projects.find((p) => p.slug === params.slug);

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
            "bg-[length:10px_10px] [--pattern-foreground:var(--color-edge)]/30",
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

function getProjectPageJsonLd(project: Project): WithContext<CreativeWork> {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",

    name: project.title,
    description: project.description,
    url: `${SITE_INFO.url}/projects/${project.slug}`,

    dateCreated: project.date ? dayjs(project.date).toISOString() : undefined,
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

    keywords: project.tech?.join(", "),

    image: project.image
      ? {
          "@type": "ImageObject",
          url: project.image,
        }
      : undefined,
  };
}

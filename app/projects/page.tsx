import { CollectionPage, WithContext } from "schema-dts";
import { ContentWrapper } from "../(app)/page";
import dayjs from "dayjs";
import { USER } from "@/features/portfolio/profile/data/user";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { projects } from "@/features/portfolio/projects/data/projects";
import { SITE_INFO } from "@/config/site";
import ProjectPageSsr from "@/features/project/components/projectPage";
import Footer from "@/features/footer/components/footer";

export const metadata: Metadata = {
  title: "Projects",
  description: "A collection of projects built by " + USER.displayName,
};

export default function ProjectsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getProjectsPageJsonLd()).replace(
            /</g,
            "\\u003c",
          ),
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
            <ProjectPageSsr />
            <Footer />
          </ContentWrapper>
        </div>
      </div>
    </>
  );
}

function getProjectsPageJsonLd(): WithContext<CollectionPage> {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Projects",
    description: "A collection of projects built by " + USER.displayName,
    dateModified: dayjs().toISOString(),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: project.title,
        url: `${SITE_INFO.url}/projects/${project.slug}`,
      })),
    },
    about: {
      "@type": "Person",
      name: USER.displayName,
      identifier: USER.username,
      image: USER.avatar,
    },
  };
}
